# Vue 组件基础

## 组件基础知识

### 组件的分类

1. 通用组件：基础组件，UI库
1. 业务组件：与需求挂钩，能复用。如抽奖
1. 页面组件：每个页面都是组件，不会复用



### 智能组件和木偶组件

#### 木偶组件
> 为了业务页面进行拆分而形成的组件模式。
> 木偶组件：子组件只能有一个爹，必须是唯一的，而且父子俩长得一模一模，谁离开谁都活不了。


比如一个页面，可以分多个模块，而每一个模块与其余页面并没有公用性，只是纯粹拆分。

所以在设计木偶组件时，就已经知道该组件是用于哪个页面哪个层级的了。也就是在开发之前就明确了该木偶组件与相关组件之间的通信方式了。



##### $parent 组件通信

> `$parent` 指向当前组件的父组件，可以拿到父组件的整个实例。


父组件使用了子组件， `<demo></demo>`，且定义了某个方法

```javascript
...
methods : {
    parentMethods () {
        console.log('调用父组件的方法')
    }
}
```

子组件内部实现，调用 `this.$parent`获得父组件实例。这是因为它已经确定自己的父组件永远是同一个，所以可以先写死。

```vue
<template>
<div>
  <p>{{demoMsg}}</p>
  <p @click="handleClick">子组件</p>  
  </div>
</template>

<script>
  export default {
    name: 'demo',
    data () {
      return {
        demoMsg : ''
      }
    },
    methods: {
      handleClick () {
        let msg = this.$parent.msg
        this.demoMsg = msg
        this.$parent.msg = '父组件数据被改了' // 修改父组件数据
        this.$parent.parentMethods() // 调用父组件方法（在父组件内部执行）
      }
    }
  }
</script>
```



##### $children 组件通信

> Api是对于一个组件来说，已经明确知道它的子组件，也可能是一个子组件集。
> 准确地拿到想要的子组件实例，或者子组件集实例`$children`可以通过父组件拿到子组件的实例，它是以一个数组的形式包裹。


- 子组件

使用了一个变量显示

```vue
<template>
   <div>
      <p>{{demoMsg}}</p>
   </div>

</template>
<script>
export default {
   name: 'demo',
   data () {
     return {
        demoMsg : ''
     }
   }
}
</script>
```

- 父组件

遍历这个子组件，然后统一处理。因为字段是写死一样的

```vue
<template>
  <div class="hello">
     <p @click='handlerClick'>父组件</p>
     <demo></demo>
     <demo></demo>
  </div>
</template>

<script>
  import Demo from './Demo.vue'
  export default {
    name: 'hello',
    components: {
      Demo
    },
    methods: {
      handlerClick () {
        console.log(this.$children)
        this.$children.forEach(item => {
           item.demoMsg = '通过$children改变'
        })
      }
    }
  }
```



#### 智能组件应用：折叠面板 accordion

> 第三方通用组件，也可以称之为业务型公用组件。是多个组件公用的子组件。
> 与父组件之间的关系是完全解耦的，只能通过 props 进行数据传递，event 进行事件传递，不依赖于任何环境，只需要传递相应的数据和事件，就能得到你想要的操作。
> 子组件可以有N个爹，非唯一性，而且父子长得不一定要一样，子组件可能会有N个爹的特性，子组件离开哪个爹都能继续生存。


智能组件也是一个封装模块，对外暴露了各种方法和 props 数据。会根据传入的数据和事件去做内部封装后所做的事情，而你并不可以轻易随便改动它。



##### Accordion 组件

accordion属于第三方通用组件，同样也是一个复合组件。

这里相当于是一个容器，留了个插槽给弟弟们。

accordion 暴露了一个 repeat，当 repeat 为 true 的时候则把所有 item 项初始化都进行展开。

accordion 通过`$children`拿到每一个 accordion-item 子组件的实例，进行显示隐藏的转换。

```vue
<template>
<div>
  <slot></slot>
  </div>
</template>
<script>
  export default {
    props : ['repeat'],
    methods : {
      open (uid) {
        this.$children.forEach(item => {
          if(item._uid != uid){
            item.close = false
          }
        })
      }
    }
  }
</script>
```



##### AccordionItem 组件

