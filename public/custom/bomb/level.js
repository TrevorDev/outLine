function Level(screen){
	var dim = new THREE.Vector2(40,20)
	var createGrid = function(dim){
		var ret = []
		for(var i = 0;i<dim.y;i++){
			ret[i] = []
			for(var j = 0;j<dim.x;j++){
				ret[i][j] = null;
			}
		}
		return ret
	}
	var grid = createGrid(dim)
	grid[3][3] = new Block()
	grid[3][4] = new Block()
	grid[0][0] = new Block()
	
	this.getDim = function(){
		return dim
	}
	var screenRatio = new THREE.Vector2(screen.width/dim.x, screen.height/dim.y)
	this.addToScreen = function(){
		for(var i = 0;i<dim.y;i++){
			for(var j = 0;j<dim.x;j++){
				if(grid[i][j]!=null){
					grid[i][j].setSize(screenRatio)
					var s = grid[i][j].getSprite()
					s.x = j * screenRatio.x
					s.y = i * screenRatio.y
					screen.container.addChild(s)
				}
			}
		}
	}

	this.placeOnGrid = function(pos, object){
		grid[pos.y][pos.x] = object
		grid[pos.y][pos.x].setSize(screenRatio)
		var s = grid[pos.y][pos.x].getSprite()
		s.x = pos.x * screenRatio.x
		s.y = pos.y * screenRatio.y
		screen.container.addChild(s)
	}

	this.getGridSquareDim = function(){
		return screenRatio
	}

	this.globalPosToGrid = function(pos){
		return new THREE.Vector2(Math.floor(pos.x/screenRatio.x), Math.floor(pos.y/screenRatio.y))
	}
}