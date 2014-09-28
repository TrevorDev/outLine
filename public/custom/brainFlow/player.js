var Player = function(scene) {
    this.scene = scene;
    this.body = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), MATERIALS.DEFAULT)
    this.scene.add(this.body)
    this.healthBar = new THREE.Mesh(new THREE.SphereGeometry(10, 10, 10), MATERIALS.RED)
    this.healthBar.position.y = 20
    this.health = 100;
    //this.body.add(this.healthBar);
    this.body.position.y = 20
    this.spd = new THREE.Vector3(0, 0, 0);
    this.moveAcc = 1;
    this.maxSpd = 10;
    this.shotCooldown = 0;
    this.shotCooldownLimit = 40;
    this.projectiles = {}
    this.move = function() {}
    this.takeHit = function(dmg){
        this.health-=dmg;
        this.healthBar.scale.x -= dmg/100
        this.healthBar.scale.y -= dmg/100
        this.healthBar.scale.z -= dmg/100
    }
    this.isDead = function(){
        return (this.health <= 0)
    }
}

var MainPlayer = function(scene) {
    Player.call(this, scene)

    this.controller = new FLIXI.Controller({
        left: "left",
        right: "right",
        up: "up",
        down: "down",
        attack: "z"
    });

    this.move = function() {
        //MOVEMENT
        var keydown = false;
        if (this.controller.getKey("down")) {
            keydown = true;
            this.spd.x += Math.sin(this.body.rotation.y) * this.moveAcc
            this.spd.z += Math.cos(this.body.rotation.y) * this.moveAcc
        }
        if (this.controller.getKey("up")) {
            keydown = true;
            this.spd.x -= Math.sin(this.body.rotation.y) * this.moveAcc
            this.spd.z -= Math.cos(this.body.rotation.y) * this.moveAcc
        }
        if (this.controller.getKey("left")) {
            this.body.rotation.y += 0.05
        }
        if (this.controller.getKey("right")) {
            this.body.rotation.y -= 0.05
        }
        if (!keydown) {
            this.spd.setLength(0);
        }
        if (this.spd.length() > this.maxSpd) {
            this.spd.setLength(this.maxSpd)
        }
        this.body.position.add(this.spd)

        //ACTIONS
        if (this.controller.getKey("attack") && this.shotCooldown <= 0) {
            
        }
        this.shotCooldown--;
    }
}