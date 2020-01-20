# DOM

## DOM 基础知识

### 发展历史

`DOM api` 是最早出来的一批API。所以早期DOM泛指浏览器中所有的API，现在是狭义的意义，即 `文档对象模型`。

- 1 文档：D，document，加载后，网页文档会变成文档对象。

- 2 对象：O，object，window对象，是浏览器窗口本身。即BOM，含油window.open和window.blur等方法

- 3 模型：M，model，整个页面文档对象相当于一棵树，元素之间互为层次关系。如html是body和head的父元素

- 4 节点，DOM树上的单位



### DOM API 的组成

`DOM API` 大致包含4个部分

- 节点：DOM树形结构中的节点相关API
- 事件：触发和监听事件相关API
- Range：操作文字范围相关API
- 遍历：遍历DOM需要的API



## Node 节点

### 节点类型分类

作为 `DOM` 树，所有的节点有统一的接口 `Node`。他们之间有类别和继承的的关系。

![](https://raw.githubusercontent.com/ErrorJe/ErrorJE.github.io/images/img/20200120170208.png)



除了 Document 和 DocumentFrangment，都有与之对应的 HTML 写法。

```js
Element: <tagname>...</tagname> —— 元素型节点
Text: text ——  字符数据，文本节点
Comment: <!-- comments --> —— 字符数据，注释节点
DocumentType: <!Doctype html> —— 文档类型
ProcessingInstruction: <?a 1?> —— 处理信息
```



### 节点属性

节点有三个主要属性分类

```js
DOM.parentNode.nodeType // 类型
DOM.parentNode.nodeName // 名字
DOM.parentNode.nodeValue // 值
```



#### nodeType 节点类型

```
标签 1
属性 2
文本 3
```



#### nodeName 节点名

```
标签：大写的标签名
属性：小写的属性名
文本：#text
```



#### nodeValue 节点值

```
标签： Null
属性： 属性值
文本： 文本内容
```



### 节点 API

作为DOM树继承关系的根节点，定义了DOM节点在DOM树上的操作。



#### 节点关系 —— 位置关系

> Node提供了一组属性，来表示它在DOM树中的关系

```js
// 1 父节点
parentNode / parentElement 父节点 / 父元素

// 2 子节点
node.childNodes // 子节点集合（包括元素，文本，注释）
DOM.firstChild // 第一个子节点
DOM.lastChild // 最后一个子节点

// 3 兄弟节点
nextSibling // 跟在后面的兄弟节点
previousSibling // 前一个兄弟节点， 没有则 null

// 4 位置节点
firstNode 第一个节点
lastNode 最后一个节点
```



#### 节点操作

还提供了操作DOM树的API

节点的操作（元素通用），一般都是通过 `父节点` 上去下手

```js
// 父节点末尾增加子节点。child 是要增加的节点，也是返回值
parentNode.appendChild(child) 

// 在指定父节点下，在节点 referenceNode 前插入新节点。
// 若没有指定该节点，则插入到子节点的末尾
parentNode.insertBefore(newNode, referenceNode)
 
// 删除子节点
parentNode.removeChild(child) 

// 节点替换
parentNode.replaceChild(newChild, oldChild) 
```



我们可以发现，虽然上面四个API没有对称实现 `after/before` 的配套功能（最小设计原则）。但是可以通过这些原子操作来扩充如 `insertAfter` 这样的API。——所以 `JQ` 对其做了补充。



#### 节点高级 API

```js
node.compareDocumentPosition(otherNode) 用于比较两个节点中关系的函数
node.contains(otherNode) 检查 otherNode 是否是 node 的后代
node.isEqualNode(otherNode)  检查两个节点是否完全相同。
node.isSameNode 检查两个节点是否是同一个节点，实际上在 js 中可以用 ===
node.cloneNode 复制一个节点，若传入参数true，则会连同子元素做深拷贝
node.style 节点上的样式
```



#### document 对象创建

DOM标准规定节点必须从文档的 `create` 方法创建出来，而不能使用 JS 的new 运算。所以 document对象 有很多方法来创建对应的节点类型

```js
createElement 创建一个元素
createTextNode 创建文本元素
createCDATASection 
createComment(data) 创建注释节点， data 是字符串注释内容
createProcessingInstruction
createDocumentFragment 创建 iframe
createDocumentType
```



### 节点封装——遍历方法

```js
// 常会用到遍历， Nodes.length , 但是这个长度是节点的长度，而不是元素的长度。
for (var i=0; i<nodes.length; i++) {
  // 首先定义变量，来记录指定元素的数量，而不是依靠 i (节点数量)
  var count = 0
  // 需要先判断一下，你需要什么样的结点
  if (nodes[i].nodeType == 1 & nodes[i].nodeName == 'LI') {
    // 只要遍历到这个指定元素了，就记录一下
    count++
    // ....假设这里做一个表格斑马纹效果...
    nodes[i].style.backgroundColor = count%2==0?'red':'yellow'
  }
}
```



## Element 元素

虽然Node接口提供了大量操作节点的API，但是大多数时候，我们开发者关注的是元素。Element 元素是Node 的子类。

元素：对应的是HTML中的标签，有子节点，也有属性。



### Attribute 元素属性

在元素中，有一系列操作属性的方法。实际上就是元素标签中的属性。

> 元素的 Attribute 和 Property 是不一样的东西

#### 将元素属性当字符串

```js
el.getAttribute(key) 获取某个属性值
el.setAttribute(key, value) 给元素设置属性
el.removeAttribute('xx') 删除某个属性
el.hasAttribute('xxx') 是否存在某属性
el.hasAttributes() 是否有属性存在
el.getComputedStyle 元素的样式属性集合
```



#### 将元素属性当节点——性能极致

```js
getAttributeNode
setAttributeNode
```



#### 将元素属性当对象

可以像访问 `property` 一样，使用 `attribute` 对象

```js
// el.attributes 元素的所有属性
document.body.attributes.class = 'a'
// 等效于
document.body.setAttribute('class', 'a')
```



### 元素操作 API

#### 元素关系

```js
DOM.children // 子元素集合
DOM.childElementCount  // 子元素个数
DOM.firstElementChild  // 第一个子元素
DOM.lastElementChild  // 最后一个子元素

DOM.previousSibling // 某个元素的前一个兄弟节点
DOM.previousElementSibling // 某个元素的前一个兄弟元素
DOM.nextSibling // 某一个元素的后一个兄弟节点
DOM.nextElementSibling // 某个元素的后一个兄弟元素
```



#### 查找元素

document 节点也提供了一些API来锁定元素，就像CSS选择器一样。

> 前两种API的性能低于后面的几种
>
> 后三种，获取的是元素集合。所以都有一个 s

```js
querySelector
querySelectorAll
getElementById
getElementsByName
getElementsByTagName
getElementsByClassName
```



#### 操作元素

```js
DOM.remove() // 删除DOM
DOM.innerHTML // 设置属性
DOM.appendChild(newChild) // 追加子元素
DOM.insertBefore(newChild, refChild) // 把新的子元素插入到某元素前面
DOM.replaceChild(newChild, refChild) // 参照元素替换成新元素
DOM.removeChild(this.firstElementChild) // 删除父级元素中的第一个子元素

// 删除所有子元素
while(DOM.firstElementChild) {
    DOM.removeChild(this.firstElementChild)
}

// 解析成Html插入到相对于自己的位置
// 这个方法在JQ中也有的：$().append()内部尾部， prepend()内部首部， after()后面， before()前面 
DOM.insertAdjacentHTML('afterend自己后面/beforebegin自己前面/beforeend内部后面/afterbegin内部前面', HTML)
```



新的标准中可以这样去获取 DOM 的样式



```js
// 元素标签只要定义 id="dom" 就可以不用 API 去获取 DOM，可以直接写
dom.style.attr = 'value'
```

####  

#### 元素创建

```js
document.write('标签代码和内容')
// 缺陷： 页面加载完毕后， 若是通过这种方式创建元素，则页面上存在的所有内容都会消失
// 页面加载时创建，是正常的
// 还可以嵌入外部广告：比如搜百度新闻代码，就可以得到一个script的src
// 然后实际上是代码块

DOM.innerHTML = '标签和代码' // 每次都是重新赋值

document.createElement('标签名字')
  // 第一步， 这种方式创建元素
  var sDom = document.createElement('p')
  // 第二步， 给标签写入内容
  sDom.innerHTML = '这是一个P'
  // 第三步， 在创建之后，还要追加（内部尾部）到父级元素中
  fDom.appendChild(sDom)
```





### 元素兼容操作封装

#### 获取父级元素的第一个自己元素

```js
// 获取父级元素的第一个子级元素
function getFirstElementChild(element) {
  if (element.getFirstElementChild) {
    return element.firstElementChild
  } else {
    var node = element.firstChild //第一个节点
    // 找标签节点: node 有意义, 并且他的类型是标签
    while (node && node.nodeType != 1){
      node = node.nextSibling
    }
    return node;
  }
}
```



#### 获取父级元素中的最后一个子元素

```js
/**
 * 获取父级元素中的最后一个子元素
 * @param element 父级元素
 * @returns {*} 最后一个子元素
 */
function getLastElement(element) {
  if (element.lastElementChild) {
    return element.lastElementChild;
  } else {
    var node = element.lastChild;
    while (node && node.nodeType != 1) {
      node = node.previousSibling;
    }
    return node;
  }
}
```



#### 获取某元素前一个兄弟元素

```js
/**
 * 获取某个元素的前一个兄弟元素
 * @param element 某个元素
 * @returns {*} 前一个兄弟元素
 */
function getPreviousElement(element) {
  if (element.previousElementSibling) {
    return element.previousElementSibling
  } else {
    var node = element.previousSibling;
    while (node && node.nodeType != 1) {
      node = node.previousSibling;
    }
    return node;
  }
}
```



#### 获取某元素后一个兄弟元素

```js
/**
 * 获取某个元素的后一个兄弟元素
 * @param element 某个元素
 * @returns {*} 后一个兄弟元素
 */
function getNextElement(element) {
  if (element.nextElementSibling) {
    return element.nextElementSibling
  } else {
    var node = element.nextSibling;
    while (node && node.nodeType != 1) {
      node = node.nextSibling;
    }
    return node;
  }
}
```



#### 获取某元素所有兄弟元素

```js
/**
 * 获取某个元素的所有兄弟元素
 * @param element 某个元素
 * @returns {Array} 兄弟元素
 */
function getSiblings(element) {
  if (!element)return;
  var elements = [];
  var ele = element.previousSibling;
  while (ele) {
    if (ele.nodeType === 1) {
      elements.push(ele);
    }
    ele = ele.previousSibling;
  }
  ele = element.nextSibling;
  while (ele) {
    if (ele.nodeType === 1) {
      elements.push(ele);

    }
    ele = ele.nextSibling;
  }
  return elements;
}
```



### 应用案例

#### 单选、全选与去选

```js
// 获取全选的复选框 fDom
// 获取子级复选框 sDom
// 点击全选的复选框，获取当前状态，且改变子级选框的状态
fDom.onclick() = function () {
  for (var i = 0; i < sDom.length; i++) {
    // 子级选框跟随父级选框状态
    sDom[i].checked = this.checked
  }
}
// 获取子级选框
for (var i = 0; i < sDom.length; i++) {
  // 分别注册点击事件
  sDom[i].onclick = function () {
    var flag = true // 默认都被选中
    // 每次点击都要循环判断是否所有选框都被选中
    for (var j = 0; j < sDom.length; j++) {
      // 没选中的改变状态
      if (!sDom[j].checked) {
        flag = false
        break
      }
    }
    // 改变父级全选状态
    fDom.checked = flag
  }
}
```



#### 模拟百度搜索框

```js
var keywords = ['xx', 'xxxx', 'xxxx', 'eeee', 'xxxe']
// 获取文本框注册键盘抬起事件
DOM.onkeyup = function () {
  // 每一次键盘弹起，都判断页面中有没有这个div
  if (div) {
    // 删除一次
    idDOM.removeChild(div)
  }
  // 获取文本框的内容
  var text = this.value
  var tempArr = []  // 临时空数组， 存放对应上的数据
  // 将文本框内容和数组中的每个数据对比
  for (var i=0; i<keywords.length; i++) {
    // 字符是否是最开始出现的
    if (keywords[i].indexOf(text) == 0) {
      tempArr.push(keywords[i]) // 追加
    }
  }

  // 若文本框是空的，临时数组中没内容，则不创建div
  if (this.value.length == 0 || tempArr.length == 0) {
    // 若页面中有这个div, 删除这个div
    if (div) {
      idDOM.removeChild(div)
    }
    // 后面代码不执行
    return
  }

  // 遍历临时数组， 创建DIV.把div放到对应id 的div中
  var div = document.createElement('div')
  // 容器DOM
  idDOM.appendChild(div)
  div.id = 'idx'
  div.style.width = '350px'
  div.style.border = '1px solid lightblue'

  // 循环遍历临时数组， 创建对应的p标签
  for (var i = 0; i < tempArr.length; i++) {
    // 创建 p 标签
    var pDOM = document.createElement('p')
    // 将 p 加到 div 中
    div.appendChild(pDOM)
    // 调用方法，改写文本
    setInnerText(pDOM, tempArr[i])
    // 设置搜索结果的样式
    pDOM.style.margin = 0
    pDOM.style.padding = 0
    pDOM.style.cursor = 'pointer'
    pDOM.style.marginTop = '5px'
    pDOM.style.marginLeft = '5px'
    // 鼠标进入高亮
    pDOM.onmouseover = function() {
      this.style.backgroundColor = 'yellow'
    }
    //  鼠标离开，取消着色
    pDOM.onmouseout = function() {
      this.style.backgroundColor = ''
    }
  }


  // 设置任意的标签中间的任意文本内容
  function setInnerText(element,text) {
    //判断浏览器是否支持这个属性
    if(typeof element.textContent =="undefined"){ //不支持
      element.innerText=text;
    }else{ //支持这个属性
      element.textContent=text;
    }
  }
}
```



## NodeIterator 和 TreeWalker 遍历



通过Node的属性，可以用JS遍历整个树。实际上DOM API中还提供了 NodeIterator 和 TreeWalker 来遍历树。

他们2个还提供了过滤功能，可以把属性节点也包含在遍历之内。



### NodeIterator的用法

就是一个迭代器

终止条件是比较老式的，即 `nextNode` 返回 `null`

第二个参数用了位运算的掩码

```js
var iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT 
    | NodeFilter.SHOW_COMMENT, null, false);
var node;
while(node = iterator.nextNode())
{
    console.log(node);
}
```



### TreeWalker的用法

比起上面那种，这多了在DOM树上自动移动当前节点的能力。一般用于跳过某些节点，或者重复遍历某些节点

```js
var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false)
var node;
while(node = walker.nextNode())
{
  if(node.tagName === "p")
    node.nextSibling();
  console.log(node);
}
```



## Range API

> 若不是与富文本编辑类业务相关，只需要了解。这个是比较专业的领域。

`range API` 表示HTML上的一个范围，以文字为最小单位，所以不一定是完整的节点，也可能是text节点中的一段，也可以是头尾两个Text的一部分加上中间的元素。



这个API可以比节点API更加精准地操作DOM树。凡是节点API能做到的，这个都能做到，而且性能更高。就是使用起来比较麻烦。

所以只又做底层框架或者富文本编辑对它有强需求



### 创建 Range 对象

一般通过设置它的范围实现

```js
var range = new Range(),
    firstText = p.childNodes[1],
    secondText = em.firstChild
range.setStart(firstText, 9) // do not forget the leading space
range.setEnd(secondText, 4)
```



### 从用户选中区创建

处理用户选中区域

```js
var range = document.getSelection().getRangeAt(0);
```



### 更改区域内容

方式是取出和插入，分别是 `extractContents` 和 `insertNode`。

```js
var fragment = range.extractContents()
range.insertNode(document.createTextNode("aaaa"))
```



### 完整例子

> 考虑命名空间的场景不多，主要是SVG。元素和属性相关API都有带命名空间的版本。

```js
var range = new Range(),
    firstText = p.childNodes[1],
    secondText = em.firstChild
range.setStart(firstText, 9) // do not forget the leading space
range.setEnd(secondText, 4)

var fragment = range.extractContents()
range.insertNode(document.createTextNode("aaaa"))
```



## DOM 编程最佳实践

### 平稳退化：无 JS 也正常加载页面

```html
<!--href设置为真实存在的-->
<a href="http://www.example.com"
    onclick="popUp('http://www.example.com'; return false;">Example3</a>
```



```js
/*
  弹出新窗口
*/
function popUp(winURL){
  /*
    open()有三个参数
    第一个参数：想在新窗口打开的网页的URL地址
    第二个参数：新窗口的名字
    第三个参数：以逗号分隔的字符，新窗口的各种属性。包括尺寸，工具条，菜单条，初始位置等
  */
  window.open(winURL,"popup","witdh=320,height=480")
}
```



### 页面结构与行文分离：引用外部文件

```html
<!--结构与行为分离-->
<a href="http://www.example.com" class="popup">Example4</a>
<script src="000_JS_prac2.js">  </script>
```



### 向后兼容：渐进增强

> 排除一些老旧浏览器执行 JS 不兼容的问题

```js
window.onload = prepareLinks; //加载完dom就执行
function prepareLinks() { //封装成一个函数来执行
  if(!docunment.getElementsByTagName) return false; //对象检查，浏览器是否认识这个用法.渐进增强原则，排除那些老的浏览器
  var links = document.getElementsByTagName("a"); //将所有连接放入一个数组
  for (var i = 0; i < links.length; i++) {  //遍历元素
    if (links[i].getAttribute("class") == "popup") {  //判断class为popup的元素
      links[i].onclick = function(){  //绑定事件
        popUp(this.getAttribute("href")); //调用popUp函数
        return false; //取消链接默认行为
      }
    }
  }
}
```



### 性能考虑

少访问DOM：试试能否用变量保存第一次访问DOM的结果，之后用变量来处理

减少标记：标记的增加必然增加BOM树的规模

合并脚本：多个脚本文件，最好组合在一起

脚本放置：放在</body>之前

压缩脚本文件：把脚本中不必要的字节，如空格、注释都删除。所以会有工作副本和精简副本两个版本文件。精简副本放在站点上,且在文件名上加上min

```js
XXXXX.min.js
```



### 结构化程序设计

理论上函数只有一个入口和出口，但是实际开发中，把多个出口（return）放在函数的开头部分，是可以接受的