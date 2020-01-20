# THIS 应用实例

## 全局下的 this

在执行函数时，若函数中的this是被上一级的对象所调用，则this指向的就是上一级的对象。不然就是全局环境。

### 严格与非严格模式

函数在全局环境下被调用时

- 严格模式，this 为 undefined
- 普通模式，this 是全局环境，即 window或者是global

```js
function f1 () {
  console.log(this)
}
function f2 () {
  'use strict'
  console.log(this)
}
f1() // window
f2() // undefined
```



对于匿名函数中，就算使用严格对象，其 this 也是指向全局环境

```js
function foo() {
  console.log( this.a );
}
var a = 2;
(function(){
  "use strict";
  foo(); // 2
})();
```



### this 指向最后调用的对象

#### foo.fn() 执行时

调用 `fn()` 方法的对象是 foo 对象，所以在 fn 方法内的 this 指向就是 foo 对象，那么 `this.bar` 也就是 `foo.bar`



#### fn1() 执行

虽然 `foo.fn` 被赋值给 fn1 变量了，但是最后执行 fn1 的是全局爸爸，所以最后相当于是全局爸爸执行了 fn()，所以 this 指向了 window。要注意最后的形式是 `window.fn()`， 而不是 `window.foo.fn()`，因为赋值的时候是把 `fn()` 的引用赋值了，而不是把 foo 对象也赋值了。

```js
const foo = {
  bar: 10,
  fn: function() {
    console.log(this)
    console.log(this.bar)
  }
}
foo.fn() // foo对象, 10
var fn1 = foo.fn
fn1() // window
```





## 上下文对象调用中的 this

有了上面的知识，对这题应该好理解。一句话就是

this 指向最后调用它的对象！，brother 是最后调用它的对象

```js
const person = {
  name: 'Lucas',
  brother: {
    name: 'Mike',
    fn: function() {
      return this.name
    }
  }
}
console.log(person.brother.fn()) // Mike
```



进过下面的变形

### 函数的嵌套调用

- `o1.fn()`，没有问题，指向的就是o1对象

- `o2.fn()`，这里可能会不知道。但是最后我们还是要看调用 this 的那个函数，它返回 `o1.fn()`，所以指向的还是o1

- `o3.fn()`，将 `o1.fn` 赋值给 `var fn`，变量fn在预处理阶段变量提升到 window，所以最后是 `window.fn()`，指向的是 window，所以执行 `window.text` 的结果是 `undefined`

```js
const o1 = {
  text: 'o1',
  fn: function() {
    return this.text
  }
}
const o2 = {
  text: 'o2',
  fn: function() {
    return o1.fn()
  }
}
const o3 = {
  text: 'o3',
  fn: function() {
    var fn = o1.fn
    return fn()
  }
}

console.log(o1.fn()) // o1
console.log(o2.fn()) // o1
console.log(o3.fn()) // undefined
```



### 改变 this 的指向

现在要求 `o2.fn()` 输出的是 `o2`

遵循的原则就是，`this` 指向最后调用它的对象

原来的代码是 `return o1.fn()`，最后结果是 `o1`去执行了 `fn()`

现在把 `o1.fn` 赋值到 `o2.fn` 属性上，最后调用的就是 `o2.fn()`

```js
const o1 = {
  text: 'o1',
  fn: function() {
    return this.text
  }
}
const o2 = {
  text: 'o2',
  fn: o1.fn
}

console.log(o2.fn())
```



## 内置函数 call/apply/bind 改变 this 指向

这三个函数基本的考察：

- 区别和作用

- 基本的使用方式和传参区别

- 高级考察：都是与构造函数和组合式继承相结合



### 三个函数的区别

- 他们都是改变相关函数 this 指向的。

- 但 call/apply 是直接进行相关函数调用。

- - call/apply 只是传参方式不一样

- bind 返回一个绑定了this指向的新函数，但是不会自己执行。

```js
const target = {}
fn.call(target, 'arg1', 'arg2')
// ==> 等价于， 只是传参方式不一样
fn.apply(target, ['arg1', 'arg2'])
// ==> 等价于，bind需要手动执行，所以加了 () 表达式
fn.bind(target, 'arg1', 'arg2')()
```



