require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

// Setting the view engine to ejs that takes .html extention
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// Setting up bodyParser to work with express
app.use(bodyParser.urlencoded({ extended: true }));

// Adding static pages folder for express
app.use(express.static('public'));

// Setting up sessions with express that store user login
app.use(session({
    secret: "lilSecret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Setting up the Schema for the users that will store the email,
// password, secrets and optionally the googleId or the FacebookId
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String,
    facebookId: String,
    secret: String
});

// Setting up plugins for mongodb to work with mongoose passport local and
// findOrCreate plugin that will make saving googleId and facebookId easy
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model('User', userSchema);

passport.use(User.createStrategy());

// Serializing and Deserializing user to save the login and log them out
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


// Setting up OAuth with Google API to get the user info
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    usrProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    passReqToCallback: true
},
    function(request, accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function(err, user) {
            return done(err, user);
        });
    }
));

// Setting up OAuth with Facebook API to get the user info
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
},
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function(err, user) {
            return cb(err, user);
        });
    }
));

// Creating routes for home and about me page
app.get('/', async (req, res) => {

    res.render('home');
});


app.get('/about', async (req, res) => {

    res.render('about');
});


// Setting up the secrets page that will display the secrets 
app.get('/secrets', async (req, res) => {
    const users = await User.find({ 'secret': { $ne: null } });
    if (users) {
        res.render('secrets', { userss: users });
    }

});


// Setting up the local registering method the hashs the password and salts it
app.get('/register', async (req, res) => {

    res.render('register');
})

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


// Setting up the local login that was hash and salt the given password the 
// same way and check it against the stored password
app.get('/login', async (req, res) => {

    res.render('login');
})

app.post('/login', async (req, res) => {

    const user = new User({
        username: req.body.username,
        passport: req.body.password
    })

    req.login(user, (err) => {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate('local', { failureRedirect: '/', failureMessage: true })(req, res, () => res.redirect('/secrets'));
        }
    });
});


// Setting up the logout that will remove the session of the login from the 
// browser and the user will be no longer logged in
app.get('/logout', async (req, res) => {
    req.logout((err) => {
        if (err) { console.log(err); }
        res.redirect('/');
    });
});


app.get('/submit', async (req, res) => {

    if (req.isAuthenticated()) {
        res.render('submit');
    } else {
        res.redirect('/login');
    }

});

app.post('/submit', async (req, res) => {

    const submittedSecret = req.body.secret;
    try {

        const user = await User.findById({ _id: req.user._id });
        if (!user) {
            console.log(user);
        } else {
            user.secret = submittedSecret;
            try {
                await user.save();
                res.redirect('/secrets');
            } catch (error) {
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
    }

});


// Routing the facebook and google authentication that if successful will
// provide us will the ids or will shout unauthorized
app.get('/auth/facebook', passport.authorize('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/secrets',
        failureRedirect: '/login'
    }));


app.get('/auth/google', passport.authorize('google', { scope: ['profile'] }));

app.get('/auth/google/secrets',
    passport.authenticate('google', {
        successRedirect: '/secrets',
        failureRedirect: '/login'
    }));

// Starting the server with local host and listening to port 3000
const start = async () => {
    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/userDB');
        app.listen(3000, () => {
            console.log('Listening on 3000');
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

start();
