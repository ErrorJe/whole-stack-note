# Vue 函数式组件和 JSX 应用

## 函数式组件

> 没有模板`template`，必须用 render 函数去渲染 HTML



### 基本认识

#### 创建函数式组件和 h 函数

作为组件的一种，用的是 JSX 语法，其实也就是模仿的 React JSX。当然文件是 JS 而不是 vue 了。

- h 函数就是 createElement 渲染函数

> 参数1：标签；
> 参数2：标签属性；主要包括：props, attrs, dom props, class 和 style
> 参数3：子节点


```javascript
// @/component/jsx.js
export default {
  props: {
    t: {}
  },
  render(h) {
    let tag = "h"+this.t;
    
    return h(tag, {}, this.$slots.default)
  }
};
```



#### 父组件引入方式

其他都是一样的，无非就是引入的时候注意文件后缀是 JS。

然后传入这个标题级别(h1-h6)

```vue
<template>
  <div id="app">
    <jsx :t="1">xx</jsx>
    <jsx :t="2">xx</jsx>
    <jsx :t="3">xx</jsx>
    <jsx :t="4">xx</jsx>
  </div>
</template>

<script>
import jsx from './components/jsx.js';
export default {
  components: {
    jsx
  }
};
</script>
<style></style>
```



### 用 JSX 的方式定制组件

> IView 组件库用这种方式比较多



#### 父组件自定义 render 方法

- 引入 List 组件用来渲染 li 列表
- 自定义并给子组件传入 render 方法
- JSX 渲染时的表达式为 `{}`

```vue
<template>
  <div id="app">
    <list :data="['苹果', '香蕉', '犁头']" :render="render"></list>
  </div>
</template>

<script>
import List from './components/List.vue';
export default {
  components: {
    List
  },
  methods: {
    // 用户自定义的 render 方法
    // 不用理会 h, 但却是必须传入的参数
    // 只要告诉用户 data 是在 List 组件中每次循环出来的结果
    // 作用就是可以在外面（父组件）定义子组件内部的渲染方式
    render(h, data) {
      // 因为是 JSX 语法，所以就是在写 JS。不能直接用模板语法
      // 绑定事件用 on-*
      // 如果某个组件库自定义的事件为 on-enter， 则要写成 onOn-enter
      return <h1 on-click="fn">{data}</h1>
    }
  },
};
</script>
<style></style>
```



#### 子组件 List.vue

- 接受父组件传来的数组和方法，并进行列表渲染
- 以`是否接受到父组件的 render 方法`判断是否要屏蔽渲染默认的 li 列表
- 引入 ListItem.js  函数式组件，将 render 方法和每次循环的值 item 传入

```vue
<template>
  <div>
    <template v-for="(item, index) in data">
      <!-- 当父组件传入自定义的 render 时，屏蔽默认的 li 显示 -->
      <li :key="index" v-if="!render">{{item}}</li>
      <!-- 将每次循环的值也传入 jsx -->
      <list-item v-else :key="`a${index}`" :render="render" :item="item"></list-item>
    </template>
  </div>
</template>

<script>
// 引入函数式组件
import ListItem from "./ListItem";
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    render:{
      type:Function
    }
  },
  components: {
    ListItem
  }
};
</script>
```



#### 函数式组件 ListItem.js

```javascript
export default {
  props:{
    render:{
      type:Function
    },
    item:{
      type:String
    }
  },
  render(h){
    // 调用引入的 render 方法
    return this.render(h, this.item)
  }
}
```



### element-ui 作用域插槽

> element-ui 用这种方式比较多
> 相当于数据在子组件中执行，然后传出来给父组件用



#### List 组件改装

基于上面的 List 组件稍微调整下，使用 `slot` 的方式给用户留空

- 通过 slot 给父组件传递了 item 这个变量数据

```vue
<template>
  <div>
    <template v-for="(item, index) in data">
      <slot name:'list' :item="item"></slot>
    </template>
  </div>
</template>

<script>
// 引入函数式组件
import ListItem from "./ListItem";
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
};
</script>
```



#### 父组件

- 解构出 slot 中的数据对象，然后定制化使用
- 普通插槽是在父组件中执行，作用域插槽是在子组件中执行，所以可以拿到子组件数据

```vue
<List :data="['苹果', '香蕉', '犁头']">
	<!-- 其实就是个回调函数 -->
  <template v-slot:list="{item}">
  	<span>{{item}}</span>
  </template>
</List>
```



## iView 可编辑表格的实现

> 自己感受下就 OK


```vue
<template>
<Table :columns="columns" :data="data"></Table>
</template>

<script>
  export default {
    // 主要是这里的 render 方法
    methods: {
      render(h, { row, column, index }) {
        return <div class="a" on-click={(e)=>this.handleChangeIndex(e,index)}>
      {
      this.currentIndex === index?
      <i-input onOn-enter={()=>this.enter(row, column, index )} value={row[column.key]} on-input={(value)=>this.handleChange(row, column,value)}/>:
  <span>{row[column.key]}</span>
  }
  </div>
  },
    handleChange(row, column,value){
      row[column.key] = value; // 只能自己实现双向数据绑定
    },
      enter(row, column, index){
        this.currentIndex = -1;
        // 修改 把当前索引 这一项 1 改成row
        this.data.splice(index,1,row)
      },    
        handleChangeIndex(e,index){ // 函数的methods 已经被bind过了
          this.currentIndex = index;
          this.$nextTick(()=>{
            e.currentTarget.getElementsByTagName('input')[0].focus();
          })
        }
  },
    data() {
      return {
        currentIndex:-1,
        columns: [
          {
            title: "Name",
            key: "name",
            render: this.render
          },
          {
            title: "Age",
            key: "age"
          },
          {
            title: "Address",
            key: "address"
          }
        ],
        data: [
          {
            name: "John Brown",
            age: 18,
            address: "New York No. 1 Lake Park",
            date: "2016-10-03"
          },
          {
            name: "Jim Green",
            age: 24,
            address: "London No. 1 Lake Park",
            date: "2016-10-01"
          },
          {
            name: "Joe Black",
            age: 30,
            address: "Sydney No. 1 Lake Park",
            date: "2016-10-02"
          },
          {
            name: "Jon Snow",
            age: 26,
            address: "Ottawa No. 2 Lake Park",
            date: "2016-10-04"
          }
        ]
      };
    }
  };
</script>
```
