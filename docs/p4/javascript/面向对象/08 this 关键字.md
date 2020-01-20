# THIS 关键字

this 是 JS 执行上下文中很重要的一个组成部分。同个函数调用方式不同，this的值也不同（动态变化）。



## 函数种类

切换上下文的场景就是函数的调用。首先要认识下函数的类别

this 是在代码运行时绑定的，而不是定义时。

它的上下文对象取决于函数调用时的各种条件。



### 普通函数 function

> function 关键词定义的函数

```js
function foo(){ // code }
```



### 箭头函数 =>

> 用 => 运算符定义的函数

```js
const foo = () => { // code }
```



### 生成器 function*

> function* 定义的函数

```js
function foo*() { // code }
```



### 类 class

> 类实际也是个函数

```js
class Foo {
    constructor(){ // code }
}
```



### 方法 class

> 在类 class 中定义的函数

```js
class C {
    foo () {// code}
}
```



### 异步函数 async

```js
/1 普通函数异步
async function foo(){}
//2 箭头函数异步
const foo = async () => {}
//3 生成器函数异步
async function foo*() {}
```



## this 的行为

对this的本质解释：调用函数时使用的引用（注意是引用，而不是对象），决定了函数执行时刻的this。

也就是说，this的指向，是在调用函数时根据执行上下文所动态确定的。

### 普通函数行为

```js
// 1 在某对象中定义方法， 采用键值对的方式
var o = {
  showThis: showThis
}

// 2 普通函数
function showThis(){
  console.log(this);
  // 因为这里的 this 会根据环境变化，所以采用的方式是缓存
  let that = this;
}

showThis(); // 当作普通函数被调用， this 挂载到全局 global 上
o.showThis(); // 被当作方法调用， this 指向掉用方法的对象 o
```



### 箭头函数行为

无论什么引用调用函数，都不改变 `this` 值。箭头函数在定义时就决定了 `this` 的值

因为箭头函数的 `this` 在创建该函数的时候就已经确定且不能更改，指向的是外层函数的 `this` 指向。

若没有外层函数，则指向 `window`，也就是全局

```js
const showThis = () => {
  console.log(this);
}

var o = {
  showThis: showThis
}

showThis(); // global
o.showThis(); // global
```



### 方法行为

函数和方法不太一样。还要遵循上面对 `this` 的本质解释

```js
class C {
  showThis() {
    console.log(this);
  }
}
var o = new C();
var showThis = o.showThis;

showThis(); // undefined。“showThis是一个变量，他的引用不是一个对象，所以是undefined”
windiw.showThis(); //  window
o.showThis(); // o。this指向了被实例出来的对象o
```



## this 的机制

在 JS 中，函数中有个私有属性来保存 this 信息，`[[Environment]]`。

另外，还有一个私有属性来规定 this 的使用模式， `[[thisMode]]`， 他有3个值

- `lexical`, 从上下文中找 this，就是箭头函数

- `global`，当 this 为 undefined 时取全局对象，就是普通函数

- `strict`，严格模式，this 严格按照传入的值，可能为 `null` 或 `undefined`。class 就是按照这个模式



### this 的指向规则

切换上下文的动作，实际上是在创建一条新的执行环境记录时，记录的外层词法环境会被设置成 `[[Environment]]`

而调用函数时，就会创建函数自身的执行上下文，该阶段决定了 this 的指向。下面是具体的环节和规则：

- 作为函数调用时，如 `fn()`

- - 严格模式下，`this` 绑定到 `undefined`
  - 非严格模式下表，绑定到全局对象 `window`/`global`

- 由上下文对象调用时，如调用对象方法，`obj.fn()`

- - 绑定到该 obj 对象上

- 构造函数 new 调用时，绑定到被创建的实例对象上

- 箭头函数，根据定义时外层上下文绑定的 this 决定 this 指向

- 由 `call/apply/bind` 方法显式调用，绑定到指定参数的对象上



### 严格模式下的 this

在JS中，this不能被修改，不能被继承。

- 若嵌套函数是**作为方法调用**，this 指代调用方法的对象。
- 若嵌套函数是**作为函数使用**， this 指代全局对象 `window/global`（非严格模式下）或者是 `undefined`（严格模式下,`use strict`）

```js
"use strict"
function showThis(){
  console.log(this);
}

var o = {
  showThis: showThis
}

showThis(); // undefined。严格模式下认为，没有对象去引用这个函数。当非严格模式下，会自动取全局作为this
o.showThis(); // o
```



### 嵌套函数中的 this

- 最外层是普通函数， o.foo()。o对象的foo方法调用
- 第二层是箭头函数，foo()函数返回了一个箭头函数
- 第三层同第二次原理

