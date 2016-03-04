var createEnemies = function(qtd, maze, speed, maze){
	var geometry = new THREE.CylinderGeometry(1, 1, 2.5);
	var texture  = undefined;
	var material = new THREE.MeshBasicMaterial({color: 0xff0000});
	var enemies = [];
	var speed = speed;
	var direction = direction_vectors['right'];


	var direction_vectors = {
		left  : new THREE.Vector3(-1,  0,  0),
		up    : new THREE.Vector3( 0,  0, -1),
		right : new THREE.Vector3( 1,  0,  0),
		down  : new THREE.Vector3( 0,  0,  1)
	};


	var chooseDirection = function(dir){
		var prob = Math.random()*100;
		
	}

	var updateAcceleration = function(){
		var pos = obj.getPos();
		var maze = obj.getMaze();

	}

	var treatCollision = function(dir){
		var sp = obj.getSpeed();
		var spAnt = sp.clone();
		sp = sp.multiplyScalar(-1);
		dir.projectOnVector(sp);
		obj.setSpeed(dir);
		var position = obj.getPos();
		obj.setPos(position.add(dir));


	}

	var x = 0;
	var y = 0;	
	for(var i = 0; i < qtd; i++){
		enemies[i] = Creature.call(this, maze);
		enemies[i].setMesh(new THREE.Mesh(geometry, material));
		enemies[i].setPos(new THREE.Vector3(y*maze.tileSize+maze.tileSize/2-(maze.width)/2, 0, 
										x*maze.tileSize+maze.tileSize/2-(maze.height)/2));
		enemies[i].setUpdateAcceleration(updateAcceleration);
		enemies[i].setAccMod(0);
		enemies[i].setDecMod(0);
		enemies[i].setTreatCollision(treatCollision);
		enemies[i].speedMod = speed;
		y++;
		if(y >= map.width){
			y = 0;
			x++;
		}
	}



	return {
		enemies: enemies, 
		qtd: qtd
	};
}