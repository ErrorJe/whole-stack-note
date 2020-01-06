# vuepress 博客

> 使用: vuepress + github Page

## 博客搭建过程

### 1 hello world 运行

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

### 2 创建必要的目录结构

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

### 1 首页布局

对于首页布局的配置，是在 `README.md` 中进行的。用 `YAML front matter` 格式书写配置内容（查了一下是定义类似变量的内容块）

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

### 2 导航栏

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
      { text: "首页", link: "/" },
      { text: "FirstBlog", link: "/blog/FirstBlog.md" }
    ]
  }
};
```

### 3 侧边栏
说白了，就是侧边配置目录，`名字对应地址`

还会把文档中 H2 级别的标题显示出来

```js
module.exports = {
  themeConfig: {
    sidebar: [
      ['/', '首页'],
      ['/blog/FirstBlog.md', '我的第一篇博客']
    ]
  }
}
```

## 博客部署
1 git bash 环境变量的问题 

2 SSH 和 HTTPS 的问题

3 nodejs 升级/降级带来的问题
https://github.com/nodejs/node/issues/29287

4 关于 git 分支新建的问题
如何指定某个文件目录新建新的分支

5 关于 GitHub Pages


## 自动化部署 CI
