# Promise 和 async/await



## Promise 原生使用

Promise 是承诺的意思。一般指异步任务，需要很长时间执行的任务。在ES6中已经原生内嵌了 Promise/A+标准。

> 这里我们手写一个promise源码，然后进行操作。实现跟使用原生一样的效果



### 引入 promise 和基本使用

> 当然，原生中是不用特意引用。ES6是支持的。
> Promise 有2个回调，分别是成功时调用 resolve， 和失败时调用 reject
> promise.then(onFulfilled, onRejected)， 分别对应处理 成功回调 和 失败回调。


```javascript
// 引入自定义的 promise
let MyPromise = require('./Promise')

// Promise 表示一个异步操作的最终结果。同时 promise 也是个对象。
let p1 = new MyPromise(function (resolve, reject) {
  // 用 setTimeout 模仿异步操作
  setTimeout(() => {
    let num = Math.random() // 随机数判断
    console.log(num);
    if (num > .5) {
      resolve('成功') // 成功时调用, fulfilled 状态
    } else {
      reject('失败') // 失败时调用, rejected 状态
    }
  }, 1000);
})

// 要取到回调中的结果，就要用到 Promise.then
p1.then(function (value) { // 成功回调。value 拿到的是从 resolve 回调中传来的数据
  console.log('成功回调', value);
}, function (reason) { // 失败回调。从 reject 回调中传来的数据
  console.log('失败回调', reason);
})
```



### Promise 的三种状态

- pending 初始态。可以转换成 成功或失败 的状态 。去 then 中找他们。
- fulfilled 结果：成功态， value:  成功结果
- rejected 结果：失败态， reason： 失败原因



### Promise 其他方法的使用（all, race）

> 这两个方法都属于类，而不是实例。可以接收 Promise 数组。
> promise.all([]) 若全部完成，promise才算成功。一个失败，就整个失败。
> promise.race([]) 只看那个最先完成的结果。它的结果决定整组的结果。


- 定义2个promise对象

```javascript
let p1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject('p1失败')
  }, 1000);
})
let p2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve(200)
  }, 2000);
})
```

- 执行 promise.all

```javascript
console.time('cost')
console.time('cost2')

// 同时异步请求多个数据， 用 all
Promise.all([p1, p2]).then(function (data) {
  console.log(data); // [1, 2]调用顺序
  console.timeEnd('cost') // 2s。取决于最慢的那个
}, function (err) {
  console.log(err);
  console.timeEnd('cost2') // 1s, p1失败
})
```

- 执行 promise.race

```javascript
// 当你有3个接口都不稳定，可同时取3个，谁先回来用谁的
Promise.race([p1, p2]).then(function (data) {
  console.log(data);
  console.timeEnd('cost') // 1s
}, function (err) {
  console.log(err);
  console.timeEnd('cost2') // 1s, p1失败
})
```



## Promise 源码实现

> 将 promise 封装成模块来使用


```javascript
// ...
module.exports = Promise
```

> 把三种状态设定为常量


```javascript
// 定义三种状态的常量 
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
```



### Promise 实现类

```javascript
// 定义个 promise 实现类。构造函数的参数是一个异步任务
function Promise(executor) {
  let that = this // 缓存this, 绑定 promise 实例
  that.status = PENDING // 默认状态为 pending
  that.value = undefined // 放 promise 结果，可以放 成功或失败 的结果
  that.onResolvedCallbacks = [] // 存放所有成功的回调函数， 放一些承诺
  that.onRejectedCallbacks = [] // 存放所有失败的回调函数， 放一些理由

  // 把 promise 状态改为成功态
  function resolve(value) {
    setTimeout(() => {
      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }
      // 若是初始态，则转为成功态
      if (that.status == PENDING) {
        that.status = FULFILLED
        that.value = value // 成功后得到值，且不能修改
        // 调用所有成功的回调
        that.onResolvedCallbacks.forEach(cb => cb(that.value))
      }
    });
  }
  // 把 promise 状态改为失败态
  function reject(reason) {
    setTimeout(() => {
      // 若当前状态是初始态，则改为 失败态
    if (that.status == PENDING) {
      that.status = REJECTED
      that.value = reason
      that.onRejectedCallbacks.forEach(cb => cb(that.value))
    }
    });
  }

  // 立即执行传入的任务 executor
  try {
    // 因为此函数执行可能会异常，所以需要捕获。若出错，则用错误对象 reject
    executor(resolve, reject)
  } catch (e) {
    // 若此函数执行失败，则用失败的原因 reject 这个 promise
    reject(e)
  }
}
```



