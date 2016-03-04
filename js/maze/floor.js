var Floor = function(kbh)	{
    var kbh       = kbh;

	var angle 	  = Math.PI/6;
	var direction = Global.nullV3();
	var geometry  = new THREE.PlaneGeometry(Global.floor.length, Global.floor.width);
	var texture   = undefined;
    var color     = new THREE.Color('rgb(0,100,0)');
    var material  = new THREE.MeshBasicMaterial ({
                        color : color.getHex(),
                        side  : THREE.DoubleSide
                    });
	var mesh      = new THREE.Mesh(geometry, material);
	var position  = Global.floor.initialPosition;

    var controls = {
        72 : 'left',    // H
        85 : 'up',      // U
        75 : 'right',   // K
        74 : 'down',    // J
        32 : 'jump'     // Space bar
    };

    var direction_vectors = {
        left  : new THREE.Vector3( 0,  0,  1),
        up    : new THREE.Vector3( 1,  0,  0),
        right : new THREE.Vector3( 0,  0, -1),
        down  : new THREE.Vector3(-1,  0,  0)
    };

    var lean = function()   {
        mesh.rotation.x = -0.5 * Math.PI + angle * direction.x;
        mesh.rotation.y = angle * direction.z;
        //console.log("rotation = [" + mesh.rotation.x + ", " + mesh.rotation.y + ", " + mesh.rotation.z + "]");
    };

	var updateMesh = function() {
        mesh.position.x = position.x;
        mesh.position.y = position.y;
        mesh.position.z = position.z;
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

        update      : function() {
            leanRequest();
            updateMesh();
        }
	}
}