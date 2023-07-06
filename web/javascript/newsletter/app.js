const config = require("./config.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    var url = "https://us13.api.mailchimp.com/3.0/lists/" + config.list_id;
    var options = {
        method: "POST",
        auth: "walruii:" + config.api_key
    };

    const request = https.request(url, options, function(response) {

        response.on("data", function(data) {

            const revD = JSON.parse(data);

            if (revD.error_count != 0) {

                res.sendFile(__dirname + "/failure.html");

            } else {

                res.sendFile(__dirname + "/success.html");

            }

        });

    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 8000, function () {
    console.log("Running at port: 8000");
});
