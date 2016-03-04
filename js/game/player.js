var Player = function(kbh, radius, position) {
	var obj      = Creature.call(this);

	var kbh      = kbh;
	var geometry = new THREE.SphereGeometry(radius, 50, 50);
	var texture  = undefined;
	var material = new THREE.MeshNormalMaterial();
	var mesh     = new THREE.Mesh(geometry, material);

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

	var updateAcceleration = function() {
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

		for(var i in acceleratingDirections) {
			var direction = acceleratingDirections[i];
			acceleration.add(direction_vectors[direction]);
		}

		acceleration.normalize();
		acceleration.multiplyScalar(obj.getAccMod());

		obj.setAcc(acceleration);
	};

	obj.setUpdateAcceleration(updateAcceleration);
	obj.setAccMod(Global.player.acceleration);
	obj.setDecMod(Global.player.deceleration);
	obj.setPos(position);
	obj.setMesh(mesh);

	return obj;
};
