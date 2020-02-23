# `Vue 进阶语法

## 数据响应式
### data 数据劫持

> 只有定义在 data 中的数据才能响应，vue 把响应式系统的数据放在了 `data 选项中`


#### 响应式原理

vue 是通过数据劫持，达到数据绑定。也就是在 data 第一次初始化注入的时候就决定了数据的绑定；

- Vue 底层将遍历 `data`选项中所有的属性，并在实例初始化时用 `Object.defineProperty` （ES5 中无法被 shim 的属性[就是在低级环境下无法实现的属性功能]，所以不支持 IE8 及更低的浏览器）把属性全转为 `getter/setter`
- 同时，被劫持的 data（setter/getter） ，也必须在 template 模板中被使用才会被依赖收集后监听（由 watcher 去监听，把接触过的数据属性记录为依赖）。这些记录可以通过 `vue-devtools` 来查看追踪
- 最后的视图其实是当 `setter` 被触发，再由 `watcher`（每个组件实例都有一个自己的 渲染watcher）去通知更新的。


```javascript
export default {
  data() {
    return {
      message: 'xxxxx', // 这种是简单的，能够响应
      // 这种结构的，之后如果往里面增加新的 k/v ，vue不能处理和响应
      foo: {
        bar: 'baer'
      }
    }
  },
  created(){
    this.foo.abc='aa'// 这种方式是不会响应的(abc 属性没有被定义)
    // 1 这样才能响应，动态增加属性
    this.$set(this.foo,'abc','aa')
    // 2 也可以调用全局方法
    Vue.set(this.foo,'abc','aa') 
    // 3 创建新对象覆盖原响应对象
    this.foo = Object.assign({}, this.foo, {abc:'aa'}) 
  }
}
```



#### 全局和组件 data 选项的区别

另外，使用 HTML 引入 vue 库中使用 data 的方式，和直接在 .vue 单文件中使用是不一样的

- 前者，使用 object 的方式。这样会在全局都进行注册
- 后者，由于是组件间互不影响，所以是用 function 的形式。也是组件中唯一的使用方式。

```javascript
// 1 HTML 中使用 data
new Vue({
  el: '#app',
  data:{
    msg:'Object对象'
  }
})

// 2 vue 中使用 data
export default{
  data(){
    return {
      msg:'Function方法'
    }
  }
}
```



#### 不被感知的修改方式及其解决方案

以下这些问题是 vue2.x 版本的问题，在 Vue3 中使用 `proxy` 解决了这些问题 	

##### 数组中不被感知的2种情况

- `arr[index] = newItem`， 通过索引设置
  - 解决1：`Vue.set(arr, index, newValue)` 或者 `this.$set(arr. index, value)`手动增加某个索引下值的响应
    - 内部也是调用了被重写的 `splice` 方法
  - 解决2：通过`splice`解决。`arr.splice(indexItem, 1, newValue)`。
    - 因为数组是引用对象，splice 方法是直接修改原引用对象
- `arr.length = newLength`，修改数组长度
  - 解决：利用 `splice` 方法去改变原数组
- 反过来说，要删除的话，不能直接用 `delete` 关键字。要用 `vm.$delete(arr, index)`
- 另外还有一种情况就是，数组中元素是对象（普通值无法被劫持）， Vue 也会对其进行劫持，所以是有响应的。



##### 数组的定义技巧

```js
// 数组中的普通值无法被响应
arr: [1,2,3]

// 若数组中的元素是引用类型，则会被响应
arr: [{value:1}， {value:2]
```



##### 对象中不被感知的情况

vue 不能检测对象属性的增删（因为受到现代 JS 的限制）

- 解决1：手动增加响应式属性， `Vue.set(obj, key, value)`， `this.$set`是这个方法的别名
  - 注意，这也仅仅是针对有嵌套情况的数据对象（因为有引用）
  - 而不能在实例化后添加根级的响应式属性，所以必须在初始化实例前声明所有的根级响应式属性，就算是空值
