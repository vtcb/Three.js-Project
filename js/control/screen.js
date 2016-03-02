var Screen = function(winWidth, winHeight) {
    var camera = new THREE.PerspectiveCamera(75, winWidth/winHeight, 0.1, 1000);
    var scene  = new THREE.Scene();
    var player = new Player(Global.initialPlayerPos);

    camera.position.y = 20;
    camera.position.z = 50;
    camera.lookAt(scene.position);

    scene.add(player.getMesh());

    return {
        render : function(renderer) {
            renderer.render(scene, camera);
        }
    };
};
