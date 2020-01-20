# CSSOM

## 与 DOM 的关系

DOM API能控制节点、元素，这些都是DOM树形结构相关的内容。

CSSOM API，就是用控制样式表的。

> 样式表无非通过`<style></style>`标签和`<link>`标签来引入，也是DOM的一种

CSSOM View, 控制元素视图相关的view部分。这是更加常用的



## CSSOM API

要操作样式表，首先要获取页面的样式表（`style或link标签`引入的）

`document.styleSheets` 表示文档中的所有样式表，一个只读列表，可以用索引、item和length控制



### 样式规则的增加和删除

```js
document.styleSheets[0].insertRule("p { color:pink; }", 0) 在在第一个样式表的第一个位置插入新规则
document.styleSheets[0].removeRule(0) 删除第一个样式规则
document.styleSheets[0].cssRules[0] 第一个CSS样式表中的第一个规则
```



### 样式的查看

第一个CSS样式表中的第一个规则中的样式列表，有3个比较重要的属性

- selectorText 选择器，字符串形式。如 '.box'
- style 详细的CSS属性列表
- cssText 就是我们写的CSS样式，包括选择器和属性规则。是一个字符串

```js
document.styleSheets[0].cssRules[0].CSSStyleRule
```



## CSSOM View

> 是DOM API的扩展，原本在Element接口上，分为窗口、滚动和布局3个部分



### 窗口 API：操作浏览器位置和尺寸

```js
moveTo(x,y) 窗口移动到屏幕的特定坐标
moveBy(x,y) 窗口移动特定的距离
resizeTo(x,y) 改变窗口大小到特定尺寸
resizeBy(x,y) 改变窗口大小特定尺寸
//  如：window.open("about:blank", "_blank" ,"width=100,height=100,left=100,right=100" )
window.open(url, name, css) 用指定的名称将指定的资源加载到浏览器上下文（窗口）
```



### 滚动 API

> 要清楚区分可视区域和内部元素之间的滚动

#### 视口滚动 API：由 window 对象控制

```js
scrollX X方向上的当前滚动距离，别名 pageXOffset
scrollY 别名 pageYOffset
scroll(x,y) 让页面滚动到特定的位置，别名scrollTo(top, left)
scrollBy(x,y) 让页面滚动特定距离

// 监听滚动事件
document.addEventListener('scroll', function(event) {})
```



#### 元素滚动 API

```js
scrollTop Y方向上的当前滚动距离
scrollLeft X方向
scrollWitdh 元素内部的滚动内容的宽度，一般来说大于等于元素宽度
scrollHeight 元素内部..高度
scroll(x,y) 元素滚动到特定位置
scrollBy(x,y) 元素滚动特定位置
scrollIntoView(arg) 滚动元素所在的父元素，让元素滚动到可见区域，用arg来指定滚动到中间、开始还是就近位置

// 绑定滚动事件
element.addEventListener('scroll', function(event) {})
```



### 布局 API

```js
window.innerHeight, window.innerWidth 视口的大小
window.outerHeight, window.outerWidth 浏览器窗口占据的大小
window.devicePixelRatio 物理像素和CSS像素单位的倍率关系

window.screen 屏幕尺寸相关信息
    window.screen.width, window.screen.height 设备的屏幕尺寸
    window.screen.availWidth, window.screen.availHeight 设备屏幕可渲染区域尺寸
    window.screen.colorDepth, window.screen.pixelDepth 固定值24
```



### 元素的布局信息

> 这2个API获取的都是相对于视口的坐标。受滚动影响。如果要相对坐标，就需要有技巧

```js
getClientRects() 元素所对应的盒子所占据客户端的矩形区域。用x,y,width,height来虎丘位置和尺寸
getBoundingClientRect() 元素对应盒子的矩形区域，包括overflow为visible的子元素区域

// 相对坐标
var offsetX = 
    document.documentElement.getBoundingClientRect().x 
        - element.getBoundingClientRect().x
```