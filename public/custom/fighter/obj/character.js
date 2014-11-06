function Character(scene, stage, x, y, width, height, spritePath, controller){
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
			if(!this.jumpKeyDown){
				this.jumpKeyDown = true;
				this.jump()
			}
		}else{
			this.jumpKeyDown = false;
		}
		if(this.controller.getKey("down")){
			this.hitDir = "y";
			this.yScale = 1;
		}
		if(this.controller.getKey("shield")){
			this.hitDir = "y";
			this.yScale = 1;
			this.diveKick();
		}
	}

	this.hitOponent = function(callback){
		for(var i in Character.array){
			var guy = Character.array[i];
			if(guy!=this){
				if(Collision.rect(this.hitBox, guy)){
					callback(guy);
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

	this.diveKick = function(){
		this.ySpd = 10;
		//this.xSpd = 4*this.xScale;
	}

	this.move = function(){
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
	}

	this.checkWallCollision = function(walls, xMove, yMove){
		for (var i in walls){
			if(delta = Collision.rect(this, walls[i], xMove, yMove)){
				// if(yMove&&delta&&(this.xSpd<this.maxTopSpeed+1&&!this.controller.getKey("right"))&&(this.xSpd>-this.maxTopSpeed-1&&!this.controller.getKey("left"))){
				// 	this.xSpd=0;
				// }
				return delta;
			}
		}
		return 0;
	}
	
	this.stage = stage;
	this.sprite = new FLIXI.createSprite(spritePath, width, height);
	this.sprite.x = x;
	this.sprite.y = y;
	scene.container.addChild(this.sprite)
	this.controller = controller;
	this.xSpd = 0;
	this.ySpd = 0;
	this.x = x;
	this.y = y;
	this.xScale = 1;
	this.yScale = 1;
	this.hitDir = "x";
	this.jumpCount = 0;
	this.jumpKeyDown = false;
	this.percentDmg = 0;
	this.deaths = 0;

	this.maxJumps = 3;
	this.jumpPower = 10;
	this.width;
	this.height;
	this.setDim(width,height);
	this.moveAcc = 1;
	this.maxTopSpeed = 5;

	Character.array.push(this)
}

Character.array = []