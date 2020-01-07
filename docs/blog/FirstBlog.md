# vuepress 博客搭建指南

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
    // 你的GitHub仓库，请正确填写
    repo: "https://github.com/ErrorJe",
    // 自定义仓库链接文字。
    repoLabel: "ErrorJE's GitHub",
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
          children: ["/blog/live/", "/blog/live/note"]
        },
        {
          title: "经济",
          children: ["/blog/econ/"]
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

### SSH 和 HTTPS 的问题（待理解）

官方文档里，`deploy.sh` 中对于仓库的链接主要是 `SSH` 方式。
但是根据仓库的特性，有些是 `HTTPS` 方式的，所以配置的时候注意一下方式

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

### 关于 git 分支新建的问题（待理解）

如何指定某个文件目录新建新的分支

### 关于 GitHub Pages

这个东西原本 `github` 就是用来让开源库的作者能够更加丰富得介绍自己的项目，而不是仅仅局限于之前的 `README.md` 介绍文档。

当然，后面没有服务器的支持，只能够部署一些静态页面。这也够了，我们把项目打包后输出的就是静态资源 `dist` 。

## 自动化部署 CI
### 什么是 Travis CI
官网：https://travis-ci.com/ 直接使用 `github` 账号进行关联登录
参考链接阮一峰：http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html




## 关于 vuepress 对 md 的扩展用法

### 示信息

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::

### 某一行代码高亮

::: tip
`js{4} xxx`
:::
