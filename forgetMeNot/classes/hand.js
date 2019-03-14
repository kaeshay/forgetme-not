function Hand() {
	var hand = new Thing("hand", 216, 288, 5);
	var mouseIsDblClicked = false;

	this.load = function(x, y) {
		this.sprite = hand.load(x, y);
	}

	this.update = function(x, y, listener) {
		if (this.sprite.overlapPoint(x, y)) {
			if (mouseIsPressed) {
				camera.zoom = 1.5;
				camera.position.x = this.sprite.position.x - 100;
				camera.position.y = this.sprite.position.y;
				listener.velocity.x = 0;
				listener.velocity.y = 0;
			} else {
				camera.zoom = 1;
			}
		}
	}
}