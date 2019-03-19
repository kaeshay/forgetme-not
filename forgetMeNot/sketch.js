let sun;
let clouds = [];
let hands = [];
let signs = [];
let worms = [];
let SCENE_W = 1500;
let SCENE_H = 2400;
let listener;
let arrow;

function preload() {
	sun = new Sun();
	for (var i = 0; i < 7; i++) {
		clouds[i] = new Cloud();
	}
	for (var j = 0; j < 10; j++) {
		hands[j] = new Hand();
	}
	for (var k = 0; k < 10; k++) {
		signs[k] = new Sign();
	}
	for (var l = 0; l < 10; l++) {
		worms[l] = new Worm();
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	sun.load(500, height / 6);
	arrow = loadImage('/assets/ARROW.png');

	for (var i = 0; i < clouds.length; i++) {
		clouds[i].load(random(width), random(0, height));
	}
	for (var j = 0; j < hands.length; j++) {
		hands[j].load(j * 400, SCENE_H / 2);
	}
	for (var k = 0; k < signs.length; k++) {
		signs[k].load(k * 400 + 200, SCENE_H / 2 + 50);
	}
	for (var l = 0; l < worms.length; l++) {
		worms[l].load(random(0, SCENE_W), random(SCENE_H / 2 + 400, SCENE_H));
	}
	listener = createSprite(width / 2, height / 2, 100, 100);
	listener.background = 'red';
	//listener.visible = false;
}

function draw() {
	background(255);
	drawSprites();
	image(arrow, width/2-25, height-105, 50, 70); // for now

	if(mouseIsPressed){
		console.log("mouse clicked x " + mouseX + " y " + mouseY);
	}

 	for (var j = 0; j < hands.length; j++) {
		hands[j].update(camera.mouseX, camera.mouseY, listener);
	}

	camera.position.y = listener.position.y; 



	if (listener.position.y >= hands[0].sprite.position.y && listener.position.y <= hands[0].sprite.position.y + 30) {
		
		listener.velocity.x = (camera.mouseX - listener.position.x) / 100;

		//WHERE TO HANDLE HAND LOGIC

		listener.velocity.y = 0;
		//listener.velocity.x = 0;
		camera.position.x = listener.position.x;

		//CLOUDS SUN and WORMS tracking hand movement
		sun.update(camera.mouseX, width);
		for (let i = 0; i < clouds.length; i++){
			clouds[i].update(camera.mouseX, width);
		}
		for (let i = 0; i < worms.length; i++){
			worms[i].update(camera.mouseX, width);
		}

		
		if (mouseY >= height - 50) {
			console.log("MOVING TO WORMS");
			listener.velocity.y = 10;
		
		} else if(mouseY <= 50){
			console.log("MOVING TO SKY");
			listener.velocity.y = -10;
			
		}
		
	} else {
		listener.velocity.y = (camera.mouseY - listener.position.y) / 20;
		camera.zoom = 1;
	}

	//limit listener movements
	if (listener.position.x < 0)
		listener.position.x = 0;
	if (listener.position.y < height / 2)
		listener.position.y = height / 2;
	if (listener.position.x > SCENE_W)
		listener.position.x = SCENE_W;
	if (listener.position.y >= SCENE_H)
		listener.position.y = SCENE_H;

	
	camera.off();
}


// maybe switch all conditional logic to "mouseX" and "mouseY"