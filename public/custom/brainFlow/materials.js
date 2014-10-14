var MATERIALS = {
	DEFAULT: new THREE.MeshPhongMaterial({
        color: 0xdddddd,
        shading: THREE.SmoothShading,
        shininess: 1
    }),
	GREEN: new THREE.MeshLambertMaterial({
        color: 0xAAEEAA,
        shading: THREE.SmoothShading
    }),
	RED: new THREE.MeshLambertMaterial({
        color: 0xFFAAAA,
        shading: THREE.SmoothShading
    })
}