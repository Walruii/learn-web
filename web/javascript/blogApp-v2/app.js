const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("hello");
});


app.listen(process.env.PORT || 8000, () => {
    console.log("Listening on port 8000");
});
