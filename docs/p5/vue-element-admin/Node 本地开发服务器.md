# Node 开发本地服务器

## 本地 node 服务器

### 后端 API 处理流程（验签）

<a data-fancybox title="" href="https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200110215357.png">![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200110215357.png)</a>



### 搭建 HTTPS 服务

#### 获取 https 证书

搭建首先需要将 https 证书拷贝到 node 项目中，可以创建一个 `https` 目录

如何获取？阿里云里可以买到



#### 服务搭建

然后添加下列代码：

```js
const fs = require('fs')
const https = require('https')

// 密钥
const privateKey = fs.readFileSync('https/book_youbaobao_xyz.key', 'utf8')
// 证书
const certificate = fs.readFileSync('https/book_youbaobao_xyz.pem', 'utf8')

// 创建证书参数对象
const credentials = { key: privateKey, cert: certificate }
// 启动一个 https 服务
const httpsServer = https.createServer(credentials, app)
const SSLPORT = 18082

// 监听服务端口号，和写回调函数
httpsServer.listen(SSLPORT, function() {
  console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT)
})
```



启动 https 服务需要证书对象 credentials，包含了私钥和证书，重新启动 node 服务：

```bash
node app.js
```



在浏览器中输入：

```bash
https://book.youbaobao.xyz:18082
```

有内容出现

说明 https 服务启动成功



### 创建请求 API

基本的后端框架搭建就省略，如果要解析请求，还要安装一个 `body-parser`

> 推荐文章  https://juejin.im/post/59222c5d2f301e006b1616ae 

```js
// app.js 后端主程序
const express = require('express')
const router = require('./router')
const fs = require('fs')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/', router)

// ... 上面 https 启动服务的代码接上
```



写个路由接口

```js
router.post('/login', function(){
  res.json({
    code: 0,
    msg: '登录成功'
  })
})
```



### 跨域问题

> 只要进行转发就行了，因为跨域这个问题只会出现在浏览器身上。
>
> 若请求经过代理服务器，是不会有跨域问题的。
>
> 浏览器 -> 本地 devServer -> 服务器

#### 后端解决

先安装 `cnpm i -S cors`

> 对，这么简单就解决了。

```js
// app.js
const cors = require('cors')

app.use(cors())
```

在浏览器能看到其实为了解决跨域，请求了两次，第一次是 `options` 请求，为了确认判断服务器是否允许跨域请求。

>  https://juejin.im/post/5cb3eedcf265da038f7734c4 



#### 前端解决

```js
  // vue.config.js
  module.exports = {
    devServer: {
      port,
      proxy: {
        // 动态计算属性，这里就是 /dev-api
        // 代理 /dev-api/xxxx 到本地 http://127.0.0.1:3000/user/login 去转发
        [process.env.VUE_APP_BASE_API]: {
          target: `http://127.0.0.1:3000/`,
          changeOrigin: true, // 要不要变更origin请求头
          pathRewrite: { // 地址重写：http://127.0.0.1:3000/user/login
            ["^" + process.env.VUE_APP_BASE_API]: ""
          }
        }
      },
      // 可以定义不止一个接口
    }
  }
```



### 响应结果封装

#### Result 类

封装后处理响应结果返回

```js
// models/Result.js
const {
  CODE_ERROR,
  CODE_SUCCESS
} = require('../utils/constant')

class Result {
  constructor(data, msg = '操作成功', options) {
    this.data = null
    if (arguments.length === 0) {
      this.msg = '操作成功'
    } else if (arguments.length === 1) {
      this.msg = data
    } else {
      this.data = data
      this.msg = msg
      if (options) {
        this.options = options
      }
    }
  }

  createResult() {
    if (!this.code) {
      this.code = CODE_SUCCESS
    }
    let base = {
      code: this.code,
      msg: this.msg
    }
    if (this.data) {
      base.data = this.data
    }
    if (this.options) {
      base = { ...base, ...this.options }
    }
    console.log(base)
    return base
  }

  json(res) {
    res.json(this.createResult())
  }

  success(res) {
    this.code = CODE_SUCCESS
    this.json(res)
  }

  fail(res) {
    this.code = CODE_ERROR
    this.json(res)
  }
}

module.exports = Result
```



使用方式

```js
// 调用成功时
new Result().success(res)
new Result('登录成功').success(res)
// 调用成功时，包含参数
new Result({ token }, '登录成功').success(res)
// 调用失败时
new Result('用户名或密码不存在').fail(res)
```



#### constant 常量

```js
// utils/constant.js
module.exports = {
  CODE_ERROR: -1,
  CODE_SUCCESS: 0
}
```



#### 优化接口

```js
cosnt Result = require('../models/Result')

