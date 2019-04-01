let clickedHand;

function Hand(name, w, h, f, title, producer, synopsis, id) {
	let hand = new Thing(name, w, h, f);
	hand.title = title;
	hand.producer = producer;
	hand.synopsis = synopsis;
	hand.id = id;

	this.load = function(x, y) {
		this.sprite = hand.load(x, y);
		this.sprite.scale = 2.3;
		this.sprite.setCollider("rectangle", 0, 0, w, h);
	}

	this.update = function(cameraMouseX, cameraMouseY, listener){
		let speed = 5;
		if (this.sprite.overlapPoint(cameraMouseX, cameraMouseY)){
			this.sprite.scale = 3;
		} else {
			this.sprite.scale = 2.5;
		}
		if (this.sprite.position.x <= listener.position.x + 500 &&
			this.sprite.position.x >= listener.position.x - 500
			 && this.sprite.position.y > SCENE_H/2){
			this.sprite.position.y -= speed;
		} else if (this.sprite.position.y <= SCENE_H/2 + 300 && this.sprite.overlap(listener)==false){
			this.sprite.position.y += speed/5;
		} 
	}


	this.mouseClick = function(cameraMouseX, cameraMouseY,listener) {
		let isMouseOver = this.sprite.overlapPoint(cameraMouseX, cameraMouseY);
		if (this.sprite.overlapPoint(cameraMouseX, cameraMouseY)) {
				if (handClicked == 0){
					handClicked = 1;
					setStory(hand.title, hand.producer, hand.synopsis, hand.id);
					toggleStory(true);
					clickedHand = this.sprite;
				} 	
			} else if (this.sprite.overlap(listener)){
				console.log('mouse event!', listener);
				handClicked = 0;
				toggleStory(false);
			} else {
				this.sprite.scale = 2.5;
			}
	}


	this.stopAnimation = function() {
		this.sprite.changeAnimation("still");
	}

	this.startAnimation = function() {
		this.sprite.changeAnimation("animate");
	}
}