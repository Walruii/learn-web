require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const ejs = require("ejs");
const text = require(__dirname + "/text.js")

app.engine('.html', require('ejs').__express);
app.set("view engine", "html");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Post = mongoose.model("Post", postSchema);

// const post = new Post({
//     title: "hello long post",
//     content: "hello this is a post Ladies others the six desire age. Bred am soon park past read by lain. As excuse eldest no moment. An delight beloved up garrets am cottage private. The far attachment discovered celebrated decisively surrounded for and. Sir new the particular frequently indulgence excellence how. Wishing an if he sixteen visited tedious subject it. Mind mrs yet did quit high even you went. Sex against the two however not nothing prudent colonel greater. Up husband removed parties staying he subject mr.",
// });

// post.save();

app.get("/", async (req, res) => {

    const posts = await Post.find();
    res.render("home", {
        homeStart: text.homeContent,
        posts: posts
    });
});

app.get("/about", async (req, res) => {
    res.render("about", {
        aboutContent: text.aboutContent,
    });
});

app.get("/contact", async (req, res) => {
    res.render("contact", {
        contactContent: text.contactContent,
    });
});

app.get("/compose", async (req, res) => {
    res.render("compose");
});

app.post("/compose", async (req, res) => {
    const postTitle = req.body.postTitle;
    const postContent = req.body.postContent;
    const post = new Post({
        title: postTitle,
        content: postContent
    });

    try {
        const postadd = await Post.insertMany([post]);
    } catch (err) {
        console.error(err);
    }

    res.redirect("/");
});

app.get("/invalid", async (req, res) => {
    res.render("invalid")
});

app.get("/posts/:post", async (req, res) => {
    const postId = req.params.post;
    try {
        const find = await Post.findById({ _id: postId }).then(function(post) {
            res.render("post", {
                post: post
            });
        });
    } catch (err) {
        console.error(err);
        res.redirect("/invalid");
    }

});

const start = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI)

        app.listen(process.env.PORT || 3000, async () => {
            console.log("Listening on port 3000");
        });

    } catch (err) {

        console.error(err);
        process.exit(1);
    }
};

start();
