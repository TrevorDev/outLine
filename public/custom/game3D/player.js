var Player = function(scene) {
    this.scene = scene;
    this.body = new THREE.Mesh(new THREE.SphereGeometry(20, 10, 10), MATERIALS.DEFAULT)
    this.scene.add(this.body)
    this.healthBar = new THREE.Mesh(new THREE.SphereGeometry(10, 10, 10), MATERIALS.RED)
    this.healthBar.position.y = 20
    this.health = 100;
    this.body.add(this.healthBar);
    this.body.position.y = 20
    this.spd = new THREE.Vector3(0, 0, 0);
    this.moveAcc = 1;
    this.maxSpd = 10;
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

var MainPlayer = function(scene, socket) {
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

        for(var key in this.projectiles) {
            this.projectiles[key].move();
        }

        //ACTIONS
        if (this.controller.getKeyPressed("attack")) {
            var spd = 40;
            var spdVec = new THREE.Vector3(-Math.sin(this.body.rotation.y) * spd, 0, -Math.cos(this.body.rotation.y) * spd)
            var id = FLIXI.randomID();
            var proj = new Projectile(this.body.position, spdVec, id);
            this.scene.add(proj.body)
            this.projectiles[id] = proj
            socket.emit("shotFired", {
                projId: proj.projId,
                pos: player.body.position,
                spd: spdVec
            })
        }
    }
}

var OtherPlayer = function(scene) {
    Player.call(this, scene)

    this.oldUpdateTime = new Date()
    this.oldPos = new THREE.Vector3()
    this.newUpdateTime = new Date()
    this.nextPos = new THREE.Vector3()

    this.updatePos = function(nxt){
        this.oldUpdateTime = this.newUpdateTime
        this.oldPos.copy(this.body.position)
        //console.log(this.oldPos)
        this.newUpdateTime = new Date()
        this.nextPos.copy(nxt)
    }

    this.move = function() {
        var curTime = new Date();
        var timeDiff = (this.newUpdateTime - this.oldUpdateTime)
        //replace with cubic spline TODO
        if(timeDiff!=0){
            var fraction = (curTime - this.newUpdateTime)/timeDiff
            var posDiff = new THREE.Vector3()
            
            posDiff.subVectors(this.nextPos, this.oldPos)
            posDiff.multiplyScalar(fraction)
            posDiff.add(this.oldPos)
            this.body.position.copy(posDiff)
        }
        

        for(var key in this.projectiles) {
            this.projectiles[key].move();
        }
    }
}