```js
var o = {}
o.foo = function foo(){
  console.log(this); // 对象o引用是该this
  return () => {
    console.log(this); // 绑定了上层 this， 也就是 o 对象
    return () => console.log(this); // 同理
  }
}

o.foo()()(); // o, o, o，都是返回对象o
```



#### var that = this 技巧

this 是 JS 的一个关键字，在函数运行时，自动生成的一个内部对象 ，this 代表的是当前对象，只能在函数内部使用。

常见用法 `var that = this`， 就是把当前的 this 对象赋值一份到 that变量中。

```js
$(‘#conten ').click(function(){
  //this是被点击的#conten
  var that = this;
  $(‘.conten').each(function () {
    //this是.conten循环中当前的对象
    //that仍然是刚才被点击的#conten
  });
});
```

因为 this 是会随着对象的改变而动态发生变化的，所以用这种方法可以保留之前的那个对象。



#### 误解：在子函数中的this指代父函数本身

> 在嵌套函数中，误认为在子函数中的this指代父函数本身

实际上，我们在父函数中通过将this赋值于某一变量，然后在子函数中进行使用。

```js
var obj = {
  method: function() {
    var that = this // ==> 将method方法的This值保存，指代obj对象
    function fun () { // ==> 定义嵌套函数
      this // ==> 全局对象或者是undefined
      that // ==> 外部函数的this值，也就是obj对象
    }
  }
}
```



## 执行上下文

### 基本概念

> JS中执行所需要的所有信息定位
>
> 下文也就是在程序、函数、代码执行时的有效环境。也就是函数调用栈



虽然与作用域链相辅相成，但是是完全不同的两个概念。执行上下文包含了作用域链

执行上下文包括

- 变量对象
- 作用域链
- this的指向



### 代码执行的两个阶段

#### 预编译阶段

是前置阶段，由编译器将JS代码编译成可执行的代码。

- 变量提升：会对变量的内存空间进行分配

尽管JS是编译一行执行一行的解释型语言，但是在代码执行前，仍然会作一些预处理。

- 进行变量声明和变量提升，但是值为 undefined
- 所有非表达式的函数声明进行提升，也就是提升 function 关键字开头声明的函数

```js
function bar() {
  console.log('bar1')
}
var bar = function () {
  console.log('bar2')
}
bar()

// ==>相当于

function bar() {
  console.log('bar1')
}
var bar // 重复声明，被忽略
bar() // bar1
bar = function () { // 按照代码执行顺序，开始赋值
  console.log('bar2')
}
bar() // bar2
```

所以，函数调用开始创建执行上下文，在预编译阶段确定了作用域



#### 执行阶段

整个JS引擎的执行步骤：也就是在函数调用时，创建了这个执行上下文

- 预编译时，创建未赋值的变量对象 VO
- 代码执行，VO赋值转为激活对象AO。此时作用域链确定，保证了变量和函数的有序访问
- 若在当前作用域中无法找到变量或函数，则沿着作用域链一直找

```js
// foo.js
var b = 2;
function foo(){
  console.log(b); // 2
  console.log(a); // error
}

module.exports = function(){
  foo
}

// test.js
var foo = require('./foo.js)
var a = 1
foo()
// 2。foo()能够访问定义时就存在的b
// error。无法访问a，那时候还没有a的定义
```



### 执行上下文的调用栈

调用栈，就是函数之间的互相调用

单线程就是用 栈（先进后出） 这个数据结构实现的

JS用栈结构来管理函数的每层上下文，即函数调用时每出现一个层级的上下文环境就压栈，栈中每一项目又包含一个链表。函数结束时，执行上下文被出栈。

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200120105418.png)

刚开始，是window作为作用域，按照顺序执行代码。一旦进入一个新的作用域如函数区块，就会先去执行函数里这个上下文环境。

从原理上来说就是讲这个函数的执行下上文压栈到栈顶，然后执行完后抛出，再回到window的执行上下文。

```js
function foo1() {
  foo2()
}
function foo2() {
  foo3()
}
function foo3() {
  foo4()
}
function foo4() {
  console.lg('foo4') // 故意写错，可以在报错中看调用顺序
}
foo1()
```



这里的调用关系

```js
foo1 -> foo2 -> foo3 -> foo4 // 这也是入栈的顺序，foo1 入栈
foo4 执行完后，先出栈
```



上面估计将 foo4 写错，可以去chrome看报错和调用栈

> 就是一个竖直的栈结构

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200120105658.png)

还可以通过断点到 call stack 中去看调用栈

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200120105713.png)

当函数执行完毕，就会出栈，然后会被垃圾回收，相关的上下文被销毁。所以外界无法访问函数内的变量。

该变量在预编译时给予内存空间创建，执行时激活可以使用，在函数执行完毕后，相关上下文被销毁。