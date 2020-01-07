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
      {
        text: "前端初级",
        items: [
          {
            text: "HTML / CSS",
            items: [
              { text: "HTML 基础", link: "/p4/html-base/" },
              { text: "HTML5", link: "/p4/html-pro/" },
              { text: "CSS 基础", link: "/p4/css-base/" },
              { text: "CSS3 / CSS4", link: "/p4/css-pro/" }
            ]
          },
          {
            text: "JS 基础与进阶",
            items: [
              { text: "JavaScript", link: "/p4/javascript/" },
              { text: "ES-Next", link: "/p4/es-next/" },
              { text: "TypeScript", link: "/p4/typescript/" },
              { text: "JQuery", link: "/p4/jquery/" }
            ]
          },
          {
            text: "项目包管理",
            items: [
              { text: "前端模块化", link: "/p4/package/modules/" },
              { text: "NPM", link: "/p4/package/npm/" },
              { text: "YARN", link: "/p4/package/yarn/" },
              { text: "LEARN", link: "/p4/package/learn/" }
            ]
          },
          {
            text: "团队协作",
            items: [
              { text: "代码规范", link: "/p4/team/code-format/" },
              { text: "开发工具链", link: "/p4/team/tools/" }
            ]
          },
          {
            text: "其他",
            items: [
              { text: "浏览器原理", link: "/p4/browser/" },
              { text: "网络通信层", link: "/p4/request/" }
            ]
          }
        ]
      },
      {
        text: "前端中级",
        items: [
          {
            text: "移动端开发",
            items: [
              { text: "H5", link: "/p5/web-app/h5/" },
              { text: "Uni-App", link: "/p5/web-app/uni-app/" },
              { text: "React Native", link: "/p5/web-app/react-native/" },
              { text: "Fullter", link: "/p5/web-app/fullter/" },
              { text: "微信小程序", link: "/p5/web-app/wechat/" },
              { text: "Weex", link: "/p5/web-app/weex/" },
              { text: "MpVue", link: "/p5/web-app/mpvue/" },
              { text: "PWA", link: "/p5/web-app/pwa/" },
              { text: "Native App", link: "/p5/web-app/native-app/" },
              { text: "Hybird App", link: "/p5/web-app/hybird-app/" }
            ]
          },
          {
            text: "开发框架",
            items: [
              { text: "Vue", link: "/p5/vue-base/" },
              { text: "Vue-Element-Admin", link: "/p5/vue-element-admin/" },
              { text: "React", link: "/p5/react-base/" }
            ]
          },
          {
            text: "NodeJS",
            items: [
              { text: "Node 基础", link: "/p5/node-js/node-base/" },
              { text: "Express", link: "/p5/node-js/express" },
              { text: "Koa", link: "/p5/node-js/koa" },
            ]
          }
        ]
      },
      {
        text: '前端高级',
        items: [
          {
            text:'函数式编程',
            link: '/p6/functional/'
          },
          {
            text: 'Vue 源码',
            items: [
              {text:'Vue 原理', link:'/p6/vue-pro/'},
              {text:'Vue-Router 原理', link:'/p6/vue-pro/'},
              {text:'Vuex 原理', link:'/p6/vue-pro/'},
            ]
          },
          {
            text: 'React 源码',
            items: [
              {text:'React 原理', link:'/p6/react-pro/'},
              {text:'React-Router 原理', link:'/p6/react-pro/'},
              {text:'React-Redux 原理', link:'/p6/react-pro/'},
            ]
          },
          {
            text: '数据库与缓存',
            items: [
              {text:'Mysql', link:'/p6/database/mysql/'},
              {text:'Mongodb', link:'/p6/database/mongodb/'},
              {text:'Redis', link:'/p6/database/redis/'},
            ]
          },
          {
            text: '前端工程化',
            items: [
              {text:'Webpack', link:'/p6/project/webpack/'},
              {text:'Gulp', link:'/p6/project/gulp/'},
              {text:'Mock Server', link:'/p6/project/mock-server/'},
              {text:'IconFont', link:'/p6/project/icon-font/'},
              {text:'Axios 与 API 管理', link:'/p6/project/axios-api/'},
            ]
          },
          {
            text: '其他',
            items: [
              {text:'性能优化', link:'/p6/performance/'},
              {text:'自动化测试', link:'/p6/test/'},
              {text:'自动化部署与运维', link:'/p6/deployment/'},
              {text:'网络协议与安全', link:'/p6/network/'},
              {text:'数据结构与算法', link:'/p6/algorithms/'},
              {text:'设计模式', link:'/p6/patterns/'},
            ]
          }
        ]
      },
      {
        text: "博客",
        items: [
          {
            text: "记录",
            link: "/blog/live/"
          },
          {
            text: "经济学",
            link: "/blog/economics/"
          }
        ]
      },
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
          title: "面向对象",
          collapsable: false,
          children: ["/p4/javascript/面向对象/"]
        }
      ]
    }
  },
  plugins: ["@vuepress/back-to-top"]
};