留了个插槽用于写其他内容。

accordion-item 暴露了一个 title，可以随意传入你想设计的标题。

accordion-item 通过`$parent`调用 accordion 父组件的 open 方法

```vue
<template>
<div>
  <p @click='handleClick'>{{title}}</p>
  <div v-show='close' >
    <slot></slot>
  </div>
  </div>
</template>

<script>
  export default {
    props : ['title'],
    data () {
      return {
        close : false
      }
    },
    created () {
      if(this.$parent.repeat === true) {
        this.close = true
      }
    },
    methods : {
      handleClick () {
        this.$parent.open(this._uid)
        this.close = !this.close
      }
    }
  }
</script>
```



##### 使用方式

```vue
<template>
<div class="hello">
  <accordion :repeat='true'>
    <accordion-item title='vueTitle'>vue</accordion-item>
    <accordion-item title='vue-routerTitle'>vue-router</accordion-item>
    <accordion-item title='vuex-Title'>vuex</accordion-item>
  </accordion>
  </div>
</template>

<script>
  import Accordion from './accordion.vue'
  import AccordionItem from './accordion-item.vue'
  export default {
    name: 'hello',
    components: {
      Accordion,
      AccordionItem
    }
  }
</script>
```




## Vue组件开发基础

### 开发思路和步骤
> 组件注册
> 组件使用
> props传值
> 组件事件
> 扩展组件 - 插槽



### 组件注册

#### 全局注册
一般是在 main.js 中进行全局注册，这样在任何 vue 实例中都可以直接当模板使用。

```javascript
// 1 普通的注册方式
Vue.component('componentA', { /* 如vue实例中的配置项 */ })

// 2 插件的形式注册，前提是该组件是支持模块化开发的
Vue.use(componentA)
```

```html
<div id="app">
  <!-- html 中不区分大小写，驼峰命名用 - 隔开单词 -->
	<component-a></component-a>  
</div>
```



#### 局部注册

> 就是之前一直使用的模式，编写组件 - 引入组件 - 注册组件 - 使用组件
> 局部注册组件的好处，就是可以追溯组件依赖关系。



### 动态组件

Vue 还可以将多个子组件，都挂载在同一个位置，通过变量来切换组件，实现 tab 菜单这样的效果

#### keep-alive 缓存作用
##### 引入多个组件并注册

```javascript
import s1 from '@/components/s1.vue'
import s2 from '@/components/s2.vue'
import s3 from '@/components/s3.vue'

export default {
  components: {
		s1, s2, s3
  },
  data(){
    return{
      tabView:'s2'
    }
  }
}
```



##### 使用方式 is

使用 is 去绑定要显示的子组件，然后用变量控制子组件的切换。

这种方式， URL 是不会变的，每次切换组件都会重新渲染，无法保留组件上的数据和状态。

```html
<component :is="tabView"></component>
```



##### 使用 keep-alive 缓存组件状态

跟路由配合的话，要求路由配置中的 `name` 属性要和组件内的 `name` 属性要一致

```html
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```



#### 内置组件 keep-alive

> 用于包裹动态组件， 会缓存不活动的组件实例数据和状态，而不是销毁它们



##### 组件传值和属性

- include：字符串或正则。匹配到名字的组件将被缓存
  - 先匹配组件的 name 属性，再匹配在父组件中组件的名字（components 属性中定义的key），匿名组件不可被匹配
- exclude：与 include 作用相反
- max：最多可以缓存的组件实例数量

```jsx
<!-- 1 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>

<!-- 2 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 3 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>

<!-- 到达最大数字，最先被缓存的会被顶掉 -->
<keep-alive :max="10">
  <component :is="view"></component>
</keep-alive>
```



##### activated 和 deactivated 钩子

当组件在 `<keep-alive>` 内被切换，这两个钩子就会被触发



##### 基本用法

要求只有一个组件实例被有效使用，所以 `v-for` 无效

```jsx
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>

<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>

<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
```



### 递归组件

利用 name 属性，可以在自己组件内部调用自己。要注意用 v-if 防止无限递归。

```vue
<template>
	<s2 :tree="item" v-if="tree.children"></s2>
</template>

<script>
	export default {
    name:'s2',
    props:['tree']
  }
</script>
```

