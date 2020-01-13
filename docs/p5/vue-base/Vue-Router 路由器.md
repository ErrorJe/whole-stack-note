# Vue-Router 路由器

简单来说就是解析不同的url，去替换和渲染不同的页面

传统的开发，不同的 URL 对应的是不同的页面，用户每次都要等待加载访问的时间。现在有了单页面应用，针对不同 URL 去映射不同的组件。

> 1 配置路由 `{path:'/login',component:Login}`
> 2 安放路由出口 router-view
> 3 导航链接 router-link
> 4 路由传参和获取
> 5 嵌套路由和路由守卫
> 	嵌套路由 `{children:[]}` 注意父级路由要有路由出口
> 	路由守卫：全局 `router.beforeEach`， 路由层级 `beforeEnter`， 组件层级 `beforeRouteEnter`
> 6 异步路由懒加载


## （一）安装和介绍

### 1 Vue-Router 解决的问题

- 监听URL变化，执行相应逻辑
- URL 是组件的映射
- 多种 API 来操作 URL（哈希模式不刷新浏览器）

### 2 路由的类型

- hash 模式：丑。无法使用锚点定位。（用#号）
- history 模式：需要后端配置。IE9不兼容（可用强制刷新处理）

```javascript
// 只需要更改 Mode 模式就好了
routes: [
  mode:history,
  { path: '/', redirect: '/page1' },
]
```

### 3 Vue-Router 安装

在cli3之前使用命令 `npm i vue-router --save`来安装

如果是使用 vue-cli3， 可以直接以安装插件的形式 `vue add router`

> 会询问是否使用 history 模式的 router 这里，可以选择 no。直接安装
> 注意使用这种方式安装的插件，会将插件特性覆盖 App.vue，所以要回退一下。
> 最后在源码根目录下会多一个 `router.js`


## （二）基本配置

> 路由的基本表现就是无刷新，底层是通过DOM的移除和重新渲染加载来实现的。
> 在配置每个页面的路由之前，那个页面也需要存在。所以假设这里新建了页面 Page1.vue和Page2.vue


### 1.router.js对路由的配置

