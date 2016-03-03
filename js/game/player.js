var Player = function(kbh, radius, position) {
	var kbh      = kbh;
	var geometry = new THREE.SphereGeometry(radius, 50, 50);
	var texture  = undefined;
	var material = new THREE.MeshNormalMaterial();
	var mesh     = new THREE.Mesh(geometry, material);

	var nullV3 = function() {
		return new THREE.Vector3(0, 0, 0);
	};

	var acceleration = nullV3();

	var speed = nullV3();

	var acceleration_module = Global.player.acceleration;
	var deceleration_module = Global.player.deceleration;
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
	    83 : 'down',		// S
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

		acceleration = nullV3();

		for(var i in acceleratingDirections) {
			var direction = acceleratingDirections[i];
			acceleration.add(direction_vectors[direction]);
		}

		acceleration.normalize();
		acceleration.multiplyScalar(acceleration_module);
	};

	var accelerate = function() {
		speed.add(acceleration);
	};

	var decelerate = function() {
		if(deceleration_module >= speed.length()) {
			speed = nullV3();
		} else {
			var deceleration = speed.clone();
			deceleration.normalize();
			deceleration.multiplyScalar(-deceleration_module);
			speed.add(deceleration);
		}
	};

	var move = function() {
		accelerate();
		position.add(speed);
		decelerate();

		/* Check collision */
	};

	var updateMesh = function() {
		mesh.position.x = position.x;
		mesh.position.y = position.y;
		mesh.position.z = position.z;
	};

	return {
		getMesh 	: function()	{
			return mesh;
		},
		setMesh 	: function(mesh)	{
			this.mesh = mesh;
		},
		getPosition : function()	{
			return position;
		},
		setPosition : function(pos)	{
			this.position = pos;
		},
		getSpeed    : function()	{
			return speed;
		},
		setSpeed 	: function(speed)	{
			this.speed = speed;
		},
		getPositionStr : function()	{
			return '' + [position.x, position.y, position.z];
		},

		update 		: function() {
			updateAcceleration();
			move();
			updateMesh();
		}
	};
};
