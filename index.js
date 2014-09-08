exports.clone = function(object) {
  var object_clone = {};
  for (var property in object) {
    if (typeof object[property] === 'function') {
      object_clone[property] = object[property].bind(object_clone);
    }
    else if (typeof object[property] === 'object'){
      object_clone[property] = exports.clone(object[property]); 
    }
    else {
      object_clone[property] = object[property];
    }
  }
  return object_clone;
};

exports.inherit = function(proto) {
  if (Object.create) {            // Use ES5 Object.create
    return Object.create(proto);
  }
  else if ({}.__proto__) {        // Use non-standard property
    var object = {};
    object.__proto__ = proto;
    return object;
  }
  else {                          // Fallback to using constructor
    var Constructor = function(){};
    Constructor.prototype = proto;
    return new Constructor();
  }
};

exports.mixin = function(object, proto) {
  for (var property in proto) {
    if (typeof proto[property] === 'function') {
      object[property] = property[property].bind(object);
    }
    else {
      object[property] = proto[property]; 
    }
  }
};
