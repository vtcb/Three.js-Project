var Screen = function(kbh, winWidth, winHeight) {
    var camera         = new THREE.PerspectiveCamera(75, winWidth/winHeight, 0.1, 1000);
    var scene          = new THREE.Scene();
    var orbit_controls = new THREE.OrbitControls(camera);
 
    camera.position.y = 20;
    camera.position.z = 20;
    camera.lookAt(scene.position);


    var map = GenerateMaze(25, 15, 0, 0, 24, 14);
    var maze = BuildMaze(map, 2);
 
    var player = new Player(
        kbh,
        Global.player.radius,
        Global.player.initialPosition, 
        maze
    );


/*    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(40, 40),
        new THREE.MeshNormalMaterial()
    );

    plane.rotation.x = -0.5 * Math.PI;

    scene.add(plane);
*/

    /*var lala = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, 3),
            new THREE.MeshBasicMaterial({color: 0xff0000})
        );
    lala.position.y+=1.5;
    scene.add(lala);
    */

    //Teste maze

    scene.add(maze.floor);
    scene.add(maze.walls);

    //var floor = new Floor(kbh, maze.map);

    //scene.add(player.getMesh());
    //scene.add(floor.getMesh());

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
            //floor.update();
            //console.log(player.getPositionStr());
        },
        render    : function(renderer) {
            renderer.render(scene, camera);
        }
    };
};
