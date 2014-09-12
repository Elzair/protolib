var typeOf = require('typeof');

module.exports = function(object) {
  if (typeOf(object) !== 'object' && typeOf(object) !== 'array') {
    throw new Error("Cannot clone!");
  }

  var object_clone = typeOf(object) === 'array' ? [] : {};

  for (var property in object) {
    if (typeOf(object[property]) === 'function') {
      object_clone[property] = object[property].bind(object_clone);
    }
    else if (typeOf(object[property]) === 'date') {
      object_clone[property] = new Date(object[property].toString());
    }
    else if (typeOf(object[property]) === 'object'){
      object_clone[property] = exports.clone(object[property]); 
    }
    else {
      object_clone[property] = object[property];
    }
  }

  return object_clone;
};

