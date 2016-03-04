var Global = {
    player : {
<<<<<<< HEAD
    	initialPosition : new THREE.Vector3(0, 1, 0),
    	radius          : 1 - 0.1,
    	acceleration    : 0.12,
    	deceleration    : 0.1
=======
    	initialPosition : new THREE.Vector3(0, 5, 0),
    	radius          : 1,
    	acceleration    : 0.5,
    	deceleration    : 0.1,
        mass            : 5,
        gravity         : 1
    },
    floor : {
        atrito          : 0.5
>>>>>>> 8b56c3d0dfb01a56e20be04ba16e81638d8923dc
    },
    nullV3 : function() {
        return new THREE.Vector3(0, 0, 0);
    }
};
