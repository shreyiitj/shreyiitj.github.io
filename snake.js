const cvs = document.getElementById("snake");
const ctx = cvs.getContext('2d');
const box=32;


// load images
const ground = new Image();
ground.src = "images/ground.png";

const fruit = new Image(1,1);
fruit.src = "images/fruit.png";

// load audio
const dead = new Audio();
dead.src = "audio/dead.mp3";

const eat = new Audio();
eat.src = "audio/eat.mp3";

// create the snake
let snake = [];
snake[0] = {
	x: 9*box,
	y: 10*box
};

// create the food
food = {
	x: Math.floor(Math.random()*17+1)*box,
	y: Math.floor(Math.random()*17+1)*box
}

let score  = 0;

// control the snake
let d;
document.addEventListener("keydown", direction);
function direction(event){
	if(event.keyCode == 37 && d!="RIGHT"){
		d= "LEFT";
	}
	else if(event.keyCode == 38 && d!="DOWN"){
		d= "UP";
	}
	else if(event.keyCode == 39 && d!= "LEFT"){
		d= "RIGHT";
	}
	else if(event.keyCode == 40 && d!= "UP"){
		d= "DOWN";
	}
}

function collision(head, snake){
	for(var i=0; i< snake.length; i++){
		if(head.x == snake[i].x && head.y == snake[i].y){
			return true;
		}
	}
	return false;
}

function draw(){
	ctx.drawImage(ground, 0, 0);
	for(let i=0; i<snake.length; i++){
		ctx.fillStyle = (i==0)? "black":"white";
		ctx.fillRect(snake[i].x,snake[i].y,box,box);

		ctx.strokeStyle = "red";
		ctx.strokeRect(snake[i].x,snake[i].y,box,box);
	}

	ctx.drawImage(fruit, food.x, food.y);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	if (d == "LEFT") snakeX -= box ;
	if (d == "UP") snakeY -= box ;
	if (d == "RIGHT") snakeX += box ;
	if (d == "DOWN") snakeY += box ;

	// if snake eats the food
	if(snakeX == food.x && snakeY == food.y){
		score++;
		food = {
		x: Math.floor(Math.random()*17+1)*box,
		y: Math.floor(Math.random()*17+1)*box
		}
		eat.play();

	}
	else{
		
		snake.pop();
	}

	// game over
	let newHead = {
		x:snakeX,
		y:snakeY
	}
	if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)){
		clearInterval(game);
		dead.play();
	}


	

	snake.unshift(newHead);

	ctx.fillStyle = "white";
	ctx.font = "45px Changa one";
	ctx.fillText(score, 2*box, 1.6*box);
}

// call draw function every 100ms

let game = setInterval(draw, 100);





