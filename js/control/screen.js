var Screen = function(kbh, winWidth, winHeight) {
    var camera         = new THREE.PerspectiveCamera(75, winWidth/winHeight, 0.1, 1000);
    var scene          = new THREE.Scene();
    var orbit_controls = new THREE.OrbitControls(camera);
 
    camera.position.y = 20;
    camera.position.z = 20;
    camera.lookAt(scene.position);

    /* Light */
    //var spotLight = new THREE.SpotLight(0xFFFFFF);
    //spotLight.position.set(0, 100, 0);

    //spotLight.castShadow = true;

    /* Meshes */
    var enemiesQtd = 3;
    var map = GenerateMaze(15, 15, 0, 0, 24, 14);
    var maze = BuildMaze(map, 2);
 
    var player = new Player(
        kbh,
        Global.player.radius,
        Global.player.initialPosition, 
        maze
    );

    var enemies = EnemiesGenerator(maze, 0.1, enemiesQtd, 3);

    var floor = new Floor(kbh, maze.floor, maze.walls);

    /* Set shadows */
    //player.getMesh().castShadow = true;

    //floor.getMapFloor().receiveShadow = true;
    //floor.getMapWalls().castShadow = true;
    //floor.getMapWalls().receiveShadow = true;

    /* Add objects to scene */
    //scene.add(spotLight);

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