### 解析 promise 方法

```javascript
// 解析promise
function resolvePromise(promise2, x, resolve, reject) {
  // 1 promise2 和 x(promise1返回值) 指向同一个对象的情况
  if (promise2 === x) {
    return reject(new TypeError('循环引用'))
  }
  let called = false // promise2 是否已经 resolve 或者 reject了
  // 2 当 promise1 返回的是另一个 promise 对象时
  if (x instanceof Promise) {
    if (x.status == PENDING) {
      x.then(function (y) { // y 是 x 的值
        resolvePromise(promise2, y, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject)
    }
    // 3 当 x 为thenable函数或对象时, 只要有 then 方法的对象
  } else if (x != null && ((typeof x == 'object') || (typeof x == 'function'))) {
    // 当我们的 promise 和别的 promise 进行交互。这段代码要考虑兼容性，允许别人乱写
    try {
      let then = x.then
      // 3.1 若 then 是个函数
      if (typeof then == 'function') {
        then.call(x, function (y) {
          // 若promise2 已经成功或失败了，则不会再处理
          if (called) return
          called = true
          resolvePromise(promise2, y, resolve, reject)
        }, function (err) {
          if (called) return
          called = true
          reject(err)
        })
        // 3.2 若是个对象
      } else {
        // 到此的话 x 不是一个 thenable 对象，那直接把它当成值 resolve promise2就行了
        // 即返回的是一个对象 {key:Value, then:{}}， 有then属性但不是函数
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    // 4 若 x 是一个普通值，则用 x 的值去 resolve promise2
    resolve(x)
  }
}
```



### then 方法

```javascript
// onFulfilled 成功回调。用来接收 promise 成功的值或者是失败的原因
// onRejected 失败回调
Promise.prototype.then = function (onFulfilled, onRejected) {
  // 若成功和失败的回调没有传，则表示这个 then 没有任何逻辑，即 p.then()
  // 此时，会给一个默认值。就是在返回这个 promise1 时resolve(data)抛出的值
  // 然后将这个值传递给 promise2
  onFulfilled = typeof onFulfille == 'function' ? onFulfilled : function (value) {
    return value
  }
  // 若 promise1 失败了
  onRejected = typeof onRejected == 'function' ? onRejected : reason => {
    throw reason
  }

  let that = this
  let promise2
  // 同步时，走这2个分支
  if (that.status == FULFILLED) {
    console.log('同步>>>', 'FULFILLED');

    // 若当前 promise状态已经是成功态了，返回一个新的 Promise
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value) // onFulfilled 直接取值
          // 若获取到了返回值 x， 走解析promise的过程
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          // 若执行成功的回调过程中, 方法出异常时，用错误原因把promise2 reject
          // 即链式调用中，promise1-成功回调出错时，去到promise2的失败回调中
          reject(e)
        }
      });
    })
  }
  if (that.status == REJECTED) {
    console.log('同步>>>', 'REJECTED');
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onRejected(that.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      });
    })
  }
  // 异步时走这个分支
  if (that.status == PENDING) {
    console.log('异步>>>', 'PENDING');
    return promise2 = new Promise(function (resolve, reject) {
      that.onResolvedCallbacks.push(function () {
        try {
          let x = onFulfilled(that.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
      that.onRejectedCallbacks.push(function () {
        try {
          let x = onRejected(that.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}
```



### all 和 race 方法

