var expect = require('chai').expect
  , helper = require(__dirname + '/../lib/clone-helper')
  , typeOf = require('typeof')
  ;

describe('lib/clone-helper', function() {
  it('should create a clone of the given object', function() {
    var object = {
        name: 'Philip'
      , hello: function() { return 'Hello, my name is ' + this.name; }
      , date: new Date()
      , arr: [1, {foo: 'bar'}]
    };
    var clone_object = {};
    clone_object = helper(object, clone_object, [object], [clone_object]);
    expect(clone_object).to.have.property('name', 'Philip');
    expect(clone_object.hello()).to.equal('Hello, my name is Philip');
    expect(clone_object.date.getMonth()).to.equal(new Date().getMonth());
    expect(clone_object).to.have.deep.property('arr[0]', 1);
    expect(clone_object).to.have.deep.property('arr[1].foo', 'bar');
  });

  it('should not simply create a reference to the input object', function() {
    var object = {name: 'Philip', hello: function() { return 'Hello, my name is ' + this.name; }};
    var clone_object = {};
    clone_object = helper(object, clone_object, [object], [clone_object]);
    clone_object.name = 'John';
    expect(clone_object.hello()).to.equal('Hello, my name is John');
  });

  it('should handle circular dependencies', function() {
    var object = {
        name: 'Philip'
      , hello: function() { return 'Hello, my name is ' + this.name; }
      , date: new Date()
      , arr: [1, {foo: 'bar'}]
    };
    object.arr[2] = object;
    var clone_object = {};
    clone_object = helper(object, clone_object, [object], [clone_object]);
    expect(clone_object.arr[2]).to.equal(clone_object);
    expect(clone_object.arr[2].arr).to.equal(clone_object.arr);
  });

  it('should handle really crazy circular dependencies', function() {
    var object = {
        name: 'Philip'
      , hello: function() { return 'Hello, my name is ' + this.name; }
      , date: new Date()
      , arr: [1, {foo: 'bar', test: {}}]
      , obj: {hello: ['world']}
    };
    object.arr[2] = object;
    object.arr[1].test.baz = object.obj.hello;
    var clone_object = {};
    clone_object = helper(object, clone_object, [object], [clone_object]);
    expect(clone_object.arr[2]).to.equal(clone_object);
    expect(clone_object.arr[2].arr).to.equal(clone_object.arr);
    expect(clone_object.arr[1].test.baz).to.equal(clone_object.obj.hello);
  });
});
