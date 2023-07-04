const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    var name = req.body.name;
    res.send("<body><h1> Hi your name is " + name + "</h1></body>");
});
app.listen(8000);
