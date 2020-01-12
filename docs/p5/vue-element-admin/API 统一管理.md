# API 统一管理

数据交互流程：API service - request - local mock / easy-mock / server api



## axios 基础知识

### get 请求

```js
axios.get(url, {
  params: {key: value}, // get 方法时的 URL 参数
  headers: {token: 'jwt'} // 携带 token
}).then(res => {
  // 处理数据
  console.log(res)
}).catch(err => {
  // 处理异常
  console.log(err)
})
```



这样子简单的使用在实际项目中是有问题的

- 没有统一的异常处理
- token 携带每次要手动加上



对于大型项目肯定要做一些统一的封装处理

- 对请求头、响应进行统一预处理（request）

- 请求不同数据源时 url 变化，需要能根据环境自动修改 url

- 可能出现的跨域问题



### axios.create 实例化

`create` 生成的不是一个个 axios 请求实例，而是一个函数。可以通过传入配置的方式生成一些默认的参数

```js
cosnt request = axios.create({
  baseURL: url,
  timeout:5000
})

// 发起请求，也可以实现请求目的
request({
  url,
  methods:'get',
  params:{key:value}
}).then(_=>{}).catch(_=>{})
```



### axios 请求拦截器

白名单校验和请求拦截

> 像登录这种页面，是用来获取 `token` 的，而不是传 token 的，所以要设置一个白名单

```js
const whiteUrl = ['/login']

// 请求拦截器
request.interceptors.request.use(
	config => { // 拦截器
		// config 就是 axios 实例对象
    // 处理白名单
		const url = config.url.replace(config.baseURL, '')
		if (whiteUrl.some(wl => url === wl)) {
			return config
		}
		config.headers['token'] = 'abcd'
		
		return config
	},
	err => { // 异常处理
    // 抛出 promise.reject 可以在 axios.catch 中处理异常
   	Promise.reject(err)
	}
)
```



### axios 响应拦截器

```js
request.interceptors.response.use(
	response => {
    // 一般需要处理不同的响应码
    if (response.data && response.data.error_code === 0) {
      return response.data.data
    } else {
      Promise.reject(response.data.msg)
    }
  },
  err => {
    Promise.reject(err)
  }
)
```



## request.js 源码解析

基于 axios 封装，统一管理请求方式、参数、报文和错误处理。

- 请求 / 响应 拦截器
- 错误的统一处理
- 超时的统一处理
- baseUrl 设置

```js
// @/src/utils/request.js
import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
import qs from 'qs' // 可能会引入这个库，也可能在 API 管理中去引入

// 1. 创建axios 的单例实例
const service = axios.create({
  // url基础地址，解决不同数据源url变化问题
  // 也就是在环境变量文件中写的 /dev-api 前缀作为基地址
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // 跨域时若要发送cookies需设置该选项
  timeout: 5000 // 超时
});

// 2. 请求拦截
service.interceptors.request.use(
  config => {
    // do something
    // 把令牌添加到了请求头中，让服务器可以拿到请求头中的令牌信息去做校验
    if (store.getters.token) {
      // 设置令牌请求头
      config.headers["X-Token"] = getToken();
      // 一般字段都是设置成 Authorization
      // config.headers.Authorization = token
    }
    return config;
  },
  error => {
    // 请求错误预处理
    return Promise.reject(error);
  }
);

// 3. 响应拦截
service.interceptors.response.use(
  // 通过自定义code判定响应状态，也可以通过HTTP状态码判定
  response => {
    // 仅返回数据部分
    const res = response.data;

    // 与后端协商 code 的意义。比如以下几个
    // code不为1则判定为一个错误
    if (res.code !== 1) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000
      });

      // 假设：10008-非法令牌; 10012-其他客户端已登录; 10014-令牌过期;
      if (res.code === 10008 || res.code === 10012 || res.code === 10014) {
        // 重新登录
        MessageBox.confirm(
          "登录状态异常，请重新登录",
          "确认登录信息",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      // 允许处理错误
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

// 4 最后返回的就是这个单例 axios 实例
export default service;
```



### 后端配合处理

配合后端需要处理

- `Access-Control-Allow-Origin` 不能为 `*`，必须指定包含 origin 域名的值
- `Access-Control-Allow-Credentials` 必须为 `true`



