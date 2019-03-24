function Cloud(name, w, h, f) {
	var cloud = new Thing(name, w, h, f);
	let deltaX = 0; // the cloud's offset from the left side of the window

	this.load = function(x, y) {
		this.sprite = cloud.load(x, y);
		this.deltaX = x;
		this.sprite.animation.frameDelay = 6;
	}

	this.update = function(x, width){
		let leftBound = x - width/2;  // should be the x coord of the left side of the window
		this.sprite.position.x = leftBound + this.deltaX; 
		// this.sprite.overlap(x, function(){console.log('hi')})
	}

	this.stopAnimation = function() {
		this.sprite.changeAnimation("still");
	}



}