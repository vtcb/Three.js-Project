var BuildMaze = function(maze, tam){
    var mat = maze.getMat();
    var width = maze.getWidth();
    var height = maze.getHeight();
    var tamW = width*tam;
    var tamH = height*tam;

    //var texture = THREE.ImageUtils.loadTexture("assets/textWalls.jpg");
    var wall = new THREE.BoxGeometry(tam, tam, tam);
    var materialWalls = new THREE.MeshBasicMaterial({color: 0xaa00aa, wireframe:true});

    var objs = [], objs2 = [];
    objs[0] = new THREE.Mesh(new THREE.PlaneGeometry(tamW, tamH), new THREE.MeshBasicMaterial());
    objs[0].rotation.x -= 0.5 * Math.PI;
    objs2[0] = new THREE.Mesh(new THREE.PlaneGeometry(tamW, tamH), new THREE.MeshBasicMaterial());
    objs2[0].rotation.x -= 0.5 * Math.PI;

    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            if(mat[i][j] === 1) {
                objs.push(new THREE.Mesh(wall, materialWalls));
                objs[objs.length-1].position.y += tam/2;
                objs[objs.length-1].position.x += j*tam+tam/2-(tamW)/2;
                objs[objs.length-1].position.z += i*tam+tam/2-(tamH)/2;

                objs2.push(new THREE.Mesh(wall, materialWalls));
                objs2[objs2.length-1].position.y += tam/2;
                objs2[objs2.length-1].position.x += j*tam+tam/2-(tamW)/2;
                objs2[objs2.length-1].position.z += i*tam+tam/2-(tamH)/2;

                mat[i][j] = objs.length-1;
            } else {
                mat[i][j] = -1;
            }
        }
    }

    var join = new THREE.Geometry();
    for(var i = 1; i < objs2.length; i++){
        objs2[i].updateMatrix();
        join.merge(objs2[i].geometry, objs2[i].matrix);
    }

    var mesh = new THREE.Mesh(join, materialWalls);

    return {
        objs     : objs,
        matrix   : mat,
        walls    : mesh,
        floor    : objs[0],
        tileSize : tam,
        width    : tamW,
        height   : tamH
    };
}