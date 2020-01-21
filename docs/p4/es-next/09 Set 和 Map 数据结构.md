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
keys(), values(), entries(), forEach() // 键/值/对/便利成员
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
keys(), values(), entries(), forEach() // 键/值/对/便利成员

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



## Map 与其他类型的互转

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
