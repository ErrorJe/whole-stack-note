# 基于 Vue 的 TS 应用

## 准备工作

### 创建基于 TS 的 vue 应用

#### 命令行方式

- 用 vue-cli 创建项目`vue create vue-ts`
- 项目安装选项：自定义，添加 TS， 基于类的组件，tslint

#### vue ui 可视化方式

`vue ui`启动可视化 vue 视图

- 创建项目，输入项目名，选择如 yarn 包管理器，初始化 git 仓库
- 预设，选择 自定义手动
- 功能，babel，ts，router，vuex，linter等
- 配置，类组件方式，TS babel，history路由模式，TSLint



### VScode 相应配置

- 下载 TSLint 插件。该插件介绍页面复制 `codeActionsOnSave`配置，保存时修复代码。
- 首选项 - 设置 - tsling - setting.json ，复制上面那段配置



### 项目文件结构

其他基本没变，多了几个配置文件

- tsconfig.json， 是 TS 编译的配置
  - ts 就是 JS 的超集，增加了类型检查
  - vue + jsx + ts = tsx
- tslint.json， TSLint 规则配置
- src 下的文件变成了 ts 文件
  - main.ts 内容没有变化
  - router.ts 也是一样的内容
  - shims.tsx.d.ts 解析 TSX 语法
  - shims.vue.d.ts，声明文件。特别的类加入后不报错
  - App.vue

```vue
<script lang="ts">
  // script 标签用 lang='ts' 来声明定义了
  import {Component, Vue} from 'vue-property-decorator'
  import HelloWorld from './components/HelloWorld.vue'
  
  // 逻辑和配置分开
  @Component({
    components:{
      HelloWorld,
    }
  })
  
  // 导出的是一个类
  export default class App extends Vue{

  }
</script>

```



## 组件创建

### 编写 TS 组件

#### 基于 TS  的vue组件模板

> 在 src/components 创建 `Hello.vue` 组件，来写 TS 代码
>
> 可以去 vscode 中配置简化生成代码指令，来快速生成 TS 下的vue组件模板

```vue
<tempalet>
  <div>

  </div>
</tempalet>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'

  @Component({
      name:'home',
      components:{}
  })
  export default class Hello extends Vue{

  }
</script>
<style scoped></style>
```

#### 静态类型注解

常见的内置类型

- string, number, boolean, void, any

```js
// 1 string 类型
let title:string; // 显式注解为 字符串类型
let name = 'xx'; // 类型推论，判断是一个 字符串

// 2 字符串或数字数组
let names:(string | number)[]; // Array<string>
names = ['xxx', 123]

// 3 任意类型：如不确定后端传的类型
let list:any[];

// 4 函数返回值类型 void 空
// 5 函数中的形参都是必须传的, name 必须传且有默认值， age 可选
function warn(name:string='wjy', age?:number):void {
  return name + age
}

// 6 函数重载：多个同名函数，通过参数数量和类型不同或返回值不同，视为不同的函数
function info(a:{name:string}):string{}
function info(a:string):string {}
```

#### 组件装饰器

```js
import {Component, Prop, Vue} from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
// 1 @Component 组件装饰器
@Component({
    components:{
        HelloWord // 组件注册
    }
})
export default class Hello extends Vue{
    // 2 子组件接受父组件的 props
    // private 当前类可用
    // protected 子类也可以用
    // public 都可以用
    @Prop() paivate msg!:string; // 属性 msg 必填，且是字符串类型（私有的作用域）
@Prop({default:'匿名'}) paivate name?:string; // 属性 name 可选，且有默认值
    @Prop() paivate obj:{foo:string} // 对象类型，对 foo 属性做限制

// readonly 只读属性。初始化的方式要么给默认值，要么在构造函数里去写
readonly foo:string='xxx'

// 3 普通的属性相当于组件的 data
private list = ['静态类型', '自动类型推论']

// 4 方法
addFn(event:any){
    this.list.push(event.target.value)
    event.target.value = ''
}

// 5 生命周期，直接写
created(){}
}
```



### 接口

> 接口仅约束结构，不要求实现

```js
interface Person{
	firstName:string,
	lastName:string
}

function gree(person:Person){
	return person.firstName + person.lastName	
}
```

类实现接口

```js
class Greeter implements Person {
  constructor(public firstName='', public lastName=""){}
  sayHello(){
    return this.firstName + this.lastName
  }
}

const user = new Greeter('a', 'b')
```



### 泛型（Generics）

> 在定义函数、接口或类时，不预先指定具体的类型，在使用的时候再指定类型的一种特性

``` js
interface Result<T>{
  ok:1,
  data:T[]
}
```

使用泛型

```js
// 异步调用
function getData<T>():Promise<Result<T>>{
  // 对 data 类型约束
  const data:any[] = [
    {id:1, name:'类型注解', v:'2.0'}
  ]
	return Promise.resolve({ok:1, data} as Result<T>)
}
```

使用中，指定 T 的类型

```js
private features: Feature[] = []; // 初始化
async created(){
  const result = await getData<Feature>()
  this.features = result.data
}
```



### 装饰器

> 就是工厂函数。传入一个对象，输出处理后的新对象

典型应用是 `@component`

```js
// 放在谁上面，就装饰谁
@Component
export default class Hello extends Vue{}

// 有可以传入配置对象
@Component({
  props:{
    name:{
      type:String,
      default:'匿名'
    }
  }
})
export default class Hello extends Vue{}
```



### @Emit

