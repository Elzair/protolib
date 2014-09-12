var typeOf = require('typeof');

var clone_helper = function(object, properties) {
  var object_clone = typeOf(object) === 'array' ? [] : {};

  for (var property in object) {
    if (typeOf(object[property]) === 'function') {
      object_clone[property] = object[property].bind(object_clone);
    }
    else if (typeOf(object[property]) === 'date') {
      object_clone[property] = new Date(object[property].toString());
    }
    else if (typeOf(object[property]) === 'object'){
      object_clone[property] = clone_helper(object[property]); 
    }
    else {
      object_clone[property] = object[property];
    }
  }

  return object_clone;
};

module.exports = clone_helper;
