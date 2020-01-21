# Generator 异步迭代器



## 异步操作的演变

> 异步编程的语法目标，就是怎样让它更像是同步编程.其发展过程如下：
> 	回调函数，
> 	事件监听，
> 	发布订阅，
> 	Promise/A+ 和 Generator生成器，
> 	async/await


JS是单线程异步阻塞的，所以异步操作很常见。



### 高阶函数

> 介绍异步之前，需要了解高阶函数。
> js中，函数是一等公民，可以作为参数和返回值。



#### 独立函数

一般我们要实现一个功能，都会去独立写一个函数。如下：

```javascript
// 判断一个参数是否是字符串
function isString(param) {
  return Object.prototype.toString.call(param) == '[object String]'
}
// 判断一个参数是否是数组
function isArray(param) {
  return Object.prototype.toString.call(param) == '[object Array]'
}

console.log(isString('dd')); // true
console.log(isString({})) // false
console.log(isArray([])) // true
```



#### 案例1：函数可以作为返回值，闭包作用域

我们发现，如果要判断更多的数据类型，就要定义更多的方法。这里就要涉及到一个**工厂模式**，通过一个函数来生成类似功能的其他函数。

```javascript
// 通过这个函数，可以批量生产一些函数。这就是工厂，来生产函数
function isType(type) {
  // 返回一个函数。也是闭包，有私有作用域
  return function (param) {
    // 用模板字符串
    return Object.prototype.toString.call(param) == `[object ${type}]`
  }
}
let isString = isType('String')
let isArray = isType('Array')

console.log(isString('dd')); // true
console.log(isString({})) // false
console.log(isArray([])) // true
```



#### 案例2：函数可以作为参数，传到另一个函数里面

> lodash after 指一个函数被调用多少次才会真正执行


```javascript
function eat() {
  console.log('吃完啦');
}

function after(times, fn) {
  let count = 0
  console.log('闭包外', count);

  return function () {
    console.log('闭包内', count);
    if (++count == times) {
      fn()
    }
  }
}
// 只调用了一次 after 函数，newEat接收的其实是里面的闭包函数。
// 调用后，after 函数本身的 count 变量被销毁
// 闭包中的 count 变量却独立存在
let newEat = after(3, eat) 
newEat()
newEat()
newEat() // 第三次被执行， '吃完啦'
```

最后的执行结果如下:

```
闭包外 0
闭包内 0
闭包内 1
闭包内 2
吃完啦
```



### 回调 callback

> 这里利用node来操作演示。用到 Node 的一个文件系统模块 `fs`



#### 回调函数的问题

- 无法捕获错误 try catch
- 不能 return

```javascript
let fs = require('fs') // 引入文件读取模块。

// 异步读取文件的函数
function read(filename) {
  // 这里其实是2个调用块 = 读取文件 + 执行回调
  fs.readFile(filename, 'utf8', function (err, data) {
    throw Error('抛出错误')
    if (err) { // 若 err 有值， 则表示程序出错
      console.log('回调err>>>', err);
    } else { // 没有错误，表示成功
      console.log('回调文件数据>>>',data);
    }
  })
}

// 异步不能使用 try catch， 也不能用 return
try {
  let result = read('./1.txt') // result 是拿不到结果的
} catch (e) {
  console.log('err', e);  // 这句话是执行不到的
}
// 这句话比上面执行的异步要先执行
console.log(2);
```

- 回调地狱（回调嵌套）

> 当访问服务器时， 要请求一个页面
> 一方面，服务器会先去读取模板文件(ejs, pug, jade, handlebar)
> 另一方面还要读取数据(文件中或数据库中)
> 他们都很慢，所以都是异步的。


```javascript
// 这种回调地狱的问题：
//   1 难看
//   2 难以维护
//   3 效率低。他们是串行的

// 如果要请求很多文件，那么要多层嵌套（因为是异步的）
fs.readFile('./template.txt', 'utf8', function(err, template) {
  fs.readFile('./data.txt', 'utf8', function(err, data) {
    console.log(template+' '+data);
  })
})
```



#### 如何解决回调地狱（回调嵌套）

- 方案1 通过事件发布订阅来实现

> 就是每执行一次异步，都记录一下保存下来。执行完之后，一次放出。
> 'events'
> 	是node核心模块的一个类， 可以创建事件发射器的实例
> 	里面有两个核心方法。on 注册监听，emit 发射事件


```javascript
let EventEmitter = require('events')
let eve = new EventEmitter()
// 这个html对象存放最终数据
let html = {} // template data

// 监听数据，获取成功事件， 当事件发生之后调用回调函数
eve.on('ready', function(key, value) {
  html[key] = value
  if (Object.keys(html).length == 2) {
    console.log(html);
  }
})

// 当然，在相应路径要有这2个文件
fs.readFile('./template.txt', 'utf8', function(err, template) {
  // 1 事件名，23 传给回调的属性名和对象值(文件里的内容)
  eve.emit('ready', 'template', template) 
})
fs.readFile('./data.txt', 'utf8', function(err, data) {
  eve.emit('ready', 'data', data)
})
```

