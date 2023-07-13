
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();
const encrypt = require('mongoose-encryption');

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});

const secret = 'Youreallythoughtyoudgetthroughthis';
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']});

const User = new mongoose.model('User', userSchema);

app.get('/', async (req, res) => {

    res.render('home');
});

app.get('/register', async (req, res) => {

    res.render('register');
});

app.post('/register', async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = new User({
        email: username,
        password: password
    });
    try {
        await user.save();
        res.render('secrets');

    } catch (err) {

        console.log(err);
        res.redirect('/');
    }
});
app.get('/login', async (req, res) => {

    res.render('login');
});

app.post('/login', async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    try {

        const user = await User.findOne({ email: username });
        if (!user) {
            console.log('usr Not found');
            res.redirect('/');
        } else if (user.password === password) {
            res.render('secrets');
        } else {
            res.redirect('/');
        }

    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});
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
