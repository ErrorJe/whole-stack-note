module.exports = {
  base: "/whole-stack-note/", // 站点的基础路径
  title: "FE 研究所", // 网站的标题
  description: "ErrorJE 直辖 Blog", // 网站的描述
  // favicon
  head: [["link", { rel: "icon", href: "/logo.jpg" }]],

  // 主题配置
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: "https://github.com/ErrorJe",
    // 自定义仓库链接文字。
    repoLabel: "ErrorJE's GitHub",
    // 侧边栏深度到 h3
    sidebarDepth: 2,
    // 全部展开
    displayAllHeaders: false,

    // 导航栏配置
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
    ],

    // 侧边栏配置
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
  },
  plugins: ["@vuepress/back-to-top"]
};
