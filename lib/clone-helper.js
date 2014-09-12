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
        console.log('Property: ' + property.toString() + '\n' + JSON.stringify(clone_objects, null, 2));
        var reference = misc.get_reference(objects, object[property]);
        console.log('Reference: ' + reference.toString());
        if (reference >= 0) {
          clone_object[property] = clone_objects[reference];
        }
        else {
          //console.log(JSON.stringify(object[property], null, 2));
          //console.log(JSON.stringify(object[property]));
          clone_object[property] = typeOf(object[property]) === 'array' ? [] : {};
          //console.log(JSON.stringify(clone_object[property]));
          objects.push(object[property]);
          clone_objects.push(clone_object[property]);
          /*clone_object[property] =*/ clone_helper(object[property], clone_object[property], objects, clone_objects); 
        }
      }
    }
  }

  /*return clone_object;*/
};

module.exports = clone_helper;
