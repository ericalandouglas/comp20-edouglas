// Your work goes here...


//initialize game constants
level = 1;
lives = 3;
//time is in seconds
time = 60;
x_start = 180;
y_start = 490;
game_over = false;
vehicle_speed = 3;
log_speed = 2;

function start_game () 
{
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
    	ctx.fillText("Score: 0", 0, 560);
    	
    	//High-score title
        ctx.fillStyle = "#00FF00";
    	ctx.font = "12pt Helvetica";
    	ctx.fillText("Highscore: 0", 80, 560);
    	
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
    		ctx.drawImage(img,10,366,23,25,x_start,y_start,33,35);
    		//log
    		ctx.drawImage(img,0,160,190,30,100,200,190,35);
    		//car 1
    		ctx.drawImage(img,45,262,33,28,250,370,35,30);
    		//car 2
    		ctx.drawImage(img,102,299,53,28,120,410,56,30);
  		};
        img.src = 'assets/frogger_sprites.png';
        
        
	
	}
	
	else {
		alert('Sorry, canvas is not supported on your browser!');
	}

}