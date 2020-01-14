# Vue-press 博客搭建指南

> 使用: vuepress + github Page

## 博客搭建过程

### hello world 运行

准备一个新的文件目录，初始化 npm 项目后安装 `vue press`

- npm init -y
- npm i -D vuepress

然后在 `package.json` 中配置项目启动指令

```js
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

然后执行 `npm run docs:dev` 启动博客

### 创建必要的目录结构

```js
-- 创建 docs 目录，以后这个就是博客主目录
---- 创建.vuepress
------ 创建 config.js 配置文件
------ public 目录，放一些资源
---- 创建 READEME.md
```

给 `config.js` 配置文件写入基本配置

```js
module.exports = {
  base: "/blog-demo/",
  title: "blog-demo",
  description: "Vuepress blog demo"
};
```

## 默认主题配置

> vuepress 提供了一个默认的主题
> 主题包括了一些模块，如 `首页、导航栏、侧边栏、搜索框` 和其他周边模块

- 关于路径问题，博客中配置相关的路径默认根目录都是 `docs`
- 修改配置文件 `config.js` 后都需要重启项目

### 首页布局

对于首页布局的配置，是在 `README.md` 中进行的。用 `YAML front matter` 格式书写配置内容（查了一下是定义类似变量的内容块）

> 图片之类的路径都是 / ，代表 `.vuepress/public` 目录

```js
---
home: true
heroImage: /homePage.jpg
heroText: ErrorJE 前端研究所
tagline: 主攻前端
actionText: 第一页看起 →
actionLink: /blog/FirstBlog.md
features:
- title: 前端一把梭
  details: JS, TS, NodeJS, Vue, React, Webpack, WebApp
- title: 略懂后端
  details: JAVA, Spring Boot, Nginx, Linux
- title: 内功修炼
  details: 性能, 算法, 偏领域技术, 学识
footer: MIT Licensed | Copyright © 2020-present Error JE
---
```

当然还可以在下面继续用 Markdown 写其他内容

### 导航栏

也就是顶部的那些导航菜单。配置文件是 `.vuepress/config.js`

```js
module.exports = {
  base: "/blog/", // 站点的基础路径
  title: "FE 研究所", // 网站的标题
  description: "ErrorJE 直辖 Blog", // 网站的描述

  // 主题配置
  themeConfig: {
    // 自定义仓库链接文字。
    repoLabel: "GitHub",
    // 你的GitHub仓库，请正确填写
    repo: "https://github.com/ErrorJe",
    // 侧边栏深度到 h3
    sidebarDepth: 2,
    // 全部展开
    displayAllHeaders: true,
    // 基于 git 的更新时间
    lastUpdated: "上次更新时间",
    smoothScroll: true, // 滚动效果
    nav: [
      // 1 单个页面
      { text: "首页", link: "/" },
      { text: "FirstBlog", link: "/blog/FirstBlog" },
      // 2 嵌套页面，会自动分组
      {
        text: "博客",
        items: [
          {
            text: "生活",
            link: "/blog/live/"
          },
          {
            text: "经济学",
            link: "/blog/econ/"
          }
        ]
      },
      {
        text: "JavaScript",
        items: [
          { text: "DOM", link: "/javascript/DOM" },
          {
            text: "面向对象",
            items: [{ text: "原型链", link: "/javascript/OOP/" }]
          }
        ]
      }
    ]
  }
};
```

在编写导航栏配置的时候，注意路径必须 `/` 开始，若没有指定到具体的 `md` 文件，且配置 `/xx/` 这种形式，则会自动读取该目录下的 `README.md` 文件。

### 侧边栏

说白了，就是侧边配置目录，`名字对应地址`

还会把文档中 H2 级别的标题显示出来

```js
module.exports = {
  themeConfig: {
    // 数组形式
    sidebar: [
      ["/", "首页"],
      ["/blog/FirstBlog.md", "我的第一篇博客"]
    ],
    // 对象形式配置嵌套分组
    sidebar: {
      "/blog/": [
        "FirstBlog",
        {
          title: "生活",
          collapsable: false, // 取消下拉
          children: ["live/", "live/note"] // 路径是跟在上面的主路径后面的
        },
        {
          title: "经济",
          children: ["econ/"]
        }
      ],
      "/javascript/": []
    }
  }
};
```

## 博客部署

### 编写 sh 脚本完成部署

我们这需要用到 `github pages` ，但是每次写完文档都需要手动上传的话，就非常麻烦了。所以我们编写 `deploy.sh` 这种 `shell` 脚本来完成一些固定操作。

> 需要注意的是 shell 脚本在 windows 上并不是那么容易被运行的。所以有后面对这部分有关的知识都进行了展开

#### 1）编写 deploy.sh

```sh
#!/usr/bin/env sh

