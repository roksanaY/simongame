
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function(){

    if(!started){

        $(".level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});


function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 2000);
        }
    }else{

        playSound("wrong");
        $(document.body).addClass("game-over");
        $(".level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $(document.body).removeClass("game-over");
        }, 200);

        startOver();
    }

}


function nextSequence(){

    userClickedPattern = [];

    level++;
    $(".level-title").text("Level " + level);

    //2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
    var randomNumber = Math.floor(Math.random() * 4);

    //4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
    var randomChosenColour = buttonColours[randomNumber];

    //6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.

   gamePattern.push(randomChosenColour);

   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColour);

}

function playSound(name){

    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");

    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){

    level = 0;
    gamePattern = [];
    started = false;
}

// function myFunction() {
//     // var element = document.getElementById("rules");
//     // element.classList.toggle("display");
// }

$(document).ready(function(){
    $("button.rules-button").click(function(){
        $(this).text("Hide Rules");
      $("div.rules").slideToggle();
    });
});

