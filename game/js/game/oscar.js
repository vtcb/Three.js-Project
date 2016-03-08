var Oscar = function(maze, height) {
	var geometry = new THREE.BoxGeometry(2, height, 2);
	var texture  = THREE.ImageUtils.loadTexture("./assets/textures/oscar.png");
	var material = new THREE.MeshBasicMaterial({map : texture, transparent : true, opacity : 0.7});

//	var material2 = new THREE.MeshBasicMaterial({color : '#2000FF', transparent: true, opacity : 0});

	mesh = new THREE.Mesh(geometry, material);
	mesh.rotation.y = Math.PI;
	mesh.position.x = Global.maze.tileSize*1.5-maze.width*0.5;
	mesh.position.y = 0.5 * height;
	mesh.position.z = Global.maze.tileSize*1.5-maze.height*0.5;

	return	{
		getMesh : function()	{
			return mesh;
		}
	}
}