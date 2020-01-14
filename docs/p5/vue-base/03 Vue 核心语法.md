# Vue 核心语法

## 模板语法
### 插值绑定 {{}}
就是 `{{}}`的用法，里面就是一个 JS 表达式，相应的变量要写在 vue 实例的 data 选项中

```vue
<p>{{msg + '!'}}</p> 变量和字符串
<p>{{flag ? '1' : '2'}}</p> 三元表达式
<p>{{`${msg}`}}</p> 模板字符串语法
<p>{{msg,split('')}}</p> 表达式。但是注意不能是一个方法之类的，因为方法不是表达式
```



### 常用指令

#### v-text 和 {{}} 是一样的

渲染纯文本



#### v-html 动态渲染 HTML

> 在网页上动态渲染任何 HTML 都是不安全的，有 XSS 攻击


这个属性其实就是 js 里的 `innerHTML` 用法，直接渲染 HTML



#### v-pre 跳过编译

就是让该节点不经过 vue 编译，那么就算写了 `{{}}` 也不会被当成表达式，而是被作为字符串正常渲染出来

`<span v-pre>{{msg}}</span>`，最后渲染出来的就是字符串 `{{msg}}`



#### v-once 只渲染一次

被标识的元素，就算被重新渲染，其所有子节点都不会被渲染，而是作为静态节点给跳过。

`<span v-once>{{msg}}</span>`



## v-bind 动态绑定



### v-bind 简写为

可以同时绑定多个值



### 动态样式 class 切换

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200114083326.png)



#### 单个样式

{ 样式名字， 逻辑表达式 }。就是可以绑定一个对象

```html
<div :class="{className:boolean}"></div>
```



#### 多个样式类

支持数组写法，还有混写的方式等

```html
<div :class="[{name1:true}, name2]"></div>
<div :class="{name1:true, name2:false}"></div>
```



#### 样式类名特殊符号

对于有特殊符号的样式类名，要用引号

```html
<div :class="{'class-Name':boolean}"></div>
```



### style 动态内联样式

关键字是 style，注意写法，里面是个对象

```vue
<p :style="{color:'red', fontSize:'12px'}">test</p>
```

可以把这一个内联样式对象提取到 data 选项中，这也是推荐的做法



## 条件渲染



### v-if 的使用

> 是DOM的渲染和移除的结合


```html
<p v-if="showName">{{name}}</p>
<p v-else-if="!showName">2</p>
<p v-else>3</p>
```

```javascript
data() {
  return {
    name:'xxx',
    showName: false,
    text: '',
    goods: [
     {id:1, text:"Web全栈架构师",price:1000},
     {id:1, text:"Python全栈架构师",price:1000},
   ]
  }
},
// 初始化钩子
created: function(){
  setTimeout(() => {
    this.showName = true
  }, 1000)
},
```

如果要让很多个节点同时使用 v-if , 其实可以使用  的方式



### 与 v-show 的区别

v-show 只是控制了元素的 `display` 属性，而不像 v-if 是对 DOM 进行了增删操作。会始终保持渲染，并保留 DOM。

- v-if 第一次为 false 时，组件是不会渲染的。直到 true 才会开始渲染。是有切换开销的
- v-show 就是控制了 css 的 display 属性

> 不支持 template 的那种用法， 也不支持 v-else


相应的还有 `v-hide`



### 与 v-for 同时出现的优先级

v-for 优先级高。也就是当 v-if 与其一起用在一个元素上时，意味着每次循环都要经历一次 v-if 判断。



## 循环渲染



### 循环渲染 v-for 中的 key



#### 避免渲染错误和性能提升

涉及到虚拟 DOM 的操作。key 是一个标识，想象一下尾删除是没有什么变化。但是如果是头部删除，那么后面的会自动排到前面。而之前对应的 index 索引都出错了。

而且在普通表单元素中设置，可以说明该 input 是独立不复用的，每次刷新都会重新被渲染

```vue
<li v-for="(item, index) in items" :key="item.id"></li>
```



#### 利用 key 强刷元素