# 上面这句话就是让 git bash 知道这是一个可执行文件

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# 这里原本是用 ssh 方式的 git@github 这种。但是我的仓库是 https 方式，所以改成以下方式
git push -f https://github.com/ErrorJe/whole-stack-note.git master:gh-pages

cd -

```

#### 2）配置 package.json

就是一个 npm 指令

- docs:build 用于生成 `dist` 打包后的静态资源
- deploy：使用的时候 `npm run deploy` 就是用来部署的

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs",
    "deploy": "bash deploy.sh"
  }
}
```

#### 3）创建仓库

可以在 github 上直接创建一个仓库，然后通过桌面版的 github 工具把这个空仓库 clone 下来，然后把博客项目复制进去。然后再 push 到 github 远程库。这样子主项目就占有了 `master` 主分支。

后面打包出来的 `dist` 目录会作为分支，也是我们最后访问的静态资源内容。

#### 4）选择 github pages 部署方式

pages 的展现方式有两种

- user.github.io 直接访问首页，但是这个链接一个 github 用户也只能有一个，且仓库名也必须是这个
  所以还有一种就是为了让每个仓库都可以拥有访问页面 URL 能力的方式，就是加一个上下文
- user.github.io/context 这种方式的访问，需要让仓库具有分支，这样比较清晰

选择第二种方式，还需要注意 `vuepress` 在 `config.js` 中对于 `base` 的配置。

> 这都是约定的

```js
module.exports = {
  base: "/whole-stack-note/" // 其实就是仓库的名字 whole-stack-note
};
```

如果上面都弄完了，正常情况下执行 `npm run deploy` 就可以了。但是会因为 window 和网上教程的不一致导致很多问题。可以参考下面的描述和解决方式

### git bash 环境变量的问题

光是安装了 `git` 还不行，还需要对安装目录下的 `/bin` 进行环境变量的配置。
在 windows 下找到环境变量，然后看用户变量中的 `path` , 把 `/bin` 目录配置进去。
然后就可以在 `cmd` 中输入 bash（有 bash, sh 等，这是安装 Git 自带的程序）就会执行 Git bash

### SSH 和 HTTPS 的问题

官方文档里，`deploy.sh` 中对于仓库的链接主要是 `SSH` 方式。
但是根据仓库的特性，有些是 `HTTPS` 方式的，所以配置的时候注意一下方式

> 前者（HTTPS）可以随意克隆 github 上的项目，而不管是谁的；而后者则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key ，否则无法克隆。
> https url 在 push 的时候是需要验证用户名和密码的；而 SSH 在 push 的时候，是不需要输入用户名的，如果配置 SSH key 的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。
> 可见 SSH 拥有更安全的属性，且不用每次 push 都输入密码

```js
// deploy.sh
// ...
git push -f git@github.com:<USERNAME>/<REPO>.github.io.git master
git push -f https://github.com/<USERNAME>/<REPO>.git master:gh-pages
```

### nodejs 升级/降级带来的问题

https://github.com/nodejs/node/issues/29287
简单来说，上面都弄好了，还执行不了，还报了这个链接里的错误。就是 nodejs 之前升级过了，遗留八竿子打不到的 bug 问题。

> nodejs 升级后，除了常用的几个如 npm i ，其他比较偏的指令都报错
> 最后就是把 C 盘用户下的 `npm`， `npm-cache` 都删除就好了。至于影不影响其他项目，到时候缺什么安装什么吧，反正有资格安装到全局的也没有多少包。

可能需要安装 `cnpm`， `yarn` 之类的

### 关于 git 分支新建的问题

如何指定某个文件目录新建新的分支

### 关于 GitHub Pages

