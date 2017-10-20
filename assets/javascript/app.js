var currentQuestion = 0;
var timer;
var timerUpdate;
var secondsRemaining = 15;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions = 0;
var currentImage = 0;


var questions = [{
	question: "Pixar was originally started as a division of Lucasfilm in what year?",
	choices: ["1979", "1985", "1995", "1981"],
	correctAnswer: 0,
	image: "assets/images/tumblr_n50pefGJra1qeyjvxo2_500.gif",
	answer: "1979"
}, {
	question: "What is the name of Pixar's first animated short?",
	choices: ["Presto", "The Adventures of André and Wally B", "The Birds", "Piper"],
	correctAnswer: 1,
	image: "assets/images/tumblr_lowvfjfDSs1qlv01zo1_250.gif",
	answer: "The Adventures of André and Wally B"
}, {
	question: "What is the name of Pixar's iconic lamp mascot?",
	choices: ["Lampy", "Shady", "Luxo", "Pixie"],
	correctAnswer: 2,
	image: "assets/images/635958442835256599461256433_Pixar Logo.gif",
	answer: "Luxo"
}, {
	question: "What well-known director co-wrote the script for Toy Story?",
	choices: ["Ron Howard", "Joss Whedon", "George Lucas", "J.J.Abrams"],
	correctAnswer: 1,
	image: "assets/images/tumblr_mtn2fuCao21r748g4o1_500.gif",
	answer: "Joss Whedon"
}, {
	question: "Rejected titles for Toy Story included...?",
	choices: ["Toys will be toys", "Toys of Summer", "Toys R Us", "Toyz in the Hood"],
	correctAnswer: 3,
	image: "assets/images/giphy.webp",
	answer: "Toyz in the Hood"
}, {
	question: "What actor has provided his voice talents in every Pixar film?",
	choices: ["John Ratzenberger", "Ed Asner", "Tom Hanks", "Owen Wilson"],
	correctAnswer: 0,
	image: "assets/images/giphy%20(1).webp",
	answer: "John Ratzenberger"
}, {
	question: "Pixar creatives came up with concepts for many of their films at what diner?",
	choices: ["Lou's Cafe", "Hidden City Cafe", "Dottie's True Blue Cafe", "Hollywood cafe"],
	correctAnswer: 1,
	image: "assets/images/tumblr_l7uyj2FsUa1qc80f7o1_500.gif",
	answer: "Hidden City Cafe"
}, {
	question: "A113 has been referenced in several animated Disney films and TV shows including?",
	choices: ["Snow White", "That 70s Show", "The Simpsons", "Mulan"],
	correctAnswer: 2,
	image: "assets/images/1305220136_homer-simpson-belly-pizza-eating.gif",
	answer: "The Simpsons"
}, {
	question: "For marketing purposes, Pixar created a fake early '80s commercial for what charater?",
	choices: ["Buzz Lightyear", "Woody", "Lots-o'-Huggin' Bear", "Stinky Pete"],
	correctAnswer: 2,
	image: "assets/images/tumblr_ll56yjRueX1qi4ns0o1_500.gif",
	answer: "Lots-o'-Huggin' Bear"
}, {
	question: "There is a mind-blowing theory that all Pixar films exist in the same 'what'?",
	choices: ["Universe", "City", "State", "Country"],
	correctAnswer: 0,
	image: "assets/tumblr_ncj1dc1Lsm1tm0eroo10_250.gif",
	answer: "Universe"
}, {
	question: "Andy from Toy Story has a postcard from 'whom' hanging on his pin board?",
	choices: ["Lightning & Mater", "Nemo & Marlin", "Carl & Ellie from Up", "Joy & Sadness from Inside Out"],
	correctAnswer: 2,
	image: "assets/images/tumblr_mge1c1DyRi1s2y5pqo1_500.gif",
	answer: "Carl & Ellie from Up"
},{
	question: "Cars is Pixar's most profitable film in merchandise sales at....?",
	choices: ["10 Million", "10 Billion", "100 Million", "500 Million"],
	correctAnswer: 1,
	image: "assets/images/Pixar-Cars.gif",
	answer: "10 Billion"
},{
	question: "What is the title of Pixar's upcoming movie?",
	choices: ["Coco", "Lava", "Incredibles 2", "Wall-e"],
	correctAnswer: 0,
	image: "assets/images/anigif_sub-buzz-7041-1496880036-2.gif",
	answer: "Coco"
}];