- 解决2：若要增加多个对象属性，
  - 直接加到原对象上是**不会响应**的， 如`this.msg = Object.assign(this.message, {t1:1, t2:2})`
  - 而是要用空对象去组合继承两个对象属性 `this.msg = Object.assign({}, this.message, {t1:1, t2:2})`



### Proxy 优化

在 Vue 3 中解决了关于数组、对象上述问题。就是浏览器兼容性不好

下面展示基本原理

```js
// 如何用proxy 来实现响应式原理
let obj = {
    name: {
        name: 'jw'
    },
    arr: ['吃', '喝', '玩']
}

// 兼容性差  可以代理13种方法 set get
// defineProperty他只能对特定的属性 进行拦截
let handler = {
    // target 就是原对象 key就是当前取的是哪个值
    get(target,key){
        // ...console.log('收集依赖');
        if(typeof target[key] === 'object' && target[key] !== null){
            // 递归代理 只有取到对应值的时候 才会进行代理
            return new Proxy(target[key],handler);
        }
        return Reflect.get(target,key); // target[key]
    },
    // 知道这个机制 先更改索引 在更新长度
    set(target,key,value){ 
      	// [1,2,3].length = 4; 数组的 push 操作会先 length改变，再去增删元素
        // 判断一下 当前是新增操作还是修改操作
        let oldValue = target[key]; // [1,2,3,123]
        if(!oldValue){
            console.log('新增属性')
        }else if(oldValue !== value){
            console.log('修改属性')
        }
        // target[key] = value; 
      	// Reflect.set主要解决设置时 如果设置不成功，设置不成功不会报错，如对象不可配置
        return Reflect.set(target,key,value);
    }
}

// 因为是代理对象，所以要用代理后返回的 proxy 对象去操作，而不是直接操作原对象
let proxy = new Proxy(obj,handler)
// 懒代理
proxy.name.name  = 123; // 1 对象深层属性
proxy.arr[0] = 100;  // 2 数组索引修改值
proxy.xxx =  100; // 3 属性新增
```



### 数据来源

只有三种方式

- 父组件属性 props
- 自身组件状态 data
- 状态管理器， vuex， Vue.observable
- 计算属性和 watch



### computed | watch | methods 区别

- computed 内部不会立马获取值，只有取值的时候才执行。（有缓存，若值没有变化则不更新结果）
- watch 默认在内部执行一次，因为要算出一个老值，若数据变化则执行回调函数
- methods 不具备缓存。若在模板中利用 methods 算出结果值，这样对性能不好。因为每次模板更新都要重新执行一次



### computed 计算属性

> 监听的数据必须是在响应式数据中的，普通变量无法监听。
> 且是基于依赖的响应式数据进行缓存，只有相关依赖发生变化才会重新求值

- 一般来说，`set` 方法不太使用，主要是配合 `v-model` 完成一些特定的需求
- 另外 set 不要改自己，会死循环。出现要改自己的情况，要利用第三个变量来存储操作结果


```javascript
export default {
  data(){
    return {
      1name:'xxx',
      2name:'yyy',
      newName:''
    }
  },
  computed:{
    // 使用计算属性，直接可以将多个 data 属性一起处理
    newName:()=>{
      return 1name + " " + 2name
    },
    // 其他写法
    newName:{
      get: function(){
				return 1name + " " + 2name
      },
      set: function(v){
        let names = v.split(' ')
        this.name1 = names[0]
        this.name2 = names[names.length-1]
      }
    }
  }
}
```



### watch 监听器

可以执行任何逻辑，如异步操作和DOM操作。

- 是一个键值对象。键是要观察的表达式，值是对应回调函数（也可以是方法名或包含选项的对象）
  虽然 computed 能做的 watch 都可以做，但是推荐尽量使用 computed。
- watch 适用于在数据变化时执行异步或开销很大的操作情况。
  下面为了笔记方便采用了箭头函数，可能会有问题，注意实际使用


