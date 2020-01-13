# Vuex 状态管理器

就是让数据在所有组件，全局之间共享。

## （一）基本使用

> 1 基本配置 state, mutaions, getters, actions
> 2 使用
> 	store.state.xx 取值
> 	store.getters.xx 取值（计算属性）
> 	store.commit('xxx') 赋值（同步）
> 	store.dispatch('xxx') 赋值（可异步）
> 	Module：Vue.set 动态添加 state 到响应式数据中
> 3 对应的帮助方法
> 	mapState
> 	mapGetters
> 	mapMutations
> 	mapActions
> 	Module


### 1.安装

直接安装插件形式 `vue add vuex`， 根目录出现 `store.js`。在router.js中也会自动引入 `store.js`

### 2.基本用法

打开文件后，可以看到如下结构:

> state 定义和保存数据， 跟data很像。
> mutations 唯一修改数据的方式。只要有新数据出现，就要通过这个
> 	这里定义的方法，形参 `state`就是直接指向上面那个 state， 从而获取数据
> getters: 计算属性。对数据做加工处理，跟 computed 一样
> actions  异步操作。最后更改数据还是要通过 `commit()` 去通知`mutations`去提交更改数据
> 之后可能因为项目比较大会处理模块化。


#### 1）定义 store 变量

```javascript
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // 挂载插件

export default new Vuex.Store({
  // 想保存的全局数据
  state: {
    count: 1
  },
  // 计算属性
  mutations: {
    increase(state){
      state.count += 1 // 直接可以访问到 state 中的数据
    }
  },
  // 接口请求等异步操作
  actions: {
    // {state, commit} 实际上是解构了 store 这个实例
    increaseAsync({state, commit}, payload) {
      setTimeout(() => {
        commit('increase') // 还是要通过 commit 提交，修改数据
      }, 1000)
    }
  },
  // 对 state 中的数据进行加工 ， 跟 computed 很像
  getters: { 
    money: state => {
      return state.count + '元'
    }
  }
})
```

#### 2）全局注入

> 在这之前需要在根组件（main.js）下注入 store 选项，这样下面所有的子组件都能以上述方式拿到 store 的变量值


```javascript
// main.js
import Vue from 'vue'
import store from './store'
import App from './App.vue'

Vue.config.productionTip = false

// 创建实例的时候注入 store
new Vue({
  store,
  render:h => h(App),
}).$mount('#app')
```

#### 3）拿到 store 值

> 在任意组件中通过 `$store.state.xxx`拿到数据
> 但是要修改的话，就需要用到 `this.$store.commit('fn')`，这样才能触发在 `mutations` 中定义的方法来更改数据。也只有 `mutations`  才能更改数据。


```vue
<tempalet>
  <button @click="inc">vuex-incre</button>
  <button @click="incAsync">vuex-increAsync</button> <!--按了后1秒后变化-->
  <p>{{$store.state.count}}</p>
  <p>您的余额为{{$store.getters.money}}</p>
</tempalet>
<script>
  export default {
    methods: {
      inc() {
        this.$store.commit('increase')
      },
      incAsync() {
        this.$store.dispatch('increaseAsync')
      }
    },
  }
</script>
```

### 3.优化使用-帮助方法总览

#### 1）没有辅助方法的数据更新

> 需要配合 vue 实例的 `computed` 计算属性将拿到的 store 值更新到本实例中


```javascript
computed: {
  // 更新 count 变量
  count () {
    return this.$store.state.count
  }
}
```

#### 2）辅助方法的引入方式

> 通过 vuex 自带的一些库，来帮助简化 vuex 的使用方式。
> 不然的话获取多个 state 状态值，就要写很多的计算属性，就很冗余


```javascript
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  methods: {
    // 因为是在方法里定义的，所以要在这里写
    ...mapMutations(['increase']),
    ...mapActions(['increaseAsync']),
    inc() {
      // this.$store.commit('increase')
      this.increase()
    },
    incAsync() {
      // this.$store.dispatch('increaseAsync')
      this.increaseAsync()
    }
  },
  computed: {
    // mapState 返回的是一个对象，所以可以解构使用（计算属性名和 state 子节点名相同时）
    // 实际上返回的是 { count: this.$store.state.count }
    ...mapState(['count']),
    ...mapGetters(['money'])
  },
}
```

#### 3）辅助方法的使用方式

```html
<button @click="inc">vuex-incre</button>
<!-- 可以直接使用  increaseAsync -->
<button @click="increaseAsync">vuex-increAsync</button>
<p>{{$store.state.count}}</p>
<p>您的余额为{{$store.getters.money}}</p>
<!--数据也是直接使用-->
<p>mapState脱壳: {{count}}</p>
<p>mapGetters脱壳: {{money}}</p>
```

