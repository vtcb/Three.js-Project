var main = function() {
    var winWidth  = window.innerWidth;
    var winHeight = window.innerHeight;

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(winWidth, winHeight);
};

window.onload = main;