```javascript
export default {
  data(){
    return {
      a:1,
      b:{c:2},
      e:{f:{g:4}}, // 复杂对象
      h:[],
      fn: null
    }
  },
  watch:{
    // 1 普通使用
    a:(val, oldVal)=>{
      this.b.c += 1
    },
    
    // 2 对象属性使用
    "b.c":(val, oldVal)=>{
      this.b.c += 1
    },
    
    // 3 深层对象使用，只要某个属性值变了就触发
    e:{
      handler:(val, oldVal) => {
        this.h.push('xxx')
      },
      deep:true,
      immediate: true // 运行时立马执行一次。执行时机其实是 created 钩子的时期
    },
    
    // 4 简写
    h(val, oldVal) => {},
  
  	// 5 绑定方法
  	fn: 'handlerFn'
  },
  methods:{
  	handlerFn(value) {
    	this.h = value
    }
  }
}
```



#### 子组件获取异步数据

> 仍然遵守单项数据流规则。可以监听父组件传来的数据，然后复制到子组件的data变量中。


```javascript
// 子组件
export default {
  props: ["editDataList"],
  data(){
    return {
      dataList=[]
    }
  },
  watch: {
    // 监听异步数据，当数据发生改变执行方法
    editDataList: function(val, oldVal) {
      val.forEach(a => (a["isShow"] = false));
      this.dataList = val
      this.update()
    }
  },
  methods:{
    update(){
      console.log(this.dataList) // 取代 create 拿到异步数据
      // 然后把原本在 create 中要做的事放在这里
    }
  }
}
```



#### 手动增加响应式对象属性

> 若我们要给父组件传给子组件的数据中增加一些字段，这时候要注意。如果这个字段本身没有出现在 `props`或者 `data`选项中，那么是不被响应的。
> 我们的解决方式是手动给它加上该字段的响应。


就比如说上面 `a["isShow"] = false`，这一句代码。`isShow`字段我们是想用于控制DOM的显隐，如果没有响应，数据是变了，但是视图是不会变的。所以要手动给他加上响应式。

这里官方提供了2个API

- `Vue.set(vm.someObject, 'b', 2)`
- `this.$set(this.someObject,'b',2)`

```javascript
// 用 watch 监听并加工数据
editDataList: function(val, oldVal) {
  let arr = val
  // 手动增加 isShow 的响应式
  arr.forEach(a => {
    this.$set(a, 'isShow', false)
  });
  this.dataList = arr;
  this.update();
}
```

要看该字段有没有被监听响应，可以打印出来。会有对每个字段的`get/set`方法。如果没有就说明没有响应。



### vm.$nextTick（cb）

> 异步执行，等DOM渲染完（数据更新后才会触发 DOM 重新渲染）之后才执行callback。


因为有些事件绑定，如果没有DOM的事先存在，是没有办法绑定上去的。在之前用JS的时候，利用事务委托的性质。因为DOM在加载渲染完之前，很难去预先绑定事件。所以一般都绑定在固定存在的父元素上。而vue中的这个，就可以在DOM加载完之后才执行一些内容。

```javascript
function () {
    this.message = '已更新'
    console.log(this.$el.textContent) // => '未更新'
    this.$nextTick(function () {
        console.log(this.$el.textContent) // => '已更新'
    })
}
```

> 同时，该 API 返回一个 promise 对象，所以可以用 async/await 去完成相同的事


```javascript
async function () {
    this.message = '已更新'
    console.log(this.$el.textContent) // => '未更新'
    await this.$nextTick()
    console.log(this.$el.textContent) // => '已更新'
}
```


最后需要注意：跟 watch 的搭配使用时，他会在 watch 之前执行



### Vue.observable

- 传入一个需要响应式的对象，然后就会注入到vue实例
- 然后定义修改这个对象值的 mutation 方法
- 写个事件去触发这个 Mutation 方法

