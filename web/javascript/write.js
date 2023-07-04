const fs = require("fs");
// fs.writeFile("hello.txt", "hello! guys i am a gamer", function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// })
fs.readFile("hello.txt", "utf8", function(err, data) {
    if (err) throw err;
    console.log(data);
  });
