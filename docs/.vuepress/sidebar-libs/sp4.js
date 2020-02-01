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
      title: "执行机制",
      collapsable: false,
      children: [
        '执行机制/01 事件机制',
        '执行机制/02 作用域',
        '执行机制/03 内存管理',
        '执行机制/04 闭包',
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
      children: [
        '面向对象/01 面向对象基础',
        '面向对象/02 原始类型和引用对象',
        '面向对象/03 函数',
        '面向对象/04 对象',
        '面向对象/05 构造函数和原型',
        '面向对象/06 继承方案',
        '面向对象/07 对象模式',
        '面向对象/08 this 关键字',
        '面向对象/09 this 内置函数',
        '面向对象/10 this 应用实例'
      ]
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
    '01 块级作用域',
    '02 数值的新特性',
    '03 字符串的新特性',
    '04 数组的新特性',
    '05 对象的新特性',
    '06 函数的新特性',
    '07 解构赋值（脱壳）',
    '08 class 类',
    '09 Set 和 Map 数据结构',
    '10 Promise 和 async_await',
    '11 Proxy 和 Reflect 代理对象',
    '12 Generator 异步迭代器',
    '13 前端模块化'
  ],
  "/p4/typescript/": [
    {
      title: "特性概览",
      collapsable: false,
      children: ["00 基础知识", "01 数据类型", "02 面向对象", "10 Vue 应用"]
    }
  ],
  // 没有子目录就一个数组
  "/p4/browser/": [
    'DOM',
    'BOM',
    'CSSOM',
    "前端本地存储"
  ],
  "/p4/team/tools/": ["", "vue-press", "github和picgo搭建图床"]
};
