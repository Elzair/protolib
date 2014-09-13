var misc = require(__dirname + '/misc')
  , typeOf = require('typeof')
  ;

var clone_helper = function(object, clone_object, objects, clone_objects) {
  for (var property in object) {
    if (typeOf(object[property]) === 'number' || typeOf(object[property]) === 'string' || 
        typeOf(object[property]) === 'null' || typeOf(object[property]) === 'undefined' ||
        object[property] === Object || object[property] === Array || 
        object[property] === Date || object[property] === Math) {
      clone_object[property] = object[property];
    }
    else {
      if (typeOf(object[property]) === 'function') {
        clone_object[property] = object[property].bind(clone_object);
      }
      else if (typeOf(object[property]) === 'date') {
        clone_object[property] = new Date(object[property].toString());
      }
      else {
        var reference = misc.get_reference(objects, object[property]);
        if (reference >= 0) {
          clone_object[property] = clone_objects[reference];
        }
        else {
          clone_object[property] = typeOf(object[property]) === 'array' ? [] : {};
          objects.push(object[property]);
          clone_objects.push(clone_object[property]);
          clone_object[property] = clone_helper(object[property], clone_object[property], objects, clone_objects); 
        }
      }
    }
  }

  return clone_object;
};

module.exports = clone_helper;
