function Sign() {
	var sign = new Thing("sign", 216, 288, 5);

	this.load = function(x, y) {
		this.sprite = sign.load(x, y);
		this.sprite.scale = 0.5;
	}
}