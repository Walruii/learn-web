const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const articleSchema = {
    title: String,
    content: String
};

const Article = new mongoose.model("Article", articleSchema);

app.get("/articles", async (req, res) => {
    try {

        const articles = await Article.find();
        res.send(articles);
        
    } catch (err) {

        res.send(err)
    }
});

app.post("/articles", async (req, res) => {
    console.log(req.body.title);
    console.log(req.body.content);

});
const start = async () => {
    try {

        await mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

        app.listen(8000, async () => {
            console.log("Listening on port 8000");
        });

    } catch (err) {

        console.error(err);
        process.exit(1);
    }
};

start();
