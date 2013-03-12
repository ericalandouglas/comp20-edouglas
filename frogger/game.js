// Eric Douglas
// Comp20 Assignment 2
// game.js


//declare game constants

var level;
var lives;
//time is in seconds
var time;
var vehicle_speed;
var log_speed;
var score;
var highscore;
var car_yspawns = [];
var cars = [];
var logs = [];
var car_timer;
var log_timer;
var log_yspawns = [];
var timer_width;
var frogs_home;

//make frogger object
var frogger = {
	
	xpos : 0,
	ypos : 0,
	orientation : "up",
	cooldown : 0,
	ymax: 492,
	width : 30,
	height : 30,
	xcent : 0,
	ycent : 0,
	onlog : false

};

var imgLoaded = false;
var img = new Image();
img.src = 'assets/frogger_sprites.png';
img.onload = function(){
  imgLoaded = true;
}
var canvas;
var ctx;

var game = { };

game.over = function () {
	if (score > highscore) {
		localStorage['highscore'] = score;
	}

}

game.initialize = function() {

	//initialize game constants
	level = 1;
	lives = 3;
	//time is in seconds
	time = 3000;
	vehicle_speed = 3;
	car_timer = 100;
	log_timer = 50;
	log_speed = 1;
	score = 0;
	
	if (localStorage['highscore'] == undefined) {
		localStorage['highscore'] = 0;
	}
	highscore = localStorage['highscore'];
	
	frogger.xpos = 180;
	frogger.ypos = 492;
	frogger.xcent = frogger.xpos + frogger.width/2;
	frogger.ycent = frogger.ypos + frogger.height/2;
	
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
	
	timer_width = (3/5)*399;
	frogs_home = 0;

	
};


game.draw = function () 
{

	canvas = document.getElementById('game');
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		//2d rendering
		 // clear the screencontext.save();
		ctx.save(); 
		ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha=1;
        //Timer
        ctx.fillStyle = "#00FF00";
        ctx.fillRect (399/2, 290, 3*399/5, 20);
        
        //Water
		ctx.fillStyle = "#191970";
        ctx.fillRect (0, 0, 399, 565/2);
        
        //Road
        ctx.fillStyle = "#000000";
        ctx.fillRect (0, 565/2, 399, 565/2);
        
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
    	
    	//Timer
    	if (time > 500) {
    		ctx.fillStyle = "#00FF00";
        	ctx.fillRect (timer_width, 545, timer_width, 20);
    	}
    	else {
        	ctx.fillStyle = "#FF0000";
        	ctx.fillRect (timer_width, 545, timer_width, 20);
        }
        //Timer text
        ctx.fillStyle = "#00FF00";
    	ctx.font = "10pt Helvetica";
    	ctx.fillText("Time: " + Math.floor(time/50), 345, 540);

    	
        //Sprite sheet
  		if (imgLoaded) {
			if (lives > 1) {
    			//frog life 1
    			ctx.drawImage(img,10,332,23,25,0,527,18,19);
    		}
    		if (lives > 2) {
    			//frog life 2
    			ctx.drawImage(img,10,332,23,25,17,527,18,19);
    		}
    		//Title
    		ctx.drawImage(img,0,0,335,50,0,0,335,50);
    		//End platform
    		ctx.drawImage(img,0,53,399,62,0,48,399,62);
    		//Intermediate platform
    		ctx.drawImage(img,0,113,399,45,0,275,399,45);
    		//Start platform
    		ctx.drawImage(img,0,113,399,45,0,485,399,45);
			//Cars
    		for (var m in cars) {
    			ctx.drawImage(img,45,262,33,28,cars[m].xpos,cars[m].ypos,35,35);
    		}
    		//Logs
    		for (var m in logs) {
    			ctx.drawImage(img,0,160,190,30,logs[m].xpos,logs[m].ypos,190,35);
    		}
    		//Frogger
    		ctx.drawImage(img,10,366,23,25,frogger.xpos,frogger.ypos,30,32);

  		}
  		ctx.restore();    
	
	}
	
	else {
		alert('Sorry, canvas is not supported on your browser!');
	}

};


game.input = function () {

	$(document).keydown(function (e) {
		console.log("pressed");
		//frogger.cooldown -= 1;
  		var keyCode = e.keyCode || e.which,
      	arrow = {left: 37, up: 38, right: 39, down: 40 };
  		switch (keyCode) {
   			case arrow.left:
   			if ((frogger.xpos - 29 > -10) && (frogger.cooldown < 0)) {
      			frogger.xpos -= 29;
      			frogger.cooldown = 5;
      			frogger.orientation = "left";
      			frogger.xcent = frogger.xpos + frogger.width/2;
      		}
    		break;
    		case arrow.up:
      		if ((frogger.ypos - 35 > 10) && (frogger.cooldown < 0)) {
      			frogger.ypos -= 35;
      			frogger.cooldown = 5;
      			frogger.orientation = "up";
      			frogger.ycent = frogger.ypos + frogger.height/2;
      			if (frogger.ypos < frogger.ymax) {
      				score += 10;
      				frogger.ymax = frogger.ypos;
      			}
      		}
    		break;
    		case arrow.right:
     		if ((frogger.xpos + 29 < 375) && (frogger.cooldown < 0)) {
      			frogger.xpos += 29;
      			frogger.cooldown = 5;
      			frogger.orientation = "right";
      			frogger.xcent = frogger.xpos + frogger.width/2;
      		}
    		break;
    		case arrow.down:
      		if ((frogger.ypos + 35 < 500) && (frogger.cooldown < 0)) {
      			frogger.ypos += 35;
      			frogger.cooldown = 5;
      			frogger.orientation = "down";
      			frogger.ycent = frogger.ypos + frogger.height/2;
      		}
    		break;
  		}
	});

};

