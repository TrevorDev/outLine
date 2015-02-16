var World = function(width, height){
	this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 8000);
	this.camera.position.set(0, 200, 800);
	this.scene = new THREE.Scene();
}

var MainWorld = function(){
	World.call(this)
	this.player = new MainPlayer(this)
	this.player.body.position.y += 100
	//Natural light
	//this.scene.add(new THREE.AmbientLight(0x777777));

	// Materials
	materials=[]
	this.walls = [];
	materials.push(MATERIALS.DEFAULT);
	materials.push(MATERIALS.SHINY);
	materials.push(MATERIALS.SMOOTH);
	var w = new Wall(this);
	w.hitbox.position.y -= 100;
	w.hitbox.position.x -= 100;
	//w.hitbox.scale.x = 5000
	this.walls.push(w);
	// Spheres geometry
	var sphere, geometry, material;

	for ( var i = 0, l = materials.length; i < l; i ++ ) {
		sphere = new THREE.Mesh( new THREE.SphereGeometry( 70, 32, 16 ), materials[ i ] );

		sphere.position.x = ( i % 4 ) * 200 - 400;
		sphere.position.z = Math.floor( i / 4 ) * 200 - 200;

		sphere.rotation.x = Math.random() * 200 - 100;
		sphere.rotation.y = Math.random() * 200 - 100;
		sphere.rotation.z = Math.random() * 200 - 100;

		this.scene.add( sphere );

	}

	// Lights
	this.scene.add( new THREE.AmbientLight( 0x111111 ) );
	particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
	particleLight.position.y+=40;
	this.player.body.add( particleLight );
	var pointLight = new THREE.PointLight( 0xffffff, 1 );
	particleLight.add( pointLight );

	this.runFrame = function(){
		this.player.move();
		this.camera.position.copy(this.player.body.position);
	    this.camera.position.y = this.player.body.position.y+100;
	    this.camera.position.x += Math.sin(this.player.body.rotation.y) * 300
	    this.camera.position.z += Math.cos(this.player.body.rotation.y) * 300
	    this.camera.lookAt(this.player.body.position);
	}
	
}