有两个 Input，最常见的场景就是登陆前后，假设2个input的样式不一样，且设置了 `placeholder`。那么通过 v-if 切换这2者时，vue 会认为这是同一个元素，因为发生变化的仅仅是其 placeholder 属性而已。

如果要强刷，就要证明他们2个是独立的。也就是加上 key

```vue
<input key="isLogin" v-if="isLogin" />
<input key="notLogin" v-else />
```



### 列表渲染 v-for 中不同的数据源（数据/对象）

渲染数组对象和对象有一些不同，区别在于回调参数的不同

```html
// 1 数组列表，数组元素，索引。in 也可以用 of 替换，是一样的
<li v-for="(item, index) in items"></li>

// 2 对象列表, 对象属性值，对象键名， 对象索引
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }}: {{ value }}
</div>
```



## 双向数据绑定



### v-model 语法糖



#### 基本概念

> :key 用来表示数据的唯一性，一般是数据库中传来的主键。
> 这样做的好处，就是vue会自动去判断。在每次数据发生变化时，不会经常去重排渲染DOM。
> v-model 会忽略所有表单元素如 `value, checked, selected`特性的初始值，所以必须去 data 选项中定义数据变量。



#### 原理实现 input 绑定

> v-model 双向数据绑定（是一个语法糖利用了@change/@input事件回调去更新data 值， Vue 是单向数据流），一般用于 input 中。
> 即视图中和数据和JS中的数据，无论哪边变化，都会一起改变。于此区别的是单向数据流，即只能由JS改变数据，然后去通知视图以发生变化。


```html
<input v-model="something">

<input
  v-bind:value="something"
  v-on:input="something = $event.target.value">
```

上面两种方式是一样的作用。先知道`Input元素`上本身有个`oninput事件`，这是`HTML5新增加`的，类似 onchange，每当输入框内容发生变化的时候，就会触发`Input事件`，然后把 Input 输入框中 value 值再次传递给 something。



#### checkbox 和 radio 原理

下面就是这2个控件的原理实现。改变绑定的`:checked`值，就会自动触发 change 事件。跟 input 通过value值触发 `input` 事件原理是一样的。

```html
<input type="checkbox" :checked="status" @change="status = $event.target.checked" />
<input type="radio" :checked="status" @change="status = $event.target.chec
```

多个 checkbox 一起使用时， v-model 绑定的数据需要是同一个数组。



#### textarea 绑定

由 msg 显示多行文本

```vue
<textarea v-model="msg"></textarea>
```



#### select 绑定

```vue
<select v-model="selected">
  <option>A</option>
  <option>B</option>
</select>
<span>{{selected}}</span>

// 响应数据声明
data(){
	return {
		selected:'',
		selected: [],// 当 select 是多选时，需要提供数组
	}
}
```



### v-model 使用方式

> 如果一个组件上有多个属性需要双向绑定处理，增加个事件修饰符， `.sync`


```html
<p>
	<!-- v-model 双向数据绑定 -->
  <input type="text" v-model="text">
  <!-- @event="fn(params)" 事件绑定 -->
  <button @click="addGood">加购物车</button>
</p>
<ul>
  <li v-for="good in goods" :key="good.id">
    <span>{{good.text}}</span>
    <span>￥{{good.price}}</span>
  </li>
</ul>
```

```javascript
methods: {
  // 给 goods 列表增加新的商品，文字由 Input 输入决定
  addGood() {
    this.goods.push({
      text:this.text,
      price: 1000
    })
  }
},
```



## 事件处理和修饰符



### v-on 事件绑定和修饰符

缩写 `@click="handlerFn"`，如果是内敛语句还可以访问 `$event`

```javascript
<button @click="fn('xxx', $event)"
```



#### .sync

对 prop 双向绑定，但是也是一个语法糖。

```javascript
// 1 父亲组件
// 监听 @update:xxx 事件
<comp :myMessage="bar" @update:myMessage="func"></comp>
//js
func(e){
 this.bar = e;
}


// 2 子组件js
// update:xxx 事件派发
func2(){
  this.$emit('update:myMessage',params);
}

// 3 用 .sync 简写之后
// 注意父组件绑定的 prop 变量名 xxx，子组件必须是 update:xxx
//父组件
<comp :myMessage.sync="bar"></comp> 
//子组件
this.$emit('update:myMessage',params);
```



