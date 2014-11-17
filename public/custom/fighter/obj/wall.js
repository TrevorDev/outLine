function Wall(scene, x, y, width, height, spritePath){
	Rect.call(this, x, y, width, height)
	this.setPos = function(x,y){
		this.x = x;
		this.y = y;
		this.sprite.x = x;
		this.sprite.y = y;
	}
	this.setDim = function(x,y){
		this.width = x;
		this.height = y;
		this.sprite.width = x;
		this.sprite.height = y;
	}
	this.sprite = new FLIXI.createSprite(spritePath, width, height);
	scene.container.addChild(this.sprite)
	this.setPos(x,y)
	this.setDim(width,height);
}