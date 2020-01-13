# Vue 项目启动和基本配置

介绍几种启动方式
## （一）最简起步
### 1 事先要安装 node 环境

1. 使用`node -v`来看版本, 最好是8.9以上
1. 安装 vue-cli3
  1. 卸载 cli2.0，`npm uinstall vue-cli -g`
  1. `npm i -g @vue/cli`

### 2 新建项目

1. `vue create vue-cart`
1. 选择配置

### 3 运行项目
`npm run serve`

## （二）纯浏览器渲染

1. 新建一个HTML，构建基本模板
1. 引入vuejs的cdn
1. 写一个vue实例

```html
<div id="app">{{message}}</div>
```

```javascript
new Vue({
  el:'#app', // 将实例挂载到 id 为 app 的元素上
  data: {
    message: 'Hello, Vue'
  }
})
```

> 这种“对象”的写法，只能在 vue 实例中写。后面会介绍到单个组件的写法


## （三）快速原型开发：单文件 .vue文件
### 1 安装相应的包：可以不用引入任何文件，自动识别 .vue 文件

1. `npm i -g @vue/cli-service-global`

### 2 编写单文件组件
> 单文件就是包含了 html, css, js,
> 比如创建 App.vue


```vue
<template>
	<div>{{message}}</div>
</template>

<script>
	export default {
		// 这是组件化的写法，区别于上面实例的写法
    data() {
      return {
        message: 'hello world',
      }
    }
	}
</script>
<style></style>
```

然后创建对应的 JS 入口文件
> 就算没有这个 main.js ，也可以直接执行 App.vue

```javascript
// main.js
import Vue from 'vue'
import App from './App'

const vm = new Vue({
  el:'#app',
  render:h => h(App)
})
```

### 3 执行项目，启动开发服务器

1. cd 进入文件所在目录
1. `vue serve ./App.vue`

背后就是通过自动创建 `node_modules`然后引入了 `vue-loader`来对 Vue 文件进行编译

## （四）使用 Vue-cli 脚手架快速创建项目
### 1 使用 vue-cli 创建项目
#### 1）脚手架创建配置

- 全局安装 cli ，`npm i -g @vue/cli`， 目前最新版本 3
- 创建项目 `vue create 项目名`，并进入目录
  - 一般选项直接选择 default，就包括 babel 和 eslint
- 稍微大型的项目一般需要按照以下选择
  - 第一步不要选择默认，选择自定义，也就是 `manually select features`
  - Babel， Router， Vuex， Css Pre-processors 预处理器， Linter/Formatter， Unit Testing（jest）
    - TS 目前还是有一些不熟悉，所以一般不选择
  - 选择 History 模式的路由（根据后端是否愿意支持配置）
  - CSS 处理器一般选 SCSS，但是现在很多用 `less` 比较多
  - Linter/Formatter：选择 ESLint + Prettier
    - 何时格式化，两个都选：lint on save 保存时， lint and fix on commit 提交时
  - 配置文件选择：单独的配置文件  in dedicated config files（一般不选择只有 package.json）
  - 是否保存现有配置到本地：Y， 并对该配置文件起名字

#### 2）安装依赖和运行

- 安装相关的依赖
  - `npm i ant-design-vue moment` 前者是UI库，后者是时间操作库
- 进入项目根目录 cd ...， 然后启动项目 `npm run serve`
- 最后访问 `localhost:8080`就能访问首页

简化在 Vue-cli 下的项目启动命令，在 `package.json` 中配置
> 实际上 `npm run serve`就是在这里配置的，我们可以复制一行一模一样的代码，然后使用命令start，就可以简化写法，直接写 npm start 就可以启动项目了


```javascript
"scripts": {
  "start":"vue-cli-service serve"
}
```

#### 3）vue-cli3下的项目目录
```javascript
node_modules - 依赖
public - 静态资源
src - 源码
  assets - 静态文件
  components - 组件
  main.js - 项目的入口文件
  App.vue 根组件
babel.config.js - babel配置
package.json - 项目配置和依赖配置
```