```javascript
// 工厂函数
function gen(times, cb) {
  let result = []
  let count = 0

  return function(i, data) {
    result[i] = data
    if (++count == times) {
      cb(result)
    }
  }
}

Promise.all = function(promises) {
  return new Promise(function(resolve, reject) {
    let done = gen(promises.length, resolve)

    for (let i = 0; i < promises.length; i++) {
      // promises[i].then(done.bind(null, i))
      promises[i].then(function(data) {
        done(i, data)
      }, reject)
    }
  })
}

Promise.race = function(promises) {
  return new Promise(function(resolve, reject) {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject)
    }
  })
}
```



### deferred 和 catch 方法

```javascript
// catch 原理就是只传失败的回调
Promise.prototype.catch = function (onRejected) {
  this.then(null, onRejected)
}

Promise.deferred = Promise.defer = function () {
  let defer = {} // 延迟对象
  defer.promise = new Promise(function (resolve, reject) {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}
```



### resolve 和 reject 方法

```javascript
// 返回一个立即成功的 promise
// 别人提供给你一个方法，需要你传入一个promise， 但是你只有一个普通的值，你就可以通过这个方法把这个普通的值(String, number, object)转成一个promise对象
Promise.resolve = function(value) {
  return new Promise(function(resolve) {
    resolve(value)
  })
}

// 返回一个立即失败的 promise
Promise.reject = function(reason) {
  return new Promise(function(resolve, reject) {
    reject(reason)
  })
}
```



## node 模块 q

> q 用来实现 promise， 在angularjs中用的就是q
> q 是node的一个模块。是 promise 的另外一种实现方式
> 实际上这是比较老的实现方式，在JQ中也有



### q 的基本用法

```javascript
let Q = require('q') // 引入 q 库
let fs = require('fs')

function readFile(filename) {
  let defer = Q.defer() // 返回 defer 对象
  fs.readFile(filename, 'utf8', function () {
    if (err) {
      defer.reject(err)
    } else {
      defer.resolve(data)
    }
  })
  return defer.promise
}
// 调用
readFile('./1.txt').then(function (data) {
  console.log(data);
})
```



### 自定义 Q

> 就可以直接使用 Q.defer 不用去引入原生的 q


```javascript
// 自定义一个Q
let Q = {
  defer() {
    let success, error
    // 返回个对象,里面有2个方法，一个promise对象
    return {
      resolve(data) { // 成功回调
        success(data)
      },
      reject(err) { // 失败回调
        error(err)
      },
      promise: {
        then(onFulfilled, onRejected) {
          success = onFulfilled
          error = onRejected
        }
      }
    }
  }
}
```



### 自定义 promise + 原生 promise + Q 的混合使用

```javascript
/* 自定义promise， 原生promise， q 混合使用 */
let MyPromise = require('./Promise')
let Q = require('q')
let p1 = new MyPromise(function (resolve, reject) {
  resolve(100)
})

// 返回原生的 promise
let p2 = p1.then(function (data) {
  return new Promise(function (resolve, reject) {
    resolve(data + 100) // 200
  })
})

// 调用 q
let p3 = p2.then(function (data) {
  let defer = Q.defer()
  defer.resolve(data + 100) // 300
  return defer.promise
})
p3.then(function (data) {
  console.log(data); // 300
})

// Q.all 使用
function eventAdd(a, b) {
  // Q.spread扩展的意思,[]中的元素分别传给后面回调函数的参数
  return Q.spread([a, b], function (a, b) {
    return a + b
  })
}
let r = Q.all([
  eventAdd(2, 2)
  eventAdd(10, 20)
])
r.then(function (data) {
  console.log(data); // [4, 30]
})
```



## bluebird - 最快的promise

> bluebird 是世界上最快的promise库。 比ES6 promise出现更早
> 它能把任意的通过回调函数实现异步API换成promise API



### 基本用法

```javascript
let Promise = require('bluebird')
let readFile = require('fs').readFile

// 自定义一个。把一个普通的异步方法转为promise的方法
function promisify(fn) {
  return function (...args) { // filename, utf8, callback
    return new Promise(function (resolve, reject) {
      fn.apply(null, [...args, function (err, data) {
        err ? reject(err) : resolve(data)
      }])
    })
  }
}

// 返回一个新的函数
// let readFileSync = Promise.promisify(readFile) // bluebird 原生用法
let readFileSync = promisify(readFile)
readFileSync('./1.txt', 'utf8').then(function (data) {
  console.log(data);
})
```