- 方案2 通过一个哨兵函数来处理

> 通过哨兵变量，去控制并发执行
> 比事件订阅更加简单，但是不够灵活。解决办法就是通过工厂模式搭配计数器


```javascript
// 工厂函数：通过计数器，到阀值结束
function render(length, cb) {
  let html = {}
  return function(key, value) {
    html[key] = value // 赋值
    if (Object.keys(html).length == length) {
      cb(html);
    }
  }
}

// 传入 长度 和 自定义的 callback函数
let done = render(2, function(html) {
  console.log(html);
})
fs.readFile('./template.txt', 'utf8', function(err, template) {
  done('template', template)
})
fs.readFile('./data.txt', 'utf8', function(err, data) {
  done('data', data)
})
```



## Generator生成器与Iterator迭代器

上面对异步回调的解决方案还不够现代，所以慢慢地出现了生成器。

> 是理解 koa 的基础，也是现代异步解决方案 async await 的基础
> 与 promise 结合，解决异步问题



### ES5模拟生成器和迭代器

```javascript
/**
 * 模拟
 * 生成器，生成迭代器
 */
function read(books) {
  let index = 0 // 索引
  return {
    next() {
      // 取到为 false, 取不到值为 true
      let done = index == books.length // 判断是否为最后一个
      let value = done?undefined:books[index++]
      return {
        value,
        done
      }
    }
  }
}

// 迭代器：从容器中取东西，取完为止。
// it 有个next 方法，每次调用都返回一个结果 {value, done}
// 不停调用 next 方法，得到一个结果
// 当 done 为 true 时，表示取完了
let it = read(['js', 'node', 'mysql'])

let result
do {
  result = it.next()
  console.log(result);
} while (!result.done);
```



### ES6的生成器

> 生成器是个函数，用来生成 迭代器
> 生成器函数与普通函数不一样，普通函数一旦调用一定会执行完。
> 但是生成器函数中间可以暂停，可以分步执行 。每个暂停点可以输入输出


> 使用 * 号来标记生成器，用 yield 来划分执行块。yield 之后代码为本次返回值，之前代码为下次next的输入



#### 基本概念



##### 与其他函数的对比

普通函数 —— 完整执行完
generator —— 执行中可以暂停，踹一脚走一步。也是解决异步操作问题。比Promise擅长处理逻辑
promise —— 一次读一堆，没有什么逻辑关联



##### generator 底层机制

generator将我们的 show() 分成了2个小函数，`show_1(), show_2()`
当我们 next() 的时候，就会执行每一个小函数
实际上，generator 是对 promise 的一个小小的封装



#### 基本用法



##### generator 函数特征

```javascript
// 特征： function 和 show 之间有个 * 号
function * show() {
  alert('a')

  let a = yield // 暂时放弃执行

  alert('b')
  alert(a)

  return
}
let genObj = show() // 实际上这里Show是一个generator对象。需要赋给对象，才可以操作其方法
genObj.next() // 'a', 执行下一步
genObj.next() // 'b', 继续下一步
```



##### 传参和 next

```javascript
*
  yield 可以传参，还能返回值
  上面的 show() 上， yield 把代码分成了2个部分
*/
/* 2 yield 传参 */
genObj.next(1) // 'a'
genObj.next(2) //  'b'  2


/* 3 yield 返回中间态 */
// 返回中间结果
function * 炒菜(新鲜的菜) {
  // 1 洗菜
  新鲜的菜 -> 洗好的菜
  // 保存传递中间状态
  let 干净的菜 = yield 洗好的菜 // 洗完了，传给“干净的菜”，提供给下面用
  // 2 切菜
  干净的菜 -> 切好的菜
  // 保存传递中间状态
  let 丝、块 = yield 切好的菜
  // 3 炒菜
  丝、块 -> 熟的菜
  // 4 完成
  return 熟的菜

}
let gen = 炒菜() // 生成 generator 对象，复制给 gen，然年可以使用其方法
let res1 = gen.next()
console.log(res1); // {value:洗好的菜(中间结果), done:false(函数是否走完)}

let res2 = gen.next()
console.log(res2); // {value:切好的菜, done:false}

let res3 = gen.next()
console.log(res3);  // {value:熟的菜, done:true}, 如果这里没有return 则value是Undefineds
```



#### 实例代码



##### 示例代码1

```javascript
/**
 * 生成器函数，有个 *号
 * 会返回一个迭代器
 * 执行的时候，可以设暂停点
 *
 *  生成器函数，内部其实生成了很多小函数。用yield未标记分割。
 */
function *read(books) {
  console.log('开始执行');
  for (let i = 0; i < books.length; i++) {
    // yield 放弃屈服。就是暂停
    yield books[i] // 暂停的结果就是，yield 之后的表达式
  }
  console.log('结束执行');
}

let it = read(['js', 'node'])
let r1 = it.next() // 继续执行， 产出一个结果
console.log(r1); // { value: 'js', done: false }
let r2 = it.next()
console.log(r2); // { value: 'node', done: false }
let r3 = it.next()
console.log(r3); //结束执行 { value: undefined, done: true }
```



