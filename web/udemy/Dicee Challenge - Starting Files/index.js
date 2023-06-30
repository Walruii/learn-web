var randomNumber1 = Math.random();
var randomNumber2 = Math.random();
randomNumber1 = Math.floor(randomNumber1 * 5) + 1;
randomNumber2 = Math.floor(randomNumber2 * 5) + 1;

var src1 = "./images/dice" + randomNumber1 + ".png";
var src2 = "./images/dice" + randomNumber2 + ".png";
// console.log(src1 + " " + src2);
document.querySelectorAll("img")[0].setAttribute("src", src1);
document.querySelectorAll("img")[1].setAttribute("src", src2);

if (randomNumber1 > randomNumber2) {
    document.querySelector(".container > p").innerText = "PLAYER 1 WINS";
}
else if (randomNumber1 === randomNumber2) {
    document.querySelector(".container > p").innerText = "DRAW";
}
else {
    document.querySelector(".container > p").innerText = "PLAYER 2 WINS";
}
