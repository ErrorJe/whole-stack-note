# call, apply 和 bind



## call

### 数组的方法 slice

> Array.prototype.slice = function(){}， 是浏览器API已经实现的方法。

```js
var ary = [12, 32, 33]
ary.slice // ary 这实例通过原型链的查找机制，找到 Array.prototype上的slice方法
ary.slice() // 找到slice方法并执行。执行过程中将ary数组进行截取
```

注意前后的区别，没有带`()`，是找到方法，而带上`slice()`，则是去执行方法。



### 函数的方法 call

> Function.prototype.call = function( thisArg, arg1, arg2, ... ){}

```js
var obj = {name:'wjy'}
function fn(){
  console.log(this)
}

fn() // window
obj.fn() // obj 对象上并没有这个方法。等于是执行 undefined()，肯定就报错了。

// 先执行原型上的call方法，然后让fn方法中的this变为第一个参数即obj，最后把fn这个函数执行
fn.call(obj) // 这次打印的是 obj, {name:'wjy'}

// 非严格模式下。
fn.call(100) // 100
fn.call(null) // window
fn.call(undefined) // window
fn.call() // window

// 严格模式 use strict
fn.call(null) // null
fn.call(undefined) // undefined
fn.call() // undefined
```



### 重写 call 方法

> 下面不是完整的源码，只是示意

```js
Function.prototype.myCall = function(ctx) {
  // 1 改变fn中的this值。一开始的this就是调用该方法的对象，也就是fn
  // 	1.1 this.toString() === fn.toString()
  // 	1.2 this.toString() 得到的是fn方法的字符串形式
  // 	1.3 replace，方法本身已经成为了字符串，只要改变其中的 this 内容为 ctx
  // 	1.4 eval 将字符串转换为可执行的JS代码
  eval(this.toString().replace('this', ctx))
  
  // 2 让 this 方法执行
  this() // 如fn.myCall(obj)， 执行的就是调用者 fn() 方法
}

fn.myCall(obj)
```



### 关于 call 的测试题

#### fn1.call(fn2)

> 1  首先 fn1通过原型链机制找到 Function.prototype.call 方法，并执行
>
> 2 此时 call 方法中的 this 是调用者，即 fn1
>
> 3 在 call 方法执行过程中首先让 fn1 中的 this 关键字变为 fn2， 然后让 fn1 这个方法执行
>
> 4 最后输出 1



#### fn1.call.call(fn2)

> 1 首先 fn1 通过原型链找到 Function.prototype.call 方法
>
> 2 然后再让 call 方法通过原型链找到 Function 原型上的 call（call本身也是函数，所以也是可以找到原型的）
>
> 3 在第二次找到 call 的时候执行，方法中的 this 是 fn1.call ，将其变为 fn2，最后让fn1.call 执行
>
> 4 fn1.call 作为一个整体方法去执行。call方法本身就分为两步，1是改变this的值，2是执行调用者也就是执行this()。`fn1.call`在`.call(fn2)`执行时，其this就被换成了fn2。所以最后相当于是执行了 fn2()， 所以最后结果为2
>
> 
>
> 简单来说，前半部分的`fn1.call`仅是起到了查找 call 方法的作用，只有最后一个 call 才会被执行。无论多加几个 call 结果都一样。

```js
function fn1(){console.log(1, this)}
function fn2(){console.log(2, this)}
fn1.call(fn2) // 输出：1, fn2()。fn1的this变为fn2了，但是f1还是正常执行
fn1.call.call(fn2) // 输出：2, window
	// => (fn1.call).call(fn2) => (fn2).call(fn2)
fn1.call.call.call.call.call(fn2) // 输出：2， window
	// => (fn1.call.call.call.call).call(fn2) => (fn2).call(fn2)
```



#### 附加好理解的方法拆解

> 1 call(fn2)执行, fn1.call = wjy,此时相当于 wjy.call(fn2)
> 2 根据 call 的作用, 会先会改变wjy中的this，然后去执行wjy。
> 3 所以是将 wjy 中的 this()改为了fn2()，所以最后执行的就是 fn2()

 可是，wjy是一个方法，而不是对象。所以this是window。

```js
// 系统中的 call 方法，给他分离来理解
Function.prototype.call = wjy
function wjy(ctx){
  // 1 改变 调用者方法中的 this
  // 2 执行调用者,也就是 
  this()
}

fn1.call.call(fn2)
```



## apply

> `Function.prototype.apply`，与 call 方法的作用是一模一样的
>
> 都是更改 this，且把方法执行。区别在于语法，apply 只接收一个数组

```
fn.call(obj, 100, 200) // 一个个传递参数
fn.apply(obj, [100, 200]) // 将参数放在数组中一次传过去
```



## bind

> `Function.prototype.bind`
>
> 在IE6-8中不兼容。和call/apply类似都是用来改变this
>
> 语法和 call 是一样的，区别是 bind 方法只是改变 this，而不执行方法

```js
fn.bind(obj, 1, 2) // 仅改变this，且返回改变this后的fn
fn.call(obj, 1, 2) // 改变this且执行fn
```

> bind 的设计思想：就是预处理思想。先处理好，以后再用。



## 记忆方法

参照知乎上的回答

> 猫吃鱼，狗吃肉，奥特曼打小怪兽。
>
> 每种动物都有一种技能。

```js
// 正常情况下
猫.吃鱼()
狗.吃肉()
奥特曼.打怪兽()

// 狗想吃鱼，但是没有吃鱼这个技能。在猫吃鱼之前，替代猫去吃
猫.吃鱼.call(狗, 鱼) // 于是狗就把鱼给吃了

// 猫要打怪兽了
奥特曼.打怪兽(猫, 小怪兽) // 在奥特曼打怪兽之前，猫替代了奥特曼，并把小怪兽打了一顿
```

> 关于 call 的传参问题，参照`马云`叔叔赚钱。
>
> apply, bind原理基本差不多。

```js
// 正常情况下 
马云.赚钱(我的钱, 我朋友的钱， 其他人的钱)

// 我想象中的情况
马云.赚钱.call（我, 马云的钱, 其他人的钱）

// 真实的情况
马云.赚钱.call(马云， 我的钱, 我朋友的钱， 其他人的钱)


```

