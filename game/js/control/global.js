var Global = {
    maze: {
        width           : 8,
        height          : 8,
        tileSize         : 2
    },
    player : {
    	initialPosition : THREE.Vector3(0, 1, 0),
    	radius          : 1 - 0.1,
    	acceleration    : 0.12,
    	deceleration    : 0.1,
        mass            : 5,
        gravity         : 1
    },
    floor : {
        angle           : Math.PI/100,
        atrito          : 0.5
    },
    enemies: {
        qtd             : 3,
        speed           : 0.1
    },
    nullV3 : function() {
        return new THREE.Vector3(0, 0, 0);
    }
};
