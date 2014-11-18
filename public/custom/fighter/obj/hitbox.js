function Hitbox(params){
	// {scene,
	//  x,
	//  y,
	//  width,
	//  height,
	//  attachedToPlayer,
	//  preFrames,
	//  activeFrames,
	//  postFrames
	// }
	Rect.call(this, params.x, params.y, params.width, params.height)

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
	this.sprite = new FLIXI.createSprite("/public/custom/img/red.png", params.width, params.height);
	this.sprite.alpha = 0.05;
	params.scene.container.addChild(this.sprite)
	this.setPos(params.x-this.width/2,params.y-this.height/2)
	this.setDim(params.width,params.height);

	//settings
	this.scene = params.scene
	this.attachedToPlayer = params.attachedToPlayer
	this.activeFrames = params.activeFrames
	this.preFrames = params.preFrames
	this.postFrames = params.postFrames
	this.dmg = params.dmg
	this.hitDir = params.hitDir
	this.objectsHit = []
	this.active = false
	this.frame = 0
}