<a data-fancybox title="" href="https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200114083556.png">![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200114083556.png)</a>



## 插槽（slot）

> 用于容器类的组件。实际上是一行注释，是一个占位符，用到的时候会被调换成真实的内容DOM。
> 有具名插槽和匿名插槽，如果内容没有指定插槽，那就会分配到默认插槽空位中

### slot 基本用法

#### slot 定义

创建一个 `Win.vue` 容器插槽。这里混合里两种插槽（匿名插槽和具名插槽）

- 具名插槽就是 `name='xxx'`
- 默认的可以直接写 `slot` 标签，可以省略 `name='default'` 的写法


```html
<div class="win">
  <div class="head">
    <!-- 具名插槽：传入一个数据 -->
    <slot name="head" :item="123"></slot>
  </div>
  <!-- 匿名插槽 -->
  <slot></slot>
  <div class="food">
    <slot name="food"></slot>
  </div>
</div>
```



#### slot 使用和传值

使用时，也要引入注册组件。

>  `v-slot` 是 2.6 版本之后具名插槽的 API 用法。

- 使用 `v-slot` 的新写法，就必须是在 `template` 标签上。这是因为 `vue` 之前的老写法觉得是在操作 DOM，所以不太好
- 缩写是 `#`，如 `#footer`
- 还可以传值， `v-slot:head="{a}"`，将数据 a 传给具名 `head` 的插槽
  - 传值了，就是用传入的值解构出来的数据
  - 没有传值，`{{}}`写法用的是当前父组件的数据


```html
<win>
	<template v-slot:head="{a, b, item}"><h2>{{a}}, {{b}}, {{item}}</h2></template>
  <p>...其他没有名字的内容分配到默认的插槽中</p>
  <template v-slot:default>
    <p>也可以显式地说明这个是默认内容，使用默认插槽坑位</p>
  </template>
  <template #footer><h2>具名插槽 foot</h2></template>
</win>
```



之前的老写法，没有限定一定要用 `template` 

```html
<div slot="header"></div>
```

老版本的作用域插槽

```jsx
<div slot="footer" slot-scope="{a, b, isShow}">{{a}}</div>
```



### 插槽也是父子组件的概念

通过自定义属性，同样有参数父传子的用法。

> 这里还有一个`编译作用域`的概念，也就是定义出来的插槽组件和使用这个插槽组件的父级组件之间，作用域是无关的。
>
> 也就是父级组件在使用这个插槽组件的时候，无法直接使用插槽组件里的变量。


#### 定义插槽组件（子）

这里定义一个名为 `navigation-link` 的插槽组件。绑定了 `href` 变量，在外面使用的时候，通过自定义属性 `url` 传入值。

```html
<a v-bind:href="url" class="nav-link" >
  <slot></slot>
</a>
```



#### 使用插槽组件（父）

通过 `url` 自定义属性传入值。若在上面定义的时候，没有用到 `slot`坑位，则现在里面的 span 包括 文本都会被忽略渲染。

```html
<navigation-link url="/profile">
  <span class="fa fa-user"></span>
  Your Profile
</navigation-link>
```



### 后备内容

也就是定义插槽组件时， 在 `slot` 中写的默认值。也只有当父级组件没有给出相应内容时，会渲染这个默认值。

```html
<!--1 定义组件 <submit-button>-->
<button type="submit">
  <slot>Submit</slot>
</button>
  
<!--2 使用该插槽组件时，没有给出 slot 的内容-->
<submit-button></submit-button>

<!--3 最后渲染的是默认的内容-->
<button type="submit"> Submit </button>
```



## 自定义指令

- 共享数据，建议用 `dataset`
- 除了`el`，其他属性都是仅可读的。所以尽量不要去修改
- 当我们需要对 DOM 做底层逻辑处理时，就可能需要用到自定义指令

### 生命周期函数

提供给指令的钩子函数

