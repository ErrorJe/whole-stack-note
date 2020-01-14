# Vue 过渡和动画

## 过渡与动画

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



### 过渡的类名

<a data-fancybox title="" href="https://cdn.nlark.com/yuque/0/2019/png/204082/1576510785754-5041686b-b57f-4eb3-b739-085a71980c27.png#align=left&display=inline&height=600&originHeight=600&originWidth=1200&size=0&status=done&style=none&width=1200">![](https://cdn.nlark.com/yuque/0/2019/png/204082/1576510785754-5041686b-b57f-4eb3-b739-085a71980c27.png#align=left&display=inline&height=600&originHeight=600&originWidth=1200&size=0&status=done&style=none&width=1200)</a><br />下面的 `v` 代表在 `transition` 组件中定义的 `name` 属性值。<br />若没有定义 `name` 属性，则 `v` 是默认前缀。



#### 出现过程 v-enter-active

`v-enter-active` 是整个过渡动画生效的过程。在其头尾还有两个节点状态

- `v-enter` 过渡的开始状态。元素插入的前一帧生效。元素插入后一帧移除。
- `v-enter-to` 过渡的结束状态。元素插入的后一帧生效。动画完成后移除。



#### 消失过程 v-leave-active

与进入过渡过程相对应，`v-leave-active` 是整个离开过渡生效的过程。

- `v-leave` 离开过渡触发时生效，下一帧被移除
- `v-leave-to` 在`v-leave`移除的同时被触发，动画完成后触发



### JS 钩子方式示例

可以在 HTML 属性中声明 JS 钩子。

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
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
  beforeEnter: function (el) {},
  
  // 2 与 CSS 结合使用时, 回调函数 done 是可选的
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



## 列表过渡



### appear 初始渲染过渡

就是组件初次渲染时的动画

```html
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" (2.1.8+)
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



### 列表过渡

1）列表进/出过渡<br />2）列表排序过渡<br />3）列表交错过渡



### 可复用过渡



### 动态过渡



## 状态过渡