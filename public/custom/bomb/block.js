function Block(){
	var type = "wall"
	var sprite = new FLIXI.createSprite("/public/custom/img/red.png", 10, 10);

	this.getSprite = function(){
		return sprite
	}
}