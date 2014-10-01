var Player = function(world) {
    this.world = world;
    this.body = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), MATERIALS.DEFAULT)
    this.world.scene.add(this.body)
    this.healthBar = new THREE.Mesh(new THREE.SphereGeometry(10, 10, 10), MATERIALS.RED)
    this.healthBar.position.y = 20
    this.health = 100;
    this.gravity = 0.1;
    //this.body.add(this.healthBar);
    this.body.position.y = 20
    this.spd = new THREE.Vector3(0, 0, 0);
    this.moveAcc = 1;
    this.maxSpd = 20;
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

    this.getFeet = function(){
        var ret = this.body.position.clone();
        ret.y-=10;
        return ret;
    }

    this.moveFeetTo = function(vec3){
        this.body.position.copy(vec3)
        this.body.position.y+=10;
    }

    this.isDead = function(){
        return (this.health <= 0)
    }
}

var MainPlayer = function(world) {
    Player.call(this, world)

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
            //this.spd.setLength(0);
        }
        if (this.spd.length() > this.maxSpd) {
            this.spd.setLength(this.maxSpd)
        }

        this.spd.y-=this.gravity;
        //ACTIONS
        if (this.controller.getKey("attack") && this.shotCooldown <= 0) {
            this.spd.y = 3;
        }

        this.body.position.add(this.spd)

        
        this.shotCooldown--;
    }
}