router.post('/login', function(req, res) {
  const {username, password} = req.body
  if (username === 'admin' && password === 'admin') {
    new Result('登录成功').success(res)
  } else {
    new Result('登录失败').fail(res)
  }
})
```



## MySQL 查询开发

安装 `npm i -S mysql` 

### 配置

 创建 db 目录，新建两个文件 

- index.js
- config.js

```js
// config.js
module.exports = {
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'book'
}
```



### 连接

连接数据库需要提供使用 mysql 库的 `createConnection` 方法，我们在 index.js 中创建如下方法 

>  multipleStatements：允许每条 mysql 语句有多条查询.使用它时要非常注意，因为它很容易引起 sql 注入（默认：false） 

```js
const mysql = require('mysql')
const config = require('./config')

function connect() {
  return mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    multipleStatements: true
  })
}
```



### 查询

 查询需要调用 connection 对象的 query 方法 

```js
// index.js
function querySql(sql) {
  const conn = connect()
  debug && console.log(sql)
  return new Promise((resolve, reject) => {
    try {
      conn.query(sql, (err, results) => {
        if (err) {
          debug && console.log('查询失败，原因:' + JSON.stringify(err))
          reject(err)
        } else {
          debug && console.log('查询成功', JSON.stringify(results))
          resolve(results)
        }
      })
    } catch (e) {
      reject(e)
    } finally {
      // 释放连接
      conn.end()
    }
  })
}
```



在 `constant.js` 创建一个 debug 参数控制日志打印 

>  这里需要注意 conn 对象使用完毕后需要调用 end 进行关闭，否则会导致内存泄露 

```js
const debug = require('../utils/constant').debug
```



调用

```js
db.querySql('select * from book').then(result => {
  console.log(result)
})
```



### 改造登录逻辑

```js
const {login} = require('../services/user')

router.post('/login', function(req, res) {
  const {username, password} = req.body
  login(username, password).then(user => {
    if (username === 'admin' && password === 'admin') {
      new Result('登录成功').success(res)
    } else {
      new Result('登录失败').fail(res)
    }
  })
})
```



### 加密

使用 `md5+盐`

- 在常量文件 `constant.js` 中加入密钥

```js
module.exports = {
  // ...
  PWD_SALT: 'admin_node'
}
```

- MD5 加密方法：`npm i -S crypto`

```js
// /utils/index.js
const  crypto = require('crypto')

function md5(s) {
  // 注意参数需要 string 类型，否则出错
  return crypto.createHash('md5').update(String(s)).digesr('hex')
}

module.exports = {
  md5
}
```

- 改造登录接口

```js
const {login} = require('../services/user')
const {md5} = require('../utils')
const {PWD_SALT} = require('../utils/constant')

router.post('/login', function(req, res) {
  const {username, password} = req.body
  // 加盐加密
  password = md5(`${password}${PWD_SALT}`)
  login(username, password).then(user => {
    if (username === 'admin' && password === 'admin') {
      new Result('登录成功').success(res)
    } else {
      new Result('登录失败').fail(res)
    }
  })
})
```



## express-validator 表单校验

对前端传来的表单数据进行校验 `npm i -S express-validator`

>  express-validator 是一个功能强大的表单验证器，它是 validator.js 的中间件 

 

使用 express-validator 可以简化 POST 请求的参数验证 

```js
const { body, validationResult } = require('express-validator')
const boom = require('boom')

router.post(
  '/login',
  // 第二个参数用 Body 方法，字符串类型校验
  [
    body('username').isString().withMessage('username类型不正确'),
    body('password').isString().withMessage('password类型不正确')
  ],
  function(req, res, next) {
    const err = validationResult(req)
    if (!err.isEmpty()) { // 可以判断 err.errors 是否为空
      const [{ msg }] = err.errors
      next(boom.badRequest(msg))
    } else {
      const username = req.body.username
      const password = md5(`${req.body.password}${PWD_SALT}`)

      login(username, password).then(user => {
        if (!user || user.length === 0) {
          new Result('登录失败').fail(res)
        } else {
          new Result('登录成功').success(res)
        }
      })
    }
  })
