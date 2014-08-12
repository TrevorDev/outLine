var Projectile = function(pos, spd, projId) {
	this.projId = projId
	this.body = new THREE.Mesh(new THREE.SphereGeometry(7, 10, 10), MATERIALS.DEFAULT)
	this.spd = spd;
	this.dmg = 10
	this.body.position.copy(pos)
	this.move = function(){
		this.body.position.add(this.spd)
	}
}