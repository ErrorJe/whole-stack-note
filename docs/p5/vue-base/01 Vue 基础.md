# Vue 基础（版本、生命周期与环境）


vue核心 + 组件化
> [vue官网](cn.vuejs.org)
> [vue-cli3](%20cli.vuejs.org)
> 编辑器我们用 VScode，安装一些与 vue 相关的扩展包，增加开发 vue 的效率


是一个渐进式框架，从视图层（单一的 vue 库），慢慢扩充
> 视图层渲染 ==> 组件机制 ==> 路由机制 == > 状态管理 ==> 构建工具


## 了解Vue的8个版本
**1 当我们使用 npm 来安装 vue 后， 在 dist/ 中会看到很多版本**<br />   _完整版，但符合的规范不一样: vue.js(UMD), vue.common.js(CommonJS), vue.esm.js(ES Module)_

   _运行时版， vue.runtime.js, vue.runtime.common.js, vue.runtime.esm.js_

   _生产环境完整版, vue.min.js_

   _生产环境运行时, vue.runtime.min.js_

**2 根据是否需要编译器**<br />   _运行时（创建VUE实例渲染，虚拟DOM）_

   _完整版（包括编译器和运行时）_

     _用了 vue-loader 也就是有编译器的功能_

     _template模板需要被编译_

**3 用在什么地方：**

   _UMD, 使用 script 标签来引入源码_

   _CommonJS， 低版本打包工具， webpack1_

   _ES Module， 现代打包工具， webpack2_



## 了解 Vue 的生命周期

### beforeCreate 事件初始化
> 还没创建，写代码可能性不大。

- 主要是数据观测（data observer）和事件配置（event/watcher）之前
- 实例的选项还没设置，所以此时用不了 props、data、el 等数据



### created 初始化注入和响应式

> 可以使用数据（完成数据观测）、执行http请求、事件监听（属性和方法的运算）。

- 先判断 el 是否存在
  - 存在才继续编译
  - 不存在停止生命周期，直到实例调用 vm.$mount(el) 挂载 DOM 方法
- $el 属性还不可见，挂载阶段还没开始.



### beforeMount 加载DOM树之前

> 也不太写代码

- 判断 el 属性挂载 还是直接使用 template。也就是给实例添加 $el 的过程
- 替换 DOM。即在模板中绑定了变量的地方都用占位符给占用，此时变量的内容实际没加载
- 注意在服务端渲染期间不被调用



### mounted 进入到虚拟DOM结构中

> 可以对DOM进行交互（监听DOM变化）

- 真实 DOM 加载完毕，data 数据也绑定完成



### beforeUpdate 更新前

虚拟 DOM 重新渲染或打补丁之前。重新编译渲染虚拟 DOM，且和数据一起显示。<br />但是真实的 DOM 层仍然没有被渲染。

> 在 `beforeUpdate` 之后，其实还有一个重要的过程，就是 `render`

render（createElement） 用于解析 template 模板的过程

> 执行优先级: render 函数选项， template 选项， 外部 HTML

- 若存在 template 选线，则编译成 render 函数，屏蔽外部 HTML
- 若不存在 template，就将外部 HTML 作为模板编译



### updated 更新后

DOM 更新已经完成。data 数据也是被更新<br />在这个阶段最好用计算属性或者 watcher 去更改状态。



### activated 与 keep-alive 组件激活时调用

服务器渲染也不可用。

有些情况下非常好用，比如 tabs 页切换有缓存，但是想要通过路由跳转到该 tab 页时，要进行重新加载。

就可以在 `activated` 钩子里拿到 `this.$route` 去判断里面的参数是否有值，就知道是不是通过路由跳转激活的该页面或组件。



### deactivated 在 keep-alive 组件停用时调用

服务器渲染也不可用



### beforeDestroy 实例销毁前调用

此时 DOM 已经被销毁，但是实例可以使用（服务器渲染也不可用）

断开数据监控，但是实例、方法等都还可以用。



### destroyed 销毁后

实例的所有东西都会解除绑定，所有事件监听都被移除，子实例也被销毁（服务器渲染也不可用）

但实例中元素绑定的事件仍能使用



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

