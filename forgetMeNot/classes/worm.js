function Worm(name, w, h, f) {
	var worm = new Thing(name, w, h, f);
	let deltaX = 0;

	this.load = function(x, y) {
		this.sprite = worm.load(x, y);
		this.deltaX = x;
		this.sprite.scale = 1.5;
		this.sprite.rotation = random(180);
		this.sprite.animation.frameDelay = 10;
	}

	this.update = function(x, width){
		let leftBound = x - width/2;  // should be the x coord of the left side of the window
		this.sprite.position.x = leftBound + this.deltaX; 
	}
}