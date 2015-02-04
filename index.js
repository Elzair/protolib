"use strict";

var clone_helper = require(__dirname + '/lib/clone-helper')
  , poly         = require('polyfill-function-prototype-bind')
  , typeOf       = require('elucidata-type');

exports.clone = function(object) {
  if (typeOf(object) !== 'object' && typeOf(object) !== 'array') {
    throw new Error('Cannot clone!');
  }

  var clone_object = typeOf(object) === 'array' ? [] : {};
  var objects = [object];
  var clone_objects = [clone_object];

  return clone_helper(object, clone_object, objects, clone_objects);
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
    if (typeOf(proto[property]) === 'function') {
      object[property] = property[property].bind(object);
    }
    else {
      object[property] = proto[property]; 
    }
  }
};
