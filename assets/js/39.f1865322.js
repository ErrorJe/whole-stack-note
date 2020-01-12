(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{242:function(t,s,a){"use strict";a.r(s);var e=a(0),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"环境变量配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#环境变量配置"}},[t._v("#")]),t._v(" 环境变量配置")]),t._v(" "),a("h2",{attrs:{id:"环境变量文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#环境变量文件"}},[t._v("#")]),t._v(" 环境变量文件")]),t._v(" "),a("p",[t._v("在根目录下，创建的文件名如下。")]),t._v(" "),a("p",[t._v("我们需要为每一个可能出现的环境，单独创建一个文件，如 "),a("code",[t._v(".env.production")]),t._v(" 表示在生产环境下应用")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 特定模式的文件比 .env 文件优先级高")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env                # 在所有的环境中被载入\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("mode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("         # 只在指定的模式中被载入\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("local          # 在所有的环境中被载入，但会被 git 忽略\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("mode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("local   # 只在指定的模式中被载入，但会被 git 忽略\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 比如我们创建一个用于开发环境的文件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("development\n")])])]),a("h2",{attrs:{id:"环境变量文件中的内容"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#环境变量文件中的内容"}},[t._v("#")]),t._v(" 环境变量文件中的内容")]),t._v(" "),a("p",[t._v("只有各个变量的“键值对”，由于这是属于配置文件，所以更改后也是要重启服务的")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("FOO")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("bar\n"),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("VUE_APP_SECRET")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("secret\n")])])]),a("p",[t._v("其中只有以 VUE_APP_* 开头 的变量会被 "),a("code",[t._v("webpack.DefinePlugin")]),t._v("插件注入到全局")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 访问方式")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("process"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("VUE_APP_SECRET")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 判断环境方式")]),t._v("\nprocess"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("NODE_ENV")]),t._v("\n")])])]),a("h2",{attrs:{id:"vue-cli-下的三种模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue-cli-下的三种模式"}},[t._v("#")]),t._v(" Vue-cli 下的三种模式")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("development")]),t._v(" 模式用于 "),a("code",[t._v("vue-cli-service serve")]),t._v(" 运行")]),t._v(" "),a("li",[a("code",[t._v("production")]),t._v(" 模式用于 "),a("code",[t._v("vue-cli-service build")]),t._v(" 和 "),a("code",[t._v("vue-cli-service test:e2e")]),t._v(" 构建")]),t._v(" "),a("li",[a("code",[t._v("test")]),t._v(" 模式用于 "),a("code",[t._v("vue-cli-service test:unit")]),t._v(" 单测")])]),t._v(" "),a("blockquote",[a("p",[t._v("使用 --mode 覆盖默认的模式， 在 package.json 中去配置")])]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"dev-build"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"vue-cli-service build --mode development"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);