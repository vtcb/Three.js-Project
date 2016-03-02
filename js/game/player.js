function Player (position)	{
	// private:
	var speed = {
		x : 0,
		y : 0,
		z : 0
	};

	var acceleration_module = 1;

	var geometry = new THREE.SphereGeometry(5, 100, 100);
	var texture = 0;
	var material = new THREE.MeshNormalMaterial();
	var mesh = new THREE.Mesh(geometry, material);
	
	//var pos	= {x : #, y : #, z : #}
	var pos = position;

	// public:
	return {
		getMesh : function()	{
			return mesh;
		},
		setMesh : function(mesh)	{
			this.mesh = mesh;
		},
		getPos : function()	{
			return pos;
		},
		setPos : function(pos)	{
			this.pos = pos;
		},
		getSpeed : function()	{
			return speed;
		},
		setSpeed : function(speed)	{
			this.speed = speed;
		}
	};
};