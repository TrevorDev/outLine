var Wall = function(scene) {
    this.scene = scene;
    this.hitbox = new THREE.Mesh(new THREE.BoxGeometry(500, 20, 500), MATERIALS.DEFAULT)
    this.scene.add(this.hitbox)
    this.getVertices = function(){
        var ret = [];
        var h = this.hitbox;
        $.each(this.hitbox.geometry.vertices, function(i, v){
            ret.push(v.clone().applyMatrix4(h.matrixWorld));
        })
        return ret;
    }

    this.getFaces = function(){
        var verts = this.getVertices();
        var ret = [];
        $.each(this.hitbox.geometry.faces, function(i, f){
            //TODO verts and normal need to be rotated to match world
            ret.push(new HitFace(verts[f.a],verts[f.b],verts[f.c], f.normal));
        })
        return ret;
    }

    this.checkCollision = function(from, to){
        var faces = this.getFaces()
        for(var i=0;i<faces.length;i++){
            var face = faces[i];
            var hit = Collision.lineFace(from, to, face);
            if(hit){
                var otherHit = Collision.linePlane(to, to.clone().add(face.normal), face);
                if(otherHit){
                    return otherHit.add(face.normal.clone().multiplyScalar(0.1));
                }
            }
        }
        return null;
    }
    //this.hitbox.position.y = 20
}

var HitFace = function(v1, v2, v3, normal){
    this.a = v1;
    this.b = v2;
    this.c = v3;
    this.normal = normal;
}