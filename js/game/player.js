var Player = function(kbh, radius, position, maze) {
	var obj       = Creature.call(this, maze);

	var kbh       = kbh;
	var geometry  = new THREE.SphereGeometry(radius, 50, 50);
	var geometry2 = new THREE.BoxGeometry(2, 2, 2);
	
	var texture   = undefined;
	
	var material  = new THREE.MeshNormalMaterial();
	var material2 = new THREE.MeshBasicMaterial({color : '#FFFF00', wireframe : true});
	
	var mesh      = new THREE.Mesh(geometry, material);
	var mesh2     = new THREE.Mesh(geometry2, material2);

	var position = position;

	var acceleratingDirections = [];

	var controls = {
	    37 : 'left',    // Left  Arrow
	    38 : 'up',      // Up    Arrow
	    39 : 'right',	// Right Arrow
	    40 : 'down',	// Down  Arrow
	    65 : 'left',	// A
	    87 : 'up',		// W
	    68 : 'right',	// D
	    83 : 'down',	// S
	    32 : 'jump'		// Space bar
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
			console.log("x =/= 0");
			rotation.z = -Global.floor.angle*leanAcc.x/Math.abs(leanAcc.x);
		}
		else	{
			rotation.z = 0;
		}

		if (leanAcc.z !== 0)	{
			console.log("z =/= 0");
			rotation.x = Global.floor.angle*leanAcc.z/Math.abs(leanAcc.z);
		}
		else	{
			rotation.x = 0;
		}
		
		obj.setRotation(rotation);
		obj.setAcc(acceleration);
	};

	obj.setUpdateAcceleration(updateAcceleration);
	obj.setAccMod(Global.player.acceleration);
	obj.setDecMod(Global.player.deceleration);
	obj.setPos(position);
	obj.setMesh(mesh, mesh2);

	return obj;
};