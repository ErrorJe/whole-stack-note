# Vue 跨层级组件通信

介绍几种跨层级组件的通信方式，比如兄弟组件，爷爷孙子等关系组件



## 孙向前辈通信（向上通知 $dispatch）

> 首先这个 dispatch 是自己实现在 main.js 且挂载到 Vue.prototype 上的



### 孙向子组件通信 $parent

```javascript
// 孙组件通过这个 API 先拿到子组件实例
// 然后让子组件去派发 input 事件
// 这样就仅仅是两层事件的派发，若是多层，要看下面的做法去实现 dispatch
this.$parent.emit('input', 200)
```



### 孙向父组件通信 $dispatch

> 孙在已经通知了子组件的情况下，子组件还要单独去实现向父组件派发孙给的事件的吗？

#### 实现 Vue.prototype.$dispatch

> 让孙组件的事件可以发到父组件， 而$dispatch方法也是由孙子组件（或者更深）派发的事件，让所有先辈监听和触发到该事件。


```javascript
// main.js
Vue.protytype.$dispatch = function(eventName, value) {
  // 1 获取父组件实例
  // this 就是调用该方法的实例。也就是孙组件。然后拿到了子组件
  let parent = this.$parent
  // 2 向上派发
  while(parent) {
    // 派发给先辈组件
    parent.$emit(eventName, value)
    // 如果爸爸还有爸爸的话，就继续循环派发，直到所有先辈都拿到了该事件
    parent = parent.$parent
  }
}
```

#### 孙组件派发事件

```javascript
this.$dispatch('input', 200)
```



## 祖向后辈通信（向下传递 $broadcast）

> 也是广播的方式。这里要递归实现了，因为每个子组件可能有自己的很多个子组件



### 实现广播方法 $broadcast

```javascript
// main.js
Vue.prorotype.$broadcast = function(eventName, value) {
  // 通知事件
  const broadcast = (children) => {
    // 遍历每个孩子
    children.forEach(child => {
      child.$emit(eventName, value)
      // 递归获取孩子和通知事件
      if (child.$children){
        broadcast(child.$children)
      }
    })
  }
  broadcast(this.$children)
}
```



### 使用方式

#### 后辈组件监听某事件

```vue
<div @error="error"></div>

<script>
export default {
  methods:{
    error(){}
  }
}
</script>
```

#### 先辈组件统一通知

> 让所有正在监听这个 error 事件的后辈组件都能被触发执行


```javascript
// 比如去根组件触发  App.vue
this.$broadcast('error')
```



## 向下传属性集合 $attrs



### 基本 API（inheritAttrs）

> 基于 $attrs 用法的说明，实现子组件将父组件轮空的传值


有这样一种情况，父组件传了2个绑定值，照理说，子组件需要提供2个对应的props坑位去接收。

但实际情况是子组件可能只显式接收了一个 props ，那么没有被接收的那个父组件值，会变成子组件根元素的属性节点。

- 父组件传2个值

```vue
<demo :first="firstMsg" :second="secondMessage"></demo>
```

- 子组件接受1个值

```javascript
props: ['first']
```

没有被接收的变为子组件根节点的属性

```vue
<div second="secondMessage"></div>
```

- 在子组件中可以通过 `this.$attrs`拿到这个没有被显式接受的 props

```javascript
created() {
  console.log('没有被绑定的属性>>>', this.$attrs); // {second："secondMessage"}
}
```

- 子组件中使用 inheritAttrs：false

> 也就是当我们使用 `this.$attrs`时，为了确保不会默认变成根元素的属性节点，需要设置  `inheritAttrs：false`
> 这个也是我们封装深层组件的基础。如父组件传了3个变量， 子组件只用到1个，剩余2个通过 $attrs 传给孙子组件。


这就是取消属性的继承，这样上面没有被接收的 props 就不会出现在根元素节点的属性上

```javascript
export default {
  // 也是 vue 实例的一个选项
  inheritAttrs: false,
}
```



### 子组件 v-bind 继续传属性集合

通过子组件的`this.$attrs`传给孙子组件

