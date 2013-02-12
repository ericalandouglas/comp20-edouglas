//mspacman.js

function load_pacman () 
{
	canvas = document.getElementById('canvas');
	
	if (canvas.getContext) {
	
		//2d rendering
		ctx = canvas.getContext('2d');
    	
        //Sprite sheet
        img = new Image();
  		img.onload = function(){
  			//Gameboard
    		ctx.drawImage(img,321,2,465,137,0,0,466,137);
  			//Ms. Pacman
    		ctx.drawImage(img,78,20,18,20,190,90,18,20);
    		//Ghost
    		ctx.drawImage(img,118,101,20,17,155,92,18,17);
  		};
        img.src = 'pacman10-hp-sprite.png';
        
        
	
	}
	
	else {
		alert('Sorry, canvas is not supported on your browser!');
	}

}