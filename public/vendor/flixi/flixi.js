var FLIXI = {
	Screen: function(canvas){
		this.renderer = PIXI.autoDetectRenderer(canvas.width(), canvas.height(), canvas[0], true);
		this.stage = new PIXI.Stage();
		this.container = new PIXI.DisplayObjectContainer(); //new PIXI.SpriteBatch();
		this.stage.addChild(this.container);

		this.render = function(){
			this.renderer.render(this.stage);
		}

		this.runAnimateLoop = function(x){
			var scrn = this;
			var loop = function(){
				x();
				scrn.render();
				requestAnimFrame(loop);
			}
			loop();
		}

		this.resize = function(x, y){
			this.renderer.view.style.width = x + "px"
			this.renderer.view.style.height = y + "px"
		}

		var thisScreen = this;
		this.camera = {
			move: function(x,y){
				thisScreen.container.position.x+=x;
				thisScreen.container.position.y+=y;
			},
			setPos: function(x, y){
				thisScreen.container.position.x=x;
				thisScreen.container.position.y=y;
			},
			zoom: function(x){
					thisScreen.container.scale.x *= x;
				    thisScreen.container.scale.y *= x;
			}
		}
	},
	createSprite: function(link, width, height){
		var texture = new PIXI.Texture.fromImage(link)
		var sprite = new PIXI.Sprite(texture)
		if(width){
			sprite.width=width;
			sprite.height=height;
		}
		return sprite
	},
	Line: function(a,b){
		this.start = a;
		this.end = b;
		this.draw = function(graphics){
			graphics.lineStyle(1, 0xcccccc, 1);
			graphics.moveTo(this.start.x, this.start.y);
			graphics.lineTo(this.end.x, this.end.y);
		}
		this.clone = function(){
			return new FLIXI.Line(this.start.clone(), this.end.clone())
		}
		this.scale = function(x){
			var disX = this.end.x - this.start.x
			var disY = this.end.y - this.start.y
			this.end = new PIXI.Point(this.start.x+(disX*x), this.start.y+(disY*x));
		}
		this.move = function(x,y){
			this.end.x+=x;
			this.end.y+=y;
			this.start.x+=x;
			this.start.y+=y;
		}
		this.length = function(){
			var disX = this.end.x - this.start.x
			var disY = this.end.y - this.start.y
			return Math.sqrt(disX*disX+disY*disY)
		}
	}
}