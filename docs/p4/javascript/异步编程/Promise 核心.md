# Promise 核心应用

> promise A+ 是个开源标准，所有的 promise 都要基于这个标准去实现



## 基础知识

- promise 有三个状态
  - 等待， 成功， 失败
- promise 有两个改变状态的内置函数
  - resolve 触发成功， reject 触发失败
  - 状态为成功或失败，就无法修改状态
  - 失败大概有两类
    - reject 更改为失败状态
    - throw new Error 抛出异常

```js
new Promise((resolve, reject) => {
  // resolve, reject 可以更改 promise 的 3个状态
})
```



- then 中也有2个回调函数，根据 promise 的最后的状态来触发不同的函数回调

```js
promise.then(() => { // onfulfilled 成功
  
}, () => { // onrejected 失败
  
})
```



## 源码实现

### promise 基础实现

> 基于 promise/A+ 规范

- promise 是一个类，需要传入一个 `executor` 执行器，默认会立即执行
- promise 内部有两个方法，可以更改其状态
  - 状态：PENDING， RESOLVED，REJECTED
  - 方法：resolve, reject
  - 只有当 `pending` 时才能转换成其他状态
- promise 实例都要有一个 `then` 方法，分别是成功/失败的回调
- 发布订阅模式，支持一个 promise 实例可以 then 任意次，等改变状态后让 then 中的函数执行

```js
// 3个状态
const PENDING = 'PENDING' // 写成常量，不容易手写错
const RESOLVED = 'RESOLVED' // 成功
const REJECTED = 'REJECTED' // 失败

class Promise {
  constructor(executor) {
    this.status = PENDING // 默认是等待态
    this.value = undefined // 成功原因
    this.reason = undefined // 失败原因
    
    // 存放成功的回调函数
    this.onResolvedCallbacks = []
    
    // 存放失败的回调函数
    this.onRejectdCallbacks = []
    
    // 因为 executor 要调用这2个函数，所以只能写在这
    let resolve = (value) => {
      // 保证只有状态为等待态的时候，才能更改状态
      if(this.status === PENDING) {
        this.value = value // 赋值
      	this.status = RESOLVED // 赋值
        
        // 让成功的方法依次执行
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    
    let reject = (reason) => {
      if(this.status === PENDING) {
        this.reason = reason
      	this.status = REJECTED // 失败态
        
        this.onRejectdCallbacks.forEach(fn => fn())
      }
    }
    
    // 抛出错误时
    try {
      executor(resolve, reject) // 立即执行
    } catch(e) {
      reject(e) // 若内部出错，手动调用 reject
    }
  }
  
  then(onfulfilled, onrejected) {
    if (this.status === RESOLVED) { // 直接成功时（没有异步）
      onfulfilled(this.value)
    }
    if (this.status === REJECTED) { // 直接失败时（没有异步）
      onrejected(this.reason)
    }
    if (this.status === PENDING) { // 存在异步逻辑
      // 把回调函数都存储起来
      this.onResolvedCallbacks.push(() => {
        // 切片编程，可以增加逻辑, 再触发原有函数
        onfulfilled(this.value)
      })
      
      this.onRejectdCallbacks.push(() => {
        // 切片编程，可以增加逻辑, 再触发原有函数
        onrejected(this.reason)
      })
    }
  }
}
module.exports = Promise
```



### 链式调用

#### 链式用法

- 成功情况：then 中返回普通值/成功的promise
- 失败情况：返回一个失败 promise/抛出异常

```js
let p = new Promise((resolve, reject) => {
  resolve('test1') // 普通值意味着不是一个 promise
})

promise.then(data => {
  // then 方法中可以返回一个值（非 promise 时）
  // 会把这个结果放到下一次 then 的成功回调中
  return data
}).then(data => {
  console.log(data) // 拿到上面的普通值 test1
  // 若返回一个 promise，则会采用这个 promise 的结果
  return new Promise(() => {
    setTimeout(() => {
      resolve('test2')
    }, 1000)
  })
}).then(data => {
  console.log(data) // 等1秒拿到上面的普通值 test2
  // 使用 reject 时
  return new Promise(() => {
    setTimeout(() => {
      reject('test3')
    }, 1000)
  })
}).then(()=> {
  // ... 不会有执行
}, err => {
  console.log('拿到上面 reject 的值', err)
  // 没有返回值 相当于 return undefined 是普通值
}).then(res => {
  // 在失败的函数中返回普通值或成功的 promise 
  // 还是会走到 then 的成功中
  console.log(res) // undefined
}).catch(err => {
  // promise 捕获错误，先找一层层找距离自己最近的错误
  // 若没有，则找最终的 catch 方法
  // 作用就是统一处理上面链式中的错误
  console.error(err)
}).then(() => {
  // catch 之后可以继续 then（catch 也是个 then）
})
```



