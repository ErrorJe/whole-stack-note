# Vue 过渡和动画

Vue 可以对 DOM 的显隐进行动画管理

- v-if
- v-for
- v-show



## 过渡与动画基础

> vue 中的过渡动画触发时机是在 DOM 被插入、更新或删除的时刻。
> 在 vue 中使用过渡动画，有三种方式。


- 结合 JS 实现
- 结合 CSS 实现
- 第三方库如：`Animate.css` 和 `Velocity.js`



### CSS 过渡示例

`transition` 是 Vue 提供的用于包装需要使用动画的组件。用 `name` 属性标识该动画组件。<br />这里用按钮控制该 p 元素的显隐（show 变量的 js 定义部分省略）

```html
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```

由于动画组件起名是 `fade`，在 CSS 部分所有动画样式类都要基于这个名字前缀

```css
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
```

当我触发按钮，控制 p 元素显隐时， Vue 会有以下的处理过程：

- 检测目标是否应用了 CSS 方式的过渡或动画。有就在对应时机增删 CSS 类名
- 检测目标是否应用了 JS 方式的过渡或动画。有就在对应时机调用 JS 钩子函数
- 若没有检测到任何CSS动画，则DOM操作在浏览器下一帧立即执行



### CSS 动画示例

过渡和动画的区别

- 在 CSS 属性上是 `transition` 和 `animation` 的区别
- 在 vue 过渡类上，是 `v-enter` 在 `animationend` 事件触发时（动画结束）才被移除

```html
<transition name="bounce">
  <p v-if="show">xxxxxxx.</p>
</transition>
```

定义动画样式类（关键帧动画），注意 CSS3 属性用的是 `animation` 这就是与过渡的区别之一。然后使用的动画是用 `@keyframes` 定义的逐帧动画

```css
.bounce-enter-active {
  /* 动画作用 0.5 秒 */
  animation: bounce-in .5s;
}
.bounce-leave-active {
  /* 动画作用 0.5 秒，且是倒放 */
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  /* 定义了3个动画帧，缩放 */
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```



#### 显式过渡时间

> 若是同时使用过渡和动画，可能出现动画完成，但过渡仍生效的情况。此时可以给 `transition` 组件加一个显式的过渡时间


```html
<transition :duration="1000">...</transition>
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```



#### 自定义过渡类名

就是在各个过渡类的后面加了 `-class` 后缀，其优先级比普通类名高。<br />一般是用于结合了第三方动画库的情况下， 如 `Animate.css`

```html
<transition
  name="custom-classes-transition"
  enter-active-class="animated tada"
  leave-active-class="animated bounceOutRight"
>
  <p v-if="show">hello</p>
</transition>
```



## Vue 的动画使用

### 定义样式的模式

一共可以控制 6 个时机，其中会在 2 个 `...active` 钩子中写过渡，比如 `transition: all 2s linear`

其他 4 个都是定义开始/结束的状态，如 `background: blue`

