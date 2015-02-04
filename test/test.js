"use strict";
var expect   = require('chai').expect
  , protolib = require(__dirname + '/../')
  ;

describe('protolib', function() {
  describe('clone', function() {
    it('should create a clone of the given object', function() {
      var object = {
          name: 'Philip'
        , hello: function() { return 'Hello, my name is ' + this.name; }
        , date: new Date()
        , arr: [1, {foo: 'bar'}]
      };
      var clone_object = protolib.clone(object);
      expect(clone_object).to.have.property('name', 'Philip');
      expect(clone_object.hello()).to.equal('Hello, my name is Philip');
      expect(clone_object.date.getMonth()).to.equal(new Date().getMonth());
      expect(clone_object).to.have.deep.property('arr[0]', 1);
      expect(clone_object).to.have.deep.property('arr[1].foo', 'bar');
    });

    it('should throw an error if input is not an object or array', function() {
      expect(protolib.clone).to.throw('Cannot clone!');
    });
  });

  describe('inherit', function() {
    it('should set the prototype of an object to the given value', function() {
      var proto = {foo: 'bar'};
      var object = protolib.inherit(proto);
      expect(object).to.have.property('foo', 'bar');
      proto.foo = 'baz';
      expect(object).to.have.property('foo', 'baz');
    });
  });

  describe('mixin', function() {
    it('should add the prototype properties to the given object', function() {
      var proto = {type: 'list', values: [1, 2, 3]};
      var object = {readonly: true};
      protolib.mixin(object, proto);
      expect(object).to.have.property('readonly', true);
      expect(object).to.have.property('type', 'list');
      expect(object).to.have.deep.property('values[0]', 1);
      expect(object).to.have.deep.property('values[1]', 2);
      expect(object).to.have.deep.property('values[2]', 3);
    });

    it('should overwrite any existing properties with duplicate names', function() {
      var proto = {type: 'list', values: [1, 2, 3]};
      var object = {type: 'none'};
      protolib.mixin(object, proto);
      expect(object).to.have.property('type', 'list');
      expect(object).to.have.deep.property('values[0]', 1);
      expect(object).to.have.deep.property('values[1]', 2);
      expect(object).to.have.deep.property('values[2]', 3);
    });
  });
});
