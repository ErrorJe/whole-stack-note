# Vant 项目

## 项目搭建基本配置

### vant 自动按需引入

官方对组件的引入方式提供了多种方案，其中自动按需引入组件是被推荐的方式。



#### 安装

先安装一下 `npm i vant -S`

然后安装必要的 babel 插件来支持按需引入 `npm i babel-plugin-import -D`



#### babel 配置文件

加入按需加载的配置内容

```javascript
module.exports = {
  // babel 的基本编译器配置
  presets: [
    ['@vue/app', {
      polyfills: [
        'es6.promise',
        'es6.symbol'
      ]
    }]
  ],
  // 按需加载插件配置
  plugins: [
    ['import', {
      libraryName: 'vant', // 后面组件从这个 vant 中引入
      libraryDirectory: 'es',
      style: name => `${name}/style/less` // 也可以简单写成 true
    }, 'vant'],
  ]
}
```



#### 全局组件注册

```javascript
// 在 main.js 中引入组件并注册，可以在全局下使用。之后所有组件实例都可以使用它
// ...
import {Lazyload} from 'vant'
Vue.use(Lazyload)
```

引入了组件，样式要通过 CDN 的方式引入（因为官方说了，使用了按需加载插件，就不支持直接引入所有组件或样式）

> 把样式的 cdn 地址拷贝到 public/index.html 中


```html
<!-- 引入样式文件 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vant@2.2/lib/index.css">
```



#### 布局组件注册

```javascript
// 在某个组件下，作为子组件引入
import {Tabbar} from 'vant'
export default {
  components: {
    [Tabbar.name]: Tabbar
  }
}
```



### 移动端字体 Rem 适配

移动端用 flex 布局， 用 rem 或者 rem + vm 进行适配

#### 插件安装

- `npm i postcss-pxtorem -D` 是一个 postcss 插件，可以将单位转换为 rem
- `npm i lib-flexible -D` 用于设置 rem 的基准值。一般会设置到应用的根节点上，如 `html` 节点



#### postcss 配置文件

关于 `rootValue` 就是根据设备的宽度除以 10 得到的。

比如设备宽度或者设计稿是 750px，那么我们就写 75。

之后我们在 CSS 中写了一个 `30px` ，实际上会被转换为 75/30 rem（设计稿的十分之一）
> 官方推荐配置

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    // 需要适配的浏览器环境
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    // 尺寸基准值的配置
    'postcss-pxtorem': {
      rootValue: 37.5, // 根元素的字体大小
      propList: ['*']
    }
  }
}
```



#### 引入 lib-flexbale 库

如 cubeUi 会自动引入，使用 vant 的话需要这样手动引入一下

之后打开的页面才会在根节点 html 上设置 `font-size` 为你配置的基准值

```javascript
// main.js
import "lib-flexible/flexible"
```



#### pxtorem 注意事项

- 行内式，外链式的代码无法转成rem
- 会影响第三方库
- 其他情况：目前发现简写 padding:5px 15px; 第一个 `5px` 不会被转换，要写全才行



### 移动端字体 rem 适配方案2

#### 安装插件
第一个是阿里的 flex 方案<br />这个库是上面那个库的爸爸，上面那个库是基于该库继续开发维护的
```javascript
npm i amfe-flexble -S
npm i postcss-pxtorem
```




#### main.js 中引入

这个就是在 Body 根节点加上 font-size
```javascript
import 'amfe-flexible';
```



#### 配置 postcss.config.js

```javascript
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = () => {
  return {
    plugins: [
      autoprefixer(),
      pxtorem({
        // 这里设计稿是 375，一般是写 375/10，考虑vant要再小一半也就是18.75
        rootValue: 18.75, 
        propList: ['*'],
        minPixelValue: 2
      })
    ]
  }
}

```



#### 增加 index.html meta

```javascript
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```



#### 让某个样式不进行自动转换

```javascript
// postcss.config.js
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = () => {
  return {
    plugins: [
      autoprefixer(),
      pxtorem({
        rootValue: 18.75,
        propList: ['*'],
        minPixelValue: 5,
        // 会忽略 class 是 not-rem- 开头的样式
        selectorBlackList: ['.not-rem-']
      })
    ]
  }
}
```

所以，要让某个样式不自动转换，在原有的 class 类名上加个前缀就好了
```html
<div class="not-rem-go-ask">
  <van-button>问询结果</van-button>
