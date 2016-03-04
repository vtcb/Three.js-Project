var Global = {
    player : {
    	initialPosition : new THREE.Vector3(0, 1, 0),
    	radius          : 1 - 0.1,
    	acceleration    : 0.12,
    	deceleration    : 0.1
    },
    nullV3 : function() {
        return new THREE.Vector3(0, 0, 0);
    }
};
