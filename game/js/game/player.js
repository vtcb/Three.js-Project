var Player = function(kbh, radius, position, maze) {
	var obj       = Creature.call(this, maze);

	var kbh       = kbh;
	var geometry  = new THREE.SphereGeometry(radius, 50, 50);
	var geometry2 = new THREE.BoxGeometry(2, 2, 2);
	
	var texture   = THREE.ImageUtils.loadTexture("./assets/textures/leodicaprio.jpg");

	var material  = new THREE.MeshBasicMaterial({map : texture});
	var material2 = new THREE.MeshBasicMaterial({color : '#FFFF00', transparent: true, opacity : 0});
	
	var mesh      = new THREE.Mesh(geometry, material);
	var mesh2     = new THREE.Mesh(geometry2, material2);

	mesh.rotation.x = -0.15*Math.PI;
	mesh.rotation.y = 1.5*Math.PI;
	mesh.rotation.z = 1;

	var position = position;
	var initialPos = Global.nullV3();

	var collisionEnable	= true;

	var acceleratingDirections = [];

	var lives = Global.player.qtdLives;

	var controls = {
	    /*65 : 'left',	// A
	    87 : 'up',		// W
	    68 : 'right',	// D
	    83 : 'down',	// S*/
	};

	var direction_vectors = {
		left  : new THREE.Vector3(-1,  0,  0),
		up    : new THREE.Vector3( 0,  0, -1),
		right : new THREE.Vector3( 1,  0,  0),
		down  : new THREE.Vector3( 0,  0,  1)
	};

	var updateAcceleration = function(leanAcc) {
		acceleratingDirections = [];

		for(var code in controls) {
			if(kbh.isPressed(code)) {
				acceleratingDirections.push(controls[code]);
			}
		}

		/* Unique */
		acceleratingDirections.filter(
			function(value, index, self) {
				return self.indexOf(value) === index;
			}
		);

		var acceleration = Global.nullV3();
		var rotation 	 = Global.nullV3();

		for(var i in acceleratingDirections) {
			var direction = acceleratingDirections[i];
			acceleration.add(direction_vectors[direction]);
		}

		acceleration.normalize();
		acceleration.multiplyScalar(obj.getAccMod());
		acceleration.add(leanAcc);

		if (leanAcc.x !== 0)	{
			rotation.z = -Global.floor.angle*leanAcc.x/Math.abs(leanAcc.x);
		}
		else	{
			rotation.z = 0;
		}

		if (leanAcc.z !== 0)	{
			rotation.x = Global.floor.angle*leanAcc.z/Math.abs(leanAcc.z);
		}
		else	{
			rotation.x = 0;
		}
		
		obj.setRotation(rotation);
		obj.setAcc(acceleration);
	};

	var updateObj = function(leanAcc, collidableObjects) {
		var flag = false;
		var col = collision(obj.getMesh2(), collidableObjects);

		if (col !== false)  {
	    	//console.log(">>> colisão <<<");
	    	//console.log(obj.getInitialPosition().clone());
	    	obj.setPos(obj.getInitialPosition().clone());
	    	(obj.getUpdateMesh())();
	    	lives--;

	    	if (lives === 0)	{
	    		flag = true;
	    	}
	    }
	    else {
			(obj.getUpdateAcceleration())(leanAcc);
	        (obj.getMove())();
	        (obj.getUpdateMesh())();
    	}

    	return flag;
    };

	obj.setUpdateAcceleration(updateAcceleration);
	obj.setAccMod(Global.player.acceleration);
	obj.setDecMod(Global.player.deceleration);
	obj.setPos(position);
	obj.setMesh(mesh, mesh2);
	obj.setUpdateObj(updateObj);

	return obj;
};