</div>
```

以及对于内部三方组件，用 sass 或 less 的嵌套写法就行
> 如果不想让第三方的 UI 库产生影响，也可以用这样的方法。因为 UI 库样式一定是有前缀的，所以类似得配置一下前缀过滤就行了

```css
.not-rem-go-ask {
  position: absolute;
  right: 15px;
  top: 16px;

  .van-button {
    @include font-type-14;
    background: #30b1e7;
    color: #ffffff;
    border-radius: 15px;
    height: 30px;
    width: 76px;
    line-height: 30px;
    padding: 0;
    /deep/ .van-button__text {
      font-size: 14px;
    }
  }
}
```



### 移动端 Rem 适配源码实现

一般是在 vue 项目 public/index.html 中写入<br /><a data-fancybox title="" href="https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200114084859.png">![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200114084859.png)</a>



### 移动端点击延迟

`fastclick` 库解决移动端点击延时 30 ms 的问题

`npm i fastclick -D`

引入和绑定事件

```javascript
// main.js
import FastClick from 'fastclick'
FastClick.attack(document.body)
```



## 项目工程配置

### 环境变量配置

`.env` 通用配置

`.env.development` 开发环境

```javascript
NODE_ENV = 'development' // 默认为开发环境
BASE_URL = '/' // 路由基地址

VUE_APP_BASE_API = '/dev-api' // 开发环境下请求基地址
```

`.env.production` 生产环境

```javascript
NODE_ENV = 'production' // 开发环境
BASE_URL = '/' // 基地址
VUE_APP_BASE_API = '/prod-api' // 生产环境下
```



### Vue cli 3.0 配置

vue.config.js

```javascript
// process.env.NODE_ENV 获取环境变量
const port  = process.env.port || 9090
// 用于做一些优化，后面用到
const IS_PROD = process.env.NODE_ENV === 'production'

// 路径解析
const path = require('path')
function resolve(dir) {
  // 拼接项目根目录绝对路径和自己的路径
  return path.join(__dirname, dir)
}

module.exports = {
  // 禁用 ESLint 的校验。
  lintOnSave: process.env.NODE_ENV === 'development' ? false : true ,
  
  // 本地开发服务器
  devServer: {
    port,
    open:true,
    overlay: {
      warnings: false, // 警告就不提示
      errors: true // 报错就全屏提示
    },
    proxy: {
      // 跨域设置
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://localhost:8000/mock',
        changeOrigin: true, // 决定是否允许跨域
        pathRewrite:{
          // 重写路径
          [process.env.VUE_APP_BASE_API]: ""
        }
      }
    }
  },
  
  // webpack 配置
  configureWebpack: {
    name:'project',
    resolve: {
      alisa: {
        '@': resolve('src'), // 别名
        'views':resolve('src/views'),
        'components':resolve('src/components'),
        'utils':resolve('src/utils'),
        'style':resolve('src/style')
      }
    }
  }
}
```



### 路由配置

#### 路由引入

mian.js 中引入 router 和 store，然后在根组件中注册。

就能在实例中拿到 $store, $router

```javascript
import router from './router'
import store from './store'

new Vue({
  router,
  store,
  // ...
})
```



#### 路由懒加载

```json
{
  path:'/xxxx',
  name:'xxxx',
  component: () => import(/* webpackChunkName: "xxxx"*/ '@/views/xxxx.vue'),
  meta: {
    keepAlive: true // 组件加载数据是否从缓存中取
  }
}
```

搭配 keepAlive 的使用

```html
<keep-alive v-if="$route.meta.keepAlive">
	<router-view/>