- bind， 第一次绑定到元素时调用，只调1次。用在绑定一次初始化的内容上
- inserted，被绑定元素插入父节点时调用（父节点存在就行）
- update，所有元素节点更新时调用，可能在子节点更新前
- componentUpdated，所有节点和其子节点更新完成后调用
- unbind，指令与元素解绑时调用



### 钩子函数的参数

每个钩子（生命周期函数）都有这些参数

- el， 绑定的元素，可以直接操作 DOM
- binding，对象
  - name 不包括 v- 的该自定义指令名
  - expression，绑定值的字符串形式。如 `v-tooltip="xxx"`，就是 `xxx`这个字符串表达式
  - value，指令绑定值，也就是指令后面的表达式值 `v-dec:x="date"`， 就是这个 `date` 表达式的结果值
  - oldValue，指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中用，无论值是否改变都可以
  - arg，传给指令的参数， `v-tooltip="msg"`，参数就是变量 msg。如果是动态绑定 `v-tooltip:msg="xxx"` 的 msg
  - modfiers,包含修饰符的对象， `v-tooltip.foo.bar` 就是 {foo:true,bar:true}
- vnode，vue编译生成的虚拟节点
  - 主要是里面的 context 上下文对象，一般是当前组件的 vue 实例
- oldVnode，上一个虚拟节点



### 指令定义方式

#### 全局指令

```javascript
Vue.directive('color-swatch', function(el, binding) {
  el.style.bakcgroundColor = binding.value
})
```



#### 组件指令

```javascript
export default {
  directive:{
    'demo':function(el, binding) {
      // binding.value.color
      // binding.value.text
    }
  }
}
```

使用的形式就是

```html
<span v-demo="{color:'xxx'}"
```



### 动态指令参数

```jsx
<p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
Vue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed'
    var s = (binding.arg == 'left' ? 'left' : 'top')
    el.style[s] = binding.value + 'px'
  }
})

new Vue({
  el: '#dynamicexample',
  data: function () {
    return {
      direction: 'left'
    }
  }
})
```



### 全局指令的注入

单独创建一个文件，引入所有的指令

> 全局组件也可以用这种方式


```javascript
import eg from '../directive/eg.js'; // 
export default (Vue)=>{
    Vue.directive("focus",{
        inserted:function(el){
            el.focus();
        }
    })
}
```

使用 Vue.use 的方式注册

```javascript
import directives from "./plugins/directives.js"
Vue.use(directives);
```



### 常见案例实现思路

#### 日历组件的显隐 v-click-outside

主要是有几个点，在业务实现中比较常见。代码不重要，主要的是思路

- 输入框，点击显示其他组件，失焦隐藏其他组件
- 上面显示的组件可能是日历组件
  - 满足点击输入框显示这个日历
  - 还要满足就算输入框失焦，但是点击还是在规定范围之内，保持显示

```jsx
<div v-click-outside="hide">
  <input type"text" @focus="show" />
  <div v-if="isShow">
    ===显示面板===
    时间
  </div>
</div>

// vue 定义
data() {
  return {
    isShow: false
  }
}

// 方法
show() {
  this.isShow = true
}
hide() {
  this.isShow = false
}

// 局部指令
directives: {
  clickOutside： {
    bind(el, bindings, vnode) {
      // 将事件方法放到 el 上
      el.handler = function(e) {
        if (!el.contains(e.target)) { // 判断被点击对象是否在自己内部
          // 自定义指令的表达式值
          let methods = bindings.expression
          // vnode.contex 就是当前组件的 vue 实例
          vnode.context[method]()
        }
      }
      
      // 绑定点击事件
      document.addEventListener('click', el.handler)
    },
      
    // 卸载指令
		unbind(el) {
      document.removeEventListener('click', el.handler)
    }
  }
}
```



#### 输入框自动聚焦 v-focus

场景：希望输入框在页面加载后自动聚焦

问题：原生可以使用 `autofocus`，但是 Vue 是先把模板进行编译，此时对于原生 DOM 是已经渲染了。编译完成后才会插入到页面中。所以有时候可以看到页面会闪一下

