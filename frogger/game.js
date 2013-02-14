// Eric Douglas
// Comp20 Assignment 2
// game.js


//declare game constants

var level;
var lives;
//time is in seconds
var time;
var game_over;
var vehicle_speed;
var log_speed;
var score;
var highscore;
car_yspawns = new Array;
log_yspawns = new Array;

//make frogger object

frogger = {
	
	xpos : 0,
	ypos : 0,
	orientation : "up",

};


function start_Animation() {
			initialize_game();
            //delay = 40; // milliseconds
            //redraw_canvas();
            //setInterval(redraw_canvas, delay);
}

function initialize_game () {

	//initialize game constants
	level = 1;
	lives = 3;
	//time is in seconds
	time = 60;
	game_over = false;
	vehicle_speed = 3;
	log_speed = 2;
	score = 0;
	highscore = 0;
	
	frogger.xpos = 180;
	frogger.ypos = 490;
	
	car_yspawns[0] = 453;
	car_yspawns[1] = 422;
	car_yspawns[2] = 385;
	car_yspawns[3] = 347;
	car_yspawns[4] = 317;
	
	log_yspawns[0] = 242;
	log_yspawns[1] = 209;
	log_yspawns[2] = 176;
	log_yspawns[3] = 142;
	log_yspawns[4] = 109;
	
	
	canvas = document.getElementById('game');
	
	if (canvas.getContext) {
	
		//2d rendering
		ctx = canvas.getContext('2d');
		
		//Water
		ctx.fillStyle = "#191970";
        ctx.fillRect (0, 0, 399, 565/2);
        
        //Road
        ctx.fillStyle = "#000000";
        ctx.fillRect (0, 565/2, 399, 565/2);
        
        //Timer
        //ctx.fillStyle = "#00FF00";
        //ctx.fillRect (3*399/5, 545, 3*399/5, 20);
        
        //Level title
        ctx.fillStyle = "#00FF00";
    	ctx.font = "16pt Helvetica";
    	ctx.fillText("Level " + level, 50, 545);
    	
    	//Score title
        ctx.fillStyle = "#00FF00";
    	ctx.font = "12pt Helvetica";
    	ctx.fillText("Score: " + score, 0, 560);
    	
    	//High-score title
        ctx.fillStyle = "#00FF00";
    	ctx.font = "12pt Helvetica";
    	ctx.fillText("Highscore: " + highscore, 80, 560);
    	
        //Sprite sheet
        img = new Image();
  		img.onload = function(){
  		
  			//Title
    		ctx.drawImage(img,0,0,399,53,0,0,399,53);
    		//End platform
    		ctx.drawImage(img,0,53,399,62,0,53,399,62);
    		//Intermediate platform
    		ctx.drawImage(img,0,113,399,45,0,275,399,45);
    		//Start platform
    		ctx.drawImage(img,0,113,399,45,0,485,399,45);
    		//frog life 1
    		ctx.drawImage(img,10,332,23,25,0,527,18,19);
    		//frog life 2
    		ctx.drawImage(img,10,332,23,25,17,527,18,19);
    		//frog start
    		ctx.drawImage(img,10,366,23,25,frogger.xpos,frogger.ypos,30,32);
    		//log
    		ctx.drawImage(img,0,160,190,30,100,log_yspawns[1],190,35);
    		//car 1
    		ctx.drawImage(img,45,262,33,28,250,car_yspawns[2],35,35);
    		//car 2
    		ctx.drawImage(img,102,299,53,28,120,car_yspawns[1],56,35);

    	
  		};
        img.src = 'assets/frogger_sprites.png';      
	
	}
	
	else {
		alert('Sorry, canvas is not supported on your browser!');
	}


}

function redraw_canvas () 
{
	canvas = document.getElementById('game');
	ctx.clearRect(0, 0, 399, 565); // clear the screen
	
	if (canvas.getContext) {
	
		//2d rendering
		ctx = canvas.getContext('2d');
        
        //Timer
        //ctx.fillStyle = "#00FF00";
        //ctx.fillRect (3*399/5, 545, 3*399/5, 20);
        
        //Level title
        ctx.fillStyle = "#00FF00";
    	ctx.font = "16pt Helvetica";
    	ctx.fillText("Level " + level, 50, 545);
    	
    	//Score title
        ctx.fillStyle = "#00FF00";
    	ctx.font = "12pt Helvetica";
    	ctx.fillText("Score: " + score, 0, 560);
    	
    	//High-score title
        ctx.fillStyle = "#00FF00";
    	ctx.font = "12pt Helvetica";
    	ctx.fillText("Highscore: " + highscore, 80, 560);
    	
        //Sprite sheet
        img = new Image();
  		img.onload = function(){
			if (lives > 0) {
    			//frog life 1
    			ctx.drawImage(img,10,332,23,25,0,527,18,19);
    		}
    		if (lives > 1) {
    			//frog life 2
    			ctx.drawImage(img,10,332,23,25,17,527,18,19);
    		}
    		//frogger
    		ctx.drawImage(img,10,366,23,25,frogger.xpos,frogger.ypos,33,35);
    		//log
    		ctx.drawImage(img,0,160,190,30,100,log_yspawns[1],190,35);
    		//car 1
    		ctx.drawImage(img,45,262,33,28,250,car_yspawns[2],35,30);
    		//car 2
    		ctx.drawImage(img,102,299,53,28,120,car_yspawns[1],56,30);
  		};
        img.src = 'assets/frogger_sprites.png';
        
        
	
	}
	
	else {
		alert('Sorry, canvas is not supported on your browser!');
	}

}