function collide(x1, y1, size1, x2, y2, size2) {
  var bottom1, bottom2, left1, left2, right1, right2, top1, top2;
  left1 = x1 - size1;
  right1 = x1 + size1;
  top1 = y1 - size1;
  bottom1 = y1 + size1;
  left2 = x2 - size2;
  right2 = x2 + size2;
  top2 = y2 - size2;
  bottom2 = y2 + size2;
  return !(left1 > right2 || left2 > right1 || top1 > bottom2 || top2 > bottom1);
};

function rect_collide(x1, y1, xsize1, ysize1, x2, y2, xsize2, ysize2) {
  var bottom1, bottom2, left1, left2, right1, right2, top1, top2;
  left1 = x1 - xsize1;
  right1 = x1 + xsize1;
  top1 = y1 - ysize1;
  bottom1 = y1 + ysize1;
  left2 = x2 - xsize2;
  right2 = x2 + xsize2;
  top2 = y2 - ysize2;
  bottom2 = y2 + ysize2;
  return !(left1 > right2 || left2 > right1 || top1 > bottom2 || top2 > bottom1);
};

function create_car() {
	var randomnumber = Math.floor(Math.random()*5);
	var car = new Object();
	car.speed = vehicle_speed;
	car.xpos = -100;
	car.ypos = car_yspawns[randomnumber];
	car.width = 30;
	car.height = 30;
	car.xcenter = car.xpos + car.width/2;
	car.ycenter = car.ypos + car.height/2;
	car.colliding = collide;
	return car;
}

function create_log() {
	var randomnumber = Math.floor(Math.random()*5);
	var log = new Object();
	log.speed = log_speed;
	log.xpos = -200;
	log.ypos = log_yspawns[randomnumber];
	log.width = 190;
	log.height = 35;
	log.xcenter = log.xpos + log.width/2;
	log.ycenter = log.ypos + log.height/2;
	log.colliding = rect_collide;
	log.hasfrogger = false;
	return log;
}

function respawn_frog() {
	frogger.xpos = 180;
	frogger.ypos = 492;
	frogger.xcent = frogger.xpos + frogger.width/2;
	frogger.ycent = frogger.ypos + frogger.height/2;
	lives-=1;
	time = 3000;
	timer_width = (3/5)*399;
}

function update_cars() {

	for (var m in cars) {
		cars[m].xpos += cars[m].speed;
		cars[m].xcenter = cars[m].xpos + cars[m].width/2;
		if (cars[m].colliding(cars[m].xcenter, cars[m].ycenter, cars[m].width/2, frogger.xcent, frogger.ycent, frogger.width/2)) {
			respawn_frog();
			console.log("car collision");
		}
		if (cars[m].xpos > 500) {
			cars.splice(m, 1);
		}
	}

}

function update_logs() {

	for (var m in logs) {
		logs[m].xpos += logs[m].speed;
		logs[m].xcenter = logs[m].xpos + logs[m].width/2;
		if (logs[m].colliding(logs[m].xcenter, logs[m].ycenter, logs[m].width/2, logs[m].height/2, frogger.xcent, frogger.ycent,
							  frogger.width/2, frogger.height/2)) {
			logs[m].hasfrogger = true;
			console.log("log collision");
		}
		else {
			logs[m].hasfrogger = false;
		}
		if (logs[m].xpos > 600) {
			logs.splice(m, 1);
		}
	}
	var on_log = false;
	for (var m in logs) {
		if (logs[m].hasfrogger) {
			on_log = true;
		}
	}
	if (on_log) {
		frogger.onlog = true;
	}
	else {
		frogger.onlog = false;
	}

}



game.update = function() {
	time -= 1;
	frogger.cooldown -= 1;
	car_timer -= 1;
	log_timer -= 1;
	if (time%25 == 0){
		timer_width += 1;
	}
	
	if (car_timer < 0) {
		var vehicle = create_car();
		cars.push(vehicle);
		car_timer = 100;
	}
	
	if (log_timer < 0) {
		var newlog = create_log();
		logs.push(newlog);
		log_timer = 100;
	}
	//console.log(frogger.onlog);
	update_cars();
	update_logs();
	
	
	
	if (frogger.ypos < 250 && !frogger.onlog) {
		respawn_frog();
	}
	if (time < 0) {
		respawn_frog();
	}
	
	/*switch(frogger.orientation)
		case "up":
			frogger.image = */
};

game.fps = 50;

game.run = (function() {
  var loops = 0, skipTicks = 1000 / game.fps,
      maxFrameSkip = 10,
      nextGameTick = (new Date).getTime();
  
  return function (){
    loops = 0;
    
    while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
      game.input();
      game.update();
      nextGameTick += skipTicks;
      loops++;
    }
    
    game.draw();
  };
})();


function start_Game() {
			game.initialize();
            game._intervalID = setInterval(game.run, 0);
}