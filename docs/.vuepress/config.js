const p4 = require("./nav-libs/p4.js");
const p5 = require("./nav-libs/p5.js");
const p6 = require("./nav-libs/p6.js");
const blog = require("./nav-libs/blog.js");
const backBase = require("./nav-libs/back-base.js");
const backPro = require("./nav-libs/back-pro.js");

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
    displayAllHeaders: false,

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
      "/blog/": [
        {
          title: "生活",
          collapsable: false, // 取消下拉
          children: ["/blog/live/", "/blog/live/note"]
        },
        {
          title: "经济",
          children: ["/blog/economics/"]
        }
      ],
      "/p4/javascript/": [
        '',
        {
          title: "数据类型",
          collapsable: true,
          children: [
           '数据类型/00 数据类型',
           '数据类型/01 数据类型判断',
           '数据类型/02 数据类型转换'
          ]
        },
        {
          title: "面向对象",
          collapsable: true,
          children: ["/p4/javascript/面向对象/"]
        }
      ],
      "/p4/team/tools/": ["vue-press", "github和picgo搭建图床"]
    }
  },
  plugins: ["@vuepress/back-to-top"]
};