#### 链式原理

- 每次调用 `then` 方法时，都返回一个新的 promise 实例
- 执行 Then 方法，返回可能是普通值，也可能是 promise，所以需要判断
  - 是 promise 时，执行这个 promise，并且拿它的状态作为 promise 的成功或失败
  - 注意返回个错误也是个对象，跟抛出错误是不一样的 `return new Error()` 这是返回了错误对象，视作普通值返回。如果是 `return throw new Error` 就会去 `catch` 中捕获

- 由于要递归使用，但是 `promise2` 在 new 的过程中并没有生成实例，所以必须利用 `event loop` ，如宏任务 `setTimeout` 之类的 API 是实现异步，去拿到实例

```js
const PENDING = 'PENDING' 
const RESOLVED = 'RESOLVED' 
const REJECTED = 'REJECTED' 

// 判断 x 的状态，让 promise2 变成功还是失败
function resolvePromise(promise2, x, resolve, reject) {
	// 该方法，为兼容所有的 promise（很多库对于 promise 实现可能不一样）
  // 所以要尽可能详细，不能出错
  
  // 1 不能引用同一个对象，可能造成死循环
  // let p2 = promise.then(()=>{return p2}); p2.then(()=>{})
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected...'))
  }
  
  // 2 判断 x 是否为 promise
  let called // 看是否被调用过一次了, 防止多次调用失败，或同时调用成功/失败
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // 当 x 为 对象/函数 时就有可能是 promise
    try {
    	let then = x.then // then 方法可能用 getter 来定义的，所以可能会报错
      if (typeof x === 'function') { // 只能认为是 promise
        // 调用 promise.then
        then.call(x, (y) => {
          // 可能下一个还是 promise，所以要继续解析，直到它是一个普通值
          // 递归解析 resolve 的值
          if (called) return
     			called = true
          resolvePromise(promise2, y, resolve, reject)
        }, (r) => {
          if (called) return
          called = true
          reject(r)
        })
      } else { // 普通对象 {a:1,then:1}
        resolve(x)
      }
    } catch(e) { // 若在 then 出错，错误中又调用了该 promise 的成功
      // 调用过了，直接结束
      if (called) return
      called = true
      reject(e) // 取值失败，走到 error 中
    }
  } else { // 普通值
    resolve(x)
  }
}

class Promise {
  constructor(executor) {
    this.status = PENDING 
    this.value = undefined 
    this.reason = undefined 

    this.onResolvedCallbacks = []

    this.onRejectdCallbacks = []

    let resolve = (value) => {
      // value 可能是 promise, 递归解析
      // 这个 reject 是可以拿到的，因为函数先声明，然后执行
      if (value instanceof Promise) {
        value.then(resolve, reject)
        return
      }
      if(this.status === PENDING) {
        this.value = value
        this.status = RESOLVED 

        this.onResolvedCallbacks.forEach(fn => fn())
      }

    }

    let reject = (reason) => {
      if(this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED

        this.onRejectdCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }

  then(onfulfilled, onrejected) {
    // 出现 .then() 调用却没有任何内容的时候
    // promise().then().then()
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : v => v
    onrejected = typeof onrejected === 'function' ? onrejected : e => throw e
    // 需要递归返回
    // 实现链式调用，要创建新的 promise
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) {
        // 用宏任务 setTimeout 有什么用？ 拿到 promise2
        // 原本 new 的时候，promise2 还没有生成，是拿不到的
        setTimeout(() => {
          try {
            // 该方法执行后拿到回调中被 return 的值
            // 也就是 then 函数执行后的返回值，可能是普通值，也可能是 promise
            // 这个 x 是 promise 的结果
            let x = onfulfilled(this.value) 
            // 判断 x 的状态
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            // 执行 then 报错，就走到外层 then 的错误处理中
            // 调用 promise2.reject
            reject(e)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onrejected(this.reason)
            // 无论成功失败，只要返回的是普通值都是成功
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === PENDING) {

        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onfulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          }, 0)
        })

        this.onRejectdCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onrejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          })
        })
      }
    }) 

    // 返回这个新创建的 promise 实例
    return promise2
  }
  
}
module.exports = Promise
```



