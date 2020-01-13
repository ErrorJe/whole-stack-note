# Vue 父子组件通信

## （一）组件双向绑定 v-modle 和 .sync
### 1 v-modle 语法糖方式
#### 1）元素中使用 v-model 原理
监听的 input 事件(H5中新事件，类似 change)。将事件对象中响应到的 value 值给更新

```html
<input
  :value="something"
  @:input="() => this.something = $event.target.value">
```

#### 2）组件中使用 v-model 原理
`v-modle` 是基于 `input` 输入框定制的，`value`是固定写法，是 input 内置的变量。

然后通过回调的第一个参数(`arguments[0]`)赋值给 value，实现双向绑定。

```html
<custom-input
  :value="something"
  @:input="(value) => this.something = value">
</custom-input>
```

基于这个定制，Vue 实现了 `v-modle` 语法糖，可以简化写法

- 父组件：用 v-model 绑定变量 show。并且省略 input 的事件监听写法（内部已实现）

```html
<demo v-model="show"></demo>

<script>
import Demo from './Demo.vue'
export default {
  components: { Demo },
  data () {
    return {
      show: false
    }
  }
}
</script>
```

- 子组件
  - 用props拿到值
  - 然后绑定派发改变该值的 `input` 事件，传入参数

这也是为什么，语法糖里 `arguments[0]`要取第一个参数了。

```vue
<template>
   <div v-show="value">
      <div>
         <p>这是一个Model框</p>
         <button @click="close">关闭model</button>
      </div>
   </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    close () {
      // 子组件最核心的就是指定了 input 事件触发
      // 且规定 v-model 改的就是 "Value" 变量的值
      this.$emit('input',false)
    }
  }
}
</script>
```

### 2 定制组件 v-model
> 解决的问题：避免 value 值被占用，或表单和自定义的 `$emit('input')`事件发生冲突。


- props代替掉原本 value 的值，可以自定义值
- event代表掉原本 input 的触发事件，可以自定义触发事件

#### 1）父组件传值
```vue
<button @click="show=true">打开model</button>
<demo v-model="show" ></demo>

<script>
  import Demo from './Demo.vue'
  export default {
    name: 'hello',
    components: { Demo },
    data () {
      return {
        show: false
      }
    }
  }
</script>
```

#### 2）定制子组件
```vue
<input type="text" v-model="value">
{{value}}
<button @click="closeModel">关闭model</button>

<script>
  export default {
    // 把 props 从原本的value换成了show，input触发的事件换成了close
    model: {
      prop: 'show',
      event: 'close'
    },
    props: ['show'],
    data () {
      return {
        value: 10
      }
    },
    methods: {
      closeModel () {
        this.$emit('close',false)
      }
    }
  }
</script>
```

### 3 .sync 修饰符
> 用于对 props 进行双向绑定。
> Vue1.0版本时，破坏了单项数据流。
> Vue2.3版本后，被扩展成了编译时的语法糖，自动更新父组件属性的v-on侦听器。
> 无论怎么封装，跟 `v-model`一样都是基于 `$emit`和 `v-on`来封装的，主要目的是为了保证数据的正确单向流动与显示流动。


与 `v-model` 的区别

- v-model 内置只能写 value
  - 父组件里写 `v-model="xxx"`
  - 子组件见里只能是接受 `value`，当然派发的事件是
- .sync 可以写任何变量名
  - 父组件传入 `:eee.sync="123"`
  - 子组件派发事件:`this.$emit('update:eee', xxx)`这是需要对应的

#### 1）语法糖解析
父组件中使用`<demo :foo.sync="value"></demo>`， 这个语法糖的扩展为

- foo， 是子组件需要的数据，也就是 props 拿到的数据
- @update:foo ，显式监听该 props 数据（foo）。通过回调参数赋值给 foo，实现双向绑定。这里的行内函数，做的事情就是改变父组件自己的值，然后子组件自然就会被响应

```html
<demo :foo="value" @update:foo="val => this.value = val"></demo>
```

- 若子组件需要更新 foo 值，需要显示调用更新事件

```javascript
// 参数1：更新事件 Update， 后跟要对应改变的 props 值
// 参数2：希望父组件触发 update 事件时更新的回传数据
this.$emit('update:foo', newValue)
```

#### 2）多个 props 数据双绑

- 子组件

同时对 `msg,show` 这2个props数据绑定显式的 `update` 事件。分别使用了两种事件写法

- 直接写表达式
- 指定回调函数

其中 `update` 后跟的 `:xxx` 参数跟父组件传进来的值是同步的，两者要一一对应。

