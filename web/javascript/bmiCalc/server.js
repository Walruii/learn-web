const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/", function (req, res) {

    var height = Number(req.body.height);
    var weight = Number(req.body.weight);

    var bmi = weight / (height * height);
    res.send("<body><h1>Result: "+ bmi + "</h1></body>")
})

app.listen(8000);
