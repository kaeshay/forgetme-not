function Sun() {
		var sun = new Thing("sun", 216, 288, 5);
		
	 this.load = function(x,y){
			this.sprite=sun.load(x,y);
		}
}