- 入口文件 - main.js
```javascript
import Vue from 'vue' // 没有路径的，一般都是以依赖的形式在node_modules中
import App from './App.vue' // 有路径./../之类的，说明是自定义组件

Vue.config.productionTip = false

new Vue({
  render: h => h(App), // 渲染 app 组件，编译成 html
}).$mount('#app') // 挂载到 id=app 的宿主元素上
```

- 根组件 App.vue
> 调用其他组件，必须在父级组件中：引入组件 - 声明组件 - 使用组件
> 还要注意，每个组件必须要有一个 “根元素”

```html
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- 3 使用组件 -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// 1 引入组件
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  // 2 声明组件
  components: {
    HelloWorld
  }
}
</script>

<style></style>
```

### 2 自定义 webpack 和 babel 配置
#### 1）全局引入 ant-design-vue
在此之前先去掉 vue 示例里的一些无关代码，然后去 mian.js 中注入这个

```javascript
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router' // router 和 store 会跟着依赖安装自动写入
import store from './store'

import Antd from 'ant-design-vue' // 1 引入这个 UI 库和样式
import 'ant-design-vue/dist/antd.less'

Vue.config.productionTip = false

Vue.use(Antd) // 2 全局注册组件

// 3 挂载选项
new Vue({
  router,
  store,
  render:h => h(App)
}).$mount('#app')
```

#### 2）根组件中测试 antd 组件
```vue
<template>
	<div id="app">
 	 <a-button>按钮</a-button>
   <router-view></router-view>
  </div>
</template>

<style lang="less"></style>
```

发生报错。原因有两个

- less 版本过高
- 没有配置 vue.config.js

#### 3）在 vue.config.js 中配置 less
```javascript
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      // 1 给 Less 传递选项
      less：{
        javascriptEnabled:true
      }
  }
}
```

#### 4）按需引入 antd 组件

- 按需引入组件：尽管是按需引入，但是这样每个组件都要做一遍也是很繁琐
```javascript
//...
import Button from 'ant-design-vue/lib/button'
import 'ant-design-vue/lib/button/style'

Vue.use(Button)
```

- babel-plugin-import
  - 需要先安装 `npm i -D babel-plugin-import`

```javascript
// babel.config.js
module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ]
};
```

之前是通过依赖包的目录引入特定的组件文件，现在只需要引入组件名就行了(全局)

布局组件使用需要手动引入和注册组件。

```javascript
import {Button, Layout} from 'ant-design-vue'
// 样式都可以省略

Vue.use(Button)
Vue.use(Layout)
```

最后重新访问页面，组件的 JS 和 CSS 代码都会按需加载

### 3 vue.config.js 主要配置
```javascript
let path = require('path')
module.exports = {
  // 1 项目上线后的路径
  publicPath:process.env.NODE_ENV === 'production'? '/vue-project':'/',
  // 2 打包输出路径
  outputDir:'myassets', 
  // 3 生成静态目录的文件夹
  assetsDir:'static', 
  // 4 是否使用运行时。是否可以使用template模板
  runtimeCompiler: true, 
  // 5 是否开启多线程打包。多余1核cpu时 启动并行压缩
  parallel:require('os').cpus().length > 1, 
  // 6 生产环境下 是否产生 sourceMap
  productionSourceMap:false, 

  // 7 webpack配置链。更改原有默认的配置
  chainWebpack:config=>{
    // 控制webpack内部配置
    config.resolve.alias.set('component',path.resolve(__dirname,'src/components'));
  },
  // 8 对 webpack 新增插件
  configureWebpack:{
    // 新增插件等
    plugins:[]
  },
  // 9 本地服务
  devServer:{ 
    proxy:{// 配置代理
      '/api':{
        target:'http://a.zf.cn:3000',
        changeOrigin:true
      }
    }
  },
  // 10 第三方插件配置
  // 如命令 vue add xxx 就会把插件注入到这里
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 插入全局样式
        path.resolve(__dirname,'src/assets/common.less'), 
      ],
    }
  }
}
```
