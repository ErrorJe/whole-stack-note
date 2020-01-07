# Github + PicGo 搭建图床

github 用于图床的稳定性不用多说

按照之前的方式，每次都需要去某个仓库 `issue` 里粘贴图片，然后再复制 URL 到 markdown 里真的很不方便。



现在用 github + picgo 就能一键完成图片上传到仓库，然后直接可以生成该图片的外链。



## Github 操作

### 创建公有仓库

没有仓库的新建仓库，注意权限要 `public` ，不然图片上传了，别人也看不了。



### 生成 token

先进入位置

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200108020745.png)



然后生成新的 token 专门给 picgo 使用来操控 github 的仓库

> token 只会出现一次，所以要记住这个字符串

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200108020811.png)

### 创建分支

如果是一个已有仓库，不想添加图片（图片会上传到该仓库分支），就需要新建一个分支

在这个地方，输入任意内容，如果没有找到该对应分支，就会帮你创建一个。

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200108021004.png)



## Picgo 操作

### 下载安装

这个好像是国人开发的，所以github上也都是中文文档，按照文档提示下载安装就行了。

主要是配置部分



### 配置 github 图床

这个软件支持很多图床服务器，为了看着干净，把其他图床都点了。这样就只显示 Github 图床

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200108021156.png)



然后进行配置

- 设定仓库名的时候，是按照“账户名/仓库名的格式填写”

- 分支名统一填写“master”

- 将之前的Token黏贴在这里

- 存储的路径可以按照我这样子写，就会在repository下创建一个“img”文件夹

- 自定义域名的作用是，在上传图片后成功后，PicGo会将“自定义域名+上传的图片名”生成的访问链接，放到剪切板上`https://raw.githubusercontent.com/用户名/RepositoryName/分支名，`，自定义域名需要按照这样去填写

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200108021403.png)



### 设置快捷键

因为默认快捷键是基于 mac 来设置的，在 window 上使用推荐 `ctrl + shift + c` 的组合

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200108021603.png)

每次截图完后，就可以按这个组合键，然后会自动上传到仓库中，最后可以直接 `ctrl + v` 贴到 markdown 中

