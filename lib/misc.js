"use strict";

exports.get_reference = function(objects, object) {
  for (let i=0; i<objects.length; i++) {
    if (objects[i] === object) {
      return i;
    }
  }
  return -1;
};
