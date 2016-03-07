var EnemiesGenerator = function(maze, speed, qtd, height){
	var enemies = [];

	var direction_vectors = {
		left  : new THREE.Vector3(-1,  0,  0),
		up    : new THREE.Vector3( 0,  0, -1),
		right : new THREE.Vector3( 1,  0,  0),
		down  : new THREE.Vector3( 0,  0,  1)
	};
	var directions = ['left', 'up', 'right', 'down'];
	var dx = [0, -1, 0, 1];
	var dy = [-1, 0, 1, 0];

	var x = 1;
	var y = 1;	
	for(var i = 0; i < qtd; i++){
		enemies[i] = new Enemy(maze, speed, height);
		enemies[i].setPos(new THREE.Vector3(y*maze.tileSize+0.9-0.5 * (maze.width), 0.5 * height, 
										x*maze.tileSize+0.9-0.5 * (maze.height)));
		enemies[i].lastTile = [x, y];

		for(var j = 0; j < 4; j++) {
			var xx = x + dx[j];
			var yy = y + dy[j];

			if(xx > 0 && yy > 0 && xx < maze.matrix.length-1 && yy < maze.matrix[0].length-1) {
				if(maze.matrix[xx][yy] === -1) {
					enemies[i].lastDirection = directions[j];
					enemies[i].setSpeed(direction_vectors[directions[j]].clone());
					break;
				}
			}
		}

		y+=2;
		if(y >= maze.matrix.length){
			y = 0;
			x+=2;
		}
	}

	return enemies;
}