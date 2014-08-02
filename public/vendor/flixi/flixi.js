var FLIXI = {
	Screen: function(canvas){
		this.renderer = PIXI.autoDetectRenderer(canvas.width(), canvas.height(), canvas[0], true);
		this.stage = new PIXI.Stage();
		this.container = new PIXI.SpriteBatch();
		this.stage.addChild(this.container);

		this.render = function(){
			this.renderer.render(this.stage);
		}

		this.runAnimateLoop = function(x){
			var cur = this;
			var loop = function(){
				x();
				cur.render();
				requestAnimFrame(loop);
			}
			loop();
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
	}
}