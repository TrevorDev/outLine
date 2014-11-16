function Rect(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.getCenter = function(){
		return {x: this.x+this.width/2, y: this.y+this.height/2}
	}
}