```



express-validator 使用技巧：

- 在 `router.post` 方法中使用 body 方法判断参数类型，并指定出错时的提示信息
- 使用 `const err = validationResult(req)` 获取错误信息，`err.errors` 是一个数组，包含所有错误信息，如果 `err.errors` 为空则表示校验成功，没有参数错误
- 如果发现错误我们可以使用 `next(boom.badRequest(msg))` 抛出异常，交给我们自定义的异常处理方法进行处理



## JWT 功能开发

`npm i -S jsonwebtoken`

### JWT 的生成

- 配置文件

 需要定义 jwt 的私钥和过期时间，过期时间不宜过短，也不宜过长，课程里设置为 1 小时，实际业务中可根据场景来判断，通常建议不超过 24 小时，保密性要求高的业务可以设置为 1-2 小时 

```js
module.exports = {
  // ...
  PRIVATE_KEY: 'admin_imooc_node_test_youbaobao_xyz',
  JWT_EXPIRED: 60 * 60, // token失效时间
}
```



- 使用

```js
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant')

login(username, password).then(user => {
    if (!user || user.length === 0) {
      new Result('登录失败').fail(res)
    } else {
      const token = jwt.sign(
        { username },
        PRIVATE_KEY,
        { expiresIn: JWT_EXPIRED }
      )
      new Result({ token }, '登录成功').success(res)
    }
})
```



### 改造登录接口

```js
// src/utils/request.js
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code !== 0) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // 判断 token 失效的场景
      if (res.code === -2) {
        // 如果 token 失效，则弹出确认对话框，用户点击后，清空 token 并返回登录页面
        MessageBox.confirm('Token 失效，请重新登录', '确认退出登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || '请求失败'))
    } else {
      return res
    }
  },
  error => {
    let message = error.message || '请求失败'
    if (error.response && error.response.data) {
      const { data } = error.response
      message = data.msg
    }
    Message({
      message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
```



### JWT 认证

`npm i -S express-jwt`

```js
// /router/jwt.js
const expressJwt = require('express-jwt');
const { PRIVATE_KEY } = require('../utils/constant');

const jwtAuth = expressJwt({
  secret: PRIVATE_KEY,
  credentialsRequired: true // 设置为false就不进行校验了，游客也可以访问
}).unless({
  path: [
    '/',
    '/user/login'
  ], // 设置 jwt 认证白名单
});

module.exports = jwtAuth;
```

- 使用中间件

```js
// 在 /router/index.js
const jwtAuth = require('./jwt')

// 注册路由
const router = express.Router()

// 对所有路由进行 jwt 认证
router.use(jwtAuth)
```

- 添加配置

```js
// /utils/contants.js
module.exports = {
  // ...
  CODE_TOKEN_EXPIRED: -2
}
```

- 修改 Result 类

```js
expired(res) {
  this.code = CODE_TOKEN_EXPIRED
  this.json(res)
}
```

- 修改自定义异常

```js
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    new Result(null, 'token失效', {
      error: err.status,
      errorMsg: err.name
    }).expired(res.status(err.status))
  } else {
    const msg = (err && err.message) || '系统错误'
    const statusCode = (err.output && err.output.statusCode) || 500;
    const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message
    new Result(null, msg, {
      error: statusCode,
      errorMsg
    }).fail(res.status(statusCode))
  }
})
```



### 前端传 JWT Token

后端添加路由的 jwt 认证后，再次请求 `/user/info` 将抛出 401 错误，这是由于前端未传递合理的 Token 导致，下面我们就修改 `/utils/request.js`，使得前端请求时可以传递 Token 

```js
service.interceptors.request.use(
  config => {
    // 如果存在 token 则附带在 http header 中
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
```



 前端去掉 `/user/info` 请求时传入的 token，因为我们已经从 token 中传入，修改 `src/api/user.js` 

```js
export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}
```



### 解析 JWT Token

登录接口用账号密码，但是其他接口可能就只有 token，所以要从 token 中解析出账号

```js
// 在 /utils/index.js 中添加 decode 方法
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('./constant')

function decode(req) {
  const authorization = req.get('Authorization')
  let token = ''
  if (authorization.indexOf('Bearer') >= 0) {
    token = authorization.replace('Bearer ', '')
  } else {
    token = authorization
  }
  return jwt.verify(token, PRIVATE_KEY)
}
```

-  修改 `/router/user.js` 

```js
router.get('/info', function(req, res) {
  const decoded = decode(req)
  if (decoded && decoded.username) {
    findUser(decoded.username).then(user => {
      if (user) {
        user.roles = [user.role]
        new Result(user, '获取用户信息成功').success(res)
      } else {
        new Result('获取用户信息失败').fail(res)
      }
    })
  } else {
    new Result('用户信息解析失败').fail(res)
  }
})
```

