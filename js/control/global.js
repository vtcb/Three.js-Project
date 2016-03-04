var Global = {
    player : {
    	initialPosition : new THREE.Vector3(0, 5, 0),
    	radius          : 1,
    	acceleration    : 0.5,
    	deceleration    : 0.1,
        mass            : 5,
        gravity         : 1
    },
    floor : {
        atrito          : 0.5
    },
    nullV3 : function() {
        return new THREE.Vector3(0, 0, 0);
    }
};
