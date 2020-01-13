# v-tooltip 中文文档翻译

# 一、开始使用 v-tooltip

[https://github.com/Akryum/v-tooltip](https://github.com/Akryum/v-tooltip)

## （一）Node 环境

`npm i -save v-tooltip` 安装依赖

### 1 全局注册插件

```javascript
import Vue from 'vue'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
```

### 2 解构引入组件和指令

除了全部引入还可以解构出组件或者指令分别引入

```javascript
import Vue from 'vue'
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'

Vue.directive('tooltip', VTooltip)
Vue.directive('close-popover', VClosePopover)
Vue.component('v-popover', VPopover)
```

## （二）浏览器环境

CDN 引入插件 `<script src="https://unpkg.com/v-tooltip"></script>`

如果在该页面被检测到有 `vue` ，那么该插件会自动注册。如果没有反应，可以手动注册

```javascript
// 手动注册
Vue.use(VTooltip)

// 或者按需注册
Vue.directive('tooltip', VTooltip.VTooltip)
Vue.directive('close-popover', VTooltip.VClosePopover)
Vue.component('v-popover', VTooltip.VPopover)
```

## （三）样式选择

是两种CSS编译器的样式示例。

举例了主要的几个样式类，如 `tooltip-inner`，就是弹出的主内容区

### 1 Sass / Less

```css
.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, .1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}
```

### 2 CSS

```javascript
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
```

# 二、用法

指令与组件的使用区别：指令通过配置对象来实现定制，组件通过元素属性来实现定制。

本质上是一样的。

## （一）指令方式

### 1 基本使用方式

#### 1）在 template 模板中

同时支持静态字符串或者是响应式属性

```javascript
<template>
	<div>
  	<button v-tooltip="'You have 2 new messages.'"></button>
  	<button v-tooltip="msg"></button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      msg:'tooltip'
    }
  }
}
</script>
```

#### 2）修饰符列表

用修饰符来指定方位

`<button v-tooltip.bottom-start="'xxxxx'">`

还有其他：

- `'auto'`
- `'auto-start'`
- `'auto-end'`
- `'top'`
- `'top-start'`
- `'top-end'`
- `'right'`
- `'right-start'`
- `'right-end'`
- `'bottom'`
- `'bottom-start'`
- `'bottom-end'`
- `'left'`
- `'left-start'`
- `'left-end'`

### 2 配置对象形式

上面的方式可以传入响应式属性或者是静态的字符串，其实还可以传入一个对象。通过对象属性 `options` 的配置来个性化定制 tooltip 的功能

```vue
<button v-tooltip="{ content: 'You have new messages.' }"></button>
```

- content 显示的文本。可以是返回值或者 promise 的函数
- classes 动态渲染样式类，有三种用法
  - `classes: 'a b'` 空格隔开两个样式类
  - `classes: ['a', 'b']` 数组形式
  - `classes: tooltipClasses`放一个响应式数据
- targetClasses 将样式类添加到目标元素中
- html 是否允许显示 HTML 内容
- delay 显隐延迟时间 ，可以分开来写
  - `{ show: 500, hide: 100 }`
- placement 就是显示方位，值看上面的修饰符列表
- trigger 触发气泡的事件。多个事件之间用空格分隔
  - 支持4个事件类型： `hover, click, focus, manual`
  - 另外`manual`事件只能单独使用。`trigger: 'manual'`。这是手动操作的意思
    - 该事件用于手动触发，就要跟 `show`字段一起使用

```javascript
<button
  v-tooltip="{
    content: 'Tooltip content here',
    show: isOpen,
    trigger: 'manual',
  }"
>A button</button>
```

- show 是否显示 tooltip， 该字段用于手动控制
- offset 位置偏移 (px)
- container 目标容器（选择器）
- template 内容模板，相当于自己定义了一个气泡
- arrowSelector 用于获取模板气泡的箭头的CSS选择器
- innerSelector 用于获取模板气泡的内容的CSS选择器
- boundariesElement 气泡边界的 DOM
- autoHide 是否在鼠标悬停事件发生时关闭气泡
  - 默认情况下，当 `trigge` 中包含了 `hover`事件，再次触发悬停或点击就会把气泡关闭
- hideOnTargetClick 是否在鼠标点击事件发生时关闭气泡
- loadingClass 异步加载内容时的样式
- loadingContent 跟`content`作用一样，只是用于放异步操作没有结束时的显示内容

```vue
<button
  v-tooltip="{
    content: asyncMethod(),
    loadingContent: 'Please wait...',
    loadingClass: 'content-is-loading',
  }"
>Hover me!</button>
```

### 3 移动端

处于性能之类的考虑，可能会选择适配到移动端时，禁止气泡功能。

那么在全局注册的时候，可以去设置一下适配。

```javascript
VTooltip.enabled = window.innerWidth > 768
```

## （二）组件方式

### 1 组件形式的基本结构

使用组件 `v-popover`

```vue
<!-- 0 对于 v-popover 是跟之前 v-tooltip 指令一样都是可配置的 -->
<v-popover
  offset="16"
>
  <!-- 1 气泡作用于该元素上 -->
  <button class="tooltip-target b3">Click me</button>

  <!-- 2 就是气泡模板r -->
  <template slot="popover">
    <input class="tooltip-content" v-model="msg" placeholder="Tooltip content" />
    <p>{{ msg }}</p>

    <!-- 3 还可以放其他组件，就是一个插槽空位 -->
    <ExampleComponent char="=" />
  </template>
</v-popover>
```

可以按照以下的样式类去覆盖默认样式, `&` 指代父类

```scss
.tooltip {
  // ...

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, .1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }
}
```

还可以注意下箭头的层级`.tooltip-arrow { z-index: 1;}`

### 2 v-popover 组件属性

跟 `v-tooltip`类似，也有一点不同

- `open` - 显隐控制
- `disabled` - 是否禁用

```vue
<v-popover :disabled="true"></v-popover>
```

- `placement` - 同 v-tooltip
- `delay` - 同 v-tooltip
- `trigger` - 同 v-tooltip
- `offset` -  同 v-tooltip
- `container` -  同 v-tooltip
- `boundariesElement` -  同 v-tooltip
- `popperOptions` - 同 v-tooltip
- `popoverClass` - 使用此选项将不同的主题应用于弹出窗口。
- `popoverBaseClass` - 样式基类。(默认是 `'tooltip popover'`).
- `popoverWrapperClass` - 包含箭头和内部内容的元素的类
- `popoverArrowClass` - 箭头元素的类
- `popoverInnerClass` - 气泡内容区元素的类
- `autoHide` - 如果在外面单击，则隐藏弹出窗口
- `handleResize` - 是否在弹窗大小改变后，自动调整弹出位置
  - 配合事件 `resize`，在弹窗大小改变后触发
- `openGroup` - 若设置了分组，将会统一关闭某组别的气泡和弹窗
- `openClass` - 气泡弹出窗口时的类

### 3 组件的事件

- `update:open(Boolean)` - 允许在弹窗中使用 `.sync` 修饰符
- `show`
- `apply-show` - 在延迟显示后触发
- `hide`
- `apply-hide` - 在延迟隐藏后触发
- `dispose`
- `auto-hide` - 在弹窗外面点击时触发
- `close-directive` - 当使用了 close 指令关闭弹窗时触发
- `close-group` - 弹出窗口关闭时发出，因为显示了另一个开放组的弹出窗口。
- `resize` - 如上

### 4 关闭指令 v-close-popover

```vue
<v-popover>
  <button>Click me</button>

  <template slot="popover">
		<!-- 默认禁用方式 -->
    <a v-close-popover>Close</a>
		<!-- 启用/禁用 操作 -->
    <a v-close-popover="false">Close</a>
    <a v-close-popover="true">Close</a>
		<!-- 使用响应属性 -->
		<a v-close-popover="myBooleanProp">Close</a>
		<!-- .all 修饰符关闭所有弹出窗口 -->
		<a v-close-popover.all>Close All</a>
  </template>
</v-popover>
```

# 三、补充内容

## （一）tooltip 所有配置属性

```json
{
  // Default tooltip placement relative to target element
  defaultPlacement: 'top',
  // Default CSS classes applied to the tooltip element
  defaultClass: 'vue-tooltip-theme',
  // Default CSS classes applied to the target element of the tooltip
  defaultTargetClass: 'has-tooltip',
  // Is the content HTML by default?
  defaultHtml: true,
  // Default HTML template of the tooltip element
  // It must include `tooltip-arrow` & `tooltip-inner` CSS classes (can be configured, see below)
  // Change if the classes conflict with other libraries (for example bootstrap)
  defaultTemplate: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  // Selector used to get the arrow element in the tooltip template
  defaultArrowSelector: '.tooltip-arrow, .tooltip__arrow',
  // Selector used to get the inner content element in the tooltip template
  defaultInnerSelector: '.tooltip-inner, .tooltip__inner',
  // Delay (ms)
  defaultDelay: 0,
  // Default events that trigger the tooltip
  defaultTrigger: 'hover focus',
  // Default position offset (px)
  defaultOffset: 0,
  // Default container where the tooltip will be appended
  defaultContainer: 'body',
  defaultBoundariesElement: undefined,
  defaultPopperOptions: {},
  // Class added when content is loading
  defaultLoadingClass: 'tooltip-loading',
  // Displayed when tooltip content is loading
  defaultLoadingContent: '...',
  // Hide on mouseover tooltip
  autoHide: true,
  // Close tooltip on click on tooltip target?
  defaultHideOnTargetClick: true,
  // Auto destroy tooltip DOM nodes (ms)
  disposeTimeout: 5000,
  // Options for popover
  popover: {
    defaultPlacement: 'bottom',
    // Use the `popoverClass` prop for theming
    defaultClass: 'vue-popover-theme',
    // Base class (change if conflicts with other libraries)
    defaultBaseClass: 'tooltip popover',
    // Wrapper class (contains arrow and inner)
    defaultWrapperClass: 'wrapper',
    // Inner content class
    defaultInnerClass: 'tooltip-inner popover-inner',
    // Arrow class
    defaultArrowClass: 'tooltip-arrow popover-arrow',
    // Class added when popover is open
    defaultOpenClass: 'open',
    defaultDelay: 0,
    defaultTrigger: 'click',
    defaultOffset: 0,
    defaultContainer: 'body',
    defaultBoundariesElement: undefined,
    defaultPopperOptions: {},
    // Hides if clicked outside of popover
    defaultAutoHide: true,
    // Update popper on content resize
    defaultHandleResize: true,
  },
}
```

You can change the options during install with the arguments:

```
import VTooltip from 'v-tooltip'
Vue.use(VTooltip, options)
```

Or directly on package:

```
import VTooltip from 'v-tooltip'
// Set custom CSS class
VTooltip.options.defaultClass = 'my-tooltip'
```

## （二）在线示例

[https://akryum.github.io/v-tooltip/#/](https://akryum.github.io/v-tooltip/#/)


## （三）实战经验
### 1 只能由鼠标控制显隐
这是在 `vue` 中的写法， 主要的控制属性 

- show 控制显隐
- trigger 绑定 manual 事件
- click 点击事件，控制绑定 show 属性的变量改变

```html
<span
  v-tooltip.bottom="{
  	content: multi.annotation,
    show: multi.isTipShow,
    trigger: 'manual',
  }"
	style="color: #999999;font-size: 12px; text-decoration: underline;"
  @click="multi.isTipShow=!multi.isTipShow"
>名词解释</span>
```

### 2 鼠标点击时关闭气泡
绑定的事件改为 `click` ，使用属性 `hideOnTargetClick` <br />点击该气泡会显示，然后点击其他任意地方（触发click事件就行），就会关闭

```html
<span
  v-tooltip.bottom="{
 	 	content: multi.annotation,
    hideOnTargetClick:true,
    trigger: 'click',
  }"
  style="color: #999999;font-size: 12px; text-decoration: underline;"
>名词解释</span>
```

