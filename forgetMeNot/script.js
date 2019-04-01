let sky, sun, grass, dirt, arrow, listener;
let clouds = [];
let hands = [];
let signs = []
let worms = [];
let SCENE_W = 6000;
let SCENE_H = 1900;
let handClicked = 0;

function preload() {
	sky = loadImage("./assets/sky.jpg")
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

	hands[0] = new Hand("hand5",128,224.9,40, '"Journal" for Me', "Liza Edwards-Levin", "Liza meets her dad as a college freshman. They both journal at the end of the night.", 548);
	hands[1] = new Hand("hand10",108,192.5,20, "Labyrinth", "Zachary Zuckerman", "Labyrinth is a piece that explores the difficulties and obstacles for Palestinians living in the Old City as well as East Jerusalem and Silwan. Activist Sharon Casper leads us on a walk through the occupied territory as we learn about the human rights abuses the Israeli government and settler colonial groups perpetrate on a daily basis. The sounds in the story were recorded in the old city by a friend named Issa.", 558);
	hands[2] = new Hand("hand4",139,191,39, "Under the Stars Together", "Clare Boyle", "A glitch on Tinder leads to true love.", 564);
	hands[3] = new Hand("hand3",179,198,38, "A Boo-Boo Bear Story", "Babette Thomas", "It started with some rustling in the bushes...", 550);
	hands[4] = new Hand("hand0", 123,220.5,23, "No Promises, No Demands", "Wen Zhuang", "The owner of beloved PVD eatery north and big king pens a love letter to the ocean state and tells of the self he found through cooking. ", 560);//2
	hands[5] = new Hand("hand1", 97,197.5,48, "Remembering Rufina", "Alex Hanesworth", "Rufina Amaya was the only survivor of the El Mozote Massacre. How do we remember her? ", 566);
	hands[6] = new Hand("hand8",153,202.8,23, "Claudia and the Shrimp", "Alina Kulman", "Why does anyone like anything?", 552);
	hands[7] = new Hand("hand11",115.5,172,30, "Where the Ocean Sounds Like Traffic", "Zachary Zuckerman", 'This piece is a remediation of the poem, "For Mary Kane" by former poet laureate of Rhode Island, Lisa Starr: As I lie here / listening / to the waves / yawn / into roars / I\'m sorry / that you / live in a place / where the ocean / sounds like traffic.', 568);
	hands[8] = new Hand("hand2",171,157.8,39, "Finding Zora", "Babette Thomas", "A meditation on Zora Neale Hurston's unforgettable voice and the ways she used it. ", 556);//1.4
	hands[9] = new Hand("hand6",123,189.5,40, "Trans, Hot, Mean", "Eleanor Meshnick", "Nico and Eleanor chat about themselves and complain about cis people.", 562);
	hands[10] = new Hand("hand9",169,225.2,29, "Epitaphs", "Lily Willis", "I went around and asked strangers what they wanted their epitaph to be. Here's what happened. ", 554);
	
		// for (var k = 0; k < 10; k++) {
	// 	signs[k] = new Sign();
	// }
	// for (var l = 0; l < 5; l++) {
		worms[0] = new Worm("worm0", 80, 40, 19);
		worms[1] = new Worm("worm1", 70, 73.5, 19);
		worms[2] = new Worm("worm2", 70, 59.5, 19);
		worms[3] = new Worm("worm3", 70, 50, 19);
		worms[4] = new Worm("worm4", 80, 60, 19);

	// }
	grass = new Grass();
}

function setup() {
	initPlayer();
	createCanvas(windowWidth, windowHeight);
	arrow = loadImage("./assets/arrow.png");
	dirt = loadImage("./assets/dirt.jpg");
	sun.load(500, height / 6);
	for (cloud of clouds) {
		cloud.load(random(width), random(0, height));
	}
	for (var j = 0; j < hands.length; j++) {
		hands[j].load(j * 550, SCENE_H / 2 +300);
	}
	// for (var k = 0; k < signs.length; k++) {
	// 	signs[k].load(k * 400 + 200, SCENE_H / 2 + 50);
	// }
	for (worm of worms) {
		worm.load(random(width), random(SCENE_H / 2 + 300, SCENE_H));
	}
	grass.load(width/2, SCENE_H/2+415);
	listener = createSprite(width / 2, height / 2, 100, 100);
	listener.visible = false;
}

