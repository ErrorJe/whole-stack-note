# 项目创建和初始化

这里使用一个集成框架，`vue-element-admin`，记录一些使用上的细节。

也是基于 `vue-cli3` 作为脚手架

> 基于 `vue-cli3`，它本身是基于 `webpack`构建的。主要通过 `vue-config.js` 配置文件跟 webpack（大部分） 和项目其他部分打交道



## 项目初始化和精简

### 启动项目
去官网，按照官网文档，一步步下来运行项目。

- 拿到项目源码
- 安装依赖 npm i
- 启动 npm run dev
- 登录项目页面，开始玩有哪些功能



### 项目简化

主要的简化部分

- 删除 `src/views` 下的源码，但是要保留 `dashboard 首页`，`error-page 异常页面`，`login 登录`，`redirect 重定向`
- 修改 `src/router/index` 的路由配置
- 删除 `src/router/modules` 文件夹
- 删除 `src/vendor` 文件夹
- 删除 `components` 文件夹，或者直接使用简化版本 `vue-admin-template` 进行项目构建。不然就选择比较大而全的 `vue-element-admin` （包括了 token 校验，登录模块，网络请求等功能）自行按需简化



## 项目配置和源码调试方式

### 项目配置 src/setting.js

```javascript
module.exports = {

  title: '系统管理平台', // 页面标题
  
  showSettings: true, // 设置面板

  fixedHeader: true, // 头部是否固定

  sidebarLogo: true, // 左侧菜单栏是否展示图标

  tagsView: true // tag 标签
}
```



### 项目调试 vue.config.js

主要是搜一下 `cheap-source-map` 这个关键词，这个是属于 webpack 范畴，默认的设置我们调试的时候不会看到正常的源码。

如果改成 `source-map` ，那么源码就是正常的。但是每次有源码发生改动，也要相应重新生成一次 source-map 文件，所以也有一定的影响。——适合遇到问题需要调试的时候

开发时推荐使用 `eval` ，构建速度会很快。当然源码也是看不了的。



## 项目结构分析

<a data-fancybox title="" href="https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200113015228.png">![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200113015228.png)</a>
### vue.config.js 基本配置组成

```javascript
// vue.config.js
// 1 全局使用的配置变量
const port = 6366; // 端口号
const title = '项目配置'; // 项目标题

// 2 commonjs 模块化导出(实际是用 nodejs 的写法)
module.exports = {
  // 5 项目服务器启动后的上下文
  // 也就是从首页开始，所有的访问 URL 都是以 localhost:port/base 开始的
  publicPath: 'base',
  // 3 开发服务器 （就是运行 vue 项目的本地服务器）
  devServer: {
    port
  },
  // 4 webpack 打包配置
  configureWebpack: {
    // 4.1 name 就是用于项目打包后模板文件的插入变量
    // 在 public/index.html 的<title>中，就是占位符
    // 使用方式 <title><%= webpackConfig.name %></title>
    name:title,
  }
}
```



### 配置文件拆分查看

`vue.config.js`就是整合了很多原先是单独配置文件的配置，所以一开始看不到你配置到的东西。甚至 vue 底层帮你已经配置好了一些东西，你却不知道。



使用命令行的命令，可以选择性得查看。

```javascript
// 1 查看 webpack 的 loader 配置
vue inspect --rules // 查看有哪些配置项
vue inspect --rules vue // 知道有哪些配置项后，指定某一个配置项查看

// 2 查看 webpack 的插件配置
vue inspect --plugins // 使用方式与上面相似

// 3 输出配置文件
vue inspect > output.js

// 4 配置的 ui 界面。可视化界面操纵终端命令行
vue ui // 会打开一个可视化操作页面
3.1 然后先导入现有的项目进行管理。
3.2 对已有项目进行管理。比如 webpack ,ESLint规则，依赖库之类的配置管理
3.3 在“任务”中可以选择环境后运行输出配置内容，这样可以检查是否配置上了
```


