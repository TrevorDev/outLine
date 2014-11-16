function HitBox(scene, x, y, width, height, onPlayer, framesAlive){
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
	this.sprite = new FLIXI.createSprite("/public/custom/img/blue.png", width, height);
	scene.container.addChild(this.sprite)
	this.setPos(x,y)
	this.setDim(width,height);

	//settings
	this.onPlayer = onPlayer
	this.framesAlive = framesAlive
}