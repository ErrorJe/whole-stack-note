# class 类

## 基本使用方式

```javascript
/**
 * 之前JS里类和构造函数是一起的
 * 类里可以定义构造函数，当你创建一个类的实例时就会调用构造函数
 */

// 定义类
class Parent {
  constructor(name) {
    this.name = name // 实例的私有属性
  }
  // 静态属性， 是类的属性。不需要实例化就能调用。 Parent.hello
  static hello() {
    console.log('hello');
  }
  // 属于实例的公有属性，相当于原型上的属性
  getName() {
    console.log(this.name);
  }
}
```


> hello 在类里，getName 在原型对象中。通过 new 得到的实例对象，无法直接通过 proto 去调用 Hello



## 类的ES5原理

> 通过 Babel 将上面的类转换为 es5 的写法


```javascript
"use strict"; // 严格模式

var _createClass = function () {
  // target 目标， props 属性对象数组
  function defineProperties(target, props) {
    // 循环每个元素
    for (var i = 0; i < props.length; i++) {
      // 取出每个属性描述器
      var descriptor = props[i];
      // 可枚举， 就是可以 for in 循环出来
      descriptor.enumerable = descriptor.enumerable || false;
      // 可配置， 可以通过 delete 删除此属性
      descriptor.configurable = true;
      // 可修改值
      if ("value" in descriptor) descriptor.writable = true;
      // 真正地向 parent 原型对象上增加属性
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  // 1 构造函数 ， 2 原型上的属性（通过实例来调用）， 3 静态属性（类上的属性，通过类来调用）
  return function (Constructor, protoProps, staticProps) {
    // (构造函数原型， 原型上的属性)如果有原型属性时，给 parent 原型对象上增加属性
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    // 如果有静态属性的话，给构造函数加属性
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

// 类的调用检查 (类的实例，构造函数)
function _classCallCheck(instance, Constructor) {
  // 如果这个实例不是这个构造函数的实例的话，就报错
  // 也就是说，不能把类当普通函数类调用。应该要 new fn()一个实例，而不是直接写 fn()
  if (!(instance instanceof Constructor)) {
    // 类的构造函数 Parent ， 不能不通过 new 的情况下使用
    throw new TypeError("Cannot call a class as a function");
  }
}

// 自执行函数 fn(){}()，为了形成一个私有作用域
var Parent = function () {
  // 先定义个函数， 其实就是构造函数
  function Parent(name) {
    // 为了保证这个类智能用 New 来调用
    _classCallCheck(this, Parent); // 类调用检查(类的实例，构造函数)

    this.name = name;
  }
  // 创建类
  _createClass(Parent, [{
    // 函数名
    key: "getName",
    // 一个函数
    value: function getName() {
      console.log(this.name);
    }
  }], [{
    key: 'hello',
    value: function hello() {
      console.log('hello');
    }
  }]);

  return Parent;
}();
```



## 类的继承

```javascript
// 继承
class Child extends Parent {
  constructor(name, age) {
    super(name) // 父类的构造函数
    this.age = age
  }
  getAge() {
    console.log(this.age);
  }
}
```



### 类继承的ES5原理

```javascript
function _inherits(subClass, superClass) {
  // 如果父类不是函数， 并且父类不等于 null
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  // 给子类的构造函数重写原型。让子类的prototype为父类的一个实例。还要覆盖constructor，让它指向 subClass
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    // 重写 constructor。如果不重写实例会指向 superClass
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  // subClass.__proto__ = superClass
  // 让子类的 __proto__ 等于父类，这一步为了让子类继承父类的静态属性
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Child = function (_Parent) {
  // 子类继承父类
  _inherits(Child, _Parent);

  function Child(name, age) {
    // 类调用检查，保证智能 new 来创建
    _classCallCheck(this, Child);

    // 父类的构造函数
    var _this = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name));

    _this.age = age;
    return _this;
  }

  _createClass(Child, [{
    key: 'getAge',
    value: function getAge() {
      console.log(this.age);
    }
  }]);

  return Child;
}(Parent);
```

> 简化版的理解方式


```javascript
// 创建一个实例的原理
Object.create = function(prototype) {
    // 先创建一个空的函数
    function Fn() {}
    Fn.prototype = prototype
    // 返回这个函数的实例
    return new Fn() // __proto__
}

// 简化版理解
function Parent(name) {
    this.name = name
}
function Child() {

}
Child.prototype = new Parent() // 继承了 name， 但是 name 是用传值进去的。所以没意义
Child.prototype = Object.create(Parent.prototype) // 去找父类的原型。不在乎父类具体特征
Child.prototype.constructor = Child // 重写 constructor
let child = new Child()  // child.__proto__.__proto__ = Parenr.prototype
console.log(child.constructor); // Child
```



### proto, setPrototypeOf和prototype的区别

> _ _ proto _ _ ， 是实例的原型对象。继承也是通过这个来关联的。恒等于 Object.prototype和Object.prototype
> setPrototypeOf， 其实就是给 proto 赋值
> prototype 一般针对构造函数而言