这个东西原本 `github` 就是用来让开源库的作者能够更加丰富得介绍自己的项目，而不是仅仅局限于之前的 `README.md` 介绍文档。

当然，后面没有服务器的支持，只能够部署一些静态页面。这也够了，我们把项目打包后输出的就是静态资源 `dist` 。

## 自动化部署 CI

### 什么是 Travis CI

官网：https://travis-ci.com/ 直接使用 `github` 账号进行关联登录
参考链接阮一峰：http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html

之前，我们通过执行或者 `npm run deploy` 来部署

### 配置文件 .travis.yml

这个配置文件需要创建在项目根目录下，当存在这个文件时，`travis` 才会理你这个项目。
注意这里的 `$token` 对应的是在 travis 中配置的环境变量 `token`

```yml
language: node_js
node_js:
  - lts/*
install:
  - yarn install # npm ci
script:
  - yarn docs:build # npm run docs:build
deploy:
  provider: pages
  skip_cleanup: true
  local_dir: docs/.vuepress/dist
  github_token: $token # 在 GitHub 中生成，用于允许 Travis 向你的仓库推送代码。在 Travis 的项目设置页面进行配置，设置为 secure variable
  keep_history: true
  on:
    branch: master
```

有这个文件还不行，还要在本地执行 `yarn` 或 `npm install` 并且提交生成的 `lock` 文件（即 `yarn.lock` 或 `package-lock.json`），把生成的文件提交到 github 远程库

### tarvis 如何关联 github 仓库

#### 1）github 操作：生成 tokne

就是要生成一个 `github token`，其他没有什么。
从 github 的个人头像上进入 `setting` 然后侧边栏的最下面有个 ``
<a data-fancybox title="" href="https://user-images.githubusercontent.com/33750626/71869237-5285d700-314c-11ea-878b-45f915498a29.png">![](https://user-images.githubusercontent.com/33750626/71869237-5285d700-314c-11ea-878b-45f915498a29.png)</a>

配置的 `note` 可以随便写，然后生成后就会有一个 `token` （记住，只会显示这样一次，所以要自己记下来，后面要用到）

#### 2）travis 操作：配置环境变量

配置环境变量 `address` 和 `token`
用 github 快速登录后，找到自己博客所在的那个仓库，然后进入。再如图所示的方式进去配置`环境变量`
<a data-fancybox title="image" href="https://user-images.githubusercontent.com/33750626/71869346-b4ded780-314c-11ea-9412-0abef27f5208.png">![image](https://user-images.githubusercontent.com/33750626/71869346-b4ded780-314c-11ea-9412-0abef27f5208.png)</a>

大致要配 2 个，其中 `token` 是必须的，对应了 `.travis.yml` 中的变量名。这个 token 就是刚才拿到的 github token 字符串。
`address` 就是本仓库的地址，也就是 clone 的那个地址。

## 关于 vuepress 对 md 的扩展用法

### 提示信息用法扩展

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details 点击查看代码
这是一个详情块，在 IE / Edge 中不生效
```js
console.log('你好，VuePress！')
```
:::

### 某一行代码高亮

::: tip
`js{4} xxx`
:::

## 插件使用

### 评论插件

- 去https://leancloud.cn/ 注册，要认证实名
- 去设置中拿到 `appID` 和 `appKey`
- 按照官方或者下面网址里的方法创建组件或者以插件形式进行配置
- 最后在需要加入评论的 md 文件中加入该全局组件就行
- 最后记得把配置新独立出来，要设置 .gitignore
  https://www.cnblogs.com/CoderMonkie/p/blog-comment.html

### 全文搜索

> 去三方申请后需要大概 1 天左右才有结果

### 图片放大预览

```js
head: [
    ["link", { rel: "icon", href: "/logo.jpg" }],
    // 增加下面三个实现图片预览
    // <a data-fancybox title="xx" href="sss">![xx](sss)</a>
    // vscode 插件 vuepress-img-format
    // 命令 img format 可以格式化当前文档的所有图片，img reset format 可以重置格式化
    [
      "script",
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js"
      }
    ],
    [
      "script",
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.js"
      }
    ],
    [
      "link",
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.css"
      }
    ]
  ],
```
