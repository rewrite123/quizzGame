/* This is the stuff that we need for the timer at the top to show. */
const canvas = document.getElementById("canvas");
const g = canvas.getContext("2d");

/* The array is going to hold all of our Q objects, and currentQuestion is the index that we are on for each Q in questions. */
var questions = [];
var currentQuestion = 0;

/* This is the object that represents each question. This allows me to easily customize each question time, question and answer from one simple place. */
var Q = function(){
	
	this.loadedTime = -1;
	
	this.currentTime = 0;
	
	this.intervalId;
	
	this.time = 7000;
	this.question = arguments[0] || "Example question";
	this.answers = arguments[1] || ["Example answer 0", "Example answer 1", "Example answer 2", "Example answer 3"];
	
	this.answer = -1;
	
	/* This is what we call when we want to setup the question for answering. */
	this.setup = function(){
		enableChoices();
		document.getElementById("b0").style.fontWeight = "normal";
		document.getElementById("b1").style.fontWeight = "normal";
		document.getElementById("b2").style.fontWeight = "normal";
		document.getElementById("b3").style.fontWeight = "normal";
		
		document.getElementById("question").textContent = this.question;
		document.getElementById("b0").textContent = this.answers[0];
		document.getElementById("b1").textContent = this.answers[1];
		document.getElementById("b2").textContent = this.answers[2];
		document.getElementById("b3").textContent = this.answers[3];
		this.loadedTime = (new Date()).getTime();
		this.timeDown();
	}
	
	/* This is for the loop that we use to dislplay the time on the canvas. */
	this.timeDown = function(){
		
		var temp = this;
		
		this.intervalId = setInterval(function(){
			if( ((new Date()).getTime() - temp.loadedTime) < temp.time ){
				temp.renderTimer();
			}else{
				g.fillStyle = "rgb(51, 51, 51)";
				g.fillRect(0,0,canvas.width, canvas.height);
				clearInterval(temp.intervalId);
				disableChoices();
			}
		}, 20);
		
	}
	
	/* This is the function that actually takes care of the rendering of the canvas. */
	this.renderTimer = function(){
		canvas.width = window.innerWidth;
		canvas.height = 10;
		
		g.fillStyle = "rgb(51, 51, 51)";
		g.fillRect(0,0,canvas.width, canvas.height);
		
		g.fillStyle = "rgb(0, 160, 240)";
		g.fillRect( canvas.width*(((new Date()).getTime()-this.loadedTime)/this.time)/2, 0, canvas.width*((this.time-((new Date()).getTime()-this.loadedTime))/this.time), 10 );
	}
	
}

/*
This records the answer from the button we clicked, and sets the buttons we didnt click to normal font-weight.
It also sets the font-weight of the button we clicked to bold.
*/
function answer(ans){
	document.getElementById("b0").style.fontWeight = "normal";
	document.getElementById("b1").style.fontWeight = "normal";
	document.getElementById("b2").style.fontWeight = "normal";
	document.getElementById("b3").style.fontWeight = "normal";
	
	document.getElementById( ("b"+ans) ).style.fontWeight = "bold";
	questions[currentQuestion].answer = ans;
}

/* 
This sets up the next question. If there are no more questions to be answered in the array questions,
then we run results().
*/
function nextQuestion(){
	clearInterval(questions[currentQuestion].intervalId);
	currentQuestion++;
	if(currentQuestion < questions.length){
		questions[currentQuestion].setup();
	}else{
		results();
	}
}

/* This is responsible for making the proper elements visible, while also resetting the questions. */
function startQuiz(){
	resetQuestions();
	
	var questionContainer = document.getElementById("questionContainer");
	questionContainer.style.display = "block";
	var timerContainer = document.getElementById("timerContainer");
	timerContainer.style.display = "block";
	var resultsContainer = document.getElementById("resultsContainer");
	resultsContainer.style.display = "none";
	currentQuestion=0;
	questions[currentQuestion].setup();
	
}