```jsx
 <input type="text" v-focus />

// 指令
directives: {
  focus:{
    // 方式1： 使用 bind 钩子时，Vue.nextTick
    bind(el, bindings, vnode) {
      // bind 的执行实际是挂在后，然后 update 后
      // vm.nextTick 无法使用，因为此时没有生成 vm 实例，所以只能用全局方法
      Vue.nextTick(() => {
        el.focus()
      })
    }
     
    // 方式2：选择更加合适的生命周期钩子
    inserted(el, bingdings, vnode) {
      el.focus()
    }
  }
}
```



#### 图片懒加载 v-lazyload

##### 基本用法

这原本是一个 github 上 vue 的插件，就是 `npm i vue-lazyload`

```js
// 引入插件
import VuelazyLoad from 'vue-lazyload'
// 引入图片
import loading from './liading.png'

// 注册插件
Vue.use(VuelazyLoad, {
  preLoad: 1.3, // 当前DOM可见区域的 1.3 倍
  loading, // loading 的加载图
  error: 错误的图片url
}) 

// 基本用法
<img v-lazy='img' />
```



##### 源码实现

自己去实现一下，既然网上有现成的实际项目就用那个插件库就好了。

`vue-lazyload` 主要就是提供一个指令，应用场景主要有三块

- 注册一些全局组件
- 给 vue 原型扩展属性
- 赋予一些全局指令和过滤器

```js
// vue-lazyload/index.js
// 实现 v-lozyLoad
// 通常作为插件，我们还会 let _Vue 来保存引入的 vue 构造函数

import Lazy from './lazy'

export default {
  // vue.use 会默认调用插件的 install 方法
  // 参数1：vue 构造函数。为了避免手动引入而导致只能使用某个版本，所以索性 Vue 直接提供给我们的插件
  // 参数2：用户要传入的插件参数对象
  install(Vue, options) {
    const LazyClass = Lazy(Vue)
    const lazy = new LazyClass(options)
    
    // 全局指令
    // 把各个指令钩子都作为方法抽离到 lazy.js 中
    Vue.directive('lazy', {
      // 保证当前 add 方法执行时，this 永远指向 lazy 实例
      bind: lazy.add.bind(lazy),
    })
  }
}
```



分离代码

- 面向对象思想、实例状态管理
- 利用`getBoundingClientRect` 获取元素高度判断是否在可视区域
- 防抖（最后只触发一次）节流（每隔固定时间触发一次）

