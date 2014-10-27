function Wall(scene, x, y, width, height, spritePath){
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
	this.sprite.x = x;
	this.sprite.y = y;
	scene.container.addChild(this.sprite)
	this.x = 0;
	this.y = 0;
	this.setPos(x,y)
	this.setDim(width,height);
}