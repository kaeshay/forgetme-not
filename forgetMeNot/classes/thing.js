function Thing(name, w, h, f) {
	var animation = loadAnimation(loadSpriteSheet("assets/spritesheets/" + name + "sheet.png", w, h, f));
	this.load = function(x, y) {
		sprite = createSprite(x, y);
		sprite.addAnimation("animate", animation);
		return sprite;
	}
}