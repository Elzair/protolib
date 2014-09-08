var assert   = require('assert')
  , protolib = require(__dirname + '/../')
  ;

describe('protolib', function() {
  describe('clone', function() {
    it('should create a clone of the given object', function() {
      var object = {name: 'Philip', hello: function() { return 'Hello, my name is ' + this.name; }};
      var object_clone = protolib.clone(object);
      assert.strictEqual(object_clone.name, 'Philip');
      assert.strictEqual(object_clone.hello(), 'Hello, my name is Philip');
    });

    it('should not simply create a reference to the input object', function() {
      var object = {name: 'Philip', hello: function() { return 'Hello, my name is ' + this.name; }};
      var object_clone = protolib.clone(object);
      object_clone.name = 'John';
      assert.strictEqual(object_clone.hello(), 'Hello, my name is John');
    });
  });

  describe('inherit', function() {
    it('should set the prototype of an object to the given value', function() {
      var proto = {foo: 'bar'};
      var object = protolib.inherit(proto);
      assert.strictEqual(object.foo, 'bar');
      proto.foo = 'baz';
      assert.strictEqual(object.foo, 'baz');
    });
  });

  describe('mixin', function() {
    it('should add the prototype properties to the given object', function() {
      var proto = {type: 'list', values: [1, 2, 3]};
      var object = {readonly: true};
      protolib.mixin(object, proto);
      assert.deepEqual(object, {readonly: true, type: 'list', values: [1, 2, 3]});
    });

    it('should overwrite any existing properties with duplicate names', function() {
      var proto = {type: 'list', values: [1, 2, 3]};
      var object = {type: 'none'};
      protolib.mixin(object, proto);
      assert.deepEqual(object, proto);
    });
  });
});