#### .camel 

HTML 标签中是不区分大小写的，一些特别的标签定义属性时必须区分大小写，就有两种解决方式

- .camel
```jsx
<svg :viewBox.camel="viewBox"></svg>
```

- 字符串模板
```jsx
new Vue({
  template: '<svg :viewBox="viewBox"></svg>'
})
```



### 事件修饰符



#### 单个使用

- .stop

阻止事件冒泡继续传播: 如`@click.stop` 就是阻止冒泡的单击事件， 相当于 `event.stopPropagation()` 

- .prevent

阻止事件的默认行为， 相当于 `event.preventDefault()` 

- .capture

使用事件捕获模式

- .self

只当 `event.target` 是当前元素自身时触发处理函数（子元素是不会触发的）

- .once

只会触发一次

- .passive

表示不会在监听函数里添加 `preventDefault()` 来阻止默认行为，即会立即触发

- .native

自己封装的组件，绑定 click 这样的事件是无效的。因为这是 vue 组件，而不是普通的 HTML 标签<br />所以加一个 `.native` 就会触发
> **注意使用.native修饰符来操作普通HTML标签是会令事件失效的**

```html
<My-component @click="shout(3)"></My-component>
```



#### 组合使用

> 是从左往右判断的

- .stop.prevent

阻止默认事件和冒泡

- .prevent.self 

会阻止所有的点击

- .self.prevent

只会阻止对元素自身的点击



### 键值修饰符

就是键盘事件的修饰符，为一些常用的按键提供了别名



#### 键盘按钮

- [@keyup.13 ]() 当 `keyCode`是13时触发
- [@keyup.enter ]() 回车

还有其他的一些别名

- .tap
- .delete（捕获删除和退格键）
- .esc
- .space
- .up
- .down
- .left
- .right

系统修饰符
> 不能独自使用，必须结合普通键一起使用，比如 `@keyup.ctrl.67`

- .ctrl
- .alt
- .shift
- .meta

系统键有问题，上面都是定义单个键的，但是碰到组合键，每个都会被触发，所以要搭配另一个修饰符
```html
<button type="text" @click.ctrl.exact="shout(4)">ok</button>
```



#### 鼠标 click 修饰符

- .left 左键
- .right 右键
- .middle 中键



#### 全局设置键盘别名

```javascript
Vue.config.keyCodes.f1 = 112 // @keyup.f1
```



### v-model 的表单修饰符

- .layz，延迟更新

本质是将 Input 触发事件改为 change，必须点击（失焦）后才能触发（输入完后光标消失才会触发视图的更新）

- .number，

转换输入值为 number 类型，若转换后是 NaN 则返回原数据<br />如果你先输入字符串，那它就相当于没有加.number

- .trim

自动过滤首尾空格



## 实例方法

### ref 获取 DOM 实例

> 1 在组件的 DOM 部分， 任意的标签中， 写上ref='xxx'
> 2 通过组件对象 this.$refs.xxx  获取到元素


```javascript
// $属性: $refs 获取组件内的元素，或者组件本身
$parent 获取当前组件对象的父组件
$children 获取子组件
$root 获取 new Vue 的实例， vm
$el 组件对象的 DOM 元素
```



### 其他 API

.$destroy()----主动销毁实例，结束所有事件监听和watch

.$props----vue中props属性中的内容

.$data----实例vue中data属性里的数据变量

.$root----vue对象本身，可以通过链式修改属性和方法

.$el----对HTML节点的引用

.$children----就是el下的子节点

.$set(app.obj, 'a', i)-----给vue实例中的obj对象({})中的a属性，赋值i

.$options----返回的实例本身，但是通过这个修改数据是无效的

```javascript
// ----在实例上修改一个值，但是只能等页面再次渲染时，即数据发生变动时才生效
.$options.render = (h) => {

	return h('div', {}, 'new render function')

}
```