<a data-fancybox title="" href="https://cdn.nlark.com/yuque/0/2019/png/204082/1576510785754-5041686b-b57f-4eb3-b739-085a71980c27.png#align=left&display=inline&height=600&originHeight=600&originWidth=1200&size=0&status=done&style=none&width=1200">![](https://cdn.nlark.com/yuque/0/2019/png/204082/1576510785754-5041686b-b57f-4eb3-b739-085a71980c27.png#align=left&display=inline&height=600&originHeight=600&originWidth=1200&size=0&status=done&style=none&width=1200)</a>

下面的 `v` 代表在 `transition` 组件中定义的 `name` 属性值。

若没有定义 `name` 属性，则 `v` 是默认前缀。

```jsx
<transition name="fade">
		// 包裹的 DOM
</transition>
```



#### 出现过程 v-enter-active

`v-enter-active` 是整个过渡动画生效的过程。在其头尾还有两个节点状态

- `v-enter` 过渡的开始状态。元素插入的前一帧生效。元素插入后一帧移除。
- `v-enter-to` 过渡的结束状态。元素插入的后一帧生效。动画完成后移除。



#### 消失过程 v-leave-active

与进入过渡过程相对应，`v-leave-active` 是整个离开过渡生效的过程。

- `v-leave` 离开过渡触发时生效，下一帧被移除
- `v-leave-to` 在`v-leave`移除的同时被触发，动画完成后触发



```css
.box{
  background: red;
}
/*  定义颜色初始化时的状态 进入的一瞬间 */
.fade-enter{
  background: blue;
}
.fade-enter-active{
  transition: all 2s linear;
}
.fade-enter-to{
  background: yellow;
}
/* 当动画结束之后 会去掉所有样式 */
/* 只是为了美感而生 没有实际意义 */
.fade-leave{ 
  background: purple;
}
.fade-leave-active{
  transition: all 2s linear;
}
.fade-leave-to{
  background: blue;
}
```



### 定义方法的模式

可以在 HTML 属性中声明 JS 钩子。

```html
<transition
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter"
  @enter-cancelled="enterCancelled"

  @before-leave="beforeLeave"
  @leave="leave"
  @after-leave="afterLeave"
  @leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```



这对应的不是 CSS 样式类名了，而是在 Vue 实例方法选项中的各个方法。

> 注意只用 JS 过渡时，在 `enter` 和 `leave` 中必须使用 done 回调，不然会同步执行，即过渡立即完成
> 若绑定属性 `:css="false"`， vue 会跳过该元素的 CSS 检测


```javascript
// ...
methods: {
  // 1 进入中
  beforeEnter: function (el) {
    el.style.color = 'red'
  },
  
  // 2 与 CSS 结合使用时, 回调函数 done 是可选的
  // 调用后进入 afterEnter
  enter: function (el, done) {
    done()
  },
  afterEnter: function (el) {},
  enterCancelled: function (el) {},

  // 3 离开时
  beforeLeave: function (el) {},

  // 4 当与 CSS 结合使用时, 回调函数 done 是可选的
  leave: function (el, done) {
    done()
  },
  afterLeave: function (el) {},
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {}
}
```



### Vue + Velocity.js

> 这是官方动画库，也就是当我们选择使用 JS 的方式去写动画

cnd 方式引入该库

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>

<div id="example-4">
  <button @click="show = !show">
    Toggle
  </button>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false"
  >
    <p v-if="show">
      Demo
    </p>
  </transition>
</div>
```



应用动画的方式就是调用 API

```javascript
new Vue({
  el: '#example-4',
  data: {
    show: false
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.transformOrigin = 'left'
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
      Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    leave: function (el, done) {
      Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
      Velocity(el, {
        rotateZ: '45deg',
        translateY: '30px',
        translateX: '30px',
        opacity: 0
      }, { complete: done })
    }
  }
})
```





## 列表和状态动画

### 初始渲染过渡

就是组件初次渲染时的动画

 可以通过 `appear` attribute 设置节点在初始渲染的过渡 

```html
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" 
  appear-active-class="custom-appear-active-class"
>
  <!-- ... -->
</transition>
```



### 多元素过渡

#### 两个元素过渡

比如对两个状态分别显示不同的按钮，通常用 `v-if` 实现切换，此时要考虑 vue 的效率机制，若标签一样，则只替换标签内容。<br />所以，更好的方式是用 `v-bind:key="isEdit"` 的方式实现 `key` 的绑定以及按钮的切换

> 这也是 `v-if` 和 `key` 的结合实践


```html
<transition>
  <button v-bind:key="isEdit">
    {{ isEdit ? 'Save' : 'Edit' }}
  </button>
</transition>
```



#### 多个元素过渡

```html
<transition>
  <button v-bind:key="docState">
    {{ buttonMessage }}
  </button>
</transition>
```

使用 switch 分支

```javascript
// ...
computed: {
  buttonMessage: function () {
    switch (this.docState) {
      case 'saved': return 'Edit'
      case 'edited': return 'Save'
      case 'editing': return 'Cancel'
    }
  }
}
```



#### 过渡模式：解决进入&离开同时生效的问题

这种情况下，两个 DOM 都会同时存在，在视觉上不友好。Vue 提供过渡模式解决这个问题

- `in-out` 新元素先过渡，完成后当前元素离开
- `out-in` 当前元素先过渡，完成后新元素进入(常用)

```html
<transition name="fade" mode="out-in">
  <!-- ... the buttons ... -->
</transition>
```



### 多组件过渡：动态组件

多组件的切换过渡，就不用 `key` 来标识了。动态组件就已经处理了标识<br />用 `:is` 绑定动态组件（动态，无法就是变量）

```html
<transition name="component-fade" mode="out-in">
  <component v-bind:is="view"></component>
</transition>
```

JS 部分，动态组件模板赋值给计算属性（动画 CSS 省略）

```javascript
new Vue({
  el: '#transition-components-demo',
  data: {
    view: 'v-a'
  },
  components: {
    'v-a': {
      template: '<div>Component A</div>'
    },
    'v-b': {
      template: '<div>Component B</div>'
    }
  }
})
```



### 列表动画

就是当动画包裹的是 `v-for` 渲染出来的元素的时候，需要用 `transition-group` 统一管理

- 使用 ` animate` 动画库，能够更方便得完成任务

```js
// 具体引入方式有很多种，动画的样式名字可以看 github
核心就是 class="animated  bounceInLeft" 后面的样式名可以去找
```



- 这里实现一个通过搜索功能，增删列表节点的动画

```jsx
<input type="text" v-model="content" />
<!-- 不建议使用 v-for + v-if -->
<!-- 合理的方式是通过计算属性先算出结果后再统一渲染 -->
<transition-group 
  enter-active-class="animated  bounceInLeft"
  leave-active-class=" animated  bounceOutRight"
  >
  <li v-for="arr in computedArr" :key="arr">{{arr}}</li>
</transition-group>

// vue 实例定义
let vm = new Vue({
  el:'#app',
  data(){
    return {
      content:'',
      arrs:['abc','bcd','def','yyy','zzz']
    }
  },
  computed:{
    computedArr(){
      return this.arrs.filter(item=>item.includes(this.content));
    }
  }
})
```



## 经典案例

### 购物车加购

场景：加购某个商品，让商品的图片从原位置动画移动到购物车图标位置

思路：移动过程中的图片，是另外加的，与原图无关。

```jsx
// 列表循环出来的商品图片
<div v-for="(p,index) in products" ref="lists">
  <img :src="p" alt="" />
  <button @click="addCart(index)">添加购物车</button>
</div>

// 用动画组件包裹了展现动画效果的图片
<transition @enter="enter" @after-enter="afterEnter">
  // 要移动的缩略图（理解为小球）
  <div class="animate" v-if="isShow"></div>
</transition>

// 购物车图标
<div class="cart" ref="cart"></div>
```



定义必要的控制变量和方法

```js
let vm = new Vue({
  el:'#app',
  data(){
    return {
      isShow:false, // 默认控制动画的属性
      currentIndex:-1, // 我当前点击的是谁
      // 2张图片
      products:[
        'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=139670673,2550279246&fm=26&gp=0.jpg',
        "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2093425964,1763924149&fm=26&gp=0.jpg"
      ]
    }
  },
  
  methods:{
    // 动画结束，隐藏那个小球
    afterEnter(el){
      this.isShow = false;
    },
    
    // 移动过程
    enter(el,done){ // 让当前这个div 获取到点击是哪一个
      // 关于 refs 若是 v-for 出来的则是一个数组。不然就是单个的
      let div = this.$refs.lists[this.currentIndex];
      
      // 将刚才需要创建动画的元素 给她定位到被加购的商品图片位置
      let {x,y} = div.getBoundingClientRect();
      el.style.left = x + 'px';
      el.style.top = y+'px';
      el.style.background=`url(${this.products[this.currentIndex]})`;
      el.style.backgroundSize = "100% 100%";
			
      // 获取购物车图标的位置
      let {x:cartX,y:cartY} = this.$refs.cart.getBoundingClientRect();
      
      // 做动画，要配合 CSS 动画样式
      // scale(0,0) 是缩放
      el.style.transform = `translate3d(${cartX-x}px,${cartY - y}px,0) scale(0,0)`;
      
      // h5的方法 不调用 下次动画就无法生效了
      el.addEventListener('transitionend',done)
    },
		
    // 点击加购操作，显示小球，且锁定商品索引
    addCart(index){
      this.isShow = true;// 切换显示效果
      this.currentIndex = index;
    }
  }
})
```



必要的 CSS 样式

```css
// 购物车位置
.cart{
  position: absolute;
  right:0;
  bottom:0;
  width: 50px;
  height:50px;
  background: red;
}
.animate{
  position: absolute; // 运动范围是全屏，所以要绝对定位
  width: 200px; // 设置和商品原图一样的初始大小
  height:200px;
  transition: 1s linear; // 1秒的线性动画
}
```

