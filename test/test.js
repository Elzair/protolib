var assert   = require('assert')
  , protolib = require(__dirname + '/../')
  , typeOf   = require('typeof')
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
      assert.strictEqual(clone_object.name, 'Philip');
      assert.strictEqual(clone_object.hello(), 'Hello, my name is Philip');
      assert.strictEqual(clone_object.date.getMonth(), new Date().getMonth());
      assert.strictEqual(typeOf(clone_object.arr), 'array');
      assert.strictEqual(clone_object.arr[1].foo, "bar");
    });

    it('should throw an error if input is not an object or array', function() {
      try {
        var x = protolib.clone("hello");
      }
      catch (err) {
        assert(/Cannot clone/.exec(err));
      }
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
