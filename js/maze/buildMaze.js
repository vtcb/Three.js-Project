var BuildMaze = function(maze, tam){
	var mat = maze.getMat();
	var width = maze.getWidth();
	var height = maze.getHeight();
	var tamW = width*tam;
	var tamH = height*tam;

	var material = new THREE.MeshNormalMaterial();
	var wall = new THREE.BoxGeometry(tam, tam, tam);

	var objs = [];
	objs[0] = new THREE.Mesh(new THREE.PlaneGeometry(tamW, tamH), material);
	objs[0].rotation.x-=Math.PI/2;

	for(var i = 0; i < height; i++){
		for(var j = 0; j < width; j++){
			if(mat[i][j] === 1){
				objs.push(new THREE.Mesh(wall, material));
				objs[objs.length-1].position.y+=tam/2;
				objs[objs.length-1].position.x+=j*tam+tam/2-(tamW)/2;
				objs[objs.length-1].position.z+=i*tam+tam/2-(tamH)/2;				
			}
		}
	}

	var join = new THREE.Geometry();
	for(var i = 0; i < objs.length; i++){
		objs[i].updateMatrix();
		join.merge(objs[i].geometry, objs[i].matrix);
	}

	var mesh = new THREE.Mesh(join, material);

	return {
		map		 : mesh,
		tileSize : tam, 
		width 	 : tamW,
		height 	 : tamH
	};
}