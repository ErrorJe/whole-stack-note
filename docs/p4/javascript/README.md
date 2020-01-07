# JS 历史和介绍

## JS 历史
### JS 是什么
#### 基本知识
`JavaScript` 实际上就是 `ECMAScript标准` 的一个实现


JS语言区分字母大小写

#### JS 是动态解释型语言
是一种动态脚本语言和解释型语言（无需编译直接运行，因为浏览器有解释器）
> 如 C/C++ 为编译型， JS 为解释型

- **编译型**：需要一个编译过程，通过编译器翻译成机器语言。
  - 运行效率高，但是开发效率低

![image](https://user-images.githubusercontent.com/33750626/71914744-3a966d80-31b5-11ea-9b35-2900b0084ae2.png)

- **解释型**：一条语句执行的时候才翻译
  - 开发效率高，运行效率低

![image](https://user-images.githubusercontent.com/33750626/71914778-4d10a700-31b5-11ea-9cd9-a9451e122f8a.png)
#### 浏览器之争
是由 `Netscape` 和 `sun `一起开发的（浏览器之争，微软赢了）。`DOM 0`
由 `W3C` 制定新的标准。`DOM 1`

### JS 的组成
ECMAScript标准： JS 的基本语法
DOM: Document Object Model --> 文档对象模型 --> 操作页面的元素
BOM：Browser Object Model --> 浏览器对象模型 --> 操作浏览器

### 主流的浏览器内核
Webkit，Safari和Chrome的核心
Gecko，Firefox的核心
Trident，IE的核心


### JS 中的难点 
#### 面向对象
原型与原型链
作用域及闭包
异步和单线程

#### 运行时
callback
promise
generator
async-await

## JS 的执行引擎和运行环境
### JS 运行环境（V8）
![image](https://user-images.githubusercontent.com/33750626/71914801-57cb3c00-31b5-11ea-8063-fa3d7a50101e.png)

对我们来说，整个运行环境跟我们无关，相当于一个**黑盒**

- 对于**V8**，我们在写代码的时候不需要关心
  - **V8引擎**：对代码进行预处理的过程。
- 对于**内置库**，我们只需要关心其**API接口**，而无需关心其具体实现

![image](https://user-images.githubusercontent.com/33750626/71914819-631e6780-31b5-11ea-87dd-15af7070b62b.png)


### 浏览器和 node

![image](https://user-images.githubusercontent.com/33750626/71914828-6d406600-31b5-11ea-9eb5-65261a65d3e5.png)

他们两个环境，都有**JS内置对象**，就是JS的编程特性。
但是不同的环境中，提供的服务是有差异性的：

- 如在**浏览器**中可以使用alert出现弹窗
- 而在**黑框node**中，不允许这么使用

![image](https://user-images.githubusercontent.com/33750626/71914848-77626480-31b5-11ea-84a3-b42664bafbd7.png)

### 开发中浏览器和服务器的交互
![image](https://user-images.githubusercontent.com/33750626/71914876-80ebcc80-31b5-11ea-9ef8-e1c4aa34563b.png)
#### 页面渲染步骤
请求页面 **==> **解析HTML ==> 渲染HTML ==> 请求CSS.JS ==>渲染CSS， 执行JS ==>请求数据 **==>** 渲染数据


#### 前端交互实现点

- 用户HTML交互：位置，设计
- HTML与JS的交互：事件、改变
- JS与服务器的交互：数据存取、处理



## 如何学习 JS

![image](https://user-images.githubusercontent.com/33750626/71914888-8a753480-31b5-11ea-9113-618aa25f60fd.png)
### 如何开始
**掌握编程语言**，用编程方式**调用服务（内置库，第三方库）**来完成你的需求

### 如何提高
**了解和掌握重要的服务能力（更好的掌握你的服务）**， 使其能服务你的业务

### 如何进阶

- 善于比较服务/技术之间的差异性， **用最好的方式实现你的业务**
- 简单的说，多尝试用不同的库去实现业务需求，如果一直使用一个库，会让你膨胀，以为掌握的很好，但是没有提高点
- mdn，是javascript的文档。（服务器在国外），可以直接用，实现很多功能

比如 `Math.random()`，生成一个`0.0-1.0`的随机数.这是一个伪随机，但是符合随机的性质。
不用会的时候看文档，或者直接问，百度，一些教程网站
搜索的时候就是`【mdn xxxx】`

### 学 JS 的难度

- **变化快**
  - ES5， 2009
  - ES6， 2015。革命性，版本变化最大
  - ES7， 2016
  - ES8， 2017
  - ES9，2018
  - ES10，2019
- **无边际**：如汇编语言一样全能，创造能力非常强


