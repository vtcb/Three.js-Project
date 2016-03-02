var Screen = function() {
    var camera = new THREE.PerspectiveCamera(45, winWidth/winHeight, 0.1, 1000);
    var scene  = new THREE.Scene();

    return {
        render : function(renderer) {
            renderer.render(scene, camera);
        }
    };
};
