function Thing(name, w, h, f) {
	let animation = loadAnimation(loadSpriteSheet("assets/spritesheets/" + name + "sheet.png", w, h, f));
	let still = loadAnimation(loadSpriteSheet("assets/spritesheets/" + name + "sheet.png", w, h, 1));
	this.load = function(x, y) {
		sprite = createSprite(x, y);
		sprite.addAnimation("still", still);
		sprite.addAnimation("animate", animation);

		sprite.changeAnimation("animate");
		return sprite;
	}
}