import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";
var input;
inquirer
    .prompt([
        {message: "Type URL: ",
            name: "URL"}
    ])
    .then((answers) => {
        console.log(answers)
        const url = answers.URL;
        var qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream('google.png'));
        fs.writeFile("text.txt", url, function (err) {
            if (err) throw err;
            console.log("Saved!");
        })

    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.log("error")
        } else {
            // Something else went wrong
            console.log("error")
        }
    });

