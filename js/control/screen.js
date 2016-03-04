var Screen = function(kbh, winWidth, winHeight) {
    var camera         = new THREE.PerspectiveCamera(75, winWidth/winHeight, 0.1, 1000);
    var scene          = new THREE.Scene();
    var orbit_controls = new THREE.OrbitControls(camera);
 
    camera.position.y = 20;
    camera.position.z = 20;
    camera.lookAt(scene.position);
 
    var player = new Player(
        kbh,
        Global.player.radius,
        Global.player.initialPosition
    );


/*    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(40, 40),
        new THREE.MeshNormalMaterial()
    );

    plane.rotation.x = -0.5 * Math.PI;

    scene.add(plane);
*/

/*
    scene.add(
        new THREE.Mesh(
            new THREE.SphereGeometry(5, 100, 100),
            new THREE.MeshNormalMaterial()
        )
    );
*/
    //Teste maze
    var map = GenerateMaze(50, 25, 0, 0, 49, 24);
    var maze = BuildMaze(map, 2);

    var floor = new Floor(kbh, maze.map);

    scene.add(player.getMesh());
    scene.add(floor.getMesh());

    return {
        getCamera : function() {
            return camera;
        },
        getScene  : function() {
            return scene;
        },

        update    : function() {
            orbit_controls.update();
            player.update();
            floor.update();
            //console.log(player.getPositionStr());
        },
        render    : function(renderer) {
            renderer.render(scene, camera);
        }
    };
};
