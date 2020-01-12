# Mock 服务

## webpack 基础准备

### webpack 基础

都是基于`webpack-dev-serve`实现，所以是一个真正的 server。

当启动这本地服务器后，`mock-server` 也会跟着启动。

其实也是一个真实的服务，所以在浏览器的 `network` 里是能看到的



### mock 热更新原理

借助 `chokidar` 监听 mock 文件的改变，一旦发生变化，就重新挂载原来的 mock 接口来实现热更新。



### 配置文件 vue.config.js 的 proxy

```javascript
export default {
  port:8025,
  // 基于 vue-cli3 的 webpack-dev-serve 配置
  devServer: { 
    port: port, // 端口号
    open: false, // 配置自动启动浏览器(有BUG会启动2次)
    overlay: { // 是否提示警告和错误信息
      warnings: false,
      errors: true
    },
    // 可以定义多个服务器地址
    proxy: {
      // 拦截路由，从环境变量中拿访问地址转发
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        // 路径替换
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    after: require('./mock/mock-server.js')
  }
}
```



## Mock 的使用

### 定义 api 接口

我们会把接口都定义到 `src/api/xxx.js` 里

```javascript
// @/api/article
// 通过调用 request(封装了axios拦截器) 来定义接口
export function fetchComments(id) {
  return request({
    url: `/article/${id}/comments`,
    method: 'get'
  })
}
```



### 定义 mock 拦截

mock 接口是基于路由来拦截接口 URL 的，所以其实可以写个正则匹配到多个接口 URL。

放在项目根目录下的 `mock` 目录下，如 `mock/xxx.js`

```javascript
// 定义下面接口可能会用到的数据
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

// 导出接口
export default [
  // 某个 mock 接口
  {
    // 1 url 必须能匹配你的接口路由
    url: '/article/[A-Za-z0-9]/comments',
    // 2 必须和你接口定义的类型一样
    type: 'get', 
    // 3 返回的结果
    response: (req, res) => {
      return {
        code: 20000,
        data: {
          status: 'success'
        }
      }
    }
  }
]
```

有时候有多个业务模块，定义了很多个 mock 文件，需要有一个出入口统一暴露接口。可以在 `mock` 目录下新建一个 `index.js`

```javascript
// 引入 user.js 模块
import user from './user' 
const mocks = [
  ...user
]

// 其他封装的代码
// 也就是纯前端 mock.js 数据
```



### 屏蔽 mock

当我们要对接真实接口时，因为 mock 对其进行了拦截，所以是拿不到真实接口数据的。

我们要做的时，把与 API 同名的 mock 接口给注释或者直接删除就行了



## 组件中调用 mock 接口

```javascript
import {errorje} from '@/api/fetch.js'

export default {
  created() {
    errorje().then(res => {
      console.log('请求结果>>>', res)
    }).catch(err => {
      console.log('请求错误>>>',err)
    })
  },
}
```



## 移除 mock

### 开发环境的 mock-server

只需要在 `vue.config.js` 中去掉 `proxy` 中的 `after` 的中间件就行（重启项目后生效）

```javascript
proxy: {
  [process.env.VUE_APP_BASE_API]: {
    // 请求本地的 mock 服务器地址
    // 可以换成自己的 mock 服务器地址
    target: `http://localhost:${port}/mock`,
    changeOrigin: true,
    pathRewrite: {
      ['^' + process.env.VUE_APP_BASE_API]: ''
    }
  }
},
// 去掉这个中间件
after: require('./mock/mock-server.js')
```



### 生产环境的 mock.js

```javascript
// main.js
// 生产环境下用 mock.js 模拟数据。
// 可以注释掉不用
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}
```