```js
// vue-lazyload/lazy.js

// 节流 | 防抖方法
import {throttle, debounce} from 'lodash'

// 存放懒加载功能的文件
export default (Vue) => {
  // 判断当前图片是否在可见区域内的图片类
  class ReactiveListener {
    constructor({el, src, elRenderer, options}) {
      this.el = el
      this.src = src
      this.elRenderer = elRenderer
      this.options = options
      this.state = {loading:false} // 默认是没有加载的状态
    } 		

    // 判断是否渲染
    checkInView(){ 
      let {top} = this.el.getBoundingClientRect(); // 高度就是图片的位置
      return top < window.innerHeight * this.options.preLoad // 浏览器高度*扩展值
    }

    // 加载当前的listener
    load(){ 
      // 开始渲染 渲染前 需要默认渲染loading状态
      this.elRenderer(this,'loading');

      // 异步加载图片
      loadImageAsync(this.src,()=>{ 
        this.state.loading = true; // 加载完毕了
        this.elRenderer(this,'loaded');
      },()=>{ // 加载失败
        this.elRenderer(this,'error');
      }); 
    }
  }
	
  // 异步加载图片
  function loadImageAsync(src,resolve,reject){
    let image = new Image();
    image.src = src;
    image.onload = resolve;
    image.onerror = reject
  }

  return class LazyClass {
    constructor(options) {
      this.options = options // 保存用户传入的数据
      this.listenerQueue = [] // 图片实例
      this.bindHandler = false

      // 图片状态和可视区域判断方法（最核心方法）
      lazyLoadHandler:throttle(() => { // 节流
        let catIn = false
        this.listenerQueue.forEach(listener => {
          if(listener.state.loading) return ; // 如果已经渲染过的图片就不在进行渲染了
          catIn = listener.checkInView() // 判断是否应该渲染
          catIn && listener.load() // 加载对应的 listener
        })
      }, 300) // 一般是 200-300 用户无感知
    }

    // 就是指令的 bind 钩子要执行的方法
    // 经过绑定， this 一直指向 lazy 实例
    add(el, bingdings, vnode) {
      // 监控父亲 DOM 的滚动事件，滚动时检查当前图片是否在 可视区域内

      // 因为 el 此时获取的不是真实 DOM，所以要用 NextTick
      Vue.nextTick(() => {
        // 找到有滚动事件的爸爸 DOM 容器
        function scrollParent() {
          let parent = el.parentNode
          while(parent) {
            if (/scroll/.test(getComputedStyle(parent)['overflow'])) {
              return parent
            }
            parent = parent.parentNode // 不停向上找带 overflow 属性的容器
          }
          return parent
        }

        let parent = scrollParent()

        // 判断当前图片需要加载
        let listener = new ReactiveListener({
          el, // 真实的 dom
          src: bingings.value, // 对应 v-lazy 的值
          // 图片可渲染时调用的方法
          // 因为该方法可以给别人用，所以可能有 this 的影响，因而要做一次 this 绑定
          elRenderer: this.elRenderer.bind(this), 
          options: this.options
        })
        this.listenerQueue.push(listener)

        if (!this.bindHandler) {
          // 该 DOM 已经绑定过事件
          this.bindHandler = true
          // 绑定滚动时判断图片加载事件
          parent.addEventListener('scroll', this.lazyLoadHandler)
        }

        // 默认也需要一次判断
        this.lazyLoadHandler()
      })
    }

    // 渲染当前实例的状态图
    elRenderer(listener, state) {
      let {el} = listener
      let src =' '

      // 当前什么状态就渲染什么
      switch (state) {
        case 'laoding':
          src = listener.options.loading || ''
          break;
        case 'error':
          src = listener.options.errpr || ''
        default:
          src = listener.src
          break 
      }

      // 绑定属性值
      el.setAttribute('src', src)
    }
  }
}

```





## 过滤器Filter的使用

> 全局的话还是在main**.**js中写：过滤器一般都是通用的，写在全局中比较好

不是很常用了，因为可以用 methos 和 计算属性代替




### 定义

```javascript
Vue.filter('convertTime', function(data, formatStr) {
  return Moment(data).format(formatStr)
})
```



### 使用

> 这里有一个坑， 注意写法是一个 |,如果是写2个 ||,过滤方法是进不去的。
> | 可以连续使用如 fn | a | b


```html
{{info.add_time | convertTime('YYYY-MM-DD')}}

new Vue({
	filters:{
		convertTime(format){}
	}
})
```



## 继承与混合

混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。

- 公共方法抽离
- 编写插件



### Vue.mixin

返回组件构造器，创建一个子类，参数就是包含组件选项的对象。

其中 `data` 选项由于会被每个组件实例给复用，所以必须是函数，这样每个实例的data指向都是独立的。

```javascript
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  beforeCreate() {
    // 一般用于写公共的初始化逻辑
  }
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }

	// 还可以写一些公共方法
	methods:{
    fn(){}
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
```



### extends 选项

用于扩展单文件组件。

```javascript
// 混入对象
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [mixin], // 混入
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```



### 合并策略

当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。



#### 生命周期

同名钩子函数将合并为一个数组，因此都将被调用。

另外，混入对象的钩子将在组件自身钩子**之前**调用



#### data 选项

数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。



#### 值为对象的选项

如 `props, methods, computed`，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。



