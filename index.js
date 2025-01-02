
var buttonColor=["red","green","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;

var toggle = false;

$(document).keypress(function() {
    if (!toggle) {
        level=0;
        gamePattern = []; // Reset game pattern
        userClickedPattern = [];
        $("#level-title").text("Level " + level);
        nextsequence();
        toggle = true;
    }
  });
    


$(".btn" ).click(function() {
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
  } );

function nextsequence(){
    level++;
    $("#level-title").text("Level " + level);

    var randomnumber=Math.floor(Math.random()*4);
    var randomcolorchoose = buttonColor[randomnumber];
    gamePattern.push(randomcolorchoose);
    $("#"+randomcolorchoose).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomcolorchoose);
    
}

function playSound(name){
    var audio = new Audio( name + ".mp3");
    audio.play();

}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(nextsequence, 1000); 
        userClickedPattern = []; 
      }
    } else {
     
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
  
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
  
      startOver();
    }
  }
  
 
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    toggle = true; 
  }
  
