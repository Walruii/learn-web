const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
const https = require("https");

const date = require(__dirname + "/date.js");

app.set('view engine', 'ejs');
app.use(express.static("public"));

const items = ["Gaming", "More Gaming"];
const workItems = [];

app.get("/", function (req, res) {

    day = date.getDate();

    res.render("list", {
        listName: day,
        items: items,
    });
});

app.get("/about", function (req, res) {
    res.render("about");
})

app.get("/work", function (req, res) {

    res.render("list", {
        listName: "Work List",
        items: workItems
    });
});

app.post("/", function (req, res) {
    let item = req.body.item;
    console.log(req.body);
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.listen(process.env.PORT || 8000, function () {
    console.log("Listening on port 8000");
});
