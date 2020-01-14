const p4 = require("./nav-libs/p4.js");
const p5 = require("./nav-libs/p5.js");
const p6 = require("./nav-libs/p6.js");
const blog = require("./nav-libs/blog.js");
const backBase = require("./nav-libs/back-base.js");
const backPro = require("./nav-libs/back-pro.js");

const sp4 = require('./sidebar-libs/sp4.js')
const sp5 = require('./sidebar-libs/sp5.js')
const sp6 = require('./sidebar-libs/sp6.js')
const sblog = require("./sidebar-libs/blog.js");
const sbackBase = require("./sidebar-libs/back-base.js");
const sbackPro = require("./sidebar-libs/back-pro.js");

module.exports = {
  base: "/whole-stack-note/", // 站点的基础路径
  title: "FE 前端研究所", // 网站的标题
  description: "ErrorJE 直辖 Blog", // 网站的描述
  // favicon
  head: [["link", { rel: "icon", href: "/logo.jpg" }]],

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
    lastUpdated: '上次更新时间',
    smoothScroll: true,

    // 导航栏配置:路径配置 / 以 docs/ 开始
    nav: [
      // 1 单个页面
      { text: "Home", link: "/" },
      // 2 嵌套页面，会自动分组
      // 一般都指向 README.md 详细的目录去侧边栏配置
      p4,
      p5,
      p6,
      backBase,
      backPro,
      blog,
      { text: "Resume", link: "/my-resume" }
    ],

    // 侧边栏配置
    sidebar: {
      ...sblog,
      ...sp4,
      ...sp5,
    }
  },
  plugins: ["@vuepress/back-to-top"]
};
