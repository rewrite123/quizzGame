const canvas = document.getElementById("canvas");
const g = canvas.getContext("2d");

var questions = [];
var currentQuestion = 0;

var Q = function(){
	
	this.loadedTime = -1;
	
	this.currentTime = 0;
	
	this.time = 7000;
	this.question = arguments[0] || "Example question";
	this.answers = arguments[1] || ["Example answer 0", "Example answer 1", "Example answer 2", "Example answer 3"];
	
	this.answer = null;
	
	this.setup = function(){
		document.getElementById("question").textContent = this.question;
		document.getElementById("b0").textContent = this.answers[0];
		document.getElementById("b1").textContent = this.answers[1];
		document.getElementById("b2").textContent = this.answers[2];
		document.getElementById("b3").textContent = this.answers[3];
		this.loadedTime = (new Date()).getTime();
		//console.log(this.loadedTime);
		this.timeDown();
	}
	
	this.timeDown = function(){
		
		var temp = this;
		
		var k = setInterval(function(){
			if( ((new Date()).getTime() - temp.loadedTime) < temp.time ){
				temp.renderTimer();
			}else{
				clearInterval(k);
				console.log("done");
			}
		}, 20);
		
	}
	
	this.renderTimer = function(){
		
		canvas.width = window.innerWidth;
		canvas.height = 10 + "px";
		
		g.fillStyle = "rgb(51, 51, 51)";
		g.fillRect(0,0,canvas.width, canvas.height);
		
		g.fillStyle = "rgb(0, 60, 240)";
		g.fillRect( (new Date()).getTime() - this.loadedTime, 0, ((new Date()).getTime() - this.loadedTime)*2, 10 );
	}
	
}

function answer(){
	questions[currentQuestion].answer = arguments[0] || null;
}

questions.push( new Q("What is your favorite color?", ["red", "green", "blue", "fuscia"]) );
