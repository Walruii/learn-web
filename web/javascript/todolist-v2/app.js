const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const _ = require("lodash");
app.use(bodyParser.urlencoded({ extended: true }));
const https = require("https");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todoListDB", { useNewUrlParser: true });

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);
const date = require(__dirname + "/date.js");

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.set('view engine', 'ejs');
app.use(express.static("public"));

const item1 = new Item({
    name: "GAMING"
});

const item2 = new Item({
    name: "MORE GAMING"
});

const defaultItems = ([item1, item2]);

// Item.insertMany([item1, item2]);

let items = [];


app.get("/", async (req, res) => {
    items = [];

    const itm = await Item.find({});
    const itmLeg = await itm.length;

    if (itmLeg === 0) {

        Item.insertMany([item1, item2]);
        res.redirect("/");

    }
    itm.forEach(function(item) {

        items.push(item);

    });

    res.render("list", {

        listName: "Today",
        items: items,

    });
});

app.get("/:list", async (req, res) => {

    const listName = _.capitalize(req.params.list);

    List.findOne({ name: listName }).then(function(foundList) {

        if (!foundList) {

            const list = new List({
                name: listName,
                items: defaultItems
            });

            list.save();

            res.redirect("/" + listName);

        } else {

            res.render("list", {
                listName: foundList.name,
                items: foundList.items
            });
        }
    });
});

app.post("/", async (req, res) => {

    const reqItem = req.body.item;
    const listName = req.body.list;

    const item = new Item({
        name: reqItem,
    });

    if (listName === "Today") {

        const response = await Item.insertMany([item]);

        res.redirect("/");

    } else {

        List.findOne({ name: listName }).then(function(foundList) {
            foundList.items.push(item);
            foundList.save();
        });

        res.redirect("/" + listName);
    }
});

app.post("/delete", async (req, res) => {

    const id = req.body.checkbox;
    const listName = req.body.list;


    if (listName === "Today") {

        const rm = await Item.findOneAndDelete({ _id: id });
        res.redirect("/");

    } else {

        const rm = await List.findOneAndUpdate({name: listName}, { $pull: {items: {_id: id}}});
        res.redirect("/" + listName);
    }
});


app.listen(process.env.PORT || 8000, async () => {

    console.log("Listening on port 8000");
});
