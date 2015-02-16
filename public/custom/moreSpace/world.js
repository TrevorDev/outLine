var World = function(width, height){
	this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 8000);
	this.camera.position.set(0, 200, 800);
	this.scene = new THREE.Scene();
}

var MainWorld = function(){
	World.call(this)

	//Natural light
	this.scene.add(new THREE.AmbientLight(0x777777));
	var line_material = new THREE.LineBasicMaterial( { color: 0x303030 } ),
		geometry = new THREE.Geometry(),
		floor = -75, step = 25;

	for ( var i = 0; i <= 40; i ++ ) {

		geometry.vertices.push( new THREE.Vector3( - 500, floor, i * step - 500 ) );
		geometry.vertices.push( new THREE.Vector3(   500, floor, i * step - 500 ) );

		geometry.vertices.push( new THREE.Vector3( i * step - 500, floor, -500 ) );
		geometry.vertices.push( new THREE.Vector3( i * step - 500, floor,  500 ) );

	}

	var line = new THREE.Line( geometry, line_material, THREE.LinePieces );
	this.scene.add( line );

	// Materials
	materials=[]
	var texture = new THREE.Texture( generateTexture() );
	texture.needsUpdate = true;

	materials.push( new THREE.MeshLambertMaterial( { map: texture, transparent: true } ) );
	materials.push( new THREE.MeshLambertMaterial( { color: 0xdddddd, shading: THREE.FlatShading } ) );
	materials.push( new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } ) );
	materials.push( new THREE.MeshNormalMaterial( ) );
	materials.push( new THREE.MeshBasicMaterial( { color: 0xffaa00, transparent: true, blending: THREE.AdditiveBlending } ) );
	//materials.push( new THREE.MeshBasicMaterial( { color: 0xff0000, blending: THREE.SubtractiveBlending } ) );

	materials.push( new THREE.MeshLambertMaterial( { color: 0xdddddd, shading: THREE.SmoothShading } ) );
	materials.push( new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.SmoothShading, map: texture, transparent: true } ) );
	materials.push( new THREE.MeshNormalMaterial( { shading: THREE.SmoothShading } ) );
	materials.push( new THREE.MeshBasicMaterial( { color: 0xffaa00, wireframe: true } ) );

	materials.push( new THREE.MeshDepthMaterial() );

	materials.push( new THREE.MeshLambertMaterial( { color: 0x666666, emissive: 0xff0000, ambient: 0x000000, shading: THREE.SmoothShading } ) );
	materials.push( new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x666666, emissive: 0xff0000, ambient: 0x000000, shininess: 10, shading: THREE.SmoothShading, opacity: 0.9, transparent: true } ) );

	materials.push( new THREE.MeshBasicMaterial( { map: texture, transparent: true } ) );

	// Spheres geometry

	var geometry_smooth = new THREE.SphereGeometry( 70, 32, 16 );
	var geometry_flat = new THREE.SphereGeometry( 70, 32, 16 );
	var geometry_pieces = new THREE.SphereGeometry( 70, 32, 16 ); // Extra geometry to be broken down for MeshFaceMaterial

	for ( var i = 0, l = geometry_pieces.faces.length; i < l; i ++ ) {

		var face = geometry_pieces.faces[ i ];
		face.materialIndex = Math.floor( Math.random() * materials.length );

	}

	geometry_pieces.materials = materials;

	materials.push( new THREE.MeshFaceMaterial( materials ) );

	objects = [];

	var sphere, geometry, material;

	for ( var i = 0, l = materials.length; i < l; i ++ ) {

		material = materials[ i ];

		geometry = material instanceof THREE.MeshFaceMaterial ? geometry_pieces :
				   ( material.shading == THREE.FlatShading ? geometry_flat : geometry_smooth );

		sphere = new THREE.Mesh( geometry, material );

		sphere.position.x = ( i % 4 ) * 200 - 400;
		sphere.position.z = Math.floor( i / 4 ) * 200 - 200;

		sphere.rotation.x = Math.random() * 200 - 100;
		sphere.rotation.y = Math.random() * 200 - 100;
		sphere.rotation.z = Math.random() * 200 - 100;

		objects.push( sphere );

		this.scene.add( sphere );

	}

	particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
	this.scene.add( particleLight );

	// Lights

	this.scene.add( new THREE.AmbientLight( 0x111111 ) );

	var directionalLight = new THREE.DirectionalLight( /*Math.random() * */ 0xffffff, 0.125 );

	directionalLight.position.x = Math.random() - 0.5;
	directionalLight.position.y = Math.random() - 0.5;
	directionalLight.position.z = Math.random() - 0.5;

	directionalLight.position.normalize();

	this.scene.add( directionalLight );

	var pointLight = new THREE.PointLight( 0xffffff, 1 );
	particleLight.add( pointLight );

				
	
}

function generateTexture() {

				var canvas = document.createElement( 'canvas' );
				canvas.width = 256;
				canvas.height = 256;

				var context = canvas.getContext( '2d' );
				var image = context.getImageData( 0, 0, 256, 256 );

				var x = 0, y = 0;

				for ( var i = 0, j = 0, l = image.data.length; i < l; i += 4, j ++ ) {

					x = j % 256;
					y = x == 0 ? y + 1 : y;

					image.data[ i ] = 255;
					image.data[ i + 1 ] = 255;
					image.data[ i + 2 ] = 255;
					image.data[ i + 3 ] = Math.floor( x ^ y );

				}

				context.putImageData( image, 0, 0 );

				return canvas;

			}