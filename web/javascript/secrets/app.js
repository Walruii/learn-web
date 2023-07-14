
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const findOrCreate = require('mongoose-findorcreate');

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: "lilSecret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

const User = new mongoose.model('User', userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/secrets",
//     usrProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
//     passReqToCallback: true
// },
//     function(request, accessToken, refreshToken, profile, done) {
//         User.findOrCreate({ googleId: profile.id }, function(err, user) {
//             return done(err, user);
//         });
//     }
// ));

app.get('/', async (req, res) => {

    res.render('home');
});

app.get('/register', async (req, res) => {

    res.render('register');
});

app.get('/secrets', async (req, res) => {
    if (req.isAuthenticated()) {
        res.render('secrets');
    } else {
        res.redirect('/login');
    }
});

app.post('/register', async (req, res) => {

    try {
        const register = await User.register({ username: req.body.username }, req.body.password);
        if (!register) {
            console.log(register);
        } else {
            passport.authenticate('local')(req, res, () => res.redirect('/secrets'));
        }

    } catch (error) {
        console.log(error);
    }
});


app.get('/login', async (req, res) => {

    res.render('login');
});

app.get('/logout', async (req, res) => {
    req.logout((err) => {
        if (err) { console.log(err); }
        res.redirect('/');
    });
});

app.post('/login', async (req, res) => {

    const user = new User({
        username: req.body.username,
        passport: req.body.password
    })

    req.login(user, (err) => {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate('local')(req, res, () => res.redirect('/secrets'));
        }
    });
});

// app.get('/auth/google', passport.authorize('google', { scope: ['email', 'profile'] }));

// app.get( '/auth/google/secrets',
//     passport.authenticate( 'google', {
//         successRedirect: '/secrets',
//         failureRedirect: '/login'
// }));



const start = async () => {
    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/userDB');
        app.listen(8000, () => {
            console.log('Listening on 8000');
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

start();