```vue
<template>
   <div v-show="show">
      <p>{{msg}}</p>
      <button @click="closeModel">关闭model</button>
     <button @click="$emit('update:msg','改变了model文案')">改变文案</button>
   </div>
</template>
<script>
export default {
  props: ['show', 'msg'],
  methods: {
    closeModel () {
      this.$emit('update:show',false)
    }
  }
}
</script>
```

- 父组件

父组件向子组件 props 里传递了 msg 和 show 两个值，都用了.sync 修饰符，进行双向绑定。

```vue
<template>
  <div class="hello">
    <button @click="show=true">打开model</button>
    <demo :show.sync="show" :msg.sync="msg"></demo>
  </div>
</template>

<script>
  import Demo from './Demo.vue'
  export default {
    name: 'hello',
    components: {
      Demo
    },
    data () {
      return {
        show: false,
        msg: '这是一个model'
      }
    }
  }
</script>
```

## （二）父向子通信 - props
### 1 父传子的静态或动态值
> :title="titleVar" , 这样就是绑定了变量，动态传值。经过 v-bind 里的就是一个表达式。
> title="xxxx", 静态的传值，就是把这个字符串传过去了。只限于字符串类型。如果是数字，也是需要 `:`
> :fn="fn" 还可以传递一个方法，在子组件可以直接使用比如 `@click="fn"`


### 2 子组件接受父级参数并校验
> 之前直接接受父级的参数，是用 props : []， 现在要对参数做校验，用 props: {}


```javascript
props: {
    // 1 基础类型检测 (`null` 意思是任何类型都可以)
    propA: Number,
    // 2 多种类型
    propB: [String, Number],
    // 3 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 4 数字，有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 5 数组/对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 6 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
```

### 3 改变 Props 的场景（单项数据流）
> 这个就像水一样，从高处往低处流（数据流），要改变只能去源头改。如果硬要改，也不是改父组件的数据，而是从 props 数据中找其他方法去改。
> 不要直接改变在 props 中的数据，因为父组件会被影响。同时对于简单数据类型，vue 会报错提示。
> 注意都是引用类型，改变这个数据对象或数组都会影响父组件的状态。


#### 1）过渡为本地 data
> 解决无法直接修改 Prop 数据的问题，作为本组件的 data 后就可以对其修改。
> 若是引用类型的对象，父组件会受到影响


```javascript
props: ['arrayList' 'message'],
data: function () {
  return {
    object: this.arrayList, // 数组、对象、函数都是引用类型
    msg: this.message // 简单数据类型
  }
}，
create(){
  // 引用类型修改
  this.object.name = 'name' // 父组件的数据也会被影响改变
  this.arrayList.name = 'name' // 也可以修改成功。因为没有去修改 arrayList 值本身（地址）
  // 简单类型修改
  this.msg = 'msg' // 可以成功修改
  this.message = 'msg' // 报错。因为不允许直接修改 props 数据（简单类型）
}
```

同样，利用 `引用对象` 这个特点，将父组件的数据刻意用引用对象给子组件的方式也不错。

#### 2）过滤 props 数据
> 只是以 props 原始数据为参考，扩展数据（不是修改）
> 进行一些过滤操作再次进行视图渲染。
> 这里要记住`不要对父组件传来的引用类型数据（对象、数组）进行数据计算`，这样会影响父组件数据。


```javascript
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

#### 3）v-model

- 先看一种原理式实现

```javascript
// 子组件
  props:{
    value:[Number, String] // 简单数据类型
  },
  computed: {
    innerValue: {
      get() {
        return this.value // 读取该属性时会触发该计算属性计算
      },
      set(val) {
        // 派发至给父组件，然后父组件拿到这个值去响应
        this.$emit('change', val)
      },
    },
  },
```

#### 4）深拷贝
```javascript
let copyData = JSON.parse(JSON.stringify(this.data))
```

### 4 用 ref 拿到子组件方法
#### 1）父组件拿到子组件方法
```javascript
<son ref="Son" @sonFn="fatherFn"></son>

// 1 在 JS 部分拿到子组件实例和 fn 方法
this.$refs.Son.fn()

