var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var levelNumber = 0;
var started = false;
function nextSequence() {
    $("#level-title").text("Level " + levelNumber);
    var randomNumber = Math.floor(Math.random()*3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("." + randomChosenColor).fadeOut(50).fadeIn(50);
    console.log(gamePattern);
    levelNumber++;
    userPattern = [];
}
$(document).on("keypress", function (event) { 
    if (event.key === "a" && started != true) {
        started = true;
        gamePattern = [];
        levelNumber = 0;
        $(".btn").show();
        setTimeout(nextSequence, 500);
    }
});

$(".btn").on("click", function(event) {
    var userChosenColor = event.target.id;
    playSound(userChosenColor);
    $("#" + userChosenColor).toggleClass("pressed");
    setTimeout(function () {
        $("#" + userChosenColor).toggleClass("pressed");
    }, 100);
    userPattern.push(userChosenColor);
    if (gamePattern.toString() === userPattern.toString() && gamePattern.length === userPattern.length)
    {
        setTimeout(nextSequence, 1000);
    }
    if (userPattern[userPattern.length - 1] != gamePattern[userPattern.length - 1])
    {
        $("#level-title").text("GAME OVER (press a to play again)");
        $("body").toggleClass("game-over");
        setTimeout(function () {
            $("body").toggleClass("game-over");
        }, 500)
        started = false
        $(".btn").hide();
    }
    console.log(userPattern);
})

function playSound(color) {
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}
