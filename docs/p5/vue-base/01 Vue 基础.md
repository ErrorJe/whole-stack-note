# Vue 基础（版本、生命周期与环境）


vue核心 + 组件化
> [vue官网](cn.vuejs.org)
> [vue-cli3](%20cli.vuejs.org)
> 编辑器我们用 VScode，安装一些与 vue 相关的扩展包，增加开发 vue 的效率


是一个渐进式框架，从视图层（单一的 vue 库），慢慢扩充
> 视图层渲染 ==> 组件机制 ==> 路由机制 == > 状态管理 ==> 构建工具



## 基础概念

### 库和框架

- 库，提供一个 API 集合，自己调用
- 框架，按照框架的范式写好代码，框架会调取我们的代码



### MVC 和 MVVM

#### MVC

是后端开发模式，前端的话主要是 angular 在用

- model 数据库中的数据
- view 前端页面
- controller 后端控制器

用户操作页面，发送数据到后端路由，后端控制器获取数据，经过处理后返回给页面



#### MVVM

- viewmodel 视图模型， Vue 其实就是 vm
- model JS中的数据
- view 前端页面

将数据挂载到 viewmodel 上，view 页面自动显示，页面发生变化调用数据自动更新视图。（不需要用户手动操作 视图更新）





## Vue 的 8 个版本

### 多版本

   _完整版，但符合的规范不一样: vue.js(UMD), vue.common.js(CommonJS), vue.esm.js(ES Module)_

   _运行时版， vue.runtime.js, vue.runtime.common.js, vue.runtime.esm.js_

   _生产环境完整版, vue.min.js_

   _生产环境运行时, vue.runtime.min.js_



### 编译器

   _运行时（创建VUE实例渲染，虚拟DOM）_

   _完整版（包括编译器和运行时）_

     _用了 vue-loader 也就是有编译器的功能_

     _template模板需要被编译_



### 模块化

   _UMD, 使用 script 标签来引入源码_

   _CommonJS， 低版本打包工具， webpack1_

   _ES Module， 现代打包工具， webpack2_



## Vue 的生命周期

<a data-fancybox title="" href="https://cn.vuejs.org/images/lifecycle.png">![](https://cn.vuejs.org/images/lifecycle.png)</a>

这些钩子中的 this 指向都是当前 vue 实例

### beforeCreate 事件初始化

> 还没创建，写代码可能性不大。

- 主要是数据观测（data observer）和事件配置（event/watcher）之前
- 实例的选项还没设置，所以此时用不了 props、data、el 等数据
- 一般是用于混入公共逻辑，利用 `Vue.mixin` 。也就是写插件的时候会用到



### created 初始化注入和响应式

> 可以使用数据（完成数据观测）、执行http请求、事件监听（属性和方法的运算）。
>
> 但是无法获取 DOM 元素

- 先判断 el 是否存在
  - 存在才继续编译
  - 不存在停止生命周期，直到实例调用 vm.$mount(el) 挂载 DOM 方法
- $el 属性还不可见，挂载阶段还没开始.
- 完全可以用 mounted 取代



### beforeMount 加载DOM树之前

> 也不太写代码，在第一次调用 `render` 函数之前

- 判断 el 属性挂载 还是直接使用 template。也就是给实例添加 $el 的过程
- 替换 DOM。即在模板中绑定了变量的地方都用占位符给占用，此时变量的内容实际没加载
- 注意在服务端渲染期间不被调用



### render

> 就是把模板转换成 render 函数的执行



### mounted 进入到虚拟DOM结构中

> 用真实 DOM 替换了老的节点。可以对DOM进行交互（监听DOM变化）

- 真实 DOM 加载完毕，data 数据也绑定完成
- 可以获取 `vm.$el` 真实 DOM
- 一般 ajax 请求除了放在 `created` 钩子中外，建议是放这里



### beforeUpdate 更新前

虚拟 DOM 重新渲染或打补丁之前。重新编译渲染虚拟 DOM，且和数据一起显示。

但是真实的 DOM 层仍然没有被渲染。

> 在 `beforeUpdate` 之后，其实还有一个重要的过程，就是 `render`



render（createElement） 用于解析 template 模板的过程

> 执行优先级: render 函数选项， template 选项， 外部 HTML

- 若存在 template 选线，则编译成 render 函数，屏蔽外部 HTML
- 若不存在 template，就将外部 HTML 作为模板编译



### updated 更新后

DOM 更新已经完成。data 数据也是被更新

在这个阶段最好用计算属性或者 watcher 去更改状态。

- 此时不要去更新数据，因为会无限循环



### activated 与 keep-alive 组件激活时调用

服务器渲染也不可用。

有些情况下非常好用，比如 tabs 页切换有缓存，但是想要通过路由跳转到该 tab 页时，要进行重新加载。

就可以在 `activated` 钩子里拿到 `this.$route` 去判断里面的参数是否有值，就知道是不是通过路由跳转激活的该页面或组件。



### deactivated 在 keep-alive 组件停用时调用

服务器渲染也不可用



### beforeDestroy 实例销毁前调用

此时 DOM 已经被销毁，但是实例可以使用（服务器渲染也不可用）

断开数据监控，但是实例、方法等都还可以用。

- 自定义事件的解绑， 调用 `$off`
- 取消 DOM 的事件绑定
- 定时器的清理

可以用 `$destory` 手动销毁组件，然后会走到这里

路由切换，也会销毁组件实例，走到这里



### destroyed 销毁后

实例的所有东西都会解除绑定，所有事件监听都被移除，子实例也被销毁（服务器渲染也不可用）

但实例中元素绑定的事件仍能使用。这个钩子基本用不到



### 父子组件的生命周期顺序

- 父组件先进行
  - beforeCreate
  - created
  - beforeMount
  - render
- 子组件，按上面同样走一遍
- 最后走父组件 mounted



## Vue 开发环境

### UI 库

#### element

饿了么团队开发，也是目前主流的 UI 库



#### antd-vue

react 组件，过渡 react 开发比较好



#### iview

国人开发，作者靠谱



### 开发工具



#### ESLint

代码规范和语法错误检查，下载插件就完事了



#### Prettier

代码格式化工具



#### vue-devtools

浏览器调试工具



#### Vetur

vscode 插件，vue 的高效开发插件。基本配置流程

> 文件 - 首选项 - 设置 - 搜索`vetur` - 选择在 `setting.json`中编辑



### 集成解决方案



#### ant-design-pro

使用 react/antd/dva技术



#### vue-element-admin

使用 vue/element 等技术



### 其他类库

#### moment

时间操作



#### lodash

JS 封装工具库



#### nprogress

进度条，安装完后可以直接使用`npm i nprogress`
```javascript
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
```

一般与路由守卫一起使用
```javascript
// ...
const router = {}
// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})
```

