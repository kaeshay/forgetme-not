let sun;
let clouds = [];
let hands = [];
let signs = [];
let worms = [];
let SCENE_W = 1500;
let SCENE_H = 2400;
let listener;
let arrow;
let grass;

function preload() {
	sun = new Sun();
	for (var i = 0; i < 7; i++) {
		if (i<2){
		clouds[i] = new Cloud("cloud1", 397,256,4);
		}
		if (i<4 && i>=2){
		clouds[i] = new Cloud("cloud2",236,150,4);
		}
		if (i<7 && i>=4){
		clouds[i] = new Cloud("cloud3", 225,120,4);
		}
	}
	for (var j = 0; j < 12; j++) {
		hands[j] = new Hand("hand0", 123,220.5,23);//2
	}
		// hands[0] = new Hand("hand0", 246,439,23);
		// hands[1] = new Hand("hand1", 100,203.5,48);
		// hands[2] = new Hand("hand2",243.6,223.6,39);//1.4
		// hands[3] = new Hand("hand3",357,392.6,38);
		// hands[4] = new Hand("hand4",139,191.2,39);
		// hands[5] = new Hand("hand5",255,446,40);
		// hands[6] = new Hand("hand6",245,375,40);
		// hands[7] = new Hand("hand7",305,349,15);
		// hands[8] = new Hand("hand8",307,405,23);
		// hands[9] = new Hand("hand9",338,449,29);
		// hands[10] = new Hand("hand10",216,382,20);
		// hands[11] = new Hand("hand11",231,343,30);
	for (var k = 0; k < 10; k++) {
		signs[k] = new Sign();
	}
	for (var l = 0; l < 10; l++) {
		worms[l] = new Worm();
	}
}

function setup() {
	frameRate(45);
	createCanvas(windowWidth, windowHeight);
	sun.load(500, height / 6);
	arrow = loadImage('/assets/arrow.png');
	// grass = createImg("assets/grass.gif");
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
	image(arrow, width/2-25, height*2-105, 50, 70); // for now

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
		//grass locks
		// grass.position(0, height/2);
		//CLOUDS SUN and WORMS tracking hand movement
		sun.update(camera.mouseX, width);
		for (let i = 0; i < clouds.length; i++){
			clouds[i].update(camera.mouseX, width);
			clouds[i].stopAnimation();
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
		// for (var j = 0; j < hands.length; j++) {
		// 	hands[j].stopAnimation();
		// }
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