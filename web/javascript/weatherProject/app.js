const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    console.log(req.body.cityName);
    console.log("Post");
    const apiId = "898b062c09cb365e496197b21cb81776";
    const query = req.body.cityName;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiId + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weth = JSON.parse(data);
            const temp = weth.main.temp;
            const desc = weth.weather[0].description;
            const icon = weth.weather[0].icon;
            console.log(temp + ' ' + desc);
            res.write("<h1> The temp in " + query + " is " + temp +"</h1>");
            res.write("<h1>"+ desc + "</h1>");
            res.write('<img src="https://openweathermap.org/img/wn/' + icon + '@2x.png" alt"weather">')
            res.send();
        });
    });
});


app.listen(8000);
