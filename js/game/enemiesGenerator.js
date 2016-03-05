var EnemiesGenerator = function(maze, speed, qtd, height){
	var enemies = [];

	var x = 1;
	var y = 1;	
	for(var i = 0; i < qtd; i++){
		enemies[i] = new Enemy(maze, speed, height);
		enemies[i].setPos(new THREE.Vector3(y*maze.tileSize+maze.tileSize/2-(maze.width)/2, height/2, 
										x*maze.tileSize+maze.tileSize/2-(maze.height)/2));
		y+=2;
		if(y >= maze.matrix.length){
			y = 0;
			x+=2;
		}
	}

	return enemies;
}