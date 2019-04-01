function Grass() {
	var sign = new Thing("grass", 750, 269, 12);

	this.load = function(x, y) {
		this.sprite = sign.load(x, y);
		this.sprite.scale = 2;
	}
}