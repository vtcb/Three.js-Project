var Floor = function(kbh, mapFloor, mapWalls) {
    var kbh       = kbh;

    var angle     = Global.floor.angle;
    var direction = Global.nullV3();

    var controls = {
        72 : 'left',    // H
        85 : 'up',      // U
        75 : 'right',   // K
        74 : 'down',    // J
        32 : 'jump'     // Space bar
    };

    var direction_vectors = {
        left  : new THREE.Vector3( 1,  0,  0),
        up    : new THREE.Vector3( 0,  0,  1),
        right : new THREE.Vector3(-1,  0,  0),
        down  : new THREE.Vector3( 0,  0, -1)
    };

    var lean = function()   {
        mapFloor.rotation.x = -Math.PI/2 - angle * direction.z;
        mapFloor.rotation.y = -angle * direction.x;
        mapWalls.rotation.x = -angle * direction.z;
        mapWalls.rotation.z =  angle * direction.x;
        //console.log("rotation = [" + mapFloor.rotation.x + ", " + mapFloor.rotation.y + ", " + mapFloor.rotation.z + "]");
    };

    var leanRequest = function() {
        var leanDirections = [];

        for(var code in controls) {
            if(kbh.isPressed(code)) {
                leanDirections.push(controls[code]);
            }
        }

        /* Unique */
        leanDirections.filter(
            function(value, index, self) {
                return self.indexOf(value) === index;
            }
        );

        direction = Global.nullV3();

        for(var i in leanDirections) {
            var dir = leanDirections[i];

            if (dir !== 'jump') {
                direction.add(direction_vectors[dir]);
            }
        }

        //console.log("direction = [" + direction.x + ", " + direction.y + ", " + direction.z + "]");

        lean();
    };

    return {
        getMapFloor : function()    {
            return mapFloor;
        },
        setMapFloor : function()    {
            mapFloor = arguments[0];
        },
        getMapWalls : function()    {
            return mapWalls;
        },
        setMapWalls : function()    {
            mapWalls = arguments[0];
        },
        getPosition : function()    {
            return position;
        },
        setPosition : function(pos) {
            position = pos;
        },
        getLeanAcc  : function()    {
            var acc = direction.clone();
            acc.normalize();
            acc.multiplyScalar(-Global.player.mass*Global.player.gravity*Math.sin(angle));
            //acc.add(new THREE.Vector3(0, -Global.player.gravity, 0));
            return acc;
        },
        update      : function()    {
            leanRequest();
        }
    }
}