const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const https = require("https");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todoListDB", { useNewUrlParser: true });

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);
const date = require(__dirname + "/date.js");

app.set('view engine', 'ejs');
app.use(express.static("public"));

// const items = ["Gaming", "More Gaming"];
// const workItems = [];

const item1 = new Item({
    name: "GAMING"
});

const item2 = new Item({
    name: "MORE GAMING"
});

// Item.insertMany([item1, item2]);

const items = []


app.get("/", async (req, res) => {
    day = date.getDate();
    items = [];

    const itm = await Item.find({});
    itm.forEach(function(item) {
        items.push(item.name);
    });

    console.log(items.name);

    res.render("list", {
        listName: day,
        items: items,
    });
});

app.get("/about", function(req, res) {
    res.render("about");
})

app.get("/work", function(req, res) {

    res.render("list", {
        listName: "Work List",
        items: workItems
    });
});

app.post("/", function(req, res) {
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

app.listen(process.env.PORT || 8000, function() {

    console.log("Listening on port 8000");

});
