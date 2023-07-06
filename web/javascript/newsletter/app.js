const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    var firstName = req.body.fName
    var lastName = req.body.lName
    var email = req.body.email
})

app.listen(8000, function () {
    console.log("Running at port: 8000");
});