function draw() {
	image(sky, listener.position.x-1000, -100);
	image(dirt, listener.position.x-1000, SCENE_H/2+600);
	drawSprites();
	// image(arrow, width/2-25, height-105, 50, 70); // for now
	// image(arrow, width/2-25, height*2-105, 50, 70); // for now 
	grass.sprite.position.x = listener.position.x;

	if (camera.position.y >= 1700) {
		setOverlayState('COLOPHON');
	} else if (camera.position.y <= 500) {
		setOverlayState('DEAR');
	} else if (camera.position.y <= 1000 && camera.position.y >= 850) {
		setOverlayState('STORIES');
	} else {
		setOverlayState('BLANK');
	}

	camera.position.x = listener.position.x;
	camera.position.y = listener.position.y;

	if (listener.position.y >= SCENE_H/2 && listener.position.y <= SCENE_H/2 + 50) {	
		listener.velocity.x = (camera.mouseX - listener.position.x) / 70;

		//WHERE TO HANDLE HAND LOGIC
		listener.velocity.y = 0;

		//hands animate
		for (hand of hands) {
			hand.startAnimation();
			hand.update(camera.mouseX,camera.mouseY,listener);
		}

		//CLOUDS SUN and WORMS tracking hand movement
		sun.update(camera.mouseX, width);
		for (cloud of clouds){
			cloud.update(camera.mouseX, width);
		}
		for (worm of worms){
			worm.update(camera.mouseX, width);
		}
		
		if (mouseY >= height - 50) {
			listener.velocity.y = 10;
			listener.velocity.x = 0;

		
		} else if(mouseY <= 50){
			listener.velocity.y = -10;
			listener.velocity.x = 0;
		}
		// hand clicked logic
			if (handClicked == 1){
				if (listener.position.x < clickedHand.position.x-50){
					listener.velocity.x = 4;
				} else if (listener.position.x > clickedHand.position.x+50) {
					listener.velocity.x = -4
				} else {
					listener.velocity.x = 0;
					listener.velocity.y = 0;
					listener.position.x = clickedHand.position.x;
				}
			} 
	} else {
		listener.velocity.y = (camera.mouseY - listener.position.y) / 30;
		for (hand of hands) {
			hand.stopAnimation();
		}

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

function mouseClicked(){
	for (hand of hands) {
			hand.mouseClick(camera.mouseX, camera.mouseY, listener);
		}
}

function setOverlayState( state ) {
	switch(state) {
		case 'DEAR':
		  // code block
		  document.querySelector('.dear-reader').classList.remove('dear-reader--inactive');
		  document.querySelector('.garden').classList.add('garden--inactive');
		  document.querySelector('.colophon').classList.add('colophon--inactive');
		  break;
		case 'STORIES':
		  // code block
		  document.querySelector('.dear-reader').classList.add('dear-reader--inactive');
		  document.querySelector('.garden').classList.remove('garden--inactive');
		  document.querySelector('.colophon').classList.add('colophon--inactive');


		  break;
		case 'COLOPHON':
		  // code block
		  document.querySelector('.dear-reader').classList.add('dear-reader--inactive');
		  document.querySelector('.garden').classList.add('garden--inactive');
		  document.querySelector('.colophon').classList.remove('colophon--inactive');
		  break;
		case 'BLANK':
		  // code block
		  document.querySelector('.dear-reader').classList.add('dear-reader--inactive');
		  document.querySelector('.garden').classList.add('garden--inactive');
		  document.querySelector('.colophon').classList.add('colophon--inactive');
		  break;
		default:
		  // code block
	}
}

function setStory ( title, producer, synopsis, id ) {
	document.querySelector('#storyTitle').innerHTML = title;
	document.querySelector('#storyProducer').innerHTML = producer;
	document.querySelector('#storySynopsis').innerHTML = synopsis;
	document.querySelector('.window__player').setAttribute('rest-lookup', id);
}

function toggleStory ( visible ) {
	//Setup story
	if (visible == true) {
		document.querySelector('.garden__window').setAttribute('class', 'garden__window');
	} else if (visible == false) {
		document.querySelector('.garden__window').setAttribute('class', 'garden__window garden__window--inactive');
	}
}

function initPlayer () {
    var links = document.querySelectorAll("[nht-player='true']");
    links.forEach(function(element) {
        element.addEventListener("click", function(e) {
            var rest = 'stories/' + element.getAttribute("rest-lookup");
            console.log('story link clicked!!')
			window.parent.postMessage(rest, "*");
			e.stopPropagation();
        });
    });
}

// maybe switch all conditional logic to "mouseX" and "mouseY"