### 例题

简单使用 call 函数改变this指向。

```js
const foo = {
  name: 'lucas',
  logName: function() {
    console.log(this.name)
  }
}
const bar = {
  name: 'mike'
}
console.log(foo.logName.call(bar)) // mike
```



## 构造函数和 this

下面代码的输出是 Lucas。

这里将 Foo 作为一个构造函数，通过new关键词，实例化了 `instance` 对象。在构造函数中的 this 指代的就是被实例后的对象。

```js
function Foo() {
  this.bar = "Lucas"
}
const instance = new Foo()
console.log(instance.bar) // Lucas
```



### new 调用构造函数的背后

- 创建一个新对象——实例化
- 该对象被执行 [[prototype]] 连接
- 将构造函数的 this 指向该新对象
- 为该对象添加属性和方法等
- 若该函数没有返回其他对象，就返回该新对象

```js
var obj = new Foo()
// ==> 原理上等价
var obj  = {} // 新建对象
obj.__proto__ = Foo.prototype // 原型指向
Foo.call(obj) // 更改 this 指向
```



### 构造函数中的 return

- 构造函数中返回的是对象时，this指向该对象

```js
function Foo(){
  this.user = "Lucas"
  const o = {}
  return o
}
const instance = new Foo()
console.log(instance.user) // undefined
```

- 构造函数中返回的不是对象，this 仍然指向实例

```js
function Foo(){
  this.user = "Lucas"
  return 1
}
const instance = new Foo()
console.log(instance.user)
```



## 箭头函数中的 this 指向

箭头函数中的this，是在定义箭头函数时，根据外层（函数或去全局）上下文来决定的

- `foo1.fn()`  执行，this出现的位置是在匿名函数中，所以 `this` 指向一定是 `window`

- `foo2.fn()` 执行，箭头函数中的 `this` 由外层 `this` 决定，而调用fn的对象是 `foo2` ，所以this就是 `foo2` 对象

```js
// 普通函数
const foo1 = {  
  fn: function () {  
    setTimeout(function() {  
      console.log(this)
    })
  }  
}
// 箭头函数写法
const foo2 = {  
  fn: function () {  
    setTimeout(() => {  
      console.log(this)
    })
  }  
} 

console.log(foo1.fn()) // window
console.log(foo2.fn()) // {fn:f}，也就是foo2对象
```



## this 优先级相关

- 显示绑定this：调用call，apply，bind，new等
- 隐式绑定this：只能根据上下文关系来确定



### 显示绑定优先级更高

- `obj1` 对象调用 foo() 函数，call 将 this 指向了 obj2 对象中，所以 `this.a` 在`obj2`对象是是2

- `obj2.foo.call(obj1)`，同理，输出为 `1`

```js
function foo (a) {
  console.log(this.a)
}

const obj1 = {
  a: 1,
  foo: foo
}

const obj2 = {
  a: 2,
  foo: foo
}

obj1.foo.call(obj2) // 2
obj2.foo.call(obj1) // 1
```



### new 比显示绑定优先级高

```js
function foo (a) {
  this.a = a
}

const obj1 = {}
// bind 绑定 obj1的this
var bar = foo.bind(obj1) // foo是一个函数，执行的时候this指向了 obj1 对象
bar(2) // 就是在 obj1 对象中执行 this.a = 2
console.log(obj1.a) // 2

// 将bar作为构造函数，用new实例出baz
var baz = new bar(3) // 与之前bind绑定的 obj1 中的this解绑，this指向了被实例化的对象
console.log(baz.a) // 3
```



### 配合箭头函数

- `const bar = foo.call(obj1)`。在 obj1 的 this 下执行 foo 函数，此时箭头函数的 this 已经绑定成了 ob1,之后不会再变化了

- `bar.call(obj2)`。在执行这个，箭头函数中的 this 也不会发生变化了

```js
function foo() {
  return a => {
    console.log(this.a)
  };
}

const obj1 = {
  a: 2
}

const obj2 = {
  a: 3
}

const bar = foo.call(obj1)
console.log(bar.call(obj2)) // 2
```



