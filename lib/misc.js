
exports.get_reference = function(objects, object) {
  for (var i=0; i<objects.length; i++) {
    if (objects[i] === object) {
      return i;
    }
  }
  return -1;
};