### 其他用法

```javascript
// 其他用法
let fs = require('fs')
// 自定义一个 promisifyAll
function promisify(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] == 'function') {
      obj[key + 'Async'] = Promise.promisify(obj[key])
    }
  }
}
// 它会遍历对象上面的所有方法，给每个方法添加一个异步方法 Async
promisifyAll(fs)
fs.readFileAsync('./1.txt', 'utf8').then(data => console.log(data))
```



## genarator + promise

> 是 async await 的原理。
> 用到了 co 库



### 原生的方式

> 也会出现迭代器的多层嵌套

```javascript
let fs = require('fs')

function readFile(filename) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, 'utf8', function (err, data) {
      err ? reject(err) : resolve(data)
    })
  })
}

// 生成器函数, 读取3个文件
function* read() {
  let a = yield readFile('1.txt')
  console.log(a);
  let b = yield readFile('2.txt')
  console.log(b);
  let c = yield readFile('3.txt')
  console.log(c);

  return c
}
// 调用生成器，返回迭代器
let it = read()
let r1 = it.next() // {value:promise1 , done:false}
r1.then(function (data) { // 1.txt内容
  let r2 = it.next(data) // {value:promise2, done:false}
  r2.value.then(function (data) { // 2.txt内容
    let r3 = it.next(data) // {value:promise3, done:false}
    r3.value.then(function (data) { // 3.txt内容
      let r4 = it.next(data) // {value:'3.txt内容', done:true}
    })
  })
})
```



### 使用 co 库来自动调用迭代器

```javascript
// tj 发明的 co 库, 用来帮我们自动执行迭代器
let co = require('co')

// 自定义 co
function co(gen) {
  let it = gen() // 让生成器持续执行
  return new Promise(function (resolve, reject) {
    // 自执行写法，前面加个!，后面跟个()。与(function(){})()方式作用一样
    // 声明式定义 function fn(){}, 函数表达式定义 let fn=function(){}
    ! function next(lastValue) {
      let {
        value,
        done
      } = it.next(lastValue)
      if (done) {
        resolve(value)
      } else {
        value.then(next, reject)
      }
    }()
  })
}

// 将生成器套入。自动调用迭代器
co(read).then(function (data) {
  console.log(data); // 生成器返回值 c
})
```



## async await 异步终极解决方案

> 其实是 generator + promise 的语法糖


**好处：**

- 写法简洁
- 有很好的语义
- 很好地处理异常。throw Error, return, try..catch



### 基本使用方式

#### 异步方法定义

```javascript
let fs = require('fs')
function readFile(filename) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, 'utf8', function (err, data) {
      // throw Error('模仿抛出异常')
      err ? reject(err) : resolve(data)
    })
  })
}

/* 另外，这个readFile方法 ，也可以通过蓝鸟去写。不用自己写
  let Promise = require('bluebird')
  let readFile = Promise.promisify(readFile) 
*/
```



#### 使用 async await

```javascript
// 如果函数中有异步代码，前面加 async
async function read() {
  // 如果异步返回的是 promise， 则加一个 await。这样就可以同步形式赋值
  // 也就是说 await 之后必须是 promise
  let a = await readFile('./1.txt')
  // 可以 try..catch
  try {
    let b = await readFile('./2.txt')
  } catch (e) {
    console.log(e) // 可以捕获到异常
  }
  let c = await readFile('./3.txt')
  // 可以 return
  return 'ok'
}
// 不能直接 let x = read()。返回的也是一个 promise
read().then(data => {
  console.log(data); // ok
})
```



### 语法糖的实现原理

```javascript
// 语法糖的实现原理 
let co = require('co')
function read() {
  return co(function *() {
    let a = yield readFile('./1.txt')
    let b = yield readFile('./2.txt')
    let c = yield readFile('./3.txt')
    return 'ok'
  })
}
```



