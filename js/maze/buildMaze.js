var mazeBuilder = function(width, height, I_ini, J_ini, I_end, J_end, tam){
	mat = mazeGenerator(width, height, I_ini, J_ini, I_end, J_end);

	var objs = [];
	objs[0] = new THREE.Mesh(new THREE.PlaneGeometry(width*tam, height*tam), new THREE.MeshNormalMaterial());
	objs[0].rotation.x-=Math.PI/2;
	objs[0].position.x+=(width*tam)/2;
	objs[0].position.z+=(height*tam)/2;

	for(var i = 0; i < height; i++){
		for(var j = 0; j < width; j++){
			if(mat[i][j] === 1){
				objs.push(new THREE.Mesh(new THREE.BoxGeometry(tam, tam, tam), new THREE.MeshNormalMaterial()));
				objs[objs.length-1].position.y-=tam/2;
				objs[objs.length-1].position.x+=j*tam+tam/2;
				objs[objs.length-1].position.z+=i*tam+tam/2;				
			}
		}
	}

	return objs;
}