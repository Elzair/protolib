var typeOf = require('typeof');

exports.clone = function(object) {
  if (object !== Object(object)) {
    throw new Error("Cannot clone!");
  }

  var object_clone = Array.isArray(object) ? [] : {};

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