##### 示例代码2

```javascript
// 生成器函数的特点：有个 * 号。
// 生成器有若干个阶段, 用 yield 划分，每个划分点都会返回一个结果并等待传值
// 本次输出放在 yield 之后，下次输入放在 yield 之前
function *go(a) {
  console.log(1);
  // 此处的 b 是外界输入的
  let b = yield a // 此时将结果 'a' 返回给外界，并且等待下一次next和传值给 b
  console.log(2);
  let c = yield b
  console.log(3);
  return c
}
// 生成器函数，调用的时候不会立即执行。会返回迭代器
// 迭代器是个对象，每调用一次 next 都会返回一个值对象
let it = go('a')
let r1 = it.next()  // 第一次执行next，传参是没有意义的
console.log(r1) // {value: 'a', done: false}, value(产出结果), done(表示是否迭代完成)
let r2 = it.next('B') // 传给的是let b 中的 b
console.log(r2) // {value: 'B', done: false}
let r3 = it.next('C')
console.log(r2) // {value: 'C', done: true} 遇到 return ，done=true
```



## 多种异步对比



### 不带逻辑的异步对比

#### ajax 回调

```javascript
// 1 回调嵌套 ajax
$.ajax({
  url: xxx,
  dataType: 'json',
  success(data1){
    $.ajax({
      url: xxx,
      dataType: 'json',
      success(data2){
        // 完事
      },
      error() { alert('错误') }
    })
  },
  error() { alert('错误') }
})
```



#### promise 方式

```javascript
// 1 回调嵌套 ajax
$.ajax({
  url: xxx,
  dataType: 'json',
  success(data1){
    $.ajax({
      url: xxx,
      dataType: 'json',
      success(data2){
        // 完事
      },
      error() { alert('错误') }
    })
  },
  error() { alert('错误') }
})
```



#### generator 方式

```javascript
// 3 generator
runner(function *() {
  let data1 = yield $.ajax({url:xxx, dataType: 'json'})
  let data2 = yield $.ajax({url:xxx, dataType: 'json'})
  let data3 = yield $.ajax({url:xxx, dataType: 'json'})

  // 完事
})
```



### 复杂业务逻辑中的异步对比



#### ajax 回调嵌套

```javascript
// 1 带逻辑的 回调嵌套 AJAX
$.ajax({
  url: 'getUserData',
  dataType: 'json',
  success(userData) {
    if (userData.type == 'VIP') {
      // VIP用户
      $.ajax({url:'getVIPItems', dataType: 'json', success(items){
        // 业务处理，生成列表之类的
      }, error(err) {
        alert('错误')
      }})
    } else {
      // 普通用户
      $.ajax({url:'getItems', dataType: 'json', success(items){
        // 业务处理，生成列表之类的
      }, error(err) {
        alert('错误')
      }})
    }
  }
})
```



#### promise

> 还不如 ajxa 回调方便


```javascript
// 2 带逻辑的 Promise —— 还没有上面的好用
Promise.all({
  $.ajax({url:'getUserData', dataType: 'json'})
}).then(res => { // 对不同类型的用户做不同的数据处理
  let userData = res[0]
  // VIP用户
  if (userData.type == 'VIP') {
    Promise.all({
      $.ajax({url:'getVIPItems', dataType: 'json'})
    }).then((res)=>{
      let items = res[0]
      // 最后处理业务，生成列表，显示之类的
    }, (err)=>{
      alert('错误')
    })
  } else {
    // 普通用户
    Promise.all({
      $.ajax({url:'getItems', dataType: 'json'})
    }).then((res)=>{
      let items = res[0]
      // 最后处理业务，生成列表，显示之类的
    }, (err)=>{
      alert('错误')
    })
  }
}, err => {
  alert('错误')
})
```



#### generator 方式

```javascript
// 3 带逻辑的 generator
runner(function *() { // 注意不能使用 =>
  let userData = yield $.ajax({url:'getUserData', dataType:'json'})

  if (userData.type == 'VIP') {
    let items = yield $.ajax({url:'getVIPItems', dataType:'json'})
  } else {
    let items = yield $.ajax({url:'getItems', dataType: 'json'})
  }

  // 业务处理，生成列表显示之类的
})


// 服务类 runner.js(先无视这个部分)
// 相当于是封装了 Promise 逻辑
function runner(_gen) {
  return new Promise((resolve, reject) => {
    var gen = _gen()

    _next()
    function _next(_last_res) {
      var res = gen.next(_last_res)

      if (!res.done) {
        var obj = res.value

        if (obj.then) {
          obj.then((res) => {
            _next(res)
          }, (err) => {
            reject(err)
          })
        } else if (typeof obj == 'function') {
          if (obj.constructor.toString().startsWith('function generatorFunctio()')) {
            runner(obj).then(res => _next(res), reject)
          } else {
            _next(obj())
          }
        } else {
          _next(obj)
        }
      } else {
        resolve(res.value)
      }
    }
  })
}
```
