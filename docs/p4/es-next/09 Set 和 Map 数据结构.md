# Set 和 Map 数据结构

## Set


### 去重作用和基本 API

> 没有重复元素的数组

```javascript
new Set([1, 2, 3, 4, 5, 5]) // 1 创建 Set 结构

[...new Set(array)] // 数组去重方式1
Array.from(new Set(array)) // 数组去重方式2

// Set 的 api
Set.prototypr.size // 成员数
.add(value) // 添加某个值，返回 Set 本身
.delete(value) // 删除某个值，返回一个布尔值，表示删除是否成功
.has(value) // 是否有该成员
.clear() // 清除所有成员
keys(), values(), entries(), forEach() // 键/值/对/遍历成员
```



### 交集、并集和差集

```javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```



### weak set 集合

这是弱引用 set 类型

```js
let set = new Set()
ket = {}
set.add(key) // 加入集合
key = null // 移除这个 key 的引用

key = [...set][0] // 还是可以取到，因为是 set 强引用了之前的地址，所以没有被清除
```



#### 弱引用

这种强引用在一般情况下没有问题，但是有 DOM 操作时，比如对一些 DOM 操作后移除了之前的 DOM，但是你把他放入了 SET 集合中，那么实际上这些 DOM 并没有被移除(`内存泄漏`)

所以有了 `weak set` 弱引用集合类型

> 只存储对象的弱引用，且不可以存储原始值
>
> 集合中的弱引用若是对象唯一的引用，则会被回收并释放相应的内存

```js
// 创建 weak set
// 或者 new WeakSet([1,2]) ，基本跟 set 用法一样
let set = new WeakSet(),
    key = {}

// 基本操作
set.add(key)
set.has(key) // true
set.delete(key)
set.has(key) // false
```



#### 与 set 的区别

最大的区别就是 `weak set` 保存的是对象值的弱引用

```js
let set = new WeakSet(),
    key = {}
set.add(key)
key = null // 去掉引用，此时 weakset 中的引用也自动移除
```



#### weak set 的其他特点

- add 方法传入非对象会报错
- has, delete 传入非对象会返回 false
- 不可迭代，也不能用 for...of 循环，也不支持 forEach 方法，也不支持 size 属性



## Map

> 键值对的集合，hash 结构。
> 传统对象的 key 只能是字符串，Map 的key可以是任何类型


```javascript
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.set(1, 'aaa').set(1, 'bbb')
map.get(1) // "bbb"
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"

// API
map.size // 数量
m.set(262, 6) // 加入一个 kv， 可以链式写法
m.get(hello) // 取值
m.has(262) // 是否包含
m.delete(undefined) // 删除某个key
m.clear() // 清除所有成员
keys(), values(), entries(), forEach() // 键/值/对/遍历成员

// map 遍历的特性就是插入顺序
const map = new Map([["F", "no"], ["T", "yes"]]);

for (let key of map.keys) {
  console.log(key);
}
// "F"
// "T"
for (let value of map.value()) {
  console.log(value);
}
// "no"
// "yes"
```



### Map 与其他类型的互转

```javascript
// 1 Map 转 数组
[...new Map]

// 2 数组 转 Map（每个数组元素是kv对）
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])

// 3 Map 转 对象（Map 的 key 都是字符串，若不是字符串则转为字符串）
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)

// 4 对象 转 Map
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})

// 5 Map转 JSON （key都是字符串）
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)

// 6 Map转 JSON （key不是字符串）， 最后转为数组 JSON
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
```



### weak map 集合

最大的用途目前是保存页面中的 DOM 元素

#### 基本要求

- 该集合中的 `key` 必须是个`对象` ，非对象会报错
  - 集合中保存的是这些对象的弱引用
  - 若在弱引用之外不存在其他的强引用，则引擎的垃圾回收机制会自动回收这个对象，同时移除该集合中的键值对
- 集合键值对中的值，若是对象，则保存的是对象的强引用



#### 基本语法

```js
let map = new WeakMap(),
    element = document.querySelector('.element')

map.set(element, 'xxx') // key 是非 null 的对象类型， value 可以是任意类型
let value = map.get(element)
element.parentNode.removeChild(element)

element = null // 此时该集合为空

// 其他 API
map.delete(element)
console.log(map.has(element)) // false
```

