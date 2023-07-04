const express =  require("express");

const app = express();

app.get("/", function (req, res) {
    res.send("<body><h1>Hello World!</h1></body>");
})
app.get("/69", function (req, res) {
    res.send("<h1>Nice! hehe</h1>");
})
app.get("/about", function (req, res) {
    res.send("<h1>I am a gamer, i be gaming like alot. i really should do something else but i am a bb</h1>");
})
app.listen(8000);
