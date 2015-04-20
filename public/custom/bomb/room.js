function Room(screen){
	var level = new Level(screen)
	level.addToScreen(screen)
	var players = {}

	this.addPlayer = function(p){
		players[p.getId()] = p;
		p.setDim(level.getGridSquareDim())
		screen.container.addChild(p.getSprite())
	}

	this.getLevel = function(){
		return level
	}
}