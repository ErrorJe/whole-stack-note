# let 变量和 const 常量

## 作用域
ES6 之后有4种作用域：全局，函数，块级，模块

### 不同声明下的作用域
|  | var | let | const |
| --- | --- | --- | --- |
| 变量提升 | √ | × | × |
| 全局变量 | √ | × | × |
| 重复声明 | √ | × | × |
| 重新赋值 | √ | √ | × |
| 暂时死区 | × | √ | √ |
| 块作用域 | × | √ | √ |
| 只声明不初始化 | √ | √ | × |



### 代码示例
```javascript
// 1 全局作用域
var x = '1'
function fn() {
  console.log(x) // 就是 window.x
}

// 2 函数作用域
var x = '1'
function fn() {
  var x = '2'
  console.log(x) // '2'
}

// 3 块级作用域
let x1 = 'let1'
const y = 'const'
function fn() {
  {
    let x2 = 'let2'
  }
  let x3 = 'let3'
  console.log(x1, x3, y) // x2 在 {} 块级作用域中，无法直接访问 
}
```



### 暂时性死区 TDZ

> 暂时性死区。
> 使用 let 或 const 的变量，在所在的块级作用域中，定义之前若去直接使用都无法进行访问
> 这个跟变量提升是不一样的，注意区别

简而言之，就是只能在声明了之后才能使用
```javascript
function fn() {
  x = 1
  const x = 0
}

fn() // ReferenceError: x is not defined
```



### 顶层对象 window/global/globalThis

浏览器的顶层对象是 `window` ，nodejs 的顶层对象是 `global` 
之前使用 `var` 或 `function` 在全局作用域下声明，就会默认绑定到 `window` 上

```javascript
// 1 使用 var
var a = 1
window.a // 1


// 2 使用 let
let b = 1
window.b // 报错
```

在不同的环境是作用域下，为了拿到这个顶层对象其实不容易。现在用有个关键词可以直接拿到，这在浏览器或者是nodejs环境下都是可以用的。
`globalThis` 



## var 变量

- 可以重复声明
- 不能定义常量，可反复修改
- 不支持块级作用域。只有全局和函数级两个作用域

```javascript
// 原本的 var 在循环中会出错
for (var i=0; i<3; i++){
	console.log('方法中输出: ', i) // 0 1 2
  setTimeout(function(){
    console.log('定时器中输出： ', i) // 3 3 3， 因为 i 没有定义在函数内，所以其挂载全局中的
  }, 1000)
}

// 解决的方案就是闭包，创造一个函数作用域
for (var i=0; i<3; i++) {
  (function(i){
    console.log('闭包中的this: ', this) // window。因为闭包是自执行，没有对象调用。那只能是window调用
    setTimeout(function(){
      console.log('定时器中变量值: ', i) // 0 1 2，闭包相当于是一个函数作用域
    }, 1000)
  })(i)
}

// ES6 就非常简单了，自带块级作用域
for (let i=0; i<3; i++){
	setTimeout(function(){
    console.log('定时器中输出： ', i) // 0 1 2
  }, 1000)
}
```



## let 变量



### 不能重复定义

```javascript
let a = 10 // 不能再次声明 let a = 20
```



### 有块级作用域

```javascript
{ let a = 10 }
console.log(a) // 拿不到值
```



### 变量作用域无法提升

```javascript
let a = 10
{
	console.log(a)  // 报错
	let a = 20 // 如果这句不写，上面是可以拿到外面的 a 的
}
```

在之前使用 `var` 若是在全局环境下，会自动绑定到 `window` 对象上，使用 `let` 后不会有这种处理

```javascript
var a = 1
let b = 2

window.a // 1
window.b // undefined
```



## const 常量



### 基本特征

- 不能重复赋值和声明
- 有块级作用域
- 声明时必须赋值以初始化
- 也存在 TDZ
> const PI = 3.14 // 不能赋值 PI = 3.00

```javascript
// 只能定义一次
let x
const x = 2 //  Identifier 'x' has already been declared

// 不可修改
const x = 2
x = 1 // Assignment to constant variable.赋值给常量。

// 虽然不能再引用别的对象，但若它的值是一个引用类型的话，可以改这个引用对象的属性
const USER = { name: 'wjy' }
USER.name = 'error'

// 声明时必须赋值
const x // Missing initializer in const declaration 缺少初始值
```



### const 的本质和 Object.freeze

就是让 const 变量存储的那个指针固定。如果是引用类型，只是不能改指针地址，但是指针地址指向的内存数据是可以改的。

若真要冻结固定对象，就要用 `Object.freezz` 
```javascript
// 对象固定后不能增加属性
const foo
Object.freeze(foo)
foo.a = 1 // 报错
```

上面的操作是对一个对象进行浅层冻结，若要对对象所有属性进行冻结，则需要递归冻结
```javascript
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```