## （二）核心概念详解

### 1 State 状态值

> 不可直接拿出来修改，必须通过 `mutation` 来改变


#### 1）state 定义

```javascript
import Vue from 'vue'
import Vuex from 'vuex' // 1 引入依赖

Vue.use(Vuex) // 2 挂载插件

// 3 创建全局唯一的 store 状态树
const store = new Vuex.Store({
  // 4  state 列表
  state: {
    count: 0
  },
  // 5 更改 state 对应的 mutation 方法
  // # state 的值只能由这里定义的方法来更改
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

#### 2）根组件注入 store

要让所有子组件都注入 `store` ，就要去根组件以 store 选项的方式注入

```javascript
const app = new Vue({
  el: '#app',
  // # 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```

#### 3）组件中使用 state

需要用 `computed` 计算属性将得到的 state 值更新到响应式变量

```javascript
computed: {
  // 更新 count 这个变量
  count () {
    return this.$store.state.count
  }
}
```

#### 4）辅助函数 mapState

```javascript
// 1 引入方法
import {mapState} from 'vuex'

// 2 用法1：原生使用，多种情况的处理
export default {
  // 返回的是一个对象
  computed:mapState({
    // 2.1 箭头函数赋值更新
    count:state => state.count,
    // 2.2 字符串简写，与上一种作用一样
    countAlias:'count', // 相当于 state => state.count
    // 2.3 用到 this 获取子组件状态
    countPlus(state) {
      return state.count + this.count2
    }
  })
}

// 3 用法2：字符串数组简写
// 映射 this.count 为 store.state.count
export default {
  computed: mapState(['count'])
}

// 4 用法3：对象展开符极简
export default {
  computed:{
    localState(){}, // 局部变量计算属性
    ...mapState(['count']) // 最简形式
  }
}
```

### 2 Getter 计算属性（派生状态）

#### 1）定义方式

```javascript
// ...
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  // 相当于是 state 的计算属性， 对外暴露的 API 是 store.getters.xx
  // 参数除了当前的 state， 还可以引用其他 getters 方法
  getters: {
    doneTodos: (state, getters) => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

#### 2）组件中通过属性访问 store.getters.xx

```javascript
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

#### 3）组件中通过方法访问

> 通过让 getter 方法返回一个函数，去接受一个参数用于查询计算


```javascript
getters: {
  // 返回一个接受 id 参数的方法
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```

组件中使用

```javascript
store.getters.getTodoById(2)
```

#### 4）辅助函数 mapGetters

> 将 store 中的 getter 映射到了局部组件的计算属性中


```javascript
// 1 引入方法
import { mapGetters } from 'vuex'

export default {
  computed: {
    // 2 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(['doneTodosCount','anotherGetter'])
  }
}
```

如果觉得从 store 来的 getter 属性名太复杂，可以取别名。但是要使用 `mapGetter` 的方法传入对象

```javascript
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

在组件中使用，就直接`this.xxx`了，已经成为当前组件的局部状态了

```html
<view>{{doneCount}}</view>
```

### 3 Mutation 控制 state

> 只有 mutation 才能更改 state
> 每个 mutation 理解为事件注册，只有触发了该类型的事件，才会触发该类型事件的回调函数
> 重要的一点是，mutation 必须是同步事务。因为在 devtools 需要捕获和时间旅行


#### 1）定义 mutation

```javascript
// 定义了很多 mutation 的替代常量，如 export const SOME_MUTATION = "SOME_MUTATION"
import {SOME_MUTATION} from './mutation-types' 

const store = new Vuex.Store({
  state: {
    count: 1
  },
  // 1 对外暴露 API 为 store.commit('increment')。意思是触发该事件执行其回调逻辑
  // # 第一个参数是 state， 第二个参数叫 载荷，就是额外传入的参数
  // # 对应有载荷的触发事件， store.commit('increment', {count:10})
  mutations: {
    increment (state, n) {
      state.count += n.count // 2 变更状态
    },
    // 2 一般使用常量去替代 mutation 中的事件类型
    // # ES6 计算属性命名功能，使用一个常量作为函数名
    [SOME_MUTATION](state){}
  }
})
```

#### 2）提交 mutation 方式

```javascript
// 1 无载荷直接触发
store.commit('increment')

// 2 有载荷参数
store.commit('increment', {count:10})

// 3 对象形式
store.commit({
  type: 'increment',
  amount: 10
})
```

#### 3）遵循 vue 响应式和常量事件类型

就是出现需要在对象上添加新属性的情况

```javascript
// 1 Vue.set
Vue.set(obj, 'newProp', 123)

// 2 对象扩展，新属性覆盖旧属性
state.obj = { ...state.obj, newProp: 123 }
```

用常量替代 mutation 事件类型

```javascript
// 1 一个放常量的文件导出
export const SOME_MUTATION = 'SOME_MUTATION'

// 2 导入常量
import { SOME_MUTATION } from './mutation-types'

// 3 动态匹配类型
mutations: {
  // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
  [SOME_MUTATION] (state) {
    // mutate state
  }
}
```

#### 4）组件中使用

```javascript
// 1 直接使用（前提是在根组件中注入了 store）
this.$store.commit('xxx')

// 2 辅助函数，mapMutations，导入
import { mapMutations } from 'vuex'

// 3 是作为 methods 方法，对象展开符

methods:{
  ...mapMutations(['increment']), // 4 在组件中就可以直接使用 this.increment
  ...mapMutations({ // 5 对象形式取别名
    add:'increment'
  })
}
```

### 4 Action 提交 mutation 事务（可异步）

> 在 store 中，只有 Mutation 可以更改 state。
> action 只是比 mutation 多了处理异步的能力，结果是提交 mutation ，最后由 mutation 去控制 state。
> dispatch 这个分发函数，返回的是 promise


#### 1）注册 action

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  // 1 参数 context 就是该 Store 实例。可以调用 context.[commit/state/getters]
  // 2 对外暴露 store.dispatch() 来触发
  actions: {
    // 3 可以解构对象
    increment ({commit, state, getters}, n) { 
      // 4 action 中可以有异步操作
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
})
```

#### 2）action 分发操作

```javascript
// 1 载荷方式
store.dispatch('incrementAsync', {
  amount: 10
})

// 2 对象方式
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

#### 3）组件中使用

```javascript
// 1 直接使用，先引入方法
this.$store.dispatch('xxx')

// 2 辅助函数， 先导方法
import { mapActions } from 'vuex'
// 3 也是 methods
methods:{
  ...mapActions(['increment']), // 4 本组件中直接使用 this.increment()
  // 5 对象形式取别名
  ...mapActions({
    add: 'increment'
  })
}
```

#### 4）异步控制

> dispatch 返回的是 promise


```javascript
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

使用方式

```javascript
store.dispatch('actionA').then(() => {
  // ...
})
```

### 5 Module 分割 store 模块

每个 module 都拥有自己的`state, getters, mutation, action`，

文件路径上可能是 `store/modules/index.js`和`store/modules/x1.js`

还有更复杂的模块嵌套，可以看文档学习

#### 1）模块定义

> 作为模块的话，命名空间 `spacenamed`是必须开启的


- moduleA.js

```javascript
// 1 mutation 和 getter 第一个参数是本模块的状态对象
const moduleA = {
  // 开启命名空间
  // 模块存在嵌套。所以定义命令控件可以提高模块的重用性
  namespaced:true, 
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  },
  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
export default moduleA
```

- moduleB.js

```javascript
// 2 action, 根节点状态在 context 中
const moduleB = {
  namespaced:true, // 开启命名空间
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
export default moduleB
```

- index.js

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
// 引入上面2个模块
import moduleA ftom './a'
import moduleB ftom './b'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    moduleA,
    moduleB
  }
})
```

#### 2）main.js 中引入

> 模块中的局部参数，可以拿到根节点状态s


```javascript
import Vue from 'vue'
import App from './App.vue'
import store from '@store/modules/index'

Vue.config.productionTip = false

new Vue({
	store, 
  render:h=>h(App)
}).$mount('#app')
```

#### 3）实际使用

```
{{$store.state.moduleA.count}}
```

- 辅助函数普通用法（假设模块是 inquiry）

```javascript
// 还是引入的
import { mapState, mapActions } from 'vuex'

computed: {
  ...mapState({
    a: state => state.inquiry.a,
    b: state => state.inquiry.b
  })
},
methods: {
  ...mapActions('inquiry', ['getInfo']),
}
```

- vue 提供的该命名空间的辅助方法

```javascript
// 若 getter 是单独文件导出的，则普通方式引入 mapGetters
import { createNamespacedHelpers, mapGetters } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('inquiry')

computed: {
  ...mapState({
    a: state => state.name,
    b: state => state.iqrResList
  }),
  ...mapGetters(['iqrList'])
}
methods: {
  ...mapActions(['getInfo']),
  ...mapMutations(['SET_IQRLIST'])
}
```


