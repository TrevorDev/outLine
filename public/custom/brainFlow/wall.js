var Wall = function(scene) {
    this.scene = scene;
    this.hitbox = new THREE.Mesh(new THREE.BoxGeometry(500, 20, 500), MATERIALS.DEFAULT)
    this.scene.add(this.hitbox)
    this.getVertices = function(){
        var ret = [];
        $.each(this.hitbox.geometry.vertices, function(i, v){
            ret.push(v.clone());
        })
        return ret;
    }

    this.getFaces = function(){
        var verts = this.getVertices();
        var ret = [];
        $.each(this.hitbox.geometry.faces, function(i, f){
            ret.push(new HitFace(verts[f.a],verts[f.b],verts[f.c]));
        })
        return ret;
    }

    this.checkCollision = function(from, to){
        var faces = this.getFaces()

        var line = to.clone().sub(from);

        //when line collides with plane:
        //from + x*line = face.a + y*planeX + z*planeY
        //x*line + y*-planeX + z*-planeY = face.a - from
        //x y z = right

        for(var i=0;i<faces.length;i++){
            var face = faces[i];
            var right = face.a.clone().sub(from)
            var planeX = face.a.clone().sub(face.b);
            var planeY = face.a.clone().sub(face.c);

            //CRAMERS RULE X,Y,Z
            var det = line.x*((planeX.y*planeY.z)-(planeX.z*planeY.y)) - planeX.x*((line.y*planeY.z)-(line.z*planeY.y)) + planeY.x*((line.y*planeX.z)-(line.z*planeX.y));
            var detX = right.x*((planeX.y*planeY.z)-(planeX.z*planeY.y)) - planeX.x*((right.y*planeY.z)-(right.z*planeY.y)) + planeY.x*((right.y*planeX.z)-(right.z*planeX.y));
            var detY = line.x*((right.y*planeY.z)-(right.z*planeY.y)) - right.x*((line.y*planeY.z)-(line.z*planeY.y)) + planeY.x*((line.y*right.z)-(line.z*right.y));
            var detZ = line.x*((planeX.y*right.z)-(planeX.z*right.y)) - planeX.x*((line.y*right.z)-(line.z*right.y)) + right.x*((line.y*planeX.z)-(line.z*planeX.y));
            
            if(det!=0){

                var x = detX/det;
                var y = detY/det;
                var z = detZ/det;
                console.log(x,y,z)
                if(x>=0&&x<=1&&y>=0&&y<=1&&z>=0&&z<=1){
                    console.log("collided")
                    return true;
                }
            }
        }
        return false;
    }
    //this.hitbox.position.y = 20
}

var HitFace = function(v1, v2, v3){
    this.a = v1;
    this.b = v2;
    this.c = v3;
}