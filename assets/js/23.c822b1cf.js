(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{226:function(t,r,a){"use strict";a.r(r);var i=a(0),s=Object(i.a)({},(function(){var t=this,r=t.$createElement,a=t._self._c||r;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"github-picgo-搭建图床"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#github-picgo-搭建图床"}},[t._v("#")]),t._v(" Github + PicGo 搭建图床")]),t._v(" "),a("p",[t._v("github 用于图床的稳定性不用多说")]),t._v(" "),a("p",[t._v("按照之前的方式，每次都需要去某个仓库 "),a("code",[t._v("issue")]),t._v(" 里粘贴图片，然后再复制 URL 到 markdown 里真的很不方便。")]),t._v(" "),a("p",[t._v("现在用 github + picgo 就能一键完成图片上传到仓库，然后直接可以生成该图片的外链。")]),t._v(" "),a("h2",{attrs:{id:"github-操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#github-操作"}},[t._v("#")]),t._v(" Github 操作")]),t._v(" "),a("h3",{attrs:{id:"创建公有仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建公有仓库"}},[t._v("#")]),t._v(" 创建公有仓库")]),t._v(" "),a("p",[t._v("没有仓库的新建仓库，注意权限要 "),a("code",[t._v("public")]),t._v(" ，不然图片上传了，别人也看不了。")]),t._v(" "),a("h3",{attrs:{id:"生成-token"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#生成-token"}},[t._v("#")]),t._v(" 生成 token")]),t._v(" "),a("p",[t._v("先进入位置")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200108020745.png",alt:""}})]),t._v(" "),a("p",[t._v("然后生成新的 token 专门给 picgo 使用来操控 github 的仓库")]),t._v(" "),a("blockquote",[a("p",[t._v("token 只会出现一次，所以要记住这个字符串")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200108020811.png",alt:""}})]),t._v(" "),a("h3",{attrs:{id:"创建分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建分支"}},[t._v("#")]),t._v(" 创建分支")]),t._v(" "),a("p",[t._v("如果是一个已有仓库，不想添加图片（图片会上传到该仓库分支），就需要新建一个分支")]),t._v(" "),a("p",[t._v("在这个地方，输入任意内容，如果没有找到该对应分支，就会帮你创建一个。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200108021004.png",alt:""}})]),t._v(" "),a("h2",{attrs:{id:"picgo-操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#picgo-操作"}},[t._v("#")]),t._v(" Picgo 操作")]),t._v(" "),a("h3",{attrs:{id:"下载安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#下载安装"}},[t._v("#")]),t._v(" 下载安装")]),t._v(" "),a("p",[t._v("这个好像是国人开发的，所以github上也都是中文文档，按照文档提示下载安装就行了。")]),t._v(" "),a("p",[t._v("主要是配置部分")]),t._v(" "),a("h3",{attrs:{id:"配置-github-图床"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置-github-图床"}},[t._v("#")]),t._v(" 配置 github 图床")]),t._v(" "),a("p",[t._v("这个软件支持很多图床服务器，为了看着干净，把其他图床都点了。这样就只显示 Github 图床")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200108021156.png",alt:""}})]),t._v(" "),a("p",[t._v("然后进行配置")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("设定仓库名的时候，是按照“账户名/仓库名的格式填写”")])]),t._v(" "),a("li",[a("p",[t._v("分支名统一填写“master”")])]),t._v(" "),a("li",[a("p",[t._v("将之前的Token黏贴在这里")])]),t._v(" "),a("li",[a("p",[t._v("存储的路径可以按照我这样子写，就会在repository下创建一个“img”文件夹")])]),t._v(" "),a("li",[a("p",[t._v("自定义域名的作用是，在上传图片后成功后，PicGo会将“自定义域名+上传的图片名”生成的访问链接，放到剪切板上"),a("code",[t._v("https://raw.githubusercontent.com/用户名/RepositoryName/分支名，")]),t._v("，自定义域名需要按照这样去填写")])])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200108021403.png",alt:""}})]),t._v(" "),a("h3",{attrs:{id:"设置快捷键"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#设置快捷键"}},[t._v("#")]),t._v(" 设置快捷键")]),t._v(" "),a("p",[t._v("因为默认快捷键是基于 mac 来设置的，在 window 上使用推荐 "),a("code",[t._v("ctrl + shift + c")]),t._v(" 的组合")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200108021603.png",alt:""}})]),t._v(" "),a("p",[t._v("每次截图完后，就可以按这个组合键，然后会自动上传到仓库中，最后可以直接 "),a("code",[t._v("ctrl + v")]),t._v(" 贴到 markdown 中")])])}),[],!1,null,null,null);r.default=s.exports}}]);