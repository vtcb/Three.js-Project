var Player = function(kbh) {
	var geometry = new THREE.SphereGeometry(5, 100, 100);
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

	var acceleration_module = 1;
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
	};

	var direction_vectors = [
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
	];

	var addV = function(a, b) {
		return {
			x : a.x + b.x,
			y : a.y + b.y,
			z : a.z + b.z
		};
	};

	var normalize = function(a) {
		var norm = Math.sqrt( a.x * a.x + a.y * a.y + a.z * a.z );
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
				acceleratingDirections.push(controls[i]);
			}
		}

		/* Unique */
		acceleratingDirections.filter(
			function(value, index, self) {
				return self.indexOf(value) === index;
			}
		);

		acceleration = {
			x : 0,
			y : 0,
			z : 0
		};

		for(var i in acceleratingDirections) {
			var direction = acceleratingDirections[i];
			acceleration = addV(acceleration, direction_vectors[direction]);
		}

		acceleration = normalize(acceleration) * acceleration_module;
	};

	var move = function() {
		speed    = addV(speed, acceleration);
		position = addV(position, speed);

		/* Check collision */
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

		update 		: function() {
			updateAcceleration();
			move();
		}
	};
};
