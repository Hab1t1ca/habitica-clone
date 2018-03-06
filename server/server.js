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
cron.schedule('34 18 * * *', function () {
    const db = app.get('db');

    db.cron().then(lists => {
        var dailies = lists.filter(list => list.daily_todo === 'daily');
        var todos = lists.filter(list => list.daily_todo === 'todo');

        //check if user is on quest and do battle. This is hacky because we added it as an afterthought.
        db.getAllUsers().then(users => {
            users.forEach(user=>{
                //get all users and then map through them
                    
                    var {quest} = user;
                    if (quest!=null){
                        console.log('hitting quest')
                        var {bossdmg, bosshp, hp, damage, userid, gold, currentexp} = user;
                        let nudailies = dailies.filter(daily => daily.userid===10);//fix this
                        
                        nudailies.map(daily=>{
                            console.log('daily', daily)
                            if (daily.completed===false){
                                hp-=bossdmg;
                            }
                            else {
                                bosshp-=damage;
                                if (bosshp<=0){
                                    //user receives rewards
                                    db.getQuests([quest]).then(quest=>{
                                        console.log('quest', quest)
                                        let {rewards} = quest[0];
                                        gold += rewards.gold;
                                        currentexp += rewards.xp;  

                                        console.log("getting quests", quest, quest[0].rewards, gold, currentexp, userid)

                                        db.updateXPGold([gold, currentexp,userid]).then(user=>{
                                            console.log('updated user with rewards')
                                            return user
                                        }).catch(e=>console.log(e))
                                    }).catch(e=>console.log(e))
                                quest = null;
                                bosshp = null;
                                bossdmg = null;
                                }
                            }
                        damage = 1
                        db.questUpdate(hp,damage,quest,bossdmg,bosshp,userid).then(user=>{
                            return user[0]
                        }).catch(e=>console.log(e))
                        })
                    }
                    else {
                        return user
                    }
                })
            })
            
    //     todos.map(todo => {
    //         todo.age += 1;
    //         db.updateAge([todo.age, todo.id]).then(todo => {
    //             return todo;
    //         })
    //     })

    //     dailies.map(daily => {
    //         if (daily.completed != true) {
    //             //streak = 0,and run updateStreak.
    //             daily.streak = 0;
    //             db.updateStreak([daily.streak, daily.id]).then(daily => {
    //                 return daily;
    //             }).catch(e => console.log(e))
    //             db.getUser([daily.userid]).then(user => {
    //                 let { hp, gold, userid } = user[0];
    //                 hp -= 5;
    //                 gold -= 1;
    //                 db.cronUpdate([hp, gold, userid]).then(user => {
    //                     let blob = user[0];
    //                     if (blob.hp <= 0) {
    //                         let { lvl, nextexp, currentexp, gold, mana, userid, hp } = blob;
    //                         if (lvl<=1){
    //                             lvl=1;
    //                             hp=0;
    //                         }
    //                         else {
    //                             lvl -= 1;
    //                             hp = lvlFns.generalHealthCalc(lvl);
    //                         }
    //                         currentexp = 0;
    //                         gold -= 5;
    //                         mana = lvlFns.generalMana(lvl);
    //                         nextexp -= 15;
                            
    //                         db.updateLvl([lvl, hp, mana, nextexp, currentexp, gold, userid]).then(user => {
    //                             return user;
    //                         }).catch(e => console.log(e))
    //                     }
    //                     else {
    //                         return blob
    //                     }
    //                 }).catch(e => console.log(e))
    //             })
    //         }
    //         else {
    //             //run updateStreak with streak+=1
    //             daily.streak += 1;
    //             db.updateStreak([daily.streak, daily.id]).then(daily => {
    //                 return daily
    //             })
    //             db.cronUpdateList([daily.id]).then(results => {
    //                 return results;
    //             }).catch(e => console.log(e))
    //         }
    //     })
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
app.post('/api/addDaily', controller.addDaily);
app.post('/api/addTodo', controller.addTodo);
app.get('/api/getLists', controller.getLists);
app.delete('/api/deleteTask/:listid', controller.deleteTask);
app.put('/api/complete/:listid', controller.complete);
app.put('/api/editTask', controller.editTask);

//user endpoints
app.post('/api/createChar', controller.createName);
app.post('/api/addClass', controller.addClass);
app.get('/api/getUser', controller.getUser);
app.put('/api/taskComp', controller.updateXPGold);
app.put('/api/avatar', controller.avatar);
app.get('/api/getClasses', controller.getClasses);
app.get('/api/getUserAbilities', controller.getUserAbilities);
app.put('/api/ability', controller.useAbility);
app.get('/api/getQuests', controller.getQuests);
app.put('/api/equipQuest', controller.equipQuest);

//item endpoints
app.get('/api/getitems', controller.getitems);
app.post('/api/buyitem', controller.buyItem);
app.put(`/api/buypotion`,controller.buyPotion);
app.get('/api/inventory', controller.pullInventory);
app.get('/api/equipped', controller.getEquipped);
app.put(`/api/equip`, controller.equipItem);


//End endpoints


massive(process.env.CONNECTION).then(db => {
    app.set('db', db);
    app.listen(port, () => console.log(`Big Brother is listening on port ${port}`));
})