// 2 通过调用子组件的 fn 方法，让子组件主动触发它的 `sonFn` 事件，这样父组件就能响应事件
fatherFn(res){
	// 能够拿到子组件给的数据
}
```

#### 2）子组件派发事件
```javascript
// 1 子组件中定义了一个 fn 方法
fn() {
  // 2 触发 `sonFn` 事件并传递数据
  this.$emit('sonFn', this.data)
}
```

## （三）子向父通信 - $emit &  $on

遵循单项数据流，就是子组件不能直接更改父组件给的值。所以要用事件去派发传递数据。

### 1 子组件派发自定义事件 $emit
> 首先要触发子组件的方法，然后去调用核心方法 `this.$emit('event', params)`
> 这样在父级组件层级，就可以监听事件


```html
<button @click="handleClick">子组件通知父组件</button>
<script>
handleClick() {
  // 第一个参数：自定义事件名，是一个字符串类型
  // 第二个参数：是要传递的参数。若有多个，要传一个数组
	this.$emit('lalala', {msg: '子组件通知父组件'})
}
</script>
```

### 2 父组件监听通知
> 首先也是要引入和注册使用子组件，然后才可以像下面一样使用.
> 对于 emit 派发的事件，可以直接去父组件中绑定该事件的触发，也可以直接去监听该事件


#### 1）绑定自定义事件 v-on(@)
这种方法直接在父组件指定的自定义事件回调参数中，拿到子组件的传值

```html
<w-button @lalala="handleClick"></w-button>
```

```javascript
handleClick(obj) { console.log(obj) } // 执行方法,拿到 msg
```

#### 2）事件监听 $on
一般在 created 钩子中去监听自定义事件
> 可以通过 vm._events 看该 vue 实例绑定了哪些事件，这些都是可以调试源码的时候发现的东西

```javascript
created(){
  // 参数1：String类型，自定义事件名。也可以是数组类型，给不同的事件绑定同一个方法
  // 参数2：回调函数，接受 emit 发出的参数
  this.$on('lalala', (res) => {
    // ...
  })
}
```


## （四）异步 Props 解决方案

> 出现的场景：父组件通过 props 给子组件传值，这个值在父组件这里是由异步操作获得的。也就是当子组件渲染调用 `created, mounted` 时，这个 props 值都是没有的。
> 子组件的渲染是在父组件在 created -> mounted 期间进行的，而子组件的 props 是在子组件在 created 钩子时期进行创建的。


### 1 父组件中通过 v-if 控制子组件渲染
> 这是最常见的写法


- 父组件的写法

这样写，子组件渲染的时候就可以在 `create, mounted` 中拿到值

```vue
<template>
	<!--3 需要传什么数据，就用什么数据去控制子组件的渲染-->
	<son v-if="dataList !== []" :list="dataList"></son>
</template>

<script>
export default {
  data(){
    return {
      // 1 父组件定义的数据
      // 想让 dataList 进入响应式系统，就要写在 data 选项中
      // 如果不知道类型， 写个 null 就行
      dataList:[]
    }
  }，
  created() {
    // 2 通过异步请求操作来更新 dataList 的值
    axios.get('xxxx').then (res => {
      this.dataList = res
    })
  }
}
</script>
```

### 2 子组件中监听 Props 数据（watch）
> 也有说法是用 computed 取代 watch。这是因为 `computed` 是依据响应式依赖数据进行缓存,对于一些日期类等不是响应是数据时不会计算。 `watch` 是实时计算用于执行异步或者开销比较大的操作


#### 1）简单数据监听
简单数据就是不是引用数据，无需关心这个复杂对象中某个层次中某个字段的改变。

- 第一步就是监听传入的 props
- 第二步是将监听得到的数据赋值给本组件的 data

```javascript
props:['list'],
data(){
  return {
		dataList: []
  }
},
// 1 监听某个 props
watch:{
  list(v){
    // 2 更新本地的 data
    this.dataList = v
  }
}
```

#### 2）复杂数据的变种监听
我们需要用到某个复杂引用对象中的某个值

- 父组件处理

父组件的处理，就是保证该要用到的字段能被响应式系统给监听。也就是拥有  `set get`方法。

这样父组件数据的更新，子组件能拿到。

```javascript
data(){
  return {
    // 将 field 这个深层字段也显式写在 data 中，就是告诉 vue 该数据字段是要能响应的
    objectList:{
      field:''
    }
  }
}
```

- 子组件处理

对深层对象字段进行监听，同时可以把替代 created 等初始化方法放在拿到监听数据更新逻辑后面

```javascript
props:['objectList'],
data(){
  return {
		field: ''
  }
},
watch:{
  // 对象方式使用 watch
  objectList: {
    handler(v) {
      this.dataList = v.field // 1 拿出需要的字段，赋值给本地 data
      this.createdByMe(v) // 2 把这个方法当作 created, mounted 方法来处理组件初始化
    },
    deep:true // 3 开启深层监听
  }
}
methods:{
  createdByMe(value){
    // 一些原本打算放在 created, mounted 中的逻辑。取代他们的作用
  }
}
```

### 3 子组件 props 设置默认值
```javascript
props: {
  user: {
    type: Object,
      default: function () {
        return {
          name: null,
          age: null
        }
      }
  }
}
```