## 多种异步方式实现的demo

> 用多种异步解决方案去让三个小球执行异步运动。


### 回调嵌套

```html
<!DOCTYPE html>
<html>

  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      .ball {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        border: 1px solid;
      }

      .ball1 {
        background-color: red;
      }

      .ball2 {
        background-color: blue;
      }

      .ball3 {
        background-color: yellow;
      }
    </style>

  </head>

  <body>
    <!-- 内联样式才行 -->
    <div class="ball ball1" style="margin-left:0px;"></div>
    <div class="ball ball2" style="margin-left:0px;"></div>
    <div class="ball ball3" style="margin-left:0px;"></div>

    <script>
      // 取到3个小球的 DOM
      let ball1 = document.querySelector('.ball1')
      let ball2 = document.querySelector('.ball2')
      let ball3 = document.querySelector('.ball3')

      // 异步运动方法
      function move(ball, target, cb) {
        let timer = setInterval(function () {
          // 先取到当前的 left 值
          let left = parseInt(ball.style.marginLeft)
          if (left < target) {
            ball.style.marginLeft = (left + 1) + 'px'
          } else {
            clearInterval(timer)
            cb()
          }
        }, 4)
      }
      
      //1 回调嵌套
			move(ball1, 100, function () {
        move(ball2, 100, function () {
          move(ball3, 100, function () {
            alert('move over')
          })
        })
      }) 

    </script>
  </body>

</html>
```



### promise 链式调用

```javascript
// 改写异步运动方法，返回 promise
function move2(ball, target) {
  return new Promise(function (resolve, reject) {
    let index = 0
    let timer = setInterval(function () {
      if (index++ < target) {
        ball.style.transform = `translateX(${index}px)`
      } else {
        clearInterval(timer)
        resolve()
      }
    }, 4)
    })
}

// promise 链式调用
move2(ball1, 100)
  .then(function () {
    return move2(ball2, 100)
  })
  .then(function () {
    return move2(ball3, 100)
  })
  .then(function () {
    alert('move over')
  })
```



### generator + promise

```javascript
// 自定义 co
function co(gen) {
  let it = gen() // 让生成器持续执行
  return new Promise(function (resolve, reject) {
    // 自执行写法，前面加个!，后面跟个()。与(function(){})()方式作用一样
    // 声明式定义 function fn(){}, 函数表达式定义 let fn=function(){}
    ! function next(lastValue) {
      let {
        value,
        done
      } = it.next(lastValue)
      if (done) {
        resolve(value)
      } else {
        value.then(next, reject)
      }
    }()
  })
}

// 生成器
function* go() {
  yield move2(ball1, 100)
  yield move2(ball2, 100)
  yield move2(ball3, 100)
}
// 这种实现，就是 koa1 版本的用法
co(go)
```

### async await

```javascript
// 4 async await
async function go() {
  await move2(ball1, 100)
  await move2(ball2, 100)
  await move2(ball3, 100)
}
go()
```



## 补充知识

### 迭代器

```javascript
// 迭代器
let arr = [1, 2]
for(let i of ary) {
  console.log(i);
}
```



### 深度克隆

```javascript
// 深度克隆
let obj = {
  age: 5, 
  hobby: [{name:'wjy'}, {name:'xxx'}, 3],
  home: {
    city: 'xxx'
  },
  getAge() {
    console.log(this.age);
  }
}
// JSON.parse 正则、函数都不支持。有局限性
let obj2 = deepClone(obj)
obj2.age = 10
obj2.hobby.push(4)
obj2.home.city = 'yyy'
console.log(obj2);
console.log(obj);

// 克隆方法
function deepClone(parent, child) {
  child = child?child:{}
  for(let key in parent) {
    if (parent.hasOwnProperty(key)) {
      if (typeof parent[key] == 'object') {
        child[key] = Object.prototype.toString.call(parent[key]) == '[object Object]'?{}:[]
        deepClone(parent[key], child[key])
      } else {
        child[key] = parent[key]
      }
    }
  }
  return child
}
```