```vue
<next-demo v-bind="$attrs"></next-demo>
```



### 孙子组件

```javascript
props : [ 'second' , 'third']
```

若孙子组件下面还有更深的组件，还是要做两件事

- 使用 `$attrs`统一传递轮空的上层值
- 配合 `inheritAttrs：false`实例配置



## 向下传方法集合 $listeners

> `$attrs` 是向下传递数据，`$listeners` 是向下传递方法。前者收集轮空的props，后者收集父组件给的所有事件。
> 通过手动去调用 `$listeners` 对象里的方法，原理就是 `$emit` 监听事件，
> `$listeners` 也可以看成一个包裹监听事件的一个对象。



### 父组件传方法

子组件模板上面进行 changeData 和 another 两个事件监听

```html
<demo v-on:changeData="changeData" v-on:another='another'></demo>
```



### 子组件 v-on 继续传方法集合

就用到了一个 `another` 事件，另一个事件通过 `$listeners收集并通过`v-on`继续传递给孙子组件

```html
<p @click="$emit('another')">子组件</p>  
<next-demo  v-on='$listeners'></next-demo> <!-- 孙子组件 -->
```



### 孙子组件

从`$listeners`拿到其中的某个事件，直接调用执行（相当于 emit 触发事件了，不过是跨多层向上派发了事件触发通知）

```html
<p @click='$listeners.changeData("change")'>孙子组件</p>
```



## Provide 和 injects 后辈组件继承遗产

就是为了让后辈组件能够拿到前辈组件的数据，反过来让后辈给祖先组件传值就不行。<br />注意，一般用于组件开发，尽量不要用于日常开发。



### Provide 生产

> 由先辈组件创建内容
> 也可以传 this 这样的引用对象

```javascript
export default {
  // 作为祖先，给后人留下的数据遗产。可以跨代传递。跟 data 钩子的用法一致。
  provide() {
    return {
      someValue: '来自祖先的神秘遗产'，
      parent:this // 把自己实例给传下去（使用最多的场景）
    }
  },
  
  // 对象形式也可以
  provide:{
  	someValue: '来自祖先的神秘遗产'
  }
}
```



### injects 注入

> 子组件去消费内容。相当于是 consumer


```javascript
export default {
  // 继承祖先遗产。用法和 props 一致。可以直接使用 {{someValue}}
  // 所以不要与 data 重名
  inject: ['someValue' 'parent'],
}
```



## ref 拿到组件实例

- 用在元素上就是获取 DOM
- 用在组件上就是获取组件实例



### 由父组件派发

> 对应于上面的 provide 和 inject， 让父组件可以拿到子组件数据和调用子组件方法


父组件通过 `ref` 属性去拿到子组件实例，然后就可以拿到子组件里面的方法。

#### 父组件拿到子组件实例

```javascript
<son ref="id" ></son>

create(){
	this.$refs.id.fn() // 拿到子组件方法。但是这样耦合性比较高
}
```

#### 子组件

```javascript
methods:{
  fn(){} // 定义了子组件方法
}
```



### 由子组件派发（用到 $nextTick）

> 先要知道组件的挂载顺序，先挂子后挂父。若在父组件中绑定事件，却在子组件的`mounted`中emit的事件其实不会被触发
> 所以要让 $nextTick 去延迟执行，等待 DOM 渲染完毕


```javascript
mounted:{
  // 是个队列，把任务放到后面去执行（页面渲染完毕之后）
  this.$nextTick(() => {
    this.$bus.emit('event', 'xxx')
  })
}
```



## 总线通信 $bus

> 专门弄一个 vue 实例用于通信，如同级组件之间。
> 缺陷就是必须定义到全局上了。容易触发同名的全部事件（当多人开发时）



### 根组件 main.js

这种方式也可以用来扩展 vue。相当于是公开的发布订阅

```javascript
// 修改 vue 的原型
Vue.prototype.$bus = new Vue()
```



### 兄弟组件

- 触发事件

```javascript
// 派发事件
this.$bus.$emit('addCart', good)
```

- 绑定事件

```javascript
this.$bus.$on('addCart', good => {})
```