### 源码的几点补充

对于一些点的封装可能有不同的实现方式，不同的场景和需求都不一样



1. 环境变量的转换用 `switch` 实现
2. 超时，编码等基本配置信息，可以在各个 API 模块中单独配置
3. 状态码统一判断
4. 响应拦截器中的错误处理



```js
// 1 环境变量来环境区分
// 基于 webpack
// node 环境变量默认提供了开发/生产两个环境，实际项目可能还有 test 环境
switch(process.env.NODE_ENV) {
  case 'production':
    axios.defaults.baseURL = 'http://api.xxx.cn' // 基地址
    break;
  case 'test':
    axios.defaults.baseURL = 'http://192.168.225.88:8080' // 测试服务器
    break;
  default:
    axios.defaults.baseURL = 'http://127.0.0.1:3000' // 本地
}


// 2 超时时间 和 跨域时是否允许携带资源凭证
axios.defaults.timeout = 10000 // 10秒
axios.defaults.withCredentials = true // 跨域携带。如登录校验，走 session 和 cookie

// 3 设置 POST 请求头，告知服务器请求主体和格式
// data 是请求体，一般是对象形式。默认是转为 JSON 对象传给服务器 axios.post(url, data)
// 项目中更多的请求参数可能是 xxx=xxx&xxx=xxx ，这个编码格式叫 x-www-form-urlencoded
axios.default.headers['Content-Type'] = 'application/x-www-form-urlencoded' // 声明编码
// 转换格式
axios.default.transformRequest = data => {
  // 函数，data 是请求主体中的参数
  // 将默认的对象形式改为表单编码格式
  // 要看服务器要求客户端什么格式
  qs.stringify(data)
} 


// 3 在响应拦截器之前的状态码验证
axios.defaults.validateStatus = status => {
  // 自定义响应成功的 HTTP 响应码
  // 假设 2 或 3 开头的状态码代表请求成功
  // 一般公司不配置这个，因为 3 出现在管理资源文件。接口很少有 3
  return /^(2|3)\d{2}$/.test(status)
}

// 4 响应拦截器的错误处理包括：服务器错误，网络错误
axios.interceptors.response.use(response => {
  // 返回响应主体。后面使用 axios.get.then(res=>{}) 就只能拿到这个响应主体
  return response.data 
}, error => {
  let {response} = error
  if (response) {
        // 服务器最起码返回结果了
    // 每个公司对于状态码定义不同
    switch(response.status) {
      case 401: // 当前请求需要验证（未登录）
        // 1 跳转路由 2 遮罩提示
        break;
      case 403: // 服务器理解请求，但拒绝执行（token / session 过期）
        localStorage.removeItem('token')
        // 跳转登录页
        break;
      case 404: // 找不到地址
        // 提示
        break;
    }
  } else {
    // 服务器结果都没有返回: 1 服务器挂了 2 没有网
    if (!window.navigator.onLine) {
      // 断网处理: 有很多种处理方式(可能跳转到断网页面)
      return;
    }
    // 服务器错误
    return Promise.reject(error)
  }
})
```





## 环境变量

### 环境变量设置基地址

```
// 在项目根目录下创建文件 .env.development
// 前缀必须是 VUE_APP 开头，这是 vue-cli 要求的
// 这里的变量只会在开发模式下被使用
VUE_APP_BASE_API = '/dev-api' #注入本地 api 的根路径
```



那么项目是如何识别的呢？也就是使我们在启动、打包服务器时执行的命令不同

- serve 和 build 一样，后面默认省略了一个启动模式

```js
"scripts":{
  "serve":"vue-cli-service serve",
  "build":'vue-cli-service build --mode production'
}
```



也可能是写成这样的

```js
"scripts":{
  'serve':'vue-cli-service serve',
  'serve:text':'set NODE_ENV=test&&vue-cli-service serve',
  'production:text':'set NODE_ENV=production&&vue-cli-service serve',
  'build':'vue-cli-service build',
  'lint':'vue-cli-service lint'
}
```



## 请求接口统一管理

### 模块化接口

