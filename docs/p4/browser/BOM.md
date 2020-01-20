# BOM

## BOM 基础知识

BOM（browser object model）

在 HTML5 新增了 BOM API 和新功能。



BOM 包含了5个东西

- location 管理 URL
- history 管理历史记录
- navigator 管理浏览器
- screen 管理屏幕
- window 管理浏览器所有的东西



## Location 对象

### 分析一个 URL 组成

一个完整的URL如：http://www.baidu.com/path.html?a=1&b=2#top



```js
location.protocol = 协议,http
location.host = 主机域名， www.baidu.com
location.prot = 访问端口，一般是8080
location.pathname = 页面路径，path.html
location.search = URL？之后的部分
location.hash = #之后的部分，位置标识符
```



一些 `URL` 跳转

```js
• location.reload() = 重新加载当前页面
• location.assign('/') = 设置一个新的URL地址
```



### 页面跳转

```js
// 设置跳转的页面URL, 属性。有后退。这个必须掌握
window.location.href = url
// 设置跳转的页面URL, 方法。有后退
window.location.assign(url)
// 重新加载
window.location.reload()
// 替换网页，没有后退
window.location.replace(url)
```



### location 对象 API

```js
// location 对像
window.location
 
// 地址栏上#及后面的内容
window.location.hash
// 主机名及端口号
window.location.host
// 主机名
window.location.hostname
// 文件的路径---相对路径
window.location.pathname
// 端口号
window.location.port
// 协议
window.location.protocol

// 完整的 href
window.location.href = protocol + origin:port + pathname + search
// 搜索的内容
window.location.search
// 域名
window.location.origin
```



## Navigator 浏览器信息

**navigator：浏览器信息，容易被用户自己修改，所以JS读取的值不一定是真实的**



```js
window.navigator.platform // 判断浏览器所在系统类型
window.navigator.userAgent // 浏览器设定的 User-Agent 字符串（可以伪装）
navigator.language // 浏览器设置的语言
avigator.appName // 浏览器名称
navigator.appVersion // 浏览器版本
```





## History 浏览历史记录

**history：保存了历史记录。方式太粗暴，尽量不用**

```js
// 前进
window.location.forward()

// 后退
window.location.back()

// 任意跳转: 正数前进，负数后退， 0刷新
window.location.go(n)

// 历史列表中的 url 数量
history.length
```



**在 HTML5 中增加了一些 API ，让她可以做单页应用（SPA， single page app）**

```js
var state = {
    page: "settings"
}

/*三个参数分别是
  自定义对象
  新页面的标题, 但是现在还没有浏览器实现这个功能
  新页面的地址(只是对地址栏的路径进行修改，不对网页域名做任何改变，主要用于AJAX增强)
*/
history.pushState(state, "settings", "/settings")

// 用户点击 前进 后退 按钮的时候, 会触发 window 的 popstate 事件
window.addEventListener("popstate", function(e) {
    // 这里的e，就是上面的state对象。
    // 也就是在页面可以传递或储存些数据
    var state = e.state;
    // state 就是 pushState 的第一个参数
    console.log('pop state', state)
})
// 还有一个 replaceState 函数, 它的作用和 pushState 一样, 只是不生成一条历史纪录
```



## Window 对象

**Window：分为整个浏览器窗口和浏览器内部窗口。除了表示浏览器窗口，还充当全局作用域**



### 基础知识

浏览器有个顶级对象：` window - 皇上`

页面顶级对象： `document - 总管太监`

页面所有内容属于浏览器，页面中的内容也都是 `window` 的



```js
// 以下内容的前提是变量和函数定义都要暴露在全局环境下
// 变量是 window 的
var x = 1, 实际上是 window.x

// 方法的本质是函数，函数实际上也是方法（通过对象调用）
function fn() => window.fn

// 由于页面中所有内容都是 window 的， 所以 window 可以默认省略
window.document.write('xx') ==== document.write('xx')
```



不要轻易用 `name` 这个变量， 因为 `window.name` 是存在的  `window` 还有另外的名字 `top`

浏览器的所有对象都可以直接在浏览器中输入后查看



### 浏览器尺寸 API

浏览器窗口大小：window.outerWidth， window.outerHeight

浏览器内部窗口大小：window.innerWidth， window.innerHeight

```js
// 有时候判断浏览器版本，写很多IF，其实可以利用JS对不存在属性返回undefined，用短路||运算符
var width = window.innerWidth || document.body.clientWidth
document.body.clientWidth // 不包括滚动条等用户无法涉及控制的部分
```



### 页面加载事件：DOM 加载完毕后触发

```js
// 页面加载完触发
window.onload = function () {}   // onload = function() {}
// 页面关闭后触发
window.onunload = function() {}
// 页面关闭前触发
window.onbeforeunload = function() {}
```



### 三种弹窗

因为 UI 交互不是很好，所以尽量还是自己实现比较好

```js
window.alert() // 也有断言的作用
window.prompt('请输入') // 中断程序运行
window.confirm('确定吗') // 有 yes 和 no 两个返回值
```





## Screen 屏幕信息和视口

### screen

```js
screen.width = 屏幕宽度，像素单位px
screen.height = 屏幕高度
screen.colorDepth = 颜色位数，8, 16, 24
```



### document

#### 基础知识

```js
document.title // 获取<title>....</title>的内容，也就是窗口标题

// 查找某个DOM节点，从document开始找，一般是根据id标识和Tag元素标识来找
document.getElementById()
document.getElementsByTagName()
```



#### cookie属性的不安全性

