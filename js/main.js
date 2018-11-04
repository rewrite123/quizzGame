const canvas = document.getElementById("canvas");
const g = canvas.getContext("2d");

var elements = [];

var levels = [];
var level = 0;
var currentLevel;

function render(){
	for(let i in elements){
		
	}
}

function update(){
	for(let i in elements){
		
	}
}

var Level = function(){
	var args = Array.prototype.slice.call(arguments);
	
	this.name = args[0] || "levelName";
	this.elements = args[1] || [];
	
	this.exits = args[2] || [];
	
	this.update(){}
	
}

var gameLoop = setInterval(function(){
	update();
	render();
}, 31);
