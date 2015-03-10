function Stage(screen){
	this.players = []
	this.walls = []
}

var Stages = {}

Stages.finalDestination = function(screen){
	var ret = new Stage(screen)
	ret.walls.push(new Wall(screen, 200, 400, 560, 50, "/public/custom/img/blue.png"))
	return ret;
}
