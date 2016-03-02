var main = function() {
    var winWidth  = window.innerWidth;
    var winHeight = window.innerHeight;

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(winWidth, winHeight);

    var game_screen = new Screen(winWidth, winHeight);

    var animate = function() {
        requestAnimationFrame(animate);

        game_screen.render(renderer);
    };

    document.body.appendChild(renderer.domElement);
    animate();
};

window.onload = main;
