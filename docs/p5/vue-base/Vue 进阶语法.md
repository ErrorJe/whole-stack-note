# Vue 进阶语法

## （一）数据响应式
### 1 data 数据劫持

> 只有定义在 data 中的数据才能响应，vue 把响应式系统的数据放在了 `data选项中`


#### 1）响应式原理

> vue 是通过数据劫持，达到数据绑定。也就是在 data 第一次初始化注入的时候就决定了数据的绑定；
> 1 Vue 底层将遍历 `data`选项中所有的属性，并在实例初始化时用 `Object.defineProperty` （ES5 中无法被 shim 的属性[就是在低级环境下无法实现的属性功能]，所以不支持 IE8 及更低的浏览器）把属性全转为 `getter/setter`
> 2 同时，被劫持的 data（setter/getter） ，也必须在 template 模板中被使用才会被依赖收集后监听（由 watcher 去监听，把接触过的数据属性记录为依赖）。这些记录可以通过 `vue-devtools` 来查看追踪
> 3 最后的视图其实是当 `setter` 被触发，再由 `watcher`（每个组件实例都有一个自己的 watcher）去通知更新的。


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
    this.foo.abc='aa'//这种方式是不会响应的
    // 1 这样才能响应，动态增加属性
    this.$set(this.foo,'abc','aa')
    // 2 也可以调用全局方法
    Vue.set(this.foo,'abc','aa') 
    // 3 创建新对象覆盖原响应对象
    this.foo = Object.assign({}, this.foo, {abc:'aa'}) 
  }
}
```

#### 2）全局和组件 data 选项的区别

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

#### 3）不被感知的修改方式及其解决方案

**数组中不被感知的2种情况**：

- `arr[index] = newItem`， 通过索引设置
  - 解决1：`Vue.set(arr, indexItem, newValue)` 或者 `this.$set()`手动增加某个索引下值的响应
  - 解决2：通过`splice`解决。`arr.splice(indexItem, 1, newValue)`。
    - 因为数组是引用对象，splice 方法是直接修改原引用对象
- `arr.length = newLength`，修改数组长度
  - 解决：利用 `splice` 方法去改变原数组

**对象中不被感知的情况**：vue 不能检测对象属性的增删（因为受到现代 JS 的限制）

- 解决1：手动增加响应式属性， `Vue.set(obj, key, value)`， `this.$set`是这个方法的别名
  - 注意，这也仅仅是针对有嵌套情况的数据对象（因为有引用）
  - 而不能在实例化后添加根级的响应式属性，所以必须在初始化实例前声明所有的根级响应式属性，就算是空值
- 解决2：若要增加多个对象属性，
  - 直接加到原对象上是**不会响应**的， 如`this.msg = Object.assign(this.message, {t1:1, t2:2})`
  - 而是要用空对象去组合继承两个对象属性 `this.msg = Object.assign({}, this.message, {t1:1, t2:2})`

### 2 数据来源

只有三种方式

- 父组件属性 props
- 自身组件状态 data
- 状态管理器， vuex， Vue.observable

### 3 computed 计算属性

> 监听的数据必须是在响应式数据中的，普通变量无法监听。
> 且是基于依赖的响应式数据进行缓存，只有相关依赖发生变化才会重新求值


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

### 4 watch 监听器

> 可以执行任何逻辑，如异步操作和DOM操作。
> 是一个键值对象。键是要观察的表达式，值是对应回调函数（也可以是方法名或包含选项的对象）
> 虽然 computed 能做的 watch 都可以做，但是推荐尽量使用 computed。
> watch 适用于在数据变化时执行异步或开销很大的操作情况。
> 下面为了笔记方便采用了箭头函数，可能会有问题，注意实际使用


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

#### 1）子组件获取异步数据

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

#### 2）手动增加响应式对象属性

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

### 5 vm.$nextTick（cb）

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

### 6 Vue.observable

- 传入一个需要响应式的对象，然后就会注入到vue实例
- 然后定义修改这个对象值的 mutation 方法
- 写个事件去触发这个 Mutation 方法

![image.png](https://cdn.nlark.com/yuque/0/2020/png/204082/1578162290138-f36c1115-e924-4ec2-8bba-19087314e0c6.png#align=left&display=inline&height=667&name=image.png&originHeight=667&originWidth=879&size=200029&status=done&style=none&width=879)

## （二）插槽（slot）

> 用于容器类的组件。实际上是一行注释，是一个占位符，用到的时候会被调换成真实的内容DOM。
> 有具名插槽和匿名插槽，如果内容没有指定插槽，那就会分配到默认插槽空位中


### 1 slot 基本用法

> 创建一个 Win.vue 容器插槽。这里混合里两种插槽（匿名插槽和具名插槽）


```html
<div class="win">
  <div class="head">
    <!-- 传入一个数据 -->
    <slot name="head" :item="123"></slot>
  </div>
  <slot></slot>
  <div class="food">
    <slot name="food"></slot>
  </div>
