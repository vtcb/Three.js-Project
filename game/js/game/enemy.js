var Enemy = function(maze, speed, height){
	
	var geometry = new THREE.CylinderGeometry(0.9, 0.9, height);
	var texture  = undefined;
	var material = new THREE.MeshBasicMaterial({color: 0xff0000});

	var geometry2 = new THREE.BoxGeometry(1.8, height, 1.8);
	var material2 = new THREE.MeshBasicMaterial({color : '#2000FF', wireframe : true});
	
	var enemy = Creature.call(this, maze);
	enemy.speedMod = speed;
	enemy.lastDirection = undefined;
	enemy.lastTile = undefined;

	var direction_vectors = {
		left  : new THREE.Vector3(-1,  0,  0),
		up    : new THREE.Vector3( 0,  0, -1),
		right : new THREE.Vector3( 1,  0,  0),
		down  : new THREE.Vector3( 0,  0,  1)
	};
	var opposites = {
		left  : 'right',
		up    : 'down',
		right : 'left',
		down  : 'up'
	};
	var directions = ['left', 'up', 'right', 'down'];
	var direction = direction_vectors['right'];

	var chooseDirection = function() {
		var pos = enemy.getPos();
		var maze = enemy.getMaze();

		var di = [-1, 0, 1, 0];
		var dj = [0, -1, 0, 1];

		var j = Math.floor((pos.x + 0.5*maze.width ) / maze.tileSize);
		var i = Math.floor((pos.z + 0.5*maze.height) / maze.tileSize);


		//console.log([pos.x, pos.z, i, j]);

		var flag = 0;
		var vet = [];
		for(var k = 0; k < 4; k++){
			var ii = i + dj[k];
			var jj = j + di[k];
			if(ii >= 0 && jj >= 0 && ii < maze.matrix.length && jj < maze.matrix[0].length){
				if(maze.matrix[ii][jj] === -1 && directions[k] !== opposites[enemy.lastDirection]){
					vet.push(directions[k]);
					//console.log(directions[k]);
				}
				else if(directions[k] === opposites[enemy.lastDirection]) flag = 1;
			}
		}

		if(flag !== 1) vet = [];
		if(i !== enemy.lastTile[0] || j !== enemy.lastTile[1]) {
			enemy.lastTile = [i, j];
		}
		else vet = [];

		if(vet.length > 0) return vet[Math.floor(Math.random()*vet.length)];
		else return false;
	}

	var updateAcceleration = function() {
		var dir = chooseDirection();
		if(dir !== false) {
			enemy.lastDirection = dir;
			enemy.setSpeed(direction_vectors[dir].clone().multiplyScalar(enemy.speedMod));
		}
		else{
			enemy.setSpeed(direction_vectors[enemy.lastDirection].clone().multiplyScalar(enemy.speedMod));
		}
	}

	var treatCollision = function() {
		var dir = chooseDirection();
		if(dir !== false) {
			enemy.lastDirection = dir;
			enemy.setSpeed(direction_vectors[dir].clone().multiplyScalar(enemy.speedMod));
		}
		else {
			enemy.lastDirection = opposites[enemy.lastDirection];
			enemy.setSpeed(direction_vectors[opposites[enemy.lastDirection]].clone().multiplyScalar(enemy.speedMod));
		}

	}

	enemy.setMesh(new THREE.Mesh(geometry, material), new THREE.Mesh(geometry2, material2));
	enemy.setUpdateAcceleration(updateAcceleration);
	enemy.setAccMod(0);
	enemy.setDecMod(0);
	enemy.setTreatCollision(treatCollision);

	return enemy;
}
