var Global = {
    player : {
    	initialPosition : new THREE.Vector3(0, 1, 0),
    	radius          : 1,
    	acceleration    : 0.5,
    	deceleration    : 0.1
    },
    floor  : {
    	width 	: 50,
    	length	: 50,
    	initialPosition : new THREE.Vector3(0, 0, 0)
    },
    nullV3 : function() {
        return new THREE.Vector3(0, 0, 0);
    }
};
