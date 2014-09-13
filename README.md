protolib
========

**protolib** is a Javascript library for doing Object Oriented programming using the prototype system. It is based on the article [Javascript OO Without Constructors](http://tobyho.com/2012/10/21/javascript-OO-without-constructors/) by [Toby Ho](http://www.tobyho.com).

Install
-------

To install **protolib** into a [Node.js](http://nodejs.org) project, input the following command in the root directory of your project.

    npm install protolib --save

Use
---

**protolib** provides several functions to help with Object Orientation.

### clone(object)

This method returns an object with all the properties of the parameter `object`. 

**NOTE:** This method will create copies of not only the input object but also every object and array in its prototype chain. It can even handle circular dependencies.

#### Example

```javascript
var protolib = require('protolib');
var object = {
    name: 'Philip'
  , hello: function() {
      console.log('Hello, my name is ' + this.name);
    }
  , foo: {
      bar: {
        baz: [ 'test' ]
      }
    }
};

var object_clone = protolib.clone(object);
object_clone.foo.bar.baz[1] = object;
object_clone.foo.bar.baz[1].hello(); // outputs 'Hello, my name is Philip'
```

### inherit(proto)

This method returns an object that inherits from (i.e its prototype is set to) `proto`

#### Example

```javascript
var protolib = require('protolib');
var proto = {foo: 'bar'};
var object = protolib.inherit(proto);
console.log(object.foo); // prints 'bar'
```

### mixin(object, prototype)

This method copies all the properties of `proto` to `object`.

**NOTE:** This method will overwrite any properties of `object` that bear the same name as a property of `proto`

#### Example

```javascript
var protolib = require('protolib');
var proto = {type: 'list', values: [1, 2, 3]};
var object = {readonly: true};
protolib.mixin(object, proto);
console.log(JSON.stringify(object, null, 2));
```

Output: 

```javascript
{
  readonly: true,
  type: "list",
  values: [1, 2, 3]
}
```

### new

Do you like prototypes but still sometimes have to use constructors? Well, now you can ditch the **new** keyword and use `new()` instead.

#### Example

```javascript
var protolib = require('protolib');
var date = protolib.new(Date, 'December 17, 1995 03:24:00');
console.log(date.getMonth()); // outputs 12
```

Test
----

To run the unit tests, input the following command in the project's root directory.

    npm test
