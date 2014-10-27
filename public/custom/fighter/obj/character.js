function Character(scene, x, y, width, height, spritePath, controller){
	this.setPos = function(x,y){
		this.x = x;
		this.y = y;
		this.sprite.x = x;
		this.sprite.y = y;
		this.hitBox.x = this.hitDir == "x" ? x+width*this.xScale : x;
		this.hitBox.y = this.hitDir == "y" ? y+height*this.yScale: y;
	}
	this.setDim = function(x,y){
		this.width = x;
		this.height = y;
		this.sprite.width = x;
		this.sprite.height = y;
		this.hitBox.width = x;
		this.hitBox.height = y;
	}
	this.frameAction = function(walls){
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
			this.diveKick();
		}

		// if(this.controller.getKey("juggle")&&!this.controller.getKey("attack")){
		// 	this.hitBox.alpha = 1;
		// 	this.hitOponent(function(guy){
		// 		guy.percentDmg+= 5;
		// 		guy.ySpd = -7;
		// 		guy.xSpd = this.xScale*3;
		// 	}.bind(this))
		// }

		// if(this.controller.getKey("attack")&&!this.controller.getKey("juggle")){
		// 	this.hitOponent(function(guy){
		// 		//guy.percentDmg+= 10;
		// 		guy.xSpd = 0.2*this.xScale*guy.percentDmg;
		// 	}.bind(this))
		// }

		// if(this.y > 500){
		// 	this.deaths++;
		// 	this.x = 500;
		// 	this.y = 0;
		// 	this.xSpd = 0;
		// 	this.ySpd = 0;
		// 	this.percentDmg=0;
		// }
		// this.x+=this.xSpd;
		// this.y+=this.ySpd;

		// this.setPos(this.x, this.y)

		this.move(walls);
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

	this.move = function(walls){
		this.ySpd+= 0.3//global.currentLevel.gravity;
		this.x+=this.xSpd;
		this.x+=this.checkWallCollision(walls, this.xSpd, 0);
		this.y+=this.ySpd;
		yFix = this.checkWallCollision(walls, 0, this.ySpd);
		if(yFix<0){
			this.jumpCount=0;
			this.ySpd = 0;
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
				if(yMove&&delta&&(this.xSpd<this.maxTopSpeed+1&&!this.controller.getKey("right"))&&(this.xSpd>-this.maxTopSpeed-1&&!this.controller.getKey("left"))){
					this.xSpd=0;
				}
				return delta;
			}
		}
		return 0;
	}
	
	this.sprite = new FLIXI.createSprite(spritePath, width, height);
	this.sprite.x = x;
	this.sprite.y = y;
	scene.container.addChild(this.sprite)

	// this.texture = new PIXI.Texture.fromImage(spritePath);
	// this.hitboxTexture = new PIXI.Texture.fromImage("assets/colors/red.png");
	// this.sprite = new PIXI.Sprite(this.texture);
	this.hitBox = new FLIXI.createSprite(spritePath, width, height);
	// this.hitBox.alpha = 0.2
	// global.screen.container.addChild(this.sprite)
	// global.screen.container.addChild(this.hitBox)
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