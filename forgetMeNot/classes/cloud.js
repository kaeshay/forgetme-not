function Cloud() {
	var cloud = new Thing("cloud", 216, 288, 5);

	this.load = function(x, y) {
		this.sprite = cloud.load(x, y);
	}
}