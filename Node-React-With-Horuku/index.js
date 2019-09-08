const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// require the keys file. Need not specify the file extension for Files ending with .js
const keys = require('./config/keys')

const app = express();

//ClientID 'D' has to be in caps
// Parameters required clientID, secret key and call back url
passport.use(
    new GoogleStrategy({
        clientID : keys.googleClientID,
        clientSecret : keys.googleClientSecret,
        callbackURL : '/auth/google/callback',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
        proxy: true
    },
    (accessToken, refreshToken, profile,done) => {
        console.log('access token:',accessToken);
        console.log('refresh token:',refreshToken);
        console.log('profile:',profile);
    })
);

// The parameters - path, and the action to be performed
// Google Strategy is called 'google'
// scope specifies what access is required from user profile
// in this case user profile and email address. There are different scopes available

app.get('/auth/google', 
    passport.authenticate('google', {
        scope:['profile','email']
    })
);
// This is for call back, the url would have the code
// http://localhost:5000/auth/google/callback?code=4%2FqwFYuWq_ChEkJ2omHF7PyHu-kF_ohgWN7vKkwLGucknveTj8GE70FWYL1_nd6DofaWPCttv4EjWFhwNdGy3kx6Y&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&authuser=0&session_state=5bfb69f5e59f5e3c91e8cee9d4dda178c0ef24a5..b57d&prompt=consent#
app.get('/auth/google/callback', 
    passport.authenticate('google'))


const PORT = process.env.PORT || 5000;
app.listen(PORT);