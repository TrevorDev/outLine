function Hitbox(scene, x, y, width, height, attachedToPlayer, preFrames, activeFrames, postFrames){
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
	this.sprite = new FLIXI.createSprite("/public/custom/img/red.png", width, height);
	this.sprite.alpha = 0.05;
	scene.container.addChild(this.sprite)
	this.setPos(x-this.width/2,y-this.height/2)
	this.setDim(width,height);

	//settings
	this.scene = scene
	this.attachedToPlayer = attachedToPlayer
	this.activeFrames = activeFrames
	this.preFrames = preFrames
	this.postFrames = postFrames
	this.active = false
	this.frame = 0
}