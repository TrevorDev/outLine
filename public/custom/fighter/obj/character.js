function Character(scene, stage, x, y, width, height, spritePath, controller){
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
	this.frameAction = function(){
		if(this.controller.getKey("left")){
			this.hitDir = "x";
			this.xSpd-=this.moveAcc;
			if(this.xSpd<-this.maxTopSpeed&&this.xSpd>-this.maxTopSpeed-2*this.moveAcc){
				this.xSpd=-this.maxTopSpeed;
			}
			this.xScale = -1;
		}
		if(this.controller.getKey("right")){
			this.hitDir = "x";
			this.xSpd+=this.moveAcc;
			if(this.xSpd>this.maxTopSpeed&&this.xSpd<this.maxTopSpeed+2*this.moveAcc){
				this.xSpd=this.maxTopSpeed;
			}
			this.xScale = 1;
		}
		if(this.controller.getKey("up")){
			this.hitDir = "y";
			this.yScale = -1;
		}

		if(this.controller.getKey("down")){
			this.hitDir = "y";
			this.yScale = 1;
		}

		if(this.controller.getKey("jump")){
			if(!this.jumpKeyDown){
				this.jumpKeyDown = true;
				this.jump()
			}
		}else{
			this.jumpKeyDown = false;
		}

		if(this.controller.getKey("shield")){
			this.hitDir = "y";
			this.yScale = 1;

			//divekick
			this.ySpd = 10;
			this.xSpd = this.maxTopSpeed*this.xScale;
		}

		if(this.controller.getKey("attack")){
			if(!this.attacking){
				console.log("blah")
				this.attacking=true
				var center = this.getCenter();
				if(this.controller.getKey("up")){
					this.hitboxes.push(new Hitbox(this.scene,center.x, center.y-this.height/2-50, 50, 50, true, 10,20,20))
				}else if(this.controller.getKey("down")){
					this.hitboxes.push(new Hitbox(this.scene,center.x, center.y+this.height/2, 50, 50, true, 10,20,20))
				}else{
					this.hitboxes.push(new Hitbox(this.scene,center.x+this.xScale*this.width/2, center.y, 50, 20, true, 10,10,10))
				}
				
			}
		}
	}

	this.jump = function(){
		if(this.jumpCount < this.maxJumps){
			this.ySpd = -this.jumpPower;
			this.jumpCount++;
		}
	}

	this.move = function(){
		var oldPos = {x:this.x,y:this.y}
		this.ySpd+= 0.3//global.currentLevel.gravity;
		this.x+=this.xSpd;
		var xFix =this.checkWallCollision(this.stage.walls, this.xSpd, 0)
		if(xFix!=0){
			this.ySpd *= 0.8;
		}
		this.x+=xFix
		this.y+=this.ySpd;
		var yFix = this.checkWallCollision(this.stage.walls, 0, this.ySpd);
		if(yFix!=0){
			if(yFix<0){
				this.jumpCount=0;
				this.ySpd = 0;
			}
			this.xSpd *= 0.8;
		}
		
		this.y+= yFix;

		if(this.y > 500){
			this.deaths++;
			this.x = 500;
			this.y = 0;
			this.xSpd = 0;
			this.ySpd = 0;
			this.percentDmg=0;
		}
		this.setPos(this.x, this.y)
		var diff = {x:this.x - oldPos.x, y:this.y - oldPos.y}
		for(var i in this.hitboxes){
			var hb = this.hitboxes[i]
			hb.frame++;
			if(hb.attachedToPlayer){
				hb.setPos(hb.x+diff.x, hb.y+diff.y)
			}
			if(hb.frame > hb.preFrames && hb.frame < hb.preFrames+hb.activeFrames){
				hb.sprite.alpha = 0.8
				hb.active = true
			}else{
				hb.sprite.alpha = 0.05
				hb.active = false
			}
		}
		var self = this;
		this.hitboxes = $.grep(this.hitboxes, function(hb){
			if(hb.frame > hb.preFrames+hb.activeFrames+hb.postFrames){
				hb.scene.container.removeChild(hb.sprite)
				self.attacking = false;
				return false
			}else{

				return true
			}	
		})
		
	}

	this.checkWallCollision = function(walls, xMove, yMove){
		for (var i in walls){
			if(delta = Collision.rect(this, walls[i], xMove, yMove)){
				return delta;
			}
		}
		return 0;
	}

	this.stage = stage;
	this.scene = scene;
	this.controller = controller;

	//add sprite
	this.sprite = new FLIXI.createSprite(spritePath, width, height);
	this.setPos(x,y)
	scene.container.addChild(this.sprite)
	
	this.hitboxes = []
	
	//directions
	this.xScale = 1;
	this.yScale = 1;
	this.hitDir = "x";



	//Stats
	this.maxJumps = 2;
	this.jumpPower = 10;
	this.setDim(width,height);
	this.setPos(x, y)
	this.moveAcc = 1;
	this.maxTopSpeed = 5;
	this.xSpd = 0;
	this.ySpd = 0;
	this.jumpCount = 0;
	this.jumpKeyDown = false;
	this.attacking = false;

	//stock information
	this.percentDmg = 0;
	this.deaths = 0;

	Character.array.push(this)
}

Character.array = []