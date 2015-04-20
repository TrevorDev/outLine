function Block(){
	var type = "wall"
	var sprite = new FLIXI.createSprite("/public/custom/img/red.png", 10, 10);

	this.setSize = function(dim){
		sprite.width = dim.x
		sprite.height = dim.y
	}

	this.getSprite = function(){
		return sprite
	}
}