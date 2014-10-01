var World = function(width, height){
	this. camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
	this.camera.position.set(0, 200, 800);
	this.scene = new THREE.Scene();

	this.addObject = function(object){

	}

	this.removeObject = function(object){

	}
}

var MainWorld = function(){
	World.call(this)

	this.player = new MainPlayer(this)
	this.player.body.position.y += 100

	this.walls = []
	for(var i=0;i<10;i++){
		this.walls.push(new Wall(this))
		this.walls.push(new Wall(this))
		this.walls.push(new Wall(this))
		this.walls[i*3].hitbox.position.z-=600*i;
		this.walls[i*3].hitbox.position.y-=100;
		this.walls[i*3+1].hitbox.position.z-=600*i;
		this.walls[i*3+1].hitbox.position.x=200;
		this.walls[i*3+1].hitbox.position.y-=100;
		this.walls[i*3+1].hitbox.rotation.z = Math.PI/5;
		this.walls[i*3+2].hitbox.position.z-=600*i;
		this.walls[i*3+2].hitbox.position.x-=200;
		this.walls[i*3+2].hitbox.position.y-=100;
		this.walls[i*3+2].hitbox.rotation.z = -Math.PI/5;
	}
	// this.walls[0] = new Wall(this)
	// this.walls[1] = new Wall(this)
	// this.walls[1].hitbox.position.x+=200;
	// this.walls[1].hitbox.position.y+=0;
	// this.walls[1].hitbox.rotation.x+=30;
	// Lights
	var particleLight = new THREE.Mesh(new THREE.SphereGeometry(4, 8, 8), new THREE.MeshBasicMaterial({
	    color: 0xffffff
	}));
	var pointLight = new THREE.PointLight(0xffffff, 1);
	particleLight.add(pointLight);
	this.scene.add(particleLight);
	this.scene.add(new THREE.AmbientLight(0x111111));


	this.runFrame = function(){
	    var from = this.player.getFeet().clone();
	    this.player.move();
	    var to = this.player.getFeet().clone();

	    var wallFaces = []
	    $.each(this.walls, function(idx, elem) {
	    	wallFaces = wallFaces.concat(elem.getFaces());
		});
	    var closestCollision = null
	    var closestFace = null;
	    var closestDist = -1;
		$.each(wallFaces, function(idx, elem) {
			var hit = elem.checkCollision(from, to)
			if(hit){
				//hit.add(elem.normal.clone().multiplyScalar(0.1))
				var dist = from.clone().sub(hit).length();
				if(closestDist == -1 || dist < closestDist){
					closestFace=elem
					closestDist = dist;
					closestCollision = hit;
				}
			}			
		});
		if(closestCollision){
			var otherHit = Collision.linePlane(to, to.clone().add(closestFace.normal), closestFace);
			otherHit.add(closestFace.normal.clone().multiplyScalar(0.1))
			this.player.moveFeetTo(otherHit);
			this.player.spd.projectOnPlane(closestFace.normal)
			//check if collision occurs afer new pos calculation
			var multiCollide = false;
			$.each(wallFaces, function(idx, elem) {
				var hit = elem.checkCollision(from, otherHit)
				if(hit){
					multiCollide=true
					return false;
				}			
			});
			if(multiCollide){
				this.player.moveFeetTo(from);
			}

		}

		


	    //TODO HANDLE DOUBLE COLLISION
	    /*var hit = null
	    $.each(this.walls, function(idx, elem) {
	    	var h = elem.checkCollision(from, to);
	    	if(h){
	    		hit = h
	    	}
		});
		if(hit){
	    	this.player.moveFeetTo(hit);
	    }*/
	   

	    var timer = 0.0001 * Date.now();
	    this.camera.position.copy(this.player.body.position);
	    this.camera.position.y = 100;
	    this.camera.position.x += Math.sin(this.player.body.rotation.y) * 300
	    this.camera.position.z += Math.cos(this.player.body.rotation.y) * 300
	    this.camera.lookAt(this.player.body.position);
	    particleLight.position.x = Math.sin(timer * 7) * 300;
	    particleLight.position.y = Math.cos(timer * 5) * 400 + 450;
	    particleLight.position.z = Math.cos(timer * 3) * 300;
	}
}


//resizing
/*window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}*/


//OTHER LIGHTING
/*var directionalLight = new THREE.DirectionalLight(0xffffff, 0.125 );
    directionalLight.position.x = Math.random() - 0.5;
    directionalLight.position.y = Math.random() - 0.5;
    directionalLight.position.z = Math.random() - 0.5;
    directionalLight.position.normalize();
    scene.add( directionalLight );*/