var StartGame = $('<button type="button" class="btn btn-primary btn-lg start-game">Start Game</button>')

$(".game").append(StartGame);

//function in question 
function displayQuestion (index) {
	clearTimeout(timer);
	$(".game").empty();
	if(currentQuestion > 12) {
		displayEndOfGame();
		return;
	}
	var questionHeader = $('<h2 class="questonTitle">'+ questions[index].question +'</h2>');
	$(".game").append(questionHeader);
	for (var i = 0; i < questions[index].choices.length; i++) {
		//create onclick event for each answer
		var choiceButton = $('<button type="button" class="btn btn-primary btn-lg btn-color choice" id="choice'+i+'" >'+questions[index].choices[i]+'</button>');
		$(".game").append(choiceButton);
	}
	 //15 second timer running
	timer = setTimeout(function(){ displayAnswer(currentQuestion); }, 15000);
	function getTimeLeft() {
		secondsRemaining = secondsRemaining - 1;
    	$("#timeoutElement").html("You have " + secondsRemaining + " seconds remaining")
	}
	var timeoutElement = $("<div id='timeoutElement'>You have 15 seconds remaining</div>");
	secondsRemaining = 15;
	$(".game").append(timeoutElement);
	timerUpdate = setInterval(function() {getTimeLeft(); }, 1000);

}

function displayAnswer (index,button) {
	clearTimeout(timer);
	clearInterval(timerUpdate);
	$(".game").empty();
	var answerHeader = $('<h1></h1>');
		//if/else for each question
		if ($(button).attr("id") === "choice" + questions[index].correctAnswer) {
			answerHeader.html("Correct");
			correctAnswers++;
		}
		else if (button == null){
			answerHeader.html("Time's Up");
			unansweredQuestions++;
		}
		else {
			answerHeader.html("Incorrect");
			incorrectAnswers++;
		}
	$(".game").append(answerHeader);
	//displays answer
	answerAnswer = $('<div id="answers">' + questions[index].answer + '</div>');
	$(".game").append(answerAnswer);
	//displays picture
	var answerImage = $('<img class="images" src="'+ questions[index].image +'">'); 
	$(".game").append(answerImage);
	//advances to next question after 5 seconds
	currentQuestion = currentQuestion + 1;
	timer = setTimeout(function(){ displayQuestion(currentQuestion); }, 5000);
}

$(document).on('click', ".choice" , function() {
	displayAnswer(currentQuestion,this);

});

//onclick event for start button is created
$(".start-game").click(function() {
	//questions come up at a time
	displayQuestion(currentQuestion);
})

//display total correct, incorrect and unanswered questions when game over
function displayEndOfGame() {
	clearTimeout(timer);
	clearInterval(timerUpdate);
	$(".game").empty();
	// total correct questions
	var correctQuestions = $('<div>')
		.attr('id', 'correctAnswers')
		.append('Correct Answers: ')
		.append(correctAnswers);
		$(".game").append(correctQuestions);
	// total incorrect questions
	incorrectQuestions = $('<div>')
		.attr('id', 'incorrectAnswers')
		.append('Incorrect Answers: ')
		.append(incorrectAnswers);
		$(".game").append(incorrectQuestions);
	// total unanswered questions
	unansweredAnswers = $('<div>')
		.attr('id', 'unansweredQuestions')
		.append('Unanswered Questions: ')
		.append(unansweredQuestions);
		$(".game").append(unansweredAnswers);
	//create onclick event to start over at question 1
	startAgain = $('<button>')
		.attr('type', 'button')
		.addClass('btn btn-primary btn-lg start-again')
		.append('Play Again')
		.click(function() {
			currentQuestion = 0;
			displayQuestion(currentQuestion);
		});
		$(".game").append(startAgain);
}