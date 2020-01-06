module.exports = {
  base: "/whole-stack-note/", // 站点的基础路径
  title: "FE 研究所", // 网站的标题
  description: "ErrorJE 直辖 Blog", // 网站的描述

  // 主题配置
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: "https://github.com/ErrorJe",
    // 自定义仓库链接文字。
    repoLabel: "ErrorJE's GitHub",

    // 导航栏配置
    nav: [
      { text: "首页", link: "/" },
      { text: "FirstBlog", link: "/blog/FirstBlog.md" }
    ],

    // 侧边栏配置
    sidebar: [
      ["/", "首页"],
      ["/blog/FirstBlog.md", "vue-press 博客搭建"]
    ]
  }
};