/*
This displays the results of the quiz after we have finished it.
This also is in charge of hiding and showing the proper elements.
*/
function results(){
	document.getElementById("startQuizButton").textContent = "Retake Quize";;
	var questionContainer = document.getElementById("questionContainer");
	questionContainer.style.display = "none";
	var timerContainer = document.getElementById("timerContainer");
	timerContainer.style.display = "none";
	var resultsContainer = document.getElementById("resultsContainer");
	resultsContainer.style.display = "block";
	
	var img = document.getElementById("imageAnswer");
	var ans = document.getElementById("textAnswer");
	
	var choice1 = 0;
	var choice2 = 0;
	var choice3 = 0;
	var choice4 = 0;
	for(let i in questions){
		switch(questions[i].answer){
			case 0:{
				choice1++;
				break;
			}
			case 1:{
				choice2++;
				break;
			}
			case 2:{
				choice3++;
				break;
			}
			case 3:{
				choice4++;
				break;
			}
			default:{
				console.log("Well, I guess you were too dumb to answer that particular question. " + i);
				break;
			}
		}
	}
	
	/* 
	Now, I know that I should also look to see what values are equal, but hear me out on this one.
	That is a lot more if statements or switches than I want.
	So we should try to organize questions so that answer 1, is often times related to answer 0.
	And so that answer 3, is often times related to answer 2.
	And so that answer 0, is not related to any other answers.
	That way this technically isn't the wrong way to set up these choices.
	*/
	if(choice1 == 0 && choice2 == 0 && choice3 == 0 && choice4 == 0){
		console.log("None");
		ans.textContent = "You seem to be indecisive... Like Prince Charming!";
		img.src = "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.cornel1801.com%2Fanimated%2FShrek-2-2004%2Fcharacters%2FPrince-Charming.jpg&f=1";
	}else if(choice1 >= choice2 && choice1 >= choice3 && choice1 >= choice4){
		console.log("0");
		ans.textContent = "You are Mulan!";
		img.src = "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ffanart.tv%2Ffanart%2Fmovies%2F10674%2Fmovieposter%2Fmulan-598495111d425.jpg&f=1";
	}else if(choice2 >= choice1 && choice2 >= choice3 && choice2 >= choice4){
		console.log("1");
		ans.textContent = "You are Belle!";
		img.src = "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.cartoonbucket.com%2Fwp-content%2Fuploads%2F2017%2F04%2FPic-Of-Princess-Belle.jpg&f=1";
	}else if(choice3 >= choice2 && choice3 >= choice1 && choice1 >= choice4){
		console.log("2");
		ans.textContent = "You are Sleeping Beauty!";
		img.src = "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fimages2.fanpop.com%2Fimages%2Fphotos%2F6200000%2FSleeping-Beauty-Wallpaper-sleeping-beauty-6259616-1024-768.jpg&f=1";
	}else if(choice4 >= choice2 && choice4 >= choice3 && choice4 >= choice1){
		console.log("3");
		ans.textContent = "You are that ice girl from Frozen!";
		img.src = "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-nb-8MDTv5j8%2FVC7ZLtJ_kEI%2FAAAAAAAD8OQ%2FJuGfTOnCxk0%2Fs1600%2FFrozen-pretty-clipart-028.png&f=1";
	}else{
		console.log("None");
		ans.textContent = "You seem to be indecisive... Like Prince Charming!";
		img.src = "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.cornel1801.com%2Fanimated%2FShrek-2-2004%2Fcharacters%2FPrince-Charming.jpg&f=1";
	}
	
}

/* This just makes disabling the buttons easier. */
function disableChoices(){
	document.getElementById("b0").disabled = true;
	document.getElementById("b1").disabled = true;
	document.getElementById("b2").disabled = true;
	document.getElementById("b3").disabled = true;
}
/* This just makes enabling the buttons easier. */
function enableChoices(){
	document.getElementById("b0").disabled = false;
	document.getElementById("b1").disabled = false;
	document.getElementById("b2").disabled = false;
	document.getElementById("b3").disabled = false;
}

/* This is the function that actualy sets questions to the Qs that we acually want. */
function resetQuestions(){
	quuestions = [];
	questions.push( new Q("What is your favorite color?", ["red", "green", "no blue!", "fuscia"]) );
	questions.push( new Q("What food do you like best?", ["pizza", "eggrolls", "ice", "tea"]) );
	questions.push( new Q("What is your favorite thing to do?", ["eat", "sleep", "read", "watch TV"]) );
	questions.push( new Q("How many parsecs does it take to do the kessel run?", ["12", "1300", "at least 1", "idc I make clickbate for a living..."]) );
	questions.push( new Q("What is your name?", ["Arthur, King of the Brittains!", "yes", "Orange", "Wouldn't you like to know."]) );
	questions.push( new Q("And what is your quest?", ["To seek the holy grail!", "To finish this quiz", "To make clickbate", "It's one of life's great mysteries, isn't it? Why are we here? I mean, are we the product of some... cosmic coincidence? Or is there really a God, watching everything, you know, with a plan for us and stuff. I don't know man, but it keeps me up at night."]) );
	questions.push( new Q("What is the average wingspan of a swallow?", ["What do you mean? African or European swallow?", "9", "1200 leagues", "At least one"]) );
	questions.push( new Q("What is the answer to life, the universe, and everything?", ["42", "Hedonism", "Nihilism", "Suffering"]) );
	questions.push( new Q("What is in my pocket?", ["The One Ring of Power", "Handses!?!?", "String!?!?", "Nothing!?!?"]) );
}