const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
const https = require("https");

app.set('view engine', 'ejs');

var items = ["Gaming", "More Gaming"];

app.get("/", function (req, res) {

    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {
        kindOfDay: day,
        items: items,
    });
});

app.post("/", function (req, res) {
    var item = req.body.item;
    items.push(item);
    res.redirect("/");
});

app.listen(process.env.PORT || 8000, function () {
    console.log("Listening on port 8000");
});