```js
// @/api/user.js
// 只需要引入封装后的 request.js 
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 这里已经将 token 放在请求头中，所以这里就不用再传了
export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

// ES6 写法
export const get Test = () => request({url:'/test'})
```



最后这个接口可以到需要用到的地方引入，如 store.js 中

```js
import {login} from '@/api/user'
```



### 统一接口的入口

像上面这种，如果有多个模块，就需要引入多个 API 模块

```js
import {login} from '@/api/user'
import {getXXX} from '@/api/person'
```



所以要对这些模块进行最后的统一管理，让他们只有一个唯一的出口。



在 `api` 目录下创建 `index.js`

```js
// @/api/index.js
// 可以这样引入的原因，要去了解下 export 和 export default 的区别
// 这里其实就是引入了 ./user 下的 export default
// ./user 下那些被 export 的变量，最后都挂在 export default 上
import user from './user'

export default {
  user,
  // 可能还有其他模块的引入
}
```



最后在根组件中挂载到 vue 原型上

```js
import api from '@/api'

Vue.prototype.$api = api // 挂载到 vue 原型上
```



最后使用

```js
this.$api.user.login()
```



### 关闭 Mock 接口

默认的项目中，使用的是 mock 接口。现在要切换到真实项目，所以要关闭它

- 去掉 Main.js 中相关代码

```js
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}
```

- 删除 `src/api` 目录下不需要的 api 文件

```js
article.js
qiniu.js
```

-  删除 `vue.config.js` 中的相关配置 

```js
proxy: {
  // change xxx-api/login => mock/login
  // detail: https://cli.vuejs.org/config/#devserver-proxy
  [process.env.VUE_APP_BASE_API]: {
    target: `http://127.0.0.1:${port}/mock`,
    changeOrigin: true,
    pathRewrite: {
      ['^' + process.env.VUE_APP_BASE_API]: ''
    }
  }
},
after: require('./mock/mock-server.js')
```

- 修改环境变量中的基地址：有域名的话可以直接写

```js
VUE_APP_BASE_API = 'https://book.xxxx.com:1845' // localhost 也可以
```

-  SwitchHosts   配置 host 映射，让域名映射到本地 node 项目 （如是自己开发后端的话）

```js
127.0.0.1	book.xxxx.com
```

## 数据 Mock 接口

> 模拟数据的两种常见方式，本地 mock 和线上 easy-mock

### 本地mock

> 修改 `vue.config.js`， 给 `devServer`添加 `before` 选项

```js
// 1 安装 bodyparse
// bodyPaser用来解析post请求中的json数据(转为 js 对象)
const bodyParser = require('body-parser')

// 2 这是基于 exporess 的 node 服务器代码
before: app => {
  // 3 解析 json
  app.use(bodyParser.json());
  // app.use(
  //   bodyParser.urlencoded({
  //     extended: true
  //   })
  // );
  // 4 登录接口声明
  // 这里加了 /dev-api 也就是之前封装配置的基地址
  app.post("/dev-api/user/login", (req, res) => {
    const { username } = req.body;

    if (username === "admin" || username === "jerry") {
      res.json({
        code: 1,
        data: username
      });
    } else {
      res.json({
        code: 10204,
        message: "用户名或密码错误"
      });
    }
  });

  // 5 从请求头中获取令牌
  // token 是后端负责生成，前端只是负责转发
  app.get("/dev-api/user/info", (req, res) => {
    // token 的三个部分
    // adfasdfkadf; ja;kdfj;akdfjakdsfj;akjdf; akjdf;kalsjf;ajf
    // 令牌头         令牌体                     哈希（校验用）
    // 加密算法       用户信息；有效期             后端生成的一个特定字符串
    const roles = req.headers['x-token'] === "admin" ? ["admin"] : ["editor"];
    res.json({
      code: 1,
      data: roles
    });
  });
}
```



### easy-mock

> 是更标准的方式，这个东西还能部署到本地。（已经解决了跨域共享，所以不会有问题）
>
> 还可以根据后端 swagger 直接同步生成 mock 接口

- 登录 easy-mock 平台
- 创建一个项目，再创建接口
- 调用：修改 base_url， .env.development

```js
VUE_APP_BASE_API = 'https://easy-mock/mock/xxxxxx/getxxx'
```



