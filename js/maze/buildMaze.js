var BuildMaze = function(maze, tam){
	var mat = maze.getMat();
	var width = maze.getWidth();
	var height = maze.getHeight();
	var tamW = width*tam;
	var tamH = height*tam;

	//var texture = THREE.ImageUtils.loadTexture("assets/textWalls.jpg");
	var wall = new THREE.BoxGeometry(tam, tam, tam);
	var materialWalls = new THREE.MeshBasicMaterial(/*{map: texture}*/);

	var objs = [];
	objs[0] = new THREE.Mesh(new THREE.PlaneGeometry(tamW, tamH), new THREE.MeshNormalMaterial());
	objs[0].rotation.x-=Math.PI/2;

	for(var i = 0; i < height; i++){
		for(var j = 0; j < width; j++){
			if(mat[i][j] === 1){
				objs.push(new THREE.Mesh(wall, materialWalls));
				objs[objs.length-1].position.y+=tam/2;
				objs[objs.length-1].position.x+=j*tam+tam/2-(tamW)/2;
				objs[objs.length-1].position.z+=i*tam+tam/2-(tamH)/2;				
			}
		}
	}

	var join = new THREE.Geometry();
	for(var i = 1; i < objs.length; i++){
		objs[i].updateMatrix();
		join.merge(objs[i].geometry, objs[i].matrix);
	}

	var mesh = new THREE.Mesh(join, materialWalls);

	return {
		matrix   : maze.getMat,
		walls	 : mesh,
		floor 	 : objs[0],
		tileSize : tam, 
		width 	 : tamW,
		height 	 : tamH
	};
}