#### promise 规范测试脚本

> 测试的话用一个测试库: `npm i -g promises-aplus-tests`

```js
// promises-aplus-tests  xxx.js 全局命令可以测试某个 promise
// ...

// 会测3个方法，promise, resolve, reject
Promise.defer = Promise.deferred = function(){
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise
```



### 其他方法

#### catch 

```js
catch(errCallback) {
  // catch 就是没有成功的 then 方法
  return this.then(null, errCallback)
}
```



#### Promise.all

```js
// promise.all 一个失败就算失败
// 是 Promise 的静态方法
Promise.all([fn1, fn2, fn3]).then(data => {

}).catch(err => {

})

// 源码实现
// 判断是否为 Promise
function isPromise(x) {
  if ((typeof x === 'object' && x!==null) || typeof x === 'function') {
    if (typeof x.then === 'function') {
      return true
    }
  }
  return false
}

Promise.all = function(promiseArray) {
  if (!Array.isArray(promiseArray)) {
    throw new TypeError('The arguments should be an array!')
  }
  return new Promise((resolve, reject) => {
    try {
      let resultArray = []

      const length = promiseArray.length

      for (let i = 0; i <length; i++) {
        promiseArray[i].then(data => {
          resultArray.push(data)

          if (resultArray.length === length) {
            resolve(resultArray)
          }
        }, reject)
      }
    }
    catch(e) {
      reject(e)
    }
  })
}
```



#### Promise.race

```js
Promise.race = function(promiseArray) {
  if (!Array.isArray(promiseArray)) {
    throw new TypeError('The arguments should be an array!')
  }
  return new Promise((resolve, reject) => {
    try {
      const length = promiseArray.length
      for (let i = 0; i <length; i++) {
        promiseArray[i].then(resolve, reject)
      }
    }
    catch(e) {
      reject(e)
    }
  })
}
```





#### Promise.resolve 和 Promise.reject

- Promise.resolve 可以接受一个 promise
- Promise.reject 接受 promise 不会有等待效果

```js
Promise.resolve = function(value) {
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}

Promise.reject = function(value) {
  return new Promise((resolve, reject) => {
    reject(value)
  })
}
```



#### Promise.finally

```js
Promise.prototype.finally = function (callback) {
  return this.then((value) => {
    return Promise.resolve(callback()).then(() => {
      return value;
    });
  }, (err) => {
    return Promise.resolve(callback()).then(() => {
      throw err;
    });
  });
}
```



## 常见应用

### 基于 promise 封装异步方法

把原来 `fs` 系统读取文件的异步操作，封装成 promise 

原本要读取多次文件，要用回调函数的形式造成回调地狱。

```js
function read(...args) {
  // 套一层 promise
  return new Promise((resolve, reject) => {
    fs.readFile(...args, function(err, data) {
      if (err) reject(err)
      resolve(data)
    })
  })
}

read('./name.txt', 'utf-8').then(data => {
  console.log(data)
  return read(data, 'utf-8')
}).then(data => {
  console.log(data)
}).catch(err => {
  // 统一处理错误
  console.error(err)
})
```



### 优化：避免嵌套 promise

```js
function read(...args) {
  // 使用延迟对象，解决 promise 嵌套问题
  // dfd 是个对象(原生不支持)
  let dfd = Promise.defer()
  fs.readFile(...args, function(err, data) {
    if (err) dfd.reject(err)
    dfd.resolve(data)
  })

  return dfd.promise
}
```



### promisify

```js
let {promisify} = require('util') // node也是参考别人的库
// 将原来的异步方法包装成 Promise
let readFile = promisify(fs.readFile)


// 源码实现
function promisify(fn) {
  // 返回一个函数，可被执行
  return function(...args) {
    return new Promise((resolve, reject) => {
      // node 中回调第一个参数都是 err
      fn(...args, function(err, data) {
        if(err) reject(err)
        resolve(data)
      })
    })
  }
}
```


