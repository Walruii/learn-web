const config = require("./config.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const { on } = require("events");
app.use(bodyParser.urlencoded({extended: true}));

const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: config.api_key,
  server: "us13",
});

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const run = async () => {
        const response = await client.lists.batchListMembers(config.list_id, {
            members: [{
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }]
        });
        console.log(response);
        console.log(response.error_count)
        if (response.error_count != 0) {
            res.sendFile(__dirname + "/failure.html");
        }
        else {
            res.sendFile(__dirname + "/success.html"); }
    };

    run();

});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 8000, function () {
    console.log("lis on Port: 8000");
});
