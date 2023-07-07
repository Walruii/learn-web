const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var sum = num1 + num2;

    res.send("<h1>Result is " + sum + "</h1>");
});


app.listen(8000, function () {
    console.log("listening on port 8000");
});
