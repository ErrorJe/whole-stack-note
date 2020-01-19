(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{245:function(t,a,s){"use strict";s.r(a);var n=s(0),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"内存管理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#内存管理"}},[t._v("#")]),t._v(" 内存管理")]),t._v(" "),s("p",[t._v("内存管理是计算机科学中的概念，不论什么程序语言，内存管理都是指对内存生命周期的管理")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 基本上就是创建、读写和释放")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" foo "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bar'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 在堆内存中给变量分配空间")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("foo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 使用内存")]),t._v("\nfoo "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 释放内存空间")]),t._v("\n")])])]),s("h2",{attrs:{id:"基础知识"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基础知识"}},[t._v("#")]),t._v(" 基础知识")]),t._v(" "),s("h3",{attrs:{id:"内存空间的两种类型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#内存空间的两种类型"}},[t._v("#")]),t._v(" 内存空间的两种类型")]),t._v(" "),s("ul",[s("li",[t._v("栈空间 ：由操作系统自动分配释放、存放函数的参数值和局部变量的值等。其操作方式类似于数据结构中的栈")]),t._v(" "),s("li",[t._v("堆空间：由开发者分配释放，这部分空间就要考虑垃圾回收的问题")])]),t._v(" "),s("h3",{attrs:{id:"js-中的数据类型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#js-中的数据类型"}},[t._v("#")]),t._v(" JS 中的数据类型")]),t._v(" "),s("ul",[s("li",[t._v("基本数据类型：如undefined, null, number, boolean, string等")]),t._v(" "),s("li",[t._v("引用类型， 如object, array, function等")]),t._v(" "),s("li",[t._v("还有ES Next 新的数据类型 symbol（基本数据类型）")])]),t._v(" "),s("p",[t._v("基本数据类型放于栈内存，引用类型放在堆内存中")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("11")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" b "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" c "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" d "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" e"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("20")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("对应的内存分配")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200119162502.png",alt:""}})]),t._v(" "),s("h2",{attrs:{id:"内存泄漏"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#内存泄漏"}},[t._v("#")]),t._v(" 内存泄漏")]),t._v(" "),s("h3",{attrs:{id:"内存泄漏的危害"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#内存泄漏的危害"}},[t._v("#")]),t._v(" 内存泄漏的危害")]),t._v(" "),s("blockquote",[s("p",[t._v("内存泄漏：指内存空间明明已经不再被使用，但是某种原因并没有被释放的现象")])]),t._v(" "),s("p",[t._v("分配内存和读写内存的行为所有语言都基本一样。但是释放内存空间，不用语言的处理方式不一样。")]),t._v(" "),s("p",[t._v("javascript 是依赖宿主浏览器的垃圾回收机制，一般情况下也不用我们自己去释放。但是也有一些场景会有内存泄漏现象。")]),t._v(" "),s("p",[t._v("内存泄漏会直接导致程序运行缓慢，甚至奔溃。")]),t._v(" "),s("h3",{attrs:{id:"内存泄漏场景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#内存泄漏场景"}},[t._v("#")]),t._v(" 内存泄漏场景")]),t._v(" "),s("h4",{attrs:{id:"删除-dom-节点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#删除-dom-节点"}},[t._v("#")]),t._v(" 删除 DOM 节点")]),t._v(" "),s("p",[t._v("获取一个 DOM，移除节点后，但是 element 变量仍然存在。如果去访问 element 变量，还会返回这些节点")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" element "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"element"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nelement"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("mark "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"marked"')]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 移除 element 节点")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("remove")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  element"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("parentNode"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("removeChild")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("element"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 为了防止内存泄漏，还需要 element = null")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h4",{attrs:{id:"事件绑定"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#事件绑定"}},[t._v("#")]),t._v(" 事件绑定")]),t._v(" "),s("p",[t._v("element 元素中有 button，为这个按钮绑定事件，然后清空 element 后，因为事件存在还是无法释放内存。")]),t._v(" "),s("p",[t._v("所以还需要解绑事件")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" element "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'element'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nelement"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("innerHTML "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'<button id=\"button\">点击</button>'")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" button "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'button'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nbutton"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'click'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ...")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nelement"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("innerHTML "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 解绑事件才能释放内存  button.removeEventListener('click')")]),t._v("\n")])])]),s("h4",{attrs:{id:"循环定时器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#循环定时器"}},[t._v("#")]),t._v(" 循环定时器")]),t._v(" "),s("p",[t._v("window.setInterval 的存在，所以内存无法释放。要手动在合适的时机用 clearInterval 清理")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" name  "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'lucas'")]),t._v("\n  window"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setInterval")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"垃圾回收机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#垃圾回收机制"}},[t._v("#")]),t._v(" 垃圾回收机制")]),t._v(" "),s("p",[t._v("浏览器会依靠两种算法来主动进行垃圾回收")]),t._v(" "),s("ul",[s("li",[t._v("标记清除")]),t._v(" "),s("li",[t._v("引用计数")])]),t._v(" "),s("p",[t._v("推荐阅读")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://juejin.im/post/5c4409fbf265da616f703d5a",target:"_blank",rel:"noopener noreferrer"}},[t._v("通过垃圾回收机制理解 JavaScript 内存管理"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://mp.weixin.qq.com/s?__biz=MzA5NzkwNDk3MQ==&mid=2650585408&idx=1&sn=4de7b5bbfa969d9587c163e98bc90684&source=41#wechat_redirect",target:"_blank",rel:"noopener noreferrer"}},[t._v("如何处理 JavaScript 内存泄漏"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://segmentfault.com/a/1190000003641343",target:"_blank",rel:"noopener noreferrer"}},[t._v("垃圾回收"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://segmentfault.com/a/1190000007887891",target:"_blank",rel:"noopener noreferrer"}},[t._v("编写内存友好的代码"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651551451&idx=1&sn=b8447a12eceb467992d432b014d9c026&chksm=8025a11ab752280c7915db4ef726611f645d2fee590d6f0f3f9aeedd55c956454f66f786873a&scene=0#wechat_redirect",target:"_blank",rel:"noopener noreferrer"}},[t._v("JavaScript 中 4 种常见的内存泄漏陷阱"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://juejin.im/post/5c3dce07e51d4551e960d840",target:"_blank",rel:"noopener noreferrer"}},[t._v("记一次网页内存溢出分析及解决实践"),s("OutboundLink")],1)])]),t._v(" "),s("h2",{attrs:{id:"垃圾回收"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#垃圾回收"}},[t._v("#")]),t._v(" 垃圾回收")]),t._v(" "),s("h3",{attrs:{id:"闭包会占有内存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#闭包会占有内存"}},[t._v("#")]),t._v(" 闭包会占有内存")]),t._v(" "),s("p",[t._v("使用闭包，就会一直占有内存，导致无法被自动回收。")]),t._v(" "),s("p",[t._v("下面这种情况，value 会被保存在内存中。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("123")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("bar")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" bar "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 返回的是闭包，用到了外层变量 value")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" bar "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"chrome-查看内存情况"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#chrome-查看内存情况"}},[t._v("#")]),t._v(" chrome 查看内存情况")]),t._v(" "),s("p",[t._v("在chrome performance 标签中可以看到内存的变化线。")]),t._v(" "),s("p",[t._v("在chrome memory 标签中去找内存大的数据类型，然后找到变量。")])])}),[],!1,null,null,null);a.default=e.exports}}]);