若将foo函数完全改成 箭头函数，下面代码，箭头函数绑定的是最外层也就是 window

```js
var a = 123
const foo = () => a => {
  console.log(this.a)
}
// ...
var bar = foo.call(obj1)
console.log(bar.call(obj2) // 123
```



使用 const去声明变量 a。因为用const声明的变量不会挂载到window上，所以是找不到 window.a 的

```js
const a = 123
// ...
var bar = foo.call(obj1)
console.log(bar.call(obj2) // undefined
```



### 模拟 bind

```js
Function.prototype.bind = Function.prototype.bind || function (context) {
  // 调用 bind 必须是函数
  if (typeof this !== "function") {
    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
  }
  var me = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var F = function () {};
  F.prototype = this.prototype;
  var bound = function () {
    var innerArgs = Array.prototype.slice.call(arguments);
    var finalArgs = args.concat(innerArgs);
    // 兼容构造函数
    return me.apply(this instanceof F ? this : context || this, finalArgs);
  }
  bound.prototype = new F();
  return bound;
}
```



### 根据优先级判断 this 应用规则

按照一下顺序判断 this 的应用规则是哪一条



#### new 绑定

函数是否在 new 中调用（new 绑定） ？ 如果是的话 this 绑定的是新创建的对象。

```js
var bar = new foo()
```



#### 显示绑定

函数是否通过 `call、 apply`（显式绑定） 或者硬绑定调用？ 如果是的话， this 绑定的是

指定的对象。

```js
var bar = foo.call(obj2)
```



#### 隐式绑定

函数是否在某个上下文对象中调用（隐式绑定） ？ 如果是的话， this 绑定的是那个上

下文对象。

```js
var bar = obj1.foo()
```



#### 默认绑定

如果都不是的话， 使用默认绑定。 如果在严格模式下， 就绑定到 undefined， 否则绑定到

全局对象。

- 对于默认绑定来说，函数体是严格模式时， this 是 undefined
- 函数体不是严格模式，this 默认绑定到 window

```js
var bar = foo()
```



## 关于 this 绑定的例外情况

### 用 null/undefined 忽略 this

#### 忽略规则

当向 bind, apply, call 等内置函数中传入 null / undefined 作为 this 的占位符时，会被忽略，当作默认规则绑定。指向全局对象



#### null 的应用场景

这种忽略的方式也是有一定的应用场景

```js
// 有一个普通函数
function foo(a,b) {
  console.log( "a:" + a + ", b:" + b );
}

// 1 将 [1,2] 展开成 1,2 作为参数传给函数
foo.apply( null, [1, 2] ); // a:1, b:2

// 在 ES6 中完全可以使用 ...[1,2] 展开符来简化上述操作

// 2 函数 curry 化。ES6 中暂时没有柯里化语法，所以还是要用 bind
var bar = foo.bind( null, 1 );
bar(2); // a:1, b:2
```



#### 比 null 更清晰的空对象

创建空对象常用的两种方式

```js
// 1 字面量方式
// 这种方式，会进行 prototype 的委托
const obj = {}

// 2 API 方式
// 真的是空对象
// ∅ 代表数学中的空集符号。用搜狗输入 kongji 就有
const ∅ = Object.create(null)
```



在去应用上述替代 Null 的方式，让数据更加安全，让任何使用 this 的情况都限制在这个空对象中

```js
// 把数组展开成参数
foo.apply( ø, [2, 3] ); // a:2, b:3
// 使用 bind(..) 进行柯里化
var bar = foo.bind( ø, 2 );
bar( 3 ); // a:2, b:3
```



### 箭头函数

该函数用 `=>` 定义，而不是 `function` 定义。所以无法应用 4 条规则

它的 this 指向是由定义时外层的作用域决定的

```js
// 常用在回调、定时器或者事件处理函数上
function foo() {
  setTimeout(() => {
    // 这里的 this 在此法上继承自 foo()
    console.log( this.a );
  },100);
}
var obj = {
  a:2
};
foo.call( obj ); // 2
```











