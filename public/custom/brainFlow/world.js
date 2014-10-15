var World = function(width, height){
	this. camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 8000);
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

	this.chunkSize = 3000;

	this.chunks = {}

	// Lights
	var particleLight = new THREE.Mesh(new THREE.SphereGeometry(4, 8, 8), new THREE.MeshBasicMaterial({
	    color: 0xffffff
	}));
	var pointLight = new THREE.PointLight(0xffffff, 1);
	particleLight.add(pointLight);
	this.scene.add(particleLight);
	this.scene.add(new THREE.DirectionalLight(0xffffff, 0.5 ));

	this.scene.add(new THREE.AmbientLight(0x111111));

	this.lastChunk = null;
	this.runFrame = function(){
	    this.player.move();
	   	var currentChunk = this.getCurrentChunk()
	   	if(this.lastChunk == null || this.lastChunk.x != currentChunk.x || this.lastChunk.z != currentChunk.z){
	   		this.removeAllChunks();
	   		for(var i = -2;i<3;i++){
	   			for(var j = -2;j<3;j++){
	   				var coord = currentChunk.clone();
	   				coord.x += i;
	   				coord.z += j;
	   				new WorldChunk(this, coord);
	   			}
	   		}
	   		

	   		this.lastChunk = currentChunk
	   	}


	    var timer = 0.0001 * Date.now();
	    this.camera.position.copy(this.player.body.position);
	    this.camera.position.y = this.player.body.position.y+100;
	    this.camera.position.x += Math.sin(this.player.body.rotation.y) * 300
	    this.camera.position.z += Math.cos(this.player.body.rotation.y) * 300
	    this.camera.lookAt(this.player.body.position);
	    particleLight.position.x = Math.sin(timer * 7) * 300;
	    particleLight.position.y = Math.cos(timer * 5) * 400 + 450;
	    particleLight.position.z = Math.cos(timer * 3) * 300;
	}

	this.removeAllChunks = function(){
		var chunks = this.chunks;
		$.each(chunks, function(key, val) {
			val.dispose();
			delete chunks[key];
		})
	}

	this.getCurrentChunk = function(){
		var x = Math.floor((this.player.body.position.x+(this.chunkSize/2)) / this.chunkSize);
		var y = Math.floor((this.player.body.position.y+(this.chunkSize/2)) / this.chunkSize);
		var z = Math.floor((this.player.body.position.z+(this.chunkSize/2)) / this.chunkSize);
		return new THREE.Vector3(x,y,z);
	}
}



var WorldChunk = function(world, vec){
	world.chunks[vec.x+""+vec.z] = this;
	this.walls = []


	//lighting
	this.particleLights = []
	this.particleLights.push(new THREE.Mesh(new THREE.SphereGeometry(3,3,3), new THREE.MeshBasicMaterial({color: 0xffffff})))
	var pointLight = new THREE.PointLight(0xFFFFFF, 0.4, 3000);
	this.particleLights[0].add(pointLight);
	this.particleLights[0].position.x=vec.x*world.chunkSize+500; 
	this.particleLights[0].position.z=vec.z*world.chunkSize+100; 
	this.particleLights[0].position.y=300;
	

	this.walls.push(new Wall(world))
	this.walls[0]
	this.walls[0].hitbox.position.x=vec.x*world.chunkSize;
	this.walls[0].hitbox.position.z=vec.z*world.chunkSize;
	this.walls[0].hitbox.scale.y = 5000;
	
	Math.seedrandom(vec.x+''+vec.z);
	if(Math.random() > 0.2){
		world.scene.add(this.particleLights[0]);
	}
	this.walls[0].hitbox.position.y=-2500-(Math.random()*2000);
	var dist = Math.abs(vec.z) >  Math.abs(vec.z) ? Math.abs(vec.z) : Math.abs(vec.z)
	this.walls[0].hitbox.scale.x += 1000+Math.random()*1000;
	this.walls[0].hitbox.scale.z += 1000+Math.random()*1000;
	//this.walls[0].hitbox.position.y -= 500 * dist;
	Math.seedrandom()

	this.dispose = function(){

		world.scene.remove(this.particleLights[0]);

		$.each(this.walls, function(key, val) {
			val.world.scene.remove(val.hitbox)
		})
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