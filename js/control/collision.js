var collision = function(obj, collidableMeshList) {
  var originPoint = obj.position.clone();
 
  for(var vertexIndex = 0; vertexIndex < obj.geometry.vertices.length; ++vertexIndex) {
    var localVertex = obj.geometry.vertices[vertexIndex].clone();
    var globalVertex = localVertex.applyMatrix4(obj.matrix);
    var directionVector = globalVertex.sub(obj.position);
    var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
    var collisionResults = ray.intersectObjects(collidableMeshList);
 
    if (collisionResults.length > 0 && collisionResults[0].distance <= directionVector.length()) {
      return true;
      var dir = globalVertex.clone().sub(collisionResults[0].point);
      return dir;
    }
  }
  return false;
}