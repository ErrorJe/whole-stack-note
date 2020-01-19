module.exports = {
  // 有子目录时用对象数组
  "/p4/javascript/": [
    "",
    {
      title: "数据类型",
      collapsable: false,
      children: [
        "数据类型/00 数据类型",
        "数据类型/01 数据类型判断",
        "数据类型/02 数据类型转换"
      ]
    },
    {
      title: "事件机制",
      collapsable: false,
      children: [
        '事件机制/01 事件机制'
      ]
    },
    {
      title: "堆栈内存和作用域",
      collapsable: false,
      children: [
        '堆栈内存和作用域/堆栈内存',
        '堆栈内存和作用域/作用域'
      ]
    },
    {
      title: "面向对象",
      collapsable: false,
      children: ["面向对象/"]
    },
    {
      title: "异步编程",
      collapsable: false,
      children: [
        "异步编程/",
        "异步编程/高阶函数",
        "异步编程/异步解决方案",
        "异步编程/Promise 核心",
        '异步编程/Event Loop'
      ]
    }
  ],
  "/p4/es-next/": [
    '前端模块化'
  ],
  "/p4/typescript/": [
    "",
    {
      title: "特性概览",
      collapsable: false,
      children: ["00 基础知识", "01 数据类型", "02 面向对象", "10 Vue 应用"]
    }
  ],
  // 没有子目录就一个数组
  "/p4/browser/": ["", "前端本地存储"],
  "/p4/team/tools/": ["", "vue-press", "github和picgo搭建图床"]
};
