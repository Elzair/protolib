"use strict";

var clone_helper = require(__dirname + '/lib/clone-helper')
  , typeOf       = require('elucidata-type');

exports.clone = function(object) {
  if (typeOf(object) !== 'object' && typeOf(object) !== 'array') {
    throw new Error('Cannot clone!');
  }

  let clone_object = typeOf(object) === 'array' ? [] : {};
  let objects = [object];
  let clone_objects = [clone_object];

  return clone_helper(object, clone_object, objects, clone_objects);
};

exports.inherit = function(proto) {
  return Object.create(proto);
};

exports.mixin = function(object, proto) {
  for (let property in proto) {
    if (typeOf(proto[property]) === 'function') {
      object[property] = property[property].bind(object);
    }
    else {
      object[property] = proto[property]; 
    }
  }
};
