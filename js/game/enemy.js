var Enemy = function(qtd, map, maze){
	var geometry = new THREE.CylinderGeometry(1, 1, 2.5);
	var texture  = undefined;
	var material = new THREE.MeshBasicMaterial({color: 0xff0000});
	var enemys = [];

	var x = 0;
	var y = 0;	
	for(var i = 0; i < qtd; i++){
		enemy[i] = Creature.call(this);
		enemys[i].setMesh(new THREE.Mesh(geometry, material));
		enemys[i].setPos(new THREE.Vector3(y*tam+tam/2-(tamW)/2, 0, x*tam+tam/2-(tamH)/2))
		y++;
		if(y >= map.width){
			y = 0;
			x++;
		}
	}

	var direction_vectors = {
		left  : new THREE.Vector3(-1,  0,  0),
		up    : new THREE.Vector3( 0,  0, -1),
		right : new THREE.Vector3( 1,  0,  0),
		down  : new THREE.Vector3( 0,  0,  1)
	};

	var 
}