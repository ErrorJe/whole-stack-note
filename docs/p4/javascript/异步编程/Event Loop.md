# Event Loop

## 基础知识

### event loop 发展过程

> 一段 JS 代码的执行环境，可能在浏览器，也可能在 Nodejs 中。但最后都是在 V8 引擎里执行

ES3 之前，JS 没有异步执行代码的能力，也就是完全按照宿主给定任务的顺序执行。

ES5 之后，引入了 promise，JS引擎可以自动发起任务。



### 基本概念

无论是宏观任务还是微观任务，都是异步任务，在不阻塞主线程的情况下让同步代码先执行

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200119093523.png)

#### 宏观任务

浏览器等宿主环境发起的任务

如 `setTimeout` 等各类定时器，ajax, 事件, `UI rendering`， `MessageChannel`，`requestFrameAnimation`

- setTimeout
- setInterval
- I/O
- 事件
- postMessage
- setImmediate(node.js)
- requestAnimationFrame
- UI rendering (浏览器独有)



#### 微观任务

JS 引擎自己发起的任务。目前其实就一个` Promise.then` / `MutationObserver`

当代码中同时存在宏任务和微任务时，微任务的优先级高。

- promise.then
- Object.observe
- MutaionObserver
- process.nextTick(Node.js)



### Event Loop 事件循环过程

> 所谓的 `event loop` 就是每一个宏观任务的队列

#### JS 的单线程

JS说到底还是单线程的，只有一个主线程，就是宏观任务队列。

而 JS 的 promise 会产生异步代码，**JS 必须保证这些异步代码在自己的宏观任务中完成**。所以在主线程队列中的每个宏观任务下，又包含了一个微观任务队列。

- 先在主线程中执行同步任务
- 同步任务结束，把现有的微任务队列整组执行完毕
- 最后取一个宏任务（每一个宏任务带一队微任务）去主线程中执行，然后无限循环以上步骤



#### 分析异步过程

- 分析有多少个宏观任务

- 每个宏任务中，有多少个微任务

- 根据调用次序，确定宏任务中的微任务执行次序

- 根据宏任务的触发规则和调用次序，确定宏任务的执行次序

- 确定整个顺序



### Event Loop 的堆栈

JS从诞生开始就是**单线程**的语言，不会改变。

说其是单线程，是因为他只有一个**主线程通道**，所有的任务和行为都必须在经过这个通道才能得以顺序执行。

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200119102556.png)

**主线程**运行的时候，产生**堆（heap，堆是用来存放引用对象的）**和**栈（stack）**。

- 栈中的代码来调用各种**外部WebAPI**，这些API在**任务队列**中放入各种异步事件，只要栈中的代码执行完毕，主线程就会去读取任务队列中的回调函数。这个过程是**循环执行**的。



**主线程**：一个执行栈

所有的**同步任务**都在上面顺序执行，是一个存储函数调用的栈结构。



**任务队列**：异步任务在其中挂载。

只有所有同步任务执行完毕，系统才会来这个队列读取那些已经是结束等待状态的异步任务和事件。放入到执行栈中同步执行

所以异步从本质上来说也是同步的。



**同步任务**：synchronous

在**主线程**上排队顺序执行的任务，前一个任务执行完毕，才会去执行后面的任务。



**异步任务**：asynchronous

不进入主线程，而是进入**任务队列**的任务。要执行其中的异步任务时，需要任务队列告诉主线程，该任务才会进入主线程去执行



## 定时器

下面的执行顺序

> 执行的结果是：1 7 3 6 5 4 2

```js
console.log(1)
setTimeout( function () { console.log(2) }, 1000 )
setTimeout( function () { console.log(3) }, 1 )
setTimeout( function () { console.log(4) }, 4 )
setTimeout( function () { console.log(5) }, 3 )
setTimeout( function () { console.log(6) }, 0 )
console.log(7)
```



也就是说，只要是异步任务，那必须等待主线程的同步任务执行完毕之后，才会进行调用，并且在有定时间的情况下，看具体时间来调用。

同时，`1ms` 和 `0ms` 没有区别，就看代码谁在前面。

**HTML5标准**规定了，`setTimeout()`时间参数的最小值为 `4ms`（但是由上面的测试可以看到好像并不准确，所以知道有这个概念就好了。）, 低于这个值会自动增加。对于DOM 的改动（页面重渲染），最低是 `16ms`。



## Promise

promise 是 JS 提供的一种标准化的异步管理方式。

> 总体思想：
>
> 需要进行 IO、等待或者其他异步操作的函数，不直接返回真实结果，
>
> 而是返回一个承诺（promise）。承诺兑现的时机可以由函数的调用方（promise.then()）来控制。



### 基本用法

```js
function sleep(duration) {
    // 该方法返回一个 Promise
    return new Promise(function(resolve, reject) {
        // 等待承诺兑现的时长由参数决定
        setTimeout(resolve,duration);
    })
}

sleep(1000).then( ()=> console.log("finished"));
```



### Promise.then 异步执行过程

首先是打印了 a， 然后执行的到resolve()为异步，所以先打印了b，最后异步执行完毕打印了 c

```js
var r = new Promise(function(resolve, reject){
    console.log("a");
    resolve()
});
r.then(() => console.log("c"));
console.log("b") // a  b  c
```



### 与定时器混用（微任务优先）

这里有两个异步操作：打印d和打印c

```js
var r = new Promise(function(resolve, reject){
    console.log("a");
    resolve()
});
setTimeout(()=>console.log("d"), 0)
r.then(() => console.log("c"));
console.log("b")
// a b c d
```

> 在这需要注意的是，promise 是 JS 引擎内部的微观任务，而定时器是浏览器的 API 也就是宏观任务
>
> 所以是先打印了 c, 再打印 d

无论上面的promise.then等待了多久才被执行，也一定比定时器执行的早。


