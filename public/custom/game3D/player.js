var Player = function() {
        this.body = new THREE.Mesh(new THREE.SphereGeometry(20, 10, 10), MATERIALS.DEFAULT)
        this.body.position.y=20
        this.spd = new THREE.Vector3(0, 0, 0);
        this.controller = new FLIXI.Controller({
            left: "left",
            right: "right",
            up: "up",
            down: "down",
            attack: "z"
        });
        this.moveAcc = 1;
        this.maxSpd = 10;
        this.move = function() {
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
            if(!keydown){
                this.spd.setLength(0);
            }
            if (this.spd.length() > this.maxSpd) {
                this.spd.setLength(this.maxSpd)
            }
            this.body.position.add(this.spd)
        }
    }

var OtherPlayer = function() {
    this.body = new THREE.Mesh(new THREE.SphereGeometry(20, 10, 10), MATERIALS.DEFAULT)
}