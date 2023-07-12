const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const articleSchema = {
    title: String,
    content: String
};

const Article = new mongoose.model("Article", articleSchema);

app.route("/articles")
    .get(async (req, res) => {
        try {

            const articles = await Article.find();
            res.send(articles);

        } catch (err) {

            res.send(err);
        }
    })

    .post(async (req, res) => {
        const articleTitle = req.body.title;
        const articleContent = req.body.content;

        const article = new Article({
            title: articleTitle,
            content: articleContent
        });
        try {

            const save = await article.save()
            res.send(save);

        } catch (err) {

            res.send(err);

        }
    })

    .delete(async (req, res) => {

        try {

            const articleDelete = await Article.deleteMany();
            res.send(articleDelete);

        } catch (err) {

            res.send(err);
        }
    });

app.route("/articles/:article")
    .get(async (req, res) => {

        const articleTitle = req.params.article;
        try {

            const findArticle = await Article.findOne({ title: articleTitle });
            res.send(findArticle);


        } catch (err) {
            console.error(err);
            res.send(err);
        }
    })

    .put(async (req, res) => {
        try {
            await Article.findOneAndReplace(
                { title: req.params.article },
                { title: req.body.title, content: req.body.content },
            ).then((response) => {
                if (!response) {
                    res.send("NOT FOUND");
                } else {
                    res.send("UPDATED!");
                }

            });

        } catch (err) {
            res.send(err);
        }
    })

    .patch(async (req, res) => {

        try {
            await Article.findOneAndUpdate(
                { title: req.params.article },
                { title: req.body.title, content: req.body.content },
            ).then((response) => {
                if (!response) {
                    res.send("Not Found!");
                } else {
                    res.send("updated!");
                }

            });

        } catch (err) {
            res.send(err);
        }

    })

    .delete(async (req, res) => {

        try {
            await Article.findOneAndDelete({ title: req.params.article })
                .then((response) => {
                    if (!response) {
                        res.send("not found");
                    } else {
                        res.send("deleted!");
                    }

                });

        } catch (err) {
            res.send(err);
        }

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
