require('dotenv').config();
const lvlFns = require('./onLvl.js');


const express = require('express')
    , session = require('express-session')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , cors = require('cors')
    , port = process.env.SERVERPORT
    , app = express()
    , controller = require('./controller.js')
    , passport = require('passport')
    , Auth0strat = require('passport-auth0')
    , cron = require('node-cron')
app.use(bodyParser.json());
app.use(cors());

//cron
cron.schedule('0 0 * * *', function () {
    const db = app.get('db');

    db.cron().then(lists => {
        var dailies = lists.filter(list => list.daily_todo === 'daily');
        var todos = lists.filter(list => list.daily_todo === 'todo');

        todos.map(todo => {
            todo.age += 1;
            db.updateAge([todo.age, todo.id]).then(todo => {
                return todo;
            })
        })

        dailies.map(daily => {
            if (daily.completed != true) {
                //streak = 0,and run updateStreak.
                daily.streak = 0;
                db.updateStreak([daily.streak, daily.id]).then(daily => {
                    return daily;
                }).catch(e => console.log(e))
                db.getUser([daily.userid]).then(user => {
                    let { hp, gold, userid } = user[0];
                    hp -= 5;
                    gold -= 1;
                    db.cronUpdate([hp, gold, userid]).then(user => {
                        console.log('user should lose level', user[0]);
                        let blob = user[0];
                        if (blob.hp <= 0) {
                            let { lvl, nextexp, currentexp, gold, mana, userid, hp } = blob;
                            lvl -= 1;
                            currentexp = 0;
                            gold -= 5;
                            hp = lvlFns.generalHealthCalc(lvl);
                            mana = lvlFns.generalMana(lvl);
                            nextexp += 15;
                            console.log('new values', lvl, hp, mana, nextexp, currentexp, gold, userid)
                            db.updateLvl([lvl, hp, mana, nextexp, currentexp, gold, userid]).then(user => {
                                return user;
                            }).catch(e => console.log(e))
                        }
                        else {
                            return blob
                        }
                    }).catch(e => console.log(e))
                })
            }
            else {
                //run updateStreak with streak+=1
                daily.streak += 1;
                db.updateStreak([daily.streak, daily.id]).then(daily => {
                    return daily
                })
                db.cronUpdateList([daily.id]).then(results => {
                    return results;
                }).catch(e => console.log(e))
            }
        })
    }).catch(e => console.log(e))
});
//end of cron

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

//authentication:

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0strat({
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: process.env.CALLBACKURL,
    scope: "openid profile"
}, function (accessToken, refreshToken, extraParams, profile, done) {

    const db = app.get('db');

    let { user_id } = profile;

    db.find_user([user_id]).then(users => {
        if (!users[0]) {
            db.create_auth([user_id]).then(user => {
                db.insertID_users([user[0].userid]).then(userdata => {
                    return done(null, userdata[0])
                })
            })
        }
        else {
            return done(null, users[0])
        }
    })
}))

passport.serializeUser((user, done) => {
    // console.log('serialize', user)
    return done(null, user)
})

passport.deserializeUser((user, done) => {
    // console.log('deserial', user.userid)
    return done(null, user.userid)
})

//endpoints
app.get('/api/login', passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESSREDIRECT,
    failureRedirect: process.env.FAILUREREDIRECT
}));
app.get('/api/logout', controller.logout)

//list endpoints
app.get('/api/getitems', controller.getitems);
app.post('/api/buyitem', controller.buyItem);
app.post('/api/addDaily', controller.addDaily);
app.post('/api/addTodo', controller.addTodo);
app.get('/api/getLists', controller.getLists);
app.delete('/api/deleteTask/:listid', controller.deleteTask);
app.put('/api/streak/:listid', controller.streak);
app.put('/api/complete/:listid', controller.complete);
app.put('/api/editTask', controller.editTask);

//user endpoints
app.post('/api/createChar', controller.createName);
app.post('/api/addClass', controller.addClass);
app.get('/api/getUser', controller.getUser);
app.put('/api/taskComp', controller.updateXPGold);
app.put('/api/avatar', controller.avatar);

//End endpoints


massive(process.env.CONNECTION).then(db => {
    app.set('db', db);
    app.listen(port, () => console.log(`Big Brother is listening on port ${port}`));
})
