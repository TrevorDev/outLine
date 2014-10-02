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
		this.walls.push(new Wall(this))
		this.walls.push(new Wall(this))
		this.walls[i*5].hitbox.position.z-=550*i;
		this.walls[i*5].hitbox.position.y-=500;
		this.walls[i*5+1].hitbox.position.z-=550*i;
		this.walls[i*5+1].hitbox.position.x=200;
		this.walls[i*5+1].hitbox.position.y-=500;
		this.walls[i*5+1].hitbox.rotation.z = Math.PI/5;
		this.walls[i*5+2].hitbox.position.z-=550*i;
		this.walls[i*5+2].hitbox.position.x-=200;
		this.walls[i*5+2].hitbox.position.y-=500;
		this.walls[i*5+2].hitbox.rotation.z = -Math.PI/5;
		this.walls[i*5+3].hitbox.position.z-=550*i;
		this.walls[i*5+3].hitbox.position.x-=400;
		this.walls[i*5+3].hitbox.position.y-=500;
		this.walls[i*5+3].hitbox.rotation.z = Math.PI/2;
		this.walls[i*5+4].hitbox.position.z-=550*i;
		this.walls[i*5+4].hitbox.position.x+=400;
		this.walls[i*5+4].hitbox.position.y-=500;
		this.walls[i*5+4].hitbox.rotation.z = Math.PI/2;
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
	    this.player.move();
	   

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