var numberRight;
var numberWrong;
var currentQuestion;
var timer;
var timeToGuess;
var library;

var questionLength = 10;
var answerLength = 3;
var gameLength;

function initGame(){
	$("#qText").html('When you play Star Wars Trivia, you win or you lose. A lot of these questions are kind of hard, and you only have 10 seconds to answer. Good luck! <em>May The Force Be With You!</em>.<button id="startGame">Begin Game</button>');
	$("#result").hide();
	$("#choices").hide();
	$("#choices li").empty();
	$(".scoreboard").empty();
	$("#choices .answer").off().on("click", makeGuess);
	$("#startGame").off().on("click", newQuestion);

	numberWrong = 0;
	numberRight = 0;
	library = questionsLibrary.slice();
	timeToGuess = questionLength;
	gameLength = library.length;
}
function newQuestion(){
	if(numberRight + numberWrong >= gameLength){
		gameOver();
	} else {
		var questionNumber = Math.floor(Math.random() * library.length);
		currentQuestion = library[questionNumber];
		library.splice(questionNumber, 1);
		resetTimer();
		$("#result").empty().hide();
		$("#qText").html(currentQuestion.question);
		$("#choices").show().find(".answer").each(function(i){
			$(this).html(currentQuestion.answers[i]);
		});
		$("body").css("background-image", "url('"+currentQuestion.image+"')");

    timer = setInterval(showTimer, 1000);
	}
}
function makeGuess(){
	if ($(this).data("choice") == currentQuestion.correctAnswer){
		numberRight++;
		showResult("Correct!", "correctResult");
	} else {
		numberWrong++;
		showResult("Wrong. The correct answer was " + currentQuestion.answers[currentQuestion.correctAnswer], "wrongResult");
	}
}
function showResult(msg, addThisClass){
	resetTimer();
	$("#result")
		.html(msg)
		.show()
		.removeClass()
		.addClass(addThisClass);
	setTimeout(newQuestion, answerLength * 1000);
	$("#score").html("Correct: " + numberRight + " <br> Incorrect: " + numberWrong);

}
function showTimer(){
	if (timeToGuess >= 0){
		$("#timer").html(timeToGuess + " seconds left");
		timeToGuess--;
	} else {
		timesUp();
	}
}
function timesUp(){
	numberWrong++;
	resetTimer();
	showResult("Time is Up! The correct answer was " + currentQuestion.answers[currentQuestion.correctAnswer], "timesUp");
}
function resetTimer(){
	clearInterval(timer);
	timeToGuess = questionLength;
	$("#timer").empty();
}
function gameOver(){
	$("body").css("background-image", 'url("assets/images/init-BG.jpg")');
	var score = (numberRight/gameLength);
	var praise = "That was horrible.";
	if (score > .9){
		praise = "Congratulations! You achieved Jedi Master Level.";
	} else if (score > .8){
		praise = "Excellent Job! You achieved Jedi Knight Level.";
	} else if (score > .7){
		praise = "Awesome Job! You achieved The Force is in you Level.";
	} else if (score > .6){
		praise = "Well done! You achieved Jedi Apprentice Level.";
	} else if (score > .5){
		praise = "Great Job! You achieved Jedi Novice Level.";
	} else if (score > .4){
		praise = "Keep it up, You can achieve the rank of a Jedi Student, keep trying.";
	}
	$("#result").removeClass().html("<h1>Game Over</h1><div class='gameOverText'>You got " + numberRight + " questions right and " + numberWrong + " wrong. " + praise + "</div><button id='newGame'>Play Again</button>");
	$("#newGame").on("click", initGame);
}
$(document).ready(initGame);