</keep-alive>
<router-view v-else/>
```



## Vuex 动态模块

<a data-fancybox title="" href="https://cdn.nlark.com/yuque/0/2019/png/204082/1573746255880-535982f3-412f-4b53-90a7-ba5914d66c2c.png#align=left&display=inline&height=551&originHeight=551&originWidth=701&size=0&status=done&style=none&width=701">![](https://cdn.nlark.com/yuque/0/2019/png/204082/1573746255880-535982f3-412f-4b53-90a7-ba5914d66c2c.png#align=left&display=inline&height=551&originHeight=551&originWidth=701&size=0&status=done&style=none&width=701)</a>

### Vuex 系统

#### Vuex 子模块

子模块命名空间 `namespaced` 的作用：在页面上使用的时候就可以直接拿到 state 值

```javascript
// 创建一个 Vuex 模块
// store/module/text.js 
// 基本每个 vuex 模块架子都是这样的

const state = {
  number: 1
}

// 异步操作
const actions = {
  // 参数： store, 参数payload
   syncFn({commit}, payload) {
     // 返回 promise 对象
     return new Promise((resolve, reject) => {
       // 模拟异步
       setTimeout(() => {
         commit('asyncFn', payload)
         resolve()
       }, 1500)
     })
   }
}

// 同步方法，也是用于直接更改 state 的途径
const mutations = {
  // 参数：state, 传入的参数 payload
  asyncFn(state, payload) {
    state.number = state.number + payload
  }
}

// getters 不一定在子模块中定义。可能单独拿出来
const getters = {
  
}

export default {
  namespaced: true, // 表示为子模块， 该模块文件名作为命名空间
  state,
  getters,
  actions,
  mutations
}
```



#### Vuex 主模块

引入子模块

```javascript
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import text from './module/text'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{},
  mutations:{},
  actions:{},
  modules:{
    text
  }
})
```



#### Vuex 辅助方法

之前在组件中获取 Vuex 中 state 或者调用方法时，要写一大串，如`this.$store.state.text.number`

利用 Vuex 提供的辅助方法，可以简化写法。

```javascript
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  methods: {
    // 同步
    async() {
      // 调用 text模块 mutations 中同步方法
      this.asyncFn(1)
    },
    // 异步
    sync() {
       // 调用 text模块 actions 中异步方法
      this.syncFn(1)
    },
    ...mapMutations({asyncFn: 'text/asyncFn'}), // text 子模块下 mutations 的 fn1 方法
    ...mapActions({syncFn: 'text/syncFn'})
  }
}
```



### 全局通用组件 Loading

比如使用 actions 时，我们无法得知其异步结束时间。通过给 actions 派发前后钩子，来控制派发前后行为。



#### 动态注册模块

> 为什么要动态？因为要控制该模块派发前和派发后的行为


创建该组件 `src/utils/vuex-loading.js`

```javascript
const NAMESPACED = 'myLoading'

const createLoadingPlugin = ({ namespaced=NAMESPACED={} }) => {
  return store => {
    // 判断模块是否已被注册
    if(store.state[namespaced]) {
      throw new Error('createLoadingPlugin is exited in current store')
    }

    // 注册模块 API 的使用: 模块名，Vuex 模块的属性
    store.registerModule(namespaced, {
      namespaced: true,
      state: {
        flag: true, // 用于检查该模块是否被动态注册的标识
        effects: {}
      },
      mutations:{
        hide(state, payload){
          state.effects = {
            ...state.effects,
            [payload]: true // 把方法名动态设为属性名，就是前面的 asyncFn， syncFn
          }
        },
        show(state, payload){
          state.effects = {
            ...state.effects,
            [payload]: false
          }
        }
      }
    })

    // 派发 actions 前后行为定义
    store.subscribeAction({
      before: (action, state) => {
        console.log(`before action ${action.type}`)
        // 调用方法，并传入 action 的名字
        store.commit(namespaced+'/show', action.type)
      },
      after: (action, state) => {
        console.log(`after action ${action.type}`)
        store.commit(namespaced+'/hide', action.type)
      }
    })
  }
}

export default createLoadingPlugin
```



#### 主模块中引入

```javascript
// store/index.js
import createLoadingPlugin from '@/src/utils/vuex-loading'

// ...

export default new Vuex.Store){
  plugins: [createLoadingPlugin()], // 注册动态模块
  // ....
}
```

在某个组件实例中去拿一下之前的标识 flag ，看下模块是否被加入成功

```javascript
{{$store.state.myLoading.flag}}
```



#### 实例中使用

```javascript
export default {
  computed: {
    ...mapState({loading: state => state.myLoading.effects['text/syncFn']})
  }
}
```
