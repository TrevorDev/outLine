function Room(screen){
	var level = new Level()
	level.addToScreen(screen)
	var players = {}

	this.addPlayer = function(p){
		players[p.getId()] = p;
		screen.container.addChild(p.getSprite())
	}
}