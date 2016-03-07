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
    var enemiesQtd = Global.enemies.qtd;
    var map = GenerateMaze(Global.maze.height, Global.maze.width, 0, 0, Global.maze.height-1, Global.maze.width-1);
    var maze = BuildMaze(map, Global.maze.tileSize);
 
    var player = new Player(
        kbh,
        Global.player.radius,
        new THREE.Vector3(
            (Global.maze.width*2-1)*Global.maze.tileSize+Global.maze.tileSize*0.5-(Global.maze.width*2+1)*Global.maze.tileSize*0.5, 
            1, 
            (Global.maze.height*2-1)*Global.maze.tileSize+Global.maze.tileSize*0.5-(Global.maze.height*2+1)*Global.maze.tileSize*0.5),
        maze
    );

    player.setInitialPosition( new THREE.Vector3(
                              (Global.maze.width*2-1)*Global.maze.tileSize+Global.maze.tileSize*0.5-(Global.maze.width*2+1)*Global.maze.tileSize*0.5, 
                              1, 
                              (Global.maze.height*2-1)*Global.maze.tileSize+Global.maze.tileSize*0.5-(Global.maze.height*2+1)*Global.maze.tileSize*0.5)
                        );
    
    var enemies = EnemiesGenerator(maze, Global.enemies.speed, enemiesQtd, 3);

    var floor = new Floor(kbh, maze.floor, maze.walls);

    var collidableObjects = [];

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
        collidableObjects.push(enemies[i].getMesh2());
        scene.add(enemies[i].getMesh());
        scene.add(enemies[i].getMesh2());
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
            if (player.update(floor.getLeanAcc(), collidableObjects) === true)  {
                window.open("../overGame.html", "_self");
            }
            else {
                for(var i = 0; i < enemiesQtd; i++) {
                    enemies[i].update();
                }
            }
        },
        render    : function(renderer) {
            renderer.render(scene, camera);
        }
    };
};
