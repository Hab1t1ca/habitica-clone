require('dotenv').config();

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
app.use(bodyParser.json());
app.use(cors());
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
}, function(accessToken, refreshToken, extraParams, profile, done ){

    const db=app.get('db');

    let {user_id} = profile;

    db.find_user([user_id]).then(users=>{
        if (!users[0]){
            db.create_auth([user_id]).then(user=>{
                db.insertID_user([user[0].userid]).then(userdata=>{
                    return done(null, userdata[0])
                })
            })
        }
        else {
            return done(null, users[0])
        }
    })
}))

passport.serializeUser((user, done)=>{
    return done(null,user.userid)
})

passport.deserializeUser((user, done)=>{
    return done(null, user.userid)
})

//endpoints
app.get('/api/login', passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESSREDIRECT,
    failureRedirect: process.env.FAILUREREDIRECT
}));

app.get('/api/getitems', controller.getitems);
app.post('/api/addDaily', controller.addDaily);

//user endpoints
app.post('/api/createChar', controller.createName);
app.post('/api/addClass', controller.addClass);
app.get('/api/getUser', controller.getUser);

//End user endpoints


massive(process.env.CONNECTION).then(db => {
    app.set('db', db);
    app.listen(port, () => console.log(`Big Brother is listening on port ${port}`));
})
