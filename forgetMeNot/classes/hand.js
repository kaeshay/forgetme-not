function Hand() {
	let hand = new Thing("hand", 216, 288, 5);
	let mouseClick = 0;

	this.load = function(x, y) {
		this.sprite = hand.load(x, y);
	}

	this.update = function(x, y, listener, shouldScroll) {
 
		if (this.sprite.overlapPoint(x, y)) {

			if (mouseIsPressed && mouseClick == 0) {
				// first mouse click
				//camera.zoom = 1.5;
				//camera.position.x = this.sprite.position.x - 100;
				//camera.position.y = this.sprite.position.y;
				listener.velocity.x = 0;
				// listener.velocity.y = 0;
				// how to pause all movement?
				mouseClick++;
			} else if(mouseIsPressed && mouseClick == 1){
				// second mouse click
				//camera.zoom = 1;
				mouseClick = 0; // reset
			} 

		}

	}

	this.stopAnimation = function() {
		this.sprite.changeAnimation("still");
	}

	this.startAnimation = function() {
		this.sprite.addAnimation("animate", hand.animation);
	}
}