var Screen = function(kbh, winWidth, winHeight) {
    var camera         = new THREE.PerspectiveCamera(75, winWidth/winHeight, 0.1, 1000);
    var scene          = new THREE.Scene();
    var orbit_controls = new THREE.OrbitControls(camera);
 
    camera.position.y = 20;
    camera.position.z = 20;
    camera.lookAt(scene.position);

    var enemiesQtd = 1;
    var map = GenerateMaze(5, 5, 0, 0, 24, 14);
    var maze = BuildMaze(map, 2);
 
    var player = new Player(
        kbh,
        Global.player.radius,
        Global.player.initialPosition, 
        maze
    );

    var enemies = EnemiesGenerator(maze, 0.1, enemiesQtd, 3);

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

    //scene.add(maze.floor);
    //scene.add(maze.walls);

    var floor = new Floor(kbh, maze.floor, maze.walls);

    scene.add(player.getMesh());
    scene.add(player.getMesh2());

    scene.add(floor.getMapFloor());
    scene.add(floor.getMapWalls());

    for(var i = 0; i < enemiesQtd; i++) {
        scene.add(enemies[i].getMesh());
    }

    return {
        getCamera : function() {
            return camera;
        },
        getScene  : function() {
            return scene;
        },

        update    : function() {
            orbit_controls.update();
            floor.update();
            player.update(floor.getLeanAcc());
            for(var i = 0; i < enemiesQtd; i++) {
                enemies[i].update();
            }
            //camera.lookAt(player.getPosition());
            //console.log(player.getPositionStr());
        },
        render    : function(renderer) {
            renderer.render(scene, camera);
        }
    };
};
