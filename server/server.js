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
            db.create_user([null,user_id, null, null, null, null]).then(user=>{
                return done(null, user[0])
            })
        }
        else {
            console.log('user already created')
            return done(null, users[0])
        }
    })
}))

passport.serializeUser((user, done)=>{
    console.log(user.id,'user')
    return done(null,user.id)
})

passport.deserializeUser((user, done)=>{
    console.log("you are not supposed to be here")
    return done(null, user)
})

app.get('/api/login', passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESSREDIRECT,
    failureRedirect: process.env.FAILUREREDIRECT
}));

massive(process.env.CONNECTION).then(db => {
    app.set('db', db);
    app.listen(port, () => console.log(`Big Brother is listening on port ${port}`));
})