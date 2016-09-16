var player1carImage = "imgs/cream-car.jpg";
var player2carImage = "imgs/teal-car.jpg"
var currentGame = new Game;
var allGamePrompts = ["Ready?", "Set...", "GO!"];
var currentGamePrompt;
var secondsRemaining;
var gamePromptTimer;

//hides end of game alert, listens for ready button click
$(document).ready(function() {
  $("#end-of-game").hide();
  $(".game-start").on("click", handleGameStartClick);
});

//displays seconds remaining in race
function secondsUpdate() {
  if (secondsRemaining <= 30) {
    secondsRemaining--;
    $("#sec").text(secondsRemaining);
    }
};

//game start prompt: handles click of ready button
function handleGameStartClick() {
  currentGamePrompt = allGamePrompts[0];
  var gamePromptTimer = window.setInterval(changeGamePrompts, 1000);
  $("#end-of-game").hide();
}

//cycles through ready, set, go array
function chamgeGamePrompts () {
  $(".game-prompt").fadeOut(100);
  //will currentGamePrompt value carry down here?
  if (currentGamePrompt == allGamePrompts.length) {
    window.clearInterval(gamePromptTimer);
    $("#button-wrapper").fadeOut(100);
    $(".game-prompt").text("");
    raceClock();
  }  else {
    $(".game-prompt").text(allGamePrompts[currentGamePrompt]);
    currentGamePrompt++;
  }
  $(".game-prompt").fadeIn(100);
}

//race time and handles player key up
function raceClock() {
  var raceTimer;
  var secondsTimer;
  var raceLength = 30000;
  secondsRemaining = raceLength/1000;

  $(window).on("keyup", function handleKey() {
    car = currentGame.cars[event.which];
    if (car) {
      var carScore = car.increaseScore(1);
      $("#player" + event.which + "Score").text(carScore);
    }
  });
  raceTimer = window.setInterval(countdown, raceLength);
  secondsTimer = window.setInterval(secondsUpdate, 1000);
};

//when the clock ends: checks for winner, starts some resets
function countdown() {
  $(window).off("keyup");
  window.clearInterval(raceTimer);
  window.clearInterval(secondsTimer);
  $("#end-of-game").show();
  currentGame.declareWinner();
  $("#game-start-button").text("Play again?");
  $("#button-wrapper").show();
  $("#sec").text("00");
};

//object constructors and prototypes
function Car (carImage, carName) {
  this.identity = carName;
  this.image = carImage;
  this.score = 0;
};

Car.prototype.increaseScore = function (num) {
  this.score += num;
  return this.score;
};

Car.prototype.setScore = function (score) {
  this.score = score;
  return this.score;
};

function Game () {
  this.cars = {
    65: new Car(player1carImage, "A"),
    76: new Car(player2carImage, "L")
  };
};

Game.prototype.declareWinner = function () {
    if (this.cars[65].score > this.cars[76].score) {
      console.log("Player One, YOU WON!");
      $("#winner-declaration").text("Player One, YOU WON!");
    }
    else if (this.cars[65].score < this.cars[76].score) {
      console.log("Player Two, YOU WON!");
      $("#winner-declaration").text("Player Two, YOU WON!");
    }
    else {
      console.log("It was a tie!");
      $("winner-declaration").text("It was a tie!");
    }
    this.cars[65].setScore(0);
    this.cars[76].setScore(0);
};
