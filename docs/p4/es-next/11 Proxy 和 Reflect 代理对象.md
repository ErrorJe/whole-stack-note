# Proxy 和 Reflect 代理对象



## Proxy 代理拦截器


### 基本认识

`Proxy` 是对语言层面的一种改写拦截方式，也就是重载 . 运算符的元编程。目前 Vue3.0 也是用 Proxy 取代了之前使用的 `Object.defineProperty`。



#### Proxy 实例对象

可以针对目标对象，进行 `13`种不同类型的拦截处理。

> 需要注意的是，原对象 obj 是不受影响的，我们操作的是 Proxy 对象，也就是下面的`obj_proxy`


```javascript
// 1 原对象
var obj = {
  name:'errorje'
}
// 2 声明一个 proxy 变量，是原对象 obj 经过代理拦截后的复制品
var obj_proxy = new Proxy(obj, {
  // 3 配置13项拦截器中的 get 拦截器
  get: function(target, property, receiver) {
    // 4 参数说明。p1:目标对象, p2：属性, p3:Proxy实例本身 或者 继承Proxy的对象
    return target[property] // 返回原值
  }
  
  // 5 配置 set 拦截器
  set: function(t, p, v, c)
		// Reflect.set 返回一个 boolean
		// 三个属性跟 set 的一样，目标对象、属性、值
		return Reflect.set(t, p, t[p], c)
	}
})
```

如果想操作原对象，则需要把`配置对象`置空

```javascript
var obj {}
var proxy = new Proxy(obj, {}) // 访问 proxy 等于访问 obj
```



#### 作为其他对象的原型对象

`proxy`对象是 `obj`对象的原型，访问 obj.xxx 若本身没有会去原型 proxy 中找。

```javascript
var proxy = new Proxy({obj}, {
  get: function(target, property) {
    return 35;
  }
});

let obj = Object.create(proxy);
```



### 十三种拦截器

> 详细用法看阮一峰的 ES6， 或者 MDN



#### get (target, propKey, receiver) 读取

拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。



##### 访问不存在对象属性

> 若没有拦截器，默认返回 `undefined`，改写成抛出错误


```javascript
const handle = {
	get: function(target, property) {
    if (property in target) return target[property] // 存在返回原值
    else throw new ReferenceError("Property \"" + property + "\" does not exist.")
  }
}
```



##### 数组读取负数索引

> 数组除了使用 API 是不能访问负数索引的


```javascript
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
arr[-1] // c
```



#### set(target, propKey, value, receiver) 改写

拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。



##### 数据验证

> 对于一些字段需要控制范围和格式，就可以进行拦截


```javascript
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }
    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```



##### 保护私有属性

> 一般我们基于约定，使用 `_`来表示该属性为内部使用，不应该给外部访问或者修改


```javascript
const handler = {
  get (target, key) {
    invariant(key, 'get');
    return target[key];
  },
  set (target, key, value) {
    invariant(key, 'set');
    target[key] = value;
    return true; // return false 在严格模式会报错。普通下会被忽略，所以写不写无所谓
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}
const target = {};
const proxy = new Proxy(target, handler);
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'
// Error: Invalid attempt to set private "_prop" property
```



#### has(target, propKey) 属性 in 对象

拦截`propKey in proxy`的操作，返回一个布尔值。



#### deleteProperty(target, propKey) 删除对象属性

拦截`delete proxy[propKey]`的操作，返回一个布尔值。



#### ownKeys(target)

拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。



#### getOwnPropertyDescriptor(target, propKey)

拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。



#### defineProperty(target, propKey, propDesc)

拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。



#### preventExtensions(target)

拦截`Object.preventExtensions(proxy)`，返回一个布尔值。



#### getPrototypeOf(target)

拦截`Object.getPrototypeOf(proxy)`，返回一个对象。



#### isExtensible(target)

拦截`Object.isExtensible(proxy)`，返回一个布尔值。



#### setPrototypeOf(target, proto)

拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。



#### apply(target, object, args)

拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。



#### construct(target, args)

拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。



### Proxy.revocable() 

> 返回一个可取消的 Proxy 实例
>
> 场景是目标对象必须通过代理访问，一旦访问结束，就要收回代理权


```javascript
// 返回 Proxy 实例，和一个取消它的方法
let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke(); // 执行后，该 proxy 实例就不能再被使用
proxy.foo // TypeError: Revoked
```



### this 问题

被实例化后的 Proxy 对象，其 this 是指向 Proxy 实例自己的。

所以当使用一些原生 JS 内置对象的时候， this 会出错导致无法正常使用。

解决办法就是绑定回原来的 this

```javascript
const target = new Date('2015-01-01');
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      // bind 绑定 this
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getDate() // 1
```



## Reflect 对象



### Reflect 新特性

#### 取代 Object

目前，一些属于语言内部的方法如`Object.defineProperty` ，会放在 `Reflect`对象上。现在是 `Object` 和 `Reflect`同时部署了这些方法。只要是 Object 上有的方法，Reflect 都可以用。

但是有一些区别。



#### 修正 Object 方法返回结果

之前使用  `Object.defineProperty()` 在无法定义某个属性时，就报错。所以要用 `trt.catch.`捕获。当使用`Reflect` 对象可以修正这个问题

```javascript
// 新写法, 对于上面的情况，会返回 false，而不是报错
if (Reflect.defineProperty(target, property, attributes)) // ok 
else // failure
```



#### 函数行为

> 之前 Object 的很多 API 都是命令式


```javascript
name in obj;
delete obj[name]
```

当使用`Reflect` 对象，是函数行为

```javascript
Reflect.has(Object, 'assign') // boolean
Reflect.deleteProperty(obj, name) // boolean
```



#### 与 Proxy 对象的方法对应

> Proxy 中有 13 个拦截器，对应的 Reflect 也有这些。
> 不管 proxy 怎么修改默认行为，都能通过 Reflect 获取默认行为。



##### 例子：先保证原有行为，再处理其他

```javascript
Proxy(target, {
  set: function(target, name, value, receiver) {
    // 保留原有行为
    var success = Reflect.set(target, name, value, receiver);
    if (success) {
      console.log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});
```

下面的每个拦截器就是打印日志，但是使用 `Reflect`保留原有行为

```javascript
var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});
```



##### 简易操作

```javascript
// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1
```



### 静态方法

- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)