> 1 引入相关页面 import，可以使用相对路径或者是绝对路径(@)。建议后者
> 2 挂载路由插件 Vue.use()，初始化路由实例new Router()
> 3 更改模式，默认模式是哈希模式(/#)， 下面更改为 history 模式(路由的history模式也不会刷新)
> 4 配置首页，使用重定向
> 5 配置各个页面路由的Url和指定页面


```javascript
// router.js
import Vue from 'vue'
import Router from 'vue-router'
// 1 两种页面引入方式 @指向源代码目录 也就是src目录
import Page1 from './views/Page1.vue';
import Page2 from '@/views/Page2.vue';

// 2 插件引入后的挂载方式
Vue.use(Router)

export default new Router({
  // history模式，url就不会有 /# 这样的哈希模式。对SEO比较好，可读性也强
  // 但是这个模式需要服务器配合，也就是url域名部分要全部指定
  // 现在更加建议使用 history 模式
  mode: 'history',

  // 3 这里是配置路由。区别于路由器 Router
  // 4 在主页面还需要有一个路由入口 <router-vie></router-vie>
  routes: [
    // 默认首页，重定向到 page1
    { path: '/', redirect: '/page1' },
    {
      path: '/page1',
      component: Page1
    },
    {
      path: '/page2',
      component: Page2
    }
  ]  
})
```

### 2.路由的基本使用

#### 1）挂载到全局

首先需要在 `main.js` 中去注册这个选项

```javascript
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new  Vue({
  router, // 挂载到实例
  render:h=>h(App),
}).$mount('#app')
```

#### 2）router-view 路由视口和 router-link 路由导航

> 可以通过路由视图器来作为路由入口展现 `router-view`
> 也可以通过`router-link`路由导航来跳转，相当于超链接 a 标签


```html
// App.vue
<!-- 路由方式1：航，就是 a 标签 -->
<!-- 底层是对DOM的移除和重新渲染，也就是所谓的不刷新 -->
<router-link to="/page1">Page1</router-link> |
<router-link to="/page2">Page2</router-link>

<!-- 路由方式2:入口，视图器 -->
<router-view></router-view>
```

还可以在链接路由中直接增加参数

> 这里将路由跳转的所有信息都携带了， 不需要另外写 JS
> name，路由目的地，目标组件名
> query，传参对象。就是路径参数。


```javascript
<router-link :to="{ name: 'news.detail', query:{id: news.id}}">
```

#### 3）vue.config.js 配置

```javascript
// 就是个 node 代码
module.exports = {
  // 项目的上下文。也可以在 creat New Router 里配置 base 选项
  publicPath:'/wjy', 
  // 本地服务器, express 接口
  configureWebpack:{
    devServer:{
      before(app){
        // 本地访问 localhost:8080/goods 就相当于请求了这个接口
        app.get('/goods', (req, res) => {
          res.json([
            {id:1, text:'2'},
            {id:2, text:'3'}
          ])
        })
      }
    }
  }
}
```

## （三）动态路由（路由传参）

> 配置路由时，可以通过冒号 : 来写一个占位符，就是以后给参数放的。
> 传参的方式:
> 	1 可以直接改写URL传参。地址栏改或 `<router-link to="/page1/bar2">goto</router-link>`
> 	2 还有使用props属性来进行静态、动态、方法的传参。`props:{foo:'bar'}`
> 	3 还有指令的方式:`this.$router.push({name:'page2', params:{id:1, msg:'vuejs'}})`，这里用到命名路由配置name。
> 获取参数的方式:
> 	`params`是路径参数 `xxx/yyy/zzzz`， `query`是查询参数，也就是 `xxx/?a=2`
> 	可以直接在`{{$route.params.msg}}`或`{{$route.query.foo}}`。
> 	或者指令取参数`this.$route.params.msg`或`this.$route.query.foo`


### 1.路由动态参数（必传参）和编程式路由

#### 1）指令式路由 to 和占位符参数

> 形式就是 www.baidu.com/xxx/xxx， 后面的 /xxx 就是必传参，如果不传，那无法找到指定页面
> 使用 `/:xxxx`占位符， 用 `this.$route.params` 拿到响应的路径必传参
> 如果设置了 `props = true`， 那么这个必传参会直接作为该组件 props 中的变量


```javascript
// router.js 路由配置
routes: [
  {
    path:'/page1/:foo', // 通过占位符，Url路径的参数。
    component:Page1,
    // 将占位符全部传给组件作为props。就像是给子组件传值一样。就不用调用router 的api去拿值了
    props: true 
  },
  // 也可以静态传值，但是用处不大
  {
    path: '/static',
    component: Page1,
    props:{foo:'bar'} // 静态传参，由组件的 props接收
  },
]
```

```html
<!-- 路由使用 App.vue， 导航式路由 -->
<router-link to="/page1/bar2">Page1</router-link> 

// 如果使用按钮去跳转，可能会用到 @click.prevent.stop="fn" 取消默认行为
```

```javascript
// Page1.vue 获取路由参数
export default {
  props: {
      foo:{
        type: String,
        default: ''
      }
    },
}
```

#### 2）this.$router.push 编程式路由

> 另外，除了在URL中直接修改，还可以使用按钮之类的写指令逻辑来跳转和传值
> `this.$router.push`就是编程式路由。参数是字符串路径，或地址对象


```javascript
<button @click="gotoPage2()">跳转至Page2</button>
methods: {
  // 指令形式传参。这种形式比较灵活
  gotoPage2() {
    // params中的参数要和占位符名相同。这里的 id 和 msg 都需要在router.js 进行占位符配置，name 也是要配置。
    this.$router.push({name:'page2', params:{id:1, msg:'vuejs'}})
  }
},
```

关于 `router.push()`的用法总结
> 注意 query 是跟 Path， params 跟 name 来使用的

```javascript
// 1 字符串路径
this.$router.push('/page2')
// 2 对象路径
this.$router.push({path:'/page2'})
// 3 带参数的命名路由（必传参） /page2/1/vuejs， 对应配置时 /pages/:id/:msg
// 注意不能和 path 混写，params 会被覆盖
this.$router.push({name:'page2', params:{id:1, msg:'vuejs'}})
// 4 带查询参数 /page2?id=1&msg=vuejs
this.$router.push({path:'/page2', query:{id:1, msg:'vuejs'}})
```

> 也可以通过指令的方式获取


```javascript
created() {
  // 动态路由参数的获取:占位符。可读性强，必传参，指定页面地址。
  console.log(this.$route.params.foo) // bar
},
```

### 2.查询参数传值

> 一次性获取路由参数和查询参数


```javascript
// router.js 
function fn({params, query}) { // 用到 es6 解构
  return {
    id: params.id,
    msg: params.msg,
    foo: query.foo
  }
}
export default new Router({
  routes: [
    {
      path: '/page2/:id/:msg', // :msg 占位符，路径参数
      name: 'page2', // 指令式切换路由用到
      component: Page2,
      props: fn // 直接传函数，一次性将路由和参训参数都传递。目标组件可以通过 props 选项拿到
    }
  ]
})
```

```html
<!-- url动态传参和查询传参方式 -->
<router-link to="/page2/1/vuejs?foo=bar">Page2</router-link>
```

```javascript
// Page2.vue
<!-- 获取路由参数 -->
<p>msg: {{$route.params.msg}}</p>
<p>id: {{$route.params.id}}</p>
<p>foo: {{$route.query.foo}}</p>

<!-- props 属性方式直接用 -->
<p>msg: {{msg}}</p>
<p>id: {{id}}</p>
<p>foo: {{foo}}</p>

export default {
  props: ['id', 'msg', 'foo'],
  created() {
    // 动态路由参数的获取:占位符。可读性强，必传参，指定页面地址。
    console.log(this.$route.params.msg)
    // 查询参数的获取
    console.log(this.$route.query.foo)
  },
}
```

### 3 router.replace() 路由返回

> 替换掉当前的 history 记录

基本用法其实和 `push` 是一样的，只是导航后不会留下 history 记录

```javascript
router.replace({...})
```

可以直接用 `router-link`

```html
<router-link :to="..." replace>
```

push 方法也是可以的

```javascript
//push方法也可以传replace
this.$router.push({path: '/home', replace: true})
```

### 4 router.go(n)

> 参数是整数， 在 history 记录中前进或后退多少步，跟`window.history.go(n)`一样


```javascript
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就会失败
router.go(-100)
router.go(100)
```


## （四）嵌套路由

> 应用场景，如必须先登录 login, 然后才能访问其下面的其他子路由


### 1.创建登录页面（Login）和父级页面（Dashboard）

> 父级路由页面，必须要有路由出口`router-view`给子路由展示的地方


```html
<h3>Dashboard</h3>
<!-- 父级路由必须有一个路由出口，负责显示子路由 -->
<router-view></router-view>
```

### 2.配置路由和更改url路径

> 将之前写的路由，都作为子路由放进父级路由 Dashboard 中。需要注意：
> 	children属性中的子路由 path 需要改成相对于父级的路径。去掉 '/'
> 	之前的其他路径前面都需要加上 /dashboard


```javascript
// router.js 配置路由
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';
import notFound from '@/views/404.vue';

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard/page1'
    },
    {
      path: '/dashboard',
      component: Dashboard,
      // 注意，这里子路由的地址要相对地址
      // 嵌套路由，需要注意，在每层的父组件中需要额外增加 <router-view> 路由视口
      children: [
        {
          path: 'page1/:foo',
          component: Page1,
          props: true // 路由的组件传参
        },
        {
          path: 'static',
          component: Page1,
          props: {
            foo: 'bar'
          }
        },
        {
          path: 'page2/:id/:msg',
          name: 'page2',
          component: Page2,
          props: fn 
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 404 组件
    {
      path:*,
      name:notFound,
      component:notFound
    }
  ]
})
```

```html
<!--注意父级路径的写法-->
<router-link to="/dashboard/static">static</router-link> |
<router-link to="/dashboard/page1/bar2">Page1</router-link> |
<router-link to="/dashboard/page2/1/vuejs?foo=bar">Page2</router-link> |
<!-- 登录页面 -->
<router-link to="/login">login</router-link>
```

### 3 命名视图

```html
<!-- 命名视图。当该组件需要出现多个视口时使用 -->
<router-view></router-view>
<router-view name="wjy"></router-view>
```

在写路由的时候，要注意是复数的 `components` 配置默认或对应视口名字的路由组件

```javascript
const routes = {
  path:'/a',
  name:'pageA',
  components:{
    default: pageA, // 没有命名的路由视口，去渲染 pageA 组件
    wjy: Test // 指定名字的路由视口， 去渲染 Test 组件
  }
}
```

## （五）路由守卫

### 1 全局路由守卫（程序级）

#### 1）全局守卫生命周期

> 全局路由守卫就是，每次路由跳转都会被触发，即任何路由的请求都会被拦截
> 需要改写 router.js ，去配置路由守卫。


```javascript
// 1 全局前置守卫 —— 当进入某个路由之前，用于数据校验过程
router.beforeEach((to, from, next) => {
  // 假设没有登录时，回到登录页面
  next('/login')
})

// 2 跳转中守卫 —— 就是时间上比 beforeEach 晚一点
router.beforeResolve((to, from, next) => {

})

// 3 全局后置守卫 —— 没有 next 因为是路由结束了
router.afterEach((to, from) => {

})
```

#### 2）登录路由守卫

> 判断是否登录，如果登录了就允许访问其他子路由。如果没有登录就去登录页面


```javascript
// 1 将路由配置作为常量
const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard/page1'
    },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        {
          path: 'page1/:foo',
          component: Page1,
          props: true 
        },
        {
          path: 'static',
          component: Page1,
          props: {
            foo: 'bar'
          } 
        },
        {
          path: 'page2/:id/:msg', 
          name: 'page2', 
          component: Page2,
          props: fn 
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

// 2 配置路由守卫 - 判断登录
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.path != '/login') { // 访问其他页面，要求登录
    if (window.isLogin) { // 一般讲状态放在 vuex 中
      next() // 是登录状态，则允许访问
    } else {
      next('./login?redirect='+to.path) // 去登录页
    }
  } else {
    next() // 登录页面允许
  }
})

// 3 导出
export default router;
```

#### 3）登录跳转实现

> login 登录页面假设做了登录处理


```vue
<template>
  <div>
    <button @click="login">login</button>
  </div>
</template>

<script>
  export default {
    methods: {
      login() {
        // 登录成功
        window.isLogin = true
        // 取到回跳路径
        const {redirect} = this.$route.query || '/'
        if (redirect) { // 有回跳地址就去哪
          this.$router.push(redirect)
        } else { // 否则去首页
          this.$router.push('/')
        }
      }
    },
  }
</script>
```

### 2 路由独享守卫（路由级）

> 如果在 Dashboard 这个父级路由中写了，那之前的全局路由守卫只需要写 `next()`就行了。
> 触发的时间在 `beforeEach` 和 `beforeResolve` 之间


```javascript
router: [{
  path: '/dashboard',
  component: Dashboard,
  
  // 路由级别的守卫
  beforeEnter(to, from, next) {
    if (window.isLogin) { // 一般讲状态放在 vuex 中
      next() // 是登录状态，则允许访问
    } else {
      next('./login?redirect='+to.path) // 去登录页
    }
  },
}]
```

### 3 组件级路由守卫

> 还有组件级别的守卫。在这个层级，只能管自己页面的拦截。
> 下面三个生命钩子，是写在组件内部的。


```javascript
// Page1.vue
// 1 组件实例创建之前 —— 所以无法使用 this 去得到该组件实例
beforeRouteEnter (to, from, next) {
  // ...
}
// 2 还有一个组件守卫非常常用, 可以监听参数变化
// 如 /pageA/1 和 /pageA/2 都是访问 pageA 组件，但是参数是有变化的。就在此时触发 
beforeRouteUpdate(to, from, next) {
  // 仅路由参数发生变化时触发， 如 page/vue, page/react
}
// 利用 watch 也可以监听
watch: {
  $route()
}
// 3 导航离开该组件时触发
// 用于禁止用户保存之前的突然离开。用 next(false) 来取消离开行为
beforeRouteLeave(to, from, next) {
  
}
```

#### 1）路由守卫的调用顺序
	调用全局 beforeEach<br />	重用组件中调用 beforeRouteUpdate,（仅参数更改）<br />	路由配置里调用 beforeEnter<br />	激活的组件里调用 beforeRouteEnter<br />	调用全局的 beforeResolve， 导航被确认<br />	调用全局 afterEach 钩子<br />		router.afterEach((to, form) => {}), 注意后面已经没有东西了，所以没有Next<br />	触发 DOM 更新

#### 2）beforeRouterEnter 和 beforeRouterLeave 应用实例
> 监听浏览器返回跳转到指定页面

页面进来时，先保存源头的路由名
```javascript
beforeRouteEnter(to, from, next) {
  next(vm => { vm.backRouterToName = from.name })
},

```

离开该页面时，通过判断跳转到指定页面
> 需要注意，这个方法，每次调用 next('xxx') 会重新触发该钩子，所以在一开始还要判断一些条件让其通过，不然会死循环
> 注意一个 case 里不能写 || && 这样的判断，只能有一个简单值

```javascript
beforeRouteLeave(to, from, next) {
  const patSn = from.query.patSn ? from.query.patSn : 'isHistoryGo'

  if (
    (to.query.patSn && this.backRouterToName !== 'modifyChiefComplaint') ||
    (to.query.patSn && this.backRouterToName !== 'modifyQueryResult') ||
    to.name === 'hosInquiry'
  ) {
    return next()
  }

  switch (this.backRouterToName) {
    case 'modifyChiefComplaint':
      next({ name: 'patientList', query: { patSn }})
      break
    case 'modifyQueryResult':
      next({ name: 'patientList', query: { patSn }})
      break
    case 'patientList' || this.backRouterToName.includes('patDetail'):
      next({ name: this.backRouterToName, query: { patSn }})
      break
    default:
      console.error('返回判断异常>>>', this.backRouterToName)
      next()
      break
  }
},
```

## （六）异步组件

> 路由懒加载函数， vue 配合 webpack 实现。不需要另外引入组件。
> 如果不访问这个路由，就不会发生加载。可以把主页之外的都设置为懒加载。


```javascript
{
  path: '/login',
  component: () => import('./components/Login') // 函数形式导入组件
}
```

