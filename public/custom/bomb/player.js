var private_player_id_counter = 0;

function Player(controller){
	var maxSpd = 3
	var ammo = 3

	var id = private_player_id_counter++
	var room = null
	var pos = new THREE.Vector2(0,0)
	var spd = new THREE.Vector2(0,0)
	var dim = new THREE.Vector2(30,30)
	var sprite = new FLIXI.createSprite("/public/custom/img/blue.png", dim.x, dim.y);

	var direc = {left: null, right: null, up: null, down: null}
	this.preFrameAct = function(){
		spd.x=0
		spd.y=0

		//SORT KEYS PRESSED BY TIME AND USE LAST KEY PRESSED
		var curTime = new Date().getTime()
		for(var key in direc){
			if(controller.getKey(key)){
				if(direc[key] == null){
					direc[key] = curTime;
				}
			}else{
				direc[key] = null
			}
		}
		var curDir = Object.keys(direc).sort(function(a,b){return direc[b]-direc[a]})[0]
		if(direc[curDir] != null){
			if(curDir == "left"){
				spd.x = -maxSpd
			}
			if(curDir == "right"){
				spd.x = maxSpd
			}
			if(curDir == "up"){
				spd.y = -maxSpd
			}
			if(curDir == "down"){
				spd.y = maxSpd
			}
		}

		if(controller.getKeyPressed("attack")){
			console.log(this.getGridPos())
			var b = new Block()
			room.getLevel().placeOnGrid(this.getGridPos(), b)
		}
		
	}

	this.postFrameAct = function(){
		this.setPos(pos.clone().add(spd))
	}

	this.setPos = function(p){
		pos.copy(p)
		sprite.x = pos.x
		sprite.y = pos.y
	}

	this.setDim = function(p){
		dim.copy(p)
		sprite.width = dim.x
		sprite.height = dim.y
	}

	this.joinRoom = function(r){
		room = r
		room.addPlayer(this)
		return this
	}

	this.getCenterPos = function(){
		return pos.clone().add(dim.clone().multiplyScalar(0.5))
	}

	this.getGridPos = function(){
		return room.getLevel().globalPosToGrid(this.getCenterPos());
	}

	this.getId = function(){
		return id
	}

	this.getSprite = function(){
		return sprite
	}
}