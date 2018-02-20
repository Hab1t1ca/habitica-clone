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
    console.log('profile',profile)
    return done(null, profile)
}))

passport.serializeUser((user, done)=>{
    return done(null,user)
})

passport.deserializeUser((user, done)=>{
    return done(null, user)
})

app.get('/api/login', passport.authenticate('auth0', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
}));

massive(process.env.CONNECTION).then(db => {
    app.set('db', db);
    app.listen(port, () => console.log(`Big Brother is listening on port ${port}`));
})