</div>
```

> 使用时，也要引入注册组件。
> `v-slot` 是 2.6 版本之后具名插槽的 API 用法。缩写是 `#`，如 `#footer`


```html
<win>
	<template v-slot:head="{item}"><h2>具名插槽 head且解构出数据</h2></template>
  <p>...其他没有名字的内容分配到默认的插槽中</p>
  <template v-slot:default>
    <p>也可以显式地说明这个是默认内容，使用默认插槽坑位</p>
  </template>
  <template #footer><h2>具名插槽 foot</h2></template>
</win>
```

### 2 插槽也是父子组件的概念

通过自定义属性，同样有参数父传子的用法。

> 这里还有一个`编译作用域`的概念，也就是定义出来的插槽组件和使用这个插槽组件的父级组件之间，作用域是无关的。也就是父级组件在使用这个插槽组件的时候，无法直接使用插槽组件里的变量。


#### 1）定义插槽组件（子）

这里定义一个名为 `navigation-link` 的插槽组件。绑定了 `href` 变量，在外面使用的时候，通过自定义属性 `url` 传入值。

```html
<a v-bind:href="url" class="nav-link" >
  <slot></slot>
</a>
```

#### 2）使用插槽组件（父）

通过 `url` 自定义属性传入值。若在上面定义的时候，没有用到 `slot`坑位，则现在里面的 span 包括 文本都会被忽略渲染。

```html
<navigation-link url="/profile">
  <span class="fa fa-user"></span>
  Your Profile
</navigation-link>
```

### 3 后备内容

也就是定义插槽组件时， 在 `slot` 中写的默认值。也只有当父级组件没有给出相应内容时，会渲染这个默认值。

```html
<!--1 定义组件 <submit-button>-->
<button type="submit">
  <slot>Submit</slot>
</button>
  
<!--2 使用该插槽组件时，没有给出 slot 的内容-->
 <submit-button></submit-button>

<!--3 最后渲染的是默认的内容-->
<button type="submit">Submit </button>
```

## （三）自定义指令

- 共享数据，建议用 `dataset`
- 除了`el`，其他属性都是仅可读的。所以尽量不要去修改
- 当我们需要对 DOM 做底层逻辑处理时，就可能需要用到自定义指令

### 1 钩子函数

提供给指令的钩子函数

- bind， 第一次绑定到元素时调用，只调1次。用在绑定一次初始化的内容上
- inserted，被绑定元素插入父节点时调用（父节点存在就行）
- update，所有元素节点更新时调用，可能在子节点更新前
- componentUpdated，所有节点和其子节点更新完成后调用
- unbind，指令与元素解绑时调用

### 2 钩子函数的参数

每个钩子都有这些参数

- el， 绑定的元素，可以直接操作 DOM
- binding，对象
  - name 不包括 v- 的该自定义指令名
  - expression，绑定值的字符串形式。如 `v-tooltip="xxx"`，就是 `xxx`这个字符串表达式
  - value，指令绑定值，也就是指令后面的表达式值 `v-dec:x="date"`， 就是这个 `date` 表达式的结果值
  - oldValue，指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中用，无论值是否改变都可以
  - arg，传给指令的参数， `v-tooltip="msg"`，参数就是变量 msg。如果是动态绑定 `v-tooltip:msg="xxx"` 的 msg
  - modfiers,包含修饰符的对象， `v-tooltip.foo.bar` 就是 {foo:true,bar:true}
- vnode，vue编译生成的虚拟节点
- oldVnode，上一个虚拟节点

### 3 钩子的函数简写

```javascript
Vue.directive('color-swatch', function(el, binding) {
  el.style.bakcgroundColor = binding.value
})
```

### 4 钩子的对象字面量形式

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

### 5 动态指令参数

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

### 6 全局指令的注入

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

## （四）过滤器Filter的使用

> 全局的话还是在main**.**js中写：过滤器一般都是通用的，写在全局中比较好


### 1 定义

```javascript
Vue.filter('convertTime', function(data, formatStr) {
  return Moment(data).format(formatStr)
})
```

### 2 使用

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

## （五）继承与混合

混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。

### 1 Vue.extend

返回组件构造器，创建一个子类，参数就是包含组件选项的对象。

其中 `data` 选项由于会被每个组件实例给复用，所以必须是函数，这样每个实例的data指向都是独立的。

```javascript
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
```

### 2 extends 选项

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

### 3 合并策略

当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。

#### 1）生命周期

同名钩子函数将合并为一个数组，因此都将被调用。

另外，混入对象的钩子将在组件自身钩子**之前**调用

#### 2）data 选项

数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。

#### 3）值为对象的选项

如 `props, methods, computed`，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。



