var collision = function(obj, collidableMeshList) {
    var originPoint = obj.position.clone();

    for (var i = 0; i < obj.geometry.vertices.length; ++i) {
        var localVertex  = obj.geometry.vertices[i].clone();
        var globalVertex = localVertex.applyMatrix4(obj.matrix);

        var directionVector = globalVertex.sub(obj.position);
        var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
        var collisionResults = ray.intersectObjects(collidableMeshList);

        // houve colisão
        if(collisionResults.length > 0 && collisionResults[0].distance <= directionVector.length())  {
            var dir = directionVector.clone().normalize();
            return dir;
        }
    }

    return false;
}