var BuildMaze = function(maze, tam){
	var mat = maze.getMat();
	var width = maze.getWidth();
	var height = maze.getHeight();
	var tamW = width*tam;
	var tamH = height*tam;

	var objs = [];
	objs[0] = new THREE.Mesh(new THREE.PlaneGeometry(tamW, tamH), new THREE.MeshNormalMaterial());
	objs[0].rotation.x-=Math.PI/2;

	for(var i = 0; i < height; i++){
		for(var j = 0; j < width; j++){
			if(mat[i][j] === 1){
				objs.push(new THREE.Mesh(new THREE.BoxGeometry(tam, tam, tam), new THREE.MeshNormalMaterial()));
				objs[objs.length-1].position.y+=tam/2;
				objs[objs.length-1].position.x+=j*tam+tam/2-(tamW)/2;;
				objs[objs.length-1].position.z+=i*tam+tam/2-(tamH)/2;;				
			}
		}
	}

	return {
		getObjs: function(){
			return objs;
		}
	};
}