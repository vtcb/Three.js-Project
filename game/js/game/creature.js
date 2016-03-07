var Creature = function(maze) {
    var acceleration       = Global.nullV3();
    var speed              = Global.nullV3();
    var position           = Global.nullV3();
    var rotation           = Global.nullV3();
    var mesh               = undefined;
    var mesh2              = undefined;
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

        var di = [0, -1, 0, 1, -1, -1, 1, 1];
        var dj = [-1, 0, 1, 0, -1, 1, -1, 1];

        for(var k in di) {
            var i = di[k];
            var j = dj[k];

            var xb = Math.floor( (position.z + 0.5 * maze.width )/maze.tileSize );
            var yb = Math.floor( (position.x + 0.5 * maze.height)/maze.tileSize );

            var x = Math.floor( (position.z + 0.5 * maze.width  - i * 0.9)/maze.tileSize );
            var y = Math.floor( (position.x + 0.5 * maze.height - j * 0.9)/maze.tileSize );

            var px = xb * maze.tileSize - 0.5 * maze.width  + 1;
            var py = yb * maze.tileSize - 0.5 * maze.height + 1;

            var dx = x + i;
            var dy = y + j;
            if(dx < 0 || dx >= maze.matrix.length) continue;
            if(dy < 0 || dy >= maze.matrix[0].length) continue;

            var idx = maze.matrix[dx][dy];
            if(!idx || idx === NaN || idx === -1) continue;

            //continue;
            //collidableMeshList.push(maze.objs[idx]);
            if(j === 0) {
                if(i * (position.z - px) > 0) {
                    position.z = px;
                    speed.z = 0;
                    treatCollision();
                }
            } else if(i === 0) {
                if(j * (position.x - py) > 0) {
                    position.x = py;
                    speed.x = 0;
                    treatCollision();
                }
            } else {
                if(i * (position.z - px) > 0 && j * (position.x - py) > 0) {
                    position.z = px;
                    speed.z = 0;
                    position.x = py;
                    speed.x = 0;
                    treatCollision();
                }
            }
        }
    };

    var updateMesh = function() {
        mesh.position.x = position.x;
        mesh.position.y = position.y;
        mesh.position.z = position.z;

        if(acceleration_module !== 0
            && position.x < Global.maze.tileSize*2-maze.width*0.5
            && position.z < Global.maze.tileSize*2-maze.height*0.5) {
            window.open("http://cin.ufpe.br/~tvp/Three.JS-Project/winGame.html", "_self");
        }

        mesh2.position.x = position.x;
        mesh2.position.y = position.y;
        mesh2.position.z = position.z;

        mesh2.rotation.x = rotation.x;
        mesh2.rotation.y = rotation.y;
        mesh2.rotation.z = rotation.z;
    };

    var updateObj = function(leanAcc, collidableObjects) {
        updateAcceleration(leanAcc);
        move();
        updateMesh();
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
        getUpdateAcceleration : function()  {
            return updateAcceleration;
        },
        getMove : function()  {
            return move;
        },
        getUpdateMesh : function()  {
            return updateMesh;
        },
        setUpdateObj : function(func) {
            updateObj = func;
        },
        getMesh     : function()    {
            return mesh;
        },
        getMesh2    : function()    {
            return mesh2;
        },
        setMesh     : function()    {
            mesh = arguments[0];
            mesh2 = arguments[1];
        },
        getRotation : function()    {
            return rotation;
        },
        setRotation : function(rot) {
            rotation = rot;
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
        setSpeed    : function()   {
            speed = arguments[0];
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

        update      : function(leanAcc, collidableObjects) {
            updateObj(leanAcc, collidableObjects);
        }
    };
};
