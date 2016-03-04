var Creature = function(maze) {
    var acceleration       = Global.nullV3();
    var speed              = Global.nullV3();
    var position           = Global.nullV3();
    var mesh               = undefined;
    var maze               = maze;
    var collidableMeshList = [maze.floor];

    var acceleration_module = Global.player.acceleration;
    var deceleration_module = Global.player.deceleration;

    var direction_vectors = {
        left  : new THREE.Vector3(-1,  0,  0),
        up    : new THREE.Vector3( 0,  0, -1),
        right : new THREE.Vector3( 1,  0,  0),
        down  : new THREE.Vector3( 0,  0,  1)
    };

    var updateAcceleration = function(leanAcc) {
    };

    var accelerate = function() {
        speed.add(acceleration);
    };

    var decelerate = function() {
        if(deceleration_module >= speed.length()) {
            speed = Global.nullV3();
        } else {
            var deceleration = speed.clone();
            deceleration.normalize();
            deceleration.multiplyScalar(-deceleration_module);
            speed.add(deceleration);
        }
    };

    var treatCollision = function() {

    };

    var move = function() {
        accelerate();
        position.add(speed);
        decelerate();

        var ret = collision(mesh, collidableMeshList);
        if(ret){
            treatCollision(ret);
        }
    };

    var updateMesh = function() {
        mesh.position.x = position.x;
        mesh.position.y = position.y;
        mesh.position.z = position.z;
    };

    return {
        setAcc : function() {
            acceleration = arguments[0];
        },
        setAccMod : function() {
            acceleration_module = arguments[0];
        },
        setDecMod : function() {
            deceleration_module = arguments[0];
        },
        setPos : function() {
            position = arguments[0];
        },
        getAcc : function() {
            return acceleration;
        },
        getAccMod : function() {
            return acceleration_module;
        },
        getDecMod : function() {
            return deceleration_module;
        },
        getPos : function() {
            return position;
        },
        setUpdateAcceleration : function(func) {
            updateAcceleration = func;
        },
        getMesh     : function()    {
            return mesh;
        },
        setMesh     : function()    {
            mesh = arguments[0];
        },
        getPosition : function()    {
            return position;
        },
        setPosition : function(pos) {
            position = pos;
        },
        getSpeed    : function()    {
            return speed;
        },
        setSpeed    : function(speed)   {
            speed = speed;
        },
        getPositionStr : function() {
            return '' + [position.x, position.y, position.z];
        },
        setTreatCollision: function(){
            treatCollision = arguments[0];
        },
        getMaze: function(){
            return maze;
        },

        update      : function(leanAcc) {
            updateAcceleration(leanAcc);
            move();
            updateMesh();
        }
    };
};
