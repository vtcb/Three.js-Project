var Player = function(kbh, radius, position) {
	var kbh      = kbh;
	var geometry = new THREE.SphereGeometry(radius, 50, 50);
	var texture  = undefined;
	var material = new THREE.MeshNormalMaterial();
	var mesh     = new THREE.Mesh(geometry, material);

	var acceleration = {
		x : 0,
		y : 0,
		z : 0
	};

	var speed = {
		x : 0,
		y : 0,
		z : 0
	};

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
	    83 : 'down'		// S
	    32 : 'jump'		// Space bar
	};

	var direction_vectors = {
		left  : {
			x : -1,
			y :  0,
			z :  0
		},
		up    : {
			x :  0,
			y :  0,
			z :  1
		},
		right : {
			x :  1,
			y :  0,
			z :  0
		},
		down  : {
			x :  0,
			y :  0,
			z : -1
		}
	};

	var addV = function(a, b) {
		return {
			x : a.x + b.x,
			y : a.y + b.y,
			z : a.z + b.z
		};
	};

	var cpyV = function(a) {
		return {
			x : a.x,
			y : a.y,
			z : a.z
		};
	};

	var multV = function(a, c) {
		return {
			x : a.x * c,
			y : a.y * c,
			z : a.z * c
		};
	};

	var nullV = function() {
		return {
			x : 0,
			y : 0,
			z : 0
		};
	};

	var getNorm = function(a) {
		return Math.sqrt( a.x * a.x + a.y * a.y + a.z * a.z );
	};

	var normalize = function(a) {
		var norm = getNorm(a) || 1;

		return {
			x : a.x / norm,
			y : a.y / norm,
			z : a.z / norm
		};
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

		acceleration = nullV();

		for(var i in acceleratingDirections) {
			var direction = acceleratingDirections[i];
			acceleration = addV(acceleration, direction_vectors[direction]);
		}

		acceleration = normalize(acceleration);
		acceleration = multV(acceleration,  acceleration_module);
	};

	var accelerate = function() {
		speed    = addV(speed, acceleration);
	};

	var decelerate = function() {
		if(deceleration_module >= getNorm(speed)) {
			speed = nullV();
		} else {
			var deceleration = cpyV(speed);
			deceleration = normalize(deceleration);
			deceleration = multV(deceleration, -deceleration_module);
			speed = addV(speed, deceleration);
		}
	};

	var move = function() {
		accelerate();
		position = addV(position, speed);
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
