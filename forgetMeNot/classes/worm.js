function Worm() {
	var worm = new Thing("worm", 216, 288, 5);
	let deltaX = 0;

	this.load = function(x, y) {
		this.sprite = worm.load(x, y);
		this.deltaX = x;
	}

	this.update = function(x, width){

		let leftBound = x - width/2;  // should be the x coord of the left side of the window
		this.sprite.position.x = leftBound + this.deltaX; 

	}
}