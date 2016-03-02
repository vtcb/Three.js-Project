var Screen = function(winWidth, winHeight) {
    var camera = new THREE.PerspectiveCamera(75, winWidth/winHeight, 0.1, 1000);
    var scene  = new THREE.Scene();

    camera.position.y = 20;
    camera.position.z = 50;
    camera.lookAt(scene.position);

    scene.add( 
        new THREE.Mesh(
            new THREE.SphereGeometry(5, 100, 100),
            new THREE.MeshNormalMaterial()
        )
    );

    return {
        getCamera : function() {
            return camera;
        },
        getScene  : function() {
            return scene;
        },
        render    : function(renderer) {
            renderer.render(scene, camera);
        }
    };
};
