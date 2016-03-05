var Enemy = function(maze, speed, height){
	
	var geometry = new THREE.CylinderGeometry(1, 1, height);
	var texture  = undefined;
	var material = new THREE.MeshBasicMaterial({color: 0xff0000});
	
	var geometry2 = new THREE.BoxGeometry(2, 2, 2);
	var material2 = new THREE.MeshBasicMaterial({color : '#FFFF00', wireframe : true});
	
	var enemy = Creature.call(this, maze);
	enemy.speedMod = speed;

	var direction_vectors = {
		left  : new THREE.Vector3(-1,  0,  0),
		up    : new THREE.Vector3( 0,  0, -1),
		right : new THREE.Vector3( 1,  0,  0),
		down  : new THREE.Vector3( 0,  0,  1)
	};
	var directions = ['left', 'up', 'right', 'down'];
	var direction = direction_vectors['right'];

	var chooseDirection = function(){
		var pos = enemy.getPos();
		var maze = enemy.getMaze();

		var dx = [-1, 0, 1, 0];
		var dy = [0, -1, 0, 1];

		var i = Math.floor((pos.x + maze.width/2 ) / maze.tileSize);
		var j = Math.floor((pos.z + maze.height/2) / maze.tileSize);

		//console.log([pos.x, pos.z, i, j]);

		var vet = [];
		for(var k = 0; k < 4; k++){
			var ii = i + dx[k];
			var jj = j + dy[k];
			if(ii >= 0 && jj >= 0 && ii < maze.matrix.length && jj < maze.matrix[0].length){
				if(maze.matrix[ii][jj] === -1){
					vet.push(direction_vectors[directions[k]]);
				}
			}
		}


		if(vet.length > 0) return vet[Math.floor(Math.random()*vet.length)].clone();
		else return false;
	}

	var updateAcceleration = function() {
		var dir = chooseDirection(0);
		if(dir !== false) enemy.setSpeed(dir.multiplyScalar(enemy.speedMod));

		//console.log(enemy.getSpeed());
	}

	var treatCollision = function() {
		var dir = chooseDirection(0);
		if(dir !== false) enemy.setSpeed(dir.multiplyScalar(enemy.speedMod));
		enemy.setSpeed((chooseDirection(1)).multiplyScalar(enemy.speedMod));
	}

	enemy.setMesh(new THREE.Mesh(geometry, material), new THREE.Mesh(geometry2, material2));
	enemy.setUpdateAcceleration(updateAcceleration);
	enemy.setAccMod(0);
	enemy.setDecMod(0);
	enemy.setTreatCollision(treatCollision);
	enemy.setSpeed(new THREE.Vector3(1, 0, 0));

	return enemy;
}