var EnemiesGenerator = function(maze, speed, qtd, height){
	var enemies = [];

	var x = 1;
	var y = 1;	
	for(var i = 0; i < qtd; i++){
		enemies[i] = new Enemy(maze, speed, height);
		enemies[i].setPos(new THREE.Vector3(y*maze.tileSize+0.9-0.5 * (maze.width), 0.5 * height, 
										x*maze.tileSize+0.9-0.5 * (maze.height)));
		enemies[i].lastTile = [x, y];
		y+=2;
		if(y >= maze.matrix.length){
			y = 0;
			x+=2;
		}
	}

	return enemies;
}