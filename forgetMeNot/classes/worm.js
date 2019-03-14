function Worm() {
	var worm = new Thing("worm", 216, 288, 5);

	this.load = function(x, y) {
		this.sprite = worm.load(x, y);
	}
}