```js
// cookie属性，用于保存登录信息和其他设置信息,key-value对应的形式
document.cookie = 获取到当前页面的Cookie值。一般是加密的value
```



HTML可以引入第三方的JS代码，不排除其中有恶意的代码部分

容易直接用JS获取到cookie中用户登录信息

使用httpOnly可以设置为不被JS读取



#### $0

> **指的是在Elements标签页，选中的某个元素**
>
> **用于调试的**

- 可以只用这个选中此元素并操作
- $0.innerText='111'，就可以变里面的文本内容



### offset 系列

当使用 `` 标签写的位置信息，是无法直接使用 JS 获取到

但如果是直接写在属性中的样式，是可以获取到的，如 `style='x"`

```js
DOM.style.x
```



现在， JS 可以直接通过 `offset 系列` 来获取元素的位置



#### 基本操作

注意操作的前提在没有脱离文档流时

```js
// 父级元素margin+父级元素padding+父级元素的border+自己的margin

DOM.offsetLeft // 左边距
DOM.offsetTop // 上边距
DOM.offsetHeight // 元素包括边框的布局高度
DOM.offsetWidth // 元素包括边框的布局宽度
```



#### 页面元素 document

```js
document.body // 获取的是元素--标签
document.title // 标签中的值
document.documentElement // 获取HTML
```



### scroll 系列：卷曲（溢出）

CSS这样写，是为了操作的时候没有边框误差和计算

```js
* {
  margin: 0;
  padding: 0;
}
```



#### 基本操作

使用样式属性 `overflow:auto` 时， 会让元素里的内容宽度收缩，导致高度增加

```js
DOM.scrollWidth //元素中内容的实际的宽，没有内容或很少就是元素的宽度，没有边框
DOM.scrollHeight //元素中内容的实际的高，没有内容或很少就是元素的高度，没有边框
DOM.scrollTop //向上卷曲(类似卷帘门上面被隐藏的部分)出去的距离。就是元素被隐藏部分的顶点到可视区域顶点的距离
DOM.scrollLeft //向左卷曲出去的距离
```



#### div 滚动事件：onscroll

```js
DOM.onscroll = function() {
    console.log(this.scrollTop);
}
```



### client 系列：页面可视区域

```js
DOM.clientWidth: 可视区域的宽(没有边框),边框内部的宽度
DOM.clientHeight: 可视区域的高(没有边框),边框内部的高度
DOM.clientLeft: 左边边框的宽度
DOM.clientTop: 上面的边框的宽度，也就是边框的厚度
```



## 应用示例

### 获取元素的样式属性值

#### 获取样式

```js
// 获取任意一个元素的任意一个样式属性的值
function getStyle(element, attr) {
  //判断浏览器是否支持这个方法
  if (window.getComputedStyle) {
    // 获取该对象CSS所有属性中的attr属性值（谷歌，火狐）, 第一个参数是DOM， 第二个是CSS伪元素
    return window.getComputedStyle(element, null)[attr];
  } else {
    // IE8
    return element.currentStyle[attr];
  }
}
```



#### 写法简化

```js
function getStyle(element, attr) {
  //判断浏览器是否支持这个方法
  return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr];
}
```



#### 关于不使用 DOM.offsetLeft

因为当元素没有脱离标准文档流的时候，就算设置了 `left: 100px`， 也不会显示，也无法用到这个方法来获取真实的位置。但实际上这个属性是实际存在的，只是需要脱标后才能显示出来。



### 获取 DOM 元素高度和宽度总结

```js
网页可见区域宽： document.body.clientWidth
网页可见区域高： document.body.clientHeight
网页可见区域宽： document.body.offsetWidth (包括边线的宽)
网页可见区域高： document.body.offsetHeight (包括边线的高)
网页正文全文宽： document.body.scrollWidth
网页正文全文高： document.body.scrollHeight
网页被卷去的高： document.body.scrollTop
网页被卷去的左： document.body.scrollLeft
对应的dom元素的宽高有以下几个常用的：
元素的实际高度：document.getElementById("div").offsetHeight // clientHeight
元素的实际宽度：document.getElementById("div").offsetWidth
元素的实际距离左边界的距离：document.getElementById("div").offsetLeft
元素的实际距离上边界的距离：document.getElementById("div").offsetTop
```



### 固定导航栏

```js
// 获取页面向上或者向左卷曲出去的距离的值
function getScroll() {
  // document.documentElement === HTML
  // 高度：浏览器可视界面的上边界为0 ，超出多少高度就是多少
  return {
    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft||0,
    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  };
}

// 浏览器滚动事件
/*
    tDOM 上方元素
    xDOM 目标元素
    bDOM 下方元素
    class-fixed {
      position: fixed;  脱离文档流
      top: 0;   挂在浏览器顶部
      left: 0;
    }
    class-main {
      margin-top: 10px;
    }
  */
window.onscroll = function () {
  // 超出可视页面的高度 大于 最上方元素的高度值(这个顶部元素看不到时)
  if(getScroll().top >= tDOM.offsetHeight){
    // 设置目标元素的类样式: 这个 fixed 样式类提前写好
    xDOM.className = "nav fixed";
    // 设置下方元素的 marginTop 的值(因为xDOM脱离了文档流，所以有一个空缺位，填补这个空缺高度)
    bDOM.style.marginTop = xDOM.offsetHeight + "px";
  } else {
    // 反之，不改变样式
    xDOM.className = "nav";
    // 把下方元素的样式值设置回来
    bDOM.style.marginTop = "10px";
  }
};
```