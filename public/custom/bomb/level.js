function Level(){
	var dim = new THREE.Vector2(40,20)
	var createGrid = function(dim){
		var ret = []
		for(var i = 0;i<dim.y;i++){
			ret[i] = []
			for(var j = 0;j<dim.x;j++){
				ret[i][j] = new Block()
			}
		}
		return ret
	}
	var grid = createGrid(dim)
	grid[3][3] = new Block()
	
	this.getDim = function(){
		return dim
	}
	var screenRatio = null
	this.addToScreen = function(screen){
		screenRatio = new THREE.Vector2(screen.width/dim.x, screen.height/dim.y)
		for(var i = 0;i<dim.y;i++){
			for(var j = 0;j<dim.x;j++){
				if(grid[i][j]!=null){
					var s = grid[i][j].getSprite()
					s.x = j * screenRatio.x
					s.y = i * screenRatio.y
					screen.container.addChild(s)
				}
			}
		}
	}
}