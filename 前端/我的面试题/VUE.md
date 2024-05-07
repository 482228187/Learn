# 四、VUE

## 1. [vue生命周期](https://juejin.cn/post/7208823936300482619)

Vue2 的生命周期主要是：

> 1. beforeCreate：创建实例之前调用，此时实例的数据观测、事件等还未初始化。
> 2. created：创建实例后调用，此时实例的数据观测、事件等已经初始化完成。
> 3. beforeMount：挂载实例之前调用，此时模板已经编译完成，但是还未挂载到DOM。
> 4. mounted：挂载实例后调用，此时实例已经挂载到DOM，可以进行DOM操作。
> 5. beforeUpdate：数据更新之前调用，此时可以进行状态的最后更改。
> 6. updated：数据更新后调用，此时DOM已经完成更新，可以进行DOM操作。
> 7. beforeDestroy：销毁实例之前调用，此时实例仍然完全可用。
> 8. Destoryed: 销毁实例后调用，此时实例已经完全卸载。

而 `vue3` 在 `vue2` 的基础上进行了一些改变，主要是针对最后两个生命周期：

> beforeDestroy -> beforeUnmount
>
> Destoryed -> Unmounted

另外 `options API` 和 `composition API` 在生命周期上也有一些小的不同：

> `composition API` 提供了 `setup` 函数作为入口函数，替换了 `beforeCreate` 和 `created` 这两个生命周期钩子。**`composition API`中的钩子函数，通过在生命周期钩子前面加上 `on` 来访问组件的生命周期钩子**。需要注册，并且只能在 `setup` 期间同步使用

## 2，vue3新特性

![image](../../../../../%E7%A0%94%E7%A9%B6%E7%94%9F/%E7%A0%94%E4%BA%8C%E4%B8%8B/%E6%89%BE%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/assets/b65c1b29af3e43cc901e72ac5db7fb47-tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.awebp) 

[图来源](https://juejin.cn/post/7103740259925491742)

## 3.vue3性能优化体现在哪几个方面

### 1、编译阶段优化

##### ① **diff算法优化**

`vue3`在`diff`算法中相比`vue2`增加了`静态标记`，其作用是为了会发生变化的地方添加一个`flag标记`，下次发生变化的时候`直接`找该地方进行比较。

##### ② **静态提升**

**Vue3中对`不参与更新`的元素，会做静态提升，`只会被创建一次`，在渲染时直接复用。**免去了重复的创建操作，优化内存。

没做静态提升之前，未参与更新的元素也在`render函数`内部，会重复`创建阶段`。
 做了静态提升后，未参与更新的元素，被`放置在render 函数外`，每次渲染的时候只要`取出`即可。同时该元素会被打上`静态标记值为-1`，特殊标志是`负整数`表示永远不会用于 `Diff`。

##### ③ **事件监听缓存**

默认情况下绑定事件行为会被视为动态绑定（`没开启事件监听器缓存`），所以`每次`都会去追踪它的变化。`开启事件侦听器缓存`后，没有了静态标记。也就是说下次`diff算法`的时候`直接使用`。

##### ④ **SSR优化**

当静态内容大到一定量级时候，会用`createStaticVNode`方法在客户端去生成一个`static node`，这些`静态node`，会被直接`innerHtml`，就不需要创建对象，然后根据对象渲染。

#### **2、源码体积**

相比`Vue2`，`Vue3`整体体积`变小`了，除了移出一些`不常用的API`，最重要的是`Tree shanking`。

任何一个函数，如`ref、reavtived、computed`等，仅仅在`用到`的时候才`打包`，`没用到`的模块都`被摇掉`，打包的整体体积`变小`。

#### **3、响应式系统**

`vue2`中采用 `defineProperty`来劫持整个对象，然后进行深度遍历所有属性，给`每个属性`添加`getter和setter`，实现响应式。`vue3`采用`proxy`重写了响应式系统，因为`proxy`可以对`整个对象进行监听`，所以不需要深度遍历。

## 3. Vue3 里为什么要用 Proxy API 替代 defineProperty API ？（响应式原理）

[可详细参考博客](https://juejin.cn/post/7201334455058923580)

1、`vue2`中采用 `defineProperty`来劫持整个对象，然后进行深度遍历所有属性，给每个属性添加getter和setter，实现响应式。但是存在以下的问题：

- 检测不到对象属性的添加和删除
- 数组API方法无法监听到
- 需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题

2、proxy：监听是针对一个对象的，那么对这个对象的所有操作会进入监听操作。

- Proxy直接可以劫持整个对象，并返回一个新对象，通过操作新的对象达到响应式目的
- Proxy可以直接监听数组的变化（push、shift、splice）
- Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等，这是Object.defineProperty不具备的

 **Proxy 只会代理对象的第一层，那么 Vue3 又是怎样处理这个问题的呢？**

判断当前 Reflect.get 的返回值是否为 Object，如果是则再通过 reactive 方法做代理， 这样就实现了深度观测。

## 4. `watch` 和 `watchEffect`区别

`watch` 和 `watchEffect` 都是监听器，`watchEffect` 是一个副作用函数。它们之间的区别有：

- `watch` ：要指明监视的数据源和监视的回调。而 `watchEffect` 可以自动监听数据源作为依赖。不用指明监视哪个数据，监视的回调中用到哪个数据，那就监视哪个数据。
- `watch` 可以访问`改变之前和之后`的值，`watchEffect` 只能获取`改变后`的值。
- `watch` 运行的时候`不会立即执行`，值改变后才会执行，`watch` 可以通过的配置项 `immediate` 改变。 而 `watchEffect` 运行后可`立即执行`。 

![1712657464627](../../../../../%E7%A0%94%E7%A9%B6%E7%94%9F/%E7%A0%94%E4%BA%8C%E4%B8%8B/%E6%89%BE%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/assets/1712657464627.png)

图来源于网络

## 5.  v-if 和 v-for 的优先级哪个高

在 `vue2` 中 `v-for` 的优先级更高，但是在 `vue3` 中优先级改变了。`v-if` 的优先级更高。

## 6.  script setup 是干啥的？

`scrtpt setup` 是 `vue3` 的语法糖，简化了`组合式 API` 的写法，并且运行性能更好。使用 `script setup` 语法糖的特点：

- 属性和方法无需返回，可以直接使用。
- 引入`组件`的时候，会`自动注册`，无需通过 `components` 手动注册。
- 使用 `defineProps` 接收父组件传递的值。
- `useAttrs` 获取属性，`useSlots` 获取插槽，`defineEmits` 获取自定义事件。
- 默认`不会对外暴露`任何属性，如果有需要可使用 `defineExpose` 。

## 7. Vue2/Vue3组件通信方式？

[参考](https://juejin.cn/post/7133250560441974798)

| 方式             | Vue2           | Vue3                 |
| ---------------- | -------------- | -------------------- |
| 父传子           | props          | props                |
| 子传父           | $emit          | emits                |
| 父传子           | $attrs         | attrs                |
| 子传父           | $listeners     | 无(合并到 attrs方式) |
| 父传子           | provide/inject | provide/inject       |
| 子组件访问父组件 | $parent        | $parent              |
| 父组件访问子组件 | $children      | 无                   |
| 父组件访问子组件 | $refs          | expose&ref           |
| 兄弟传值         | EventBus       | mitt                 |

 此外还有插槽、v-model 实现父子组件之间的通信，组件还可以借助Vuex或者Pinia状态管理工具进行通信 

 

## 8. vue3 理解ref与reactive 、toRef 和 toRefs？

- `ref` 函数创建的响应式数据，在模板中可以直接被使用，在 `JS` 中需要通过 `.value` 的形式才能使用。
- `ref` 函数可以接收**原始数据类型**与**引用数据类型**。
- `reactive` 函数只能接收**引用数据类型**。
- `ref` 底层还是使用 `reactive` 来做，`ref` 是在 `reactive` 上在进行了封装，增强了其能力，使它支持了对原始数据类型的处理。
- 在 `Vue3` 中 `reactive` 能做的，`ref` 也能做，`reactive` 不能做的，`ref` 也能做。

`toRef`：针对一个响应式对象的属性创建一个ref，使得该属性具有响应式，两者之间保持引用关系。 

`toRefs`： 将一个**响应式对象**转为普通对象，对象的每一个属性都是对应的ref，两者保持引用关系

## 9. 谈一谈对 MVVM 的理解？

MVVM是`Model-View-ViewModel`缩写，也就是把`MVC`中的`Controller`演变成`ViewModel`。Model层代表数据模型，View代表UI组件，ViewModel是View和Model层的桥梁，数据会绑定到viewModel层并自动将数据渲染到页面中，视图变化的时候会通知viewModel层更新数据。

![img](../../../../../%E7%A0%94%E7%A9%B6%E7%94%9F/%E7%A0%94%E4%BA%8C%E4%B8%8B/%E6%89%BE%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/assets/dc2d066951ae47a5aa9944b9321bf7e9-tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.awebp)

## 10 vue优点

主要有响应式编程、组件化开发、虚拟 DOM

**响应式编程：** Vue 会自动对页面中某些数据的变化做出响应。通过MVVM 思想实现数据的双向绑定，开发者不用再操作 DOM 对象，有更多的时间去思考业务逻辑。

**组件化开发**： Vue 通过组件，把一个单页应用中的各种模块拆分到一个一个单独的组件中，只要先<u>在父级应用中写好各种组件标签</u>（占坑），可在组件标签中写好要传入组件的参数 ，然后再分别写好各种组件的实现 （填坑），组件化开发可以<u>提高开发效率、方便重复使用、简化调试步骤、提升整个项目的可维护性、便于协同开发</u>。

虚拟DOM： **预先通过 JavaScript 进行各种计算，把最终的 DOM 操作计算出来并优化**，由于这个 DOM 操作属于预处理操作，**并没有真实的操作 DOM，所以叫做虚拟 DOM**。最后在**计算完毕才真正将 DOM 操作提交**，将 DOM 操作变化反映到 DOM 树上。

## 11. *Vue* 实现双向数据绑定原理是什么？

> **Vue2.x 采用数据劫持结合发布订阅模式（PubSub 模式）的方式，通过 Object.defineProperty 来劫持各个属性的 setter、getter，Vue3.x 使用 Proxy，在数据变动时发布消息给订阅者，触发相应的监听回调。**

关键步骤：  

```
1、实现一个监听器 Observer ，用来劫持并监听所有属性，如果属性发生变化，就通知订阅者；
2、实现一个订阅器 Dep，用来收集订阅者，对监听器 Observer 和 订阅者 Watcher 进行统一管理；
3、实现一个订阅者 Watcher，可以收到属性的变化通知并执行相应的方法，从而更新视图；
4、实现一个解析器 Compile，可以解析每个节点的相关指令，对模板数据和订阅器进行初始化。
```



![img](../../../../../%E7%A0%94%E7%A9%B6%E7%94%9F/%E7%A0%94%E4%BA%8C%E4%B8%8B/%E6%89%BE%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/assets/41c57ebf87764193b1be2c7e1e0d4165-tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.awebp) 

## 12. 直接给一个数组项赋值，Vue 能检测到变化吗？

由于 JavaScript 的限制，Vue 不能检测到以下数组的变动：

- 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
- 当你修改数组的长度时，例如：`vm.items.length = newLength`

为了解决第一个问题，Vue 提供了以下操作方法：

```
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

为了解决第二个问题，Vue 提供了以下操作方法：

```
// Array.prototype.splice
vm.items.splice(newLength)
```

## 13 Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？

使用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式 property。例如

```
Vue.set(vm.someObject, 'b', 2)
```

还可以使用 `vm.$set` 实例方法，这也是全局 `Vue.set` 方法的别名：

```
this.$set(this.someObject,'b',2)
```

有时你可能需要为已有对象赋值多个新 property，比如使用 `Object.assign()` 或 `_.extend()`。但是，这样添加到对象上的新 property 不会触发更新。在这种情况下，你应该用原对象与要混合进去的对象的 property 一起创建一个新的对象。

```
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

## 14 [v-model 的原理](https://juejin.cn/post/7331771415316791323)

### VUE2的方法

 `v-model`指令可以在表单 `input`、`radio`、`select`等表单元素上创建双向数据绑定它会根据控件类型自动选取正确的方法来更新元素。 

- text 和 textarea 元素使用 value 属性和 input 事件；
- checkbox 和 radio 使用 checked 属性和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。

#### 表单元素的v-model

> 在表单元素上使用`v-model`是真正意义上的**双向绑定**,能直接读取和修改v-model绑定的响应值

`v-model`在表单元素上使用,其实是一种语法糖,`v-model`只是一种简写,最终都会被转成原始写法

```
<input v-mdoel="testValue">
```

最终编译为:

```
<input type="text" :value="testValue" @input="testValue = $event.target.value">
 <!--$event  访问原始的 DOM 事件 -->
```

1. 将`目标值`(如上述testValue)与`input`元素的`value`绑定
2. 通过监听表单元素的`input`事件,将`输入值`($event.target.value)与`目标值`进行绑定
3. 最终实现双向绑定

#### 自定义组件的`v-model`

原理: 父子组件之间的通讯

- 父组件向子组件通讯:向子组件传递`props`
- 子组件向父组件通讯:子组件通过`emit`修改父组件的`props`

### VUE3的方法

#### 2.1.vue3中v-model和vue2的区别:

- 表单元素的`v-model`基本没变化
- 自定义组件的`v-model`变化较大:
  1. 删除`model`选项,不再使用 props 和 event ,声明v-model传到子组件的props和`$emit`事件名称
  2. 固定使用`modelValue`为父组件的props,使用`update:modelValue`这个emit来修改父组件的值
  3. vue3.4后新增`defineModel`简化了,自定义组件`v-model`双向绑定的操作
  4. 自定义组件支持多个v-model

vue3.4后,在表单元素的双向绑定依旧是使用`v-model`,在自定义组件中使用`v-model`时,在子组件中不需要使用父子组件之间通讯的方法如`defineProps` 和`defineEmits` ,直接使用`defineModel`即可在子组件中读取和修改父组件的值!

## 15.  *vuex* 是什么？怎么使用它？什么场景下我们会使用到 *vuex*

### **vuex 是什么**

vuex 是一个专为 Vue 应用程序开发的状态管理器，采用集中式存储管理应用的所有组件的状态。简而言之就是可以实现任意组件中通信，并可以检测数据的变化。 

### **为什么需要 vuex**

由于组件只维护自身的状态(data)，组件创建时或者路由切换时，组件会被初始化，从而导致 data 也随之销毁。

### 使用步骤：

**安装 Vuex** ->**创建 Store 实例** ->**将 Store 注册到 Vue 应用中** ->**在组件中使用状态和方法** 

**Vue组件接收交互行为，调用dispatch方法触发action相关处理，若页面状态需要改变，则调用commit方法提交mutation修改state，通过getters获取到state新值，响应数据或状态给Vue 组件，界面随之更新。** 

**vuex主要包括以下几个模块：**

- State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
- Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
- Mutation：是唯一更改 store 中状态的方法，且必须是同步函数。
- Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
- Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。

### 应用场景

如果是 vue 的小型应用，那么没有必要使用 vuex，这个时候使用 vuex 反而会带来负担。组件之间的状态传递使用 props、自定义事件来传递即可。

但是如果涉及到 vue 的大型应用，那么就需要类似于 vuex 这样的状态管理器来管理所有组件的状态。

![image.png](../../../../../%E7%A0%94%E7%A9%B6%E7%94%9F/%E7%A0%94%E4%BA%8C%E4%B8%8B/%E6%89%BE%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/assets/8ac950b96b8d42de94205c1afa14bc11-tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.webp) 

[图来源](https://juejin.cn/post/7021019423310331941)

## 16.说一下 *v-if* 与 *v-show* 的区别

v-if 是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 “display” 属性进行切换。

所以，v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景

## 17 KeepAlive相关

`KeepAlive>` 是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例。 `<KeepAlive>` 默认会缓存内部的所有组件实例，但可以通过 `include` 和 `exclude` 定制该行为。 

```
<!-- 非活跃的组件将会被缓存！ -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

## 18. nextTick  的作用是什么？他的实现原理是什么？

vue 更新 DOM 是异步更新的，数据变化，DOM 的更新不会马上完成，**nextTick 的回调是在下次 DOM 更新循环结束之后执行的延迟回调**。

将传入的回调函数包装成异步任务，异步任务又分微任务和宏任务，为了尽快执行所以优先选择微任务；

nextTick 提供了四种异步方法 Promise.then、MutationObserver、setImmediate、setTimeout(fn,0)

## 19. computed 的实现原理

## [20 computed 与watch、watchEffect 区别](https://juejin.cn/post/7239528592883122234)

三者都是侦听工具，

| 对比依据              | computed | watch            | watchEffect |
| --------------------- | -------- | ---------------- | ----------- |
| 是否自动收集依赖（1） | 自动     | 需要指定依赖对象 | 自动        |
| 有无返回值            | 有       | 无               | 有          |
| 是否可以赋值          | 可以     | 不能             | 不能        |
| 使用场景              | 简单情况 | 复杂情况         | 简单情况    |
| 是否立即执行          | 是       | 看参数（2）      | 是          |
| 本质                  | class    | function         | function    |



## 21.*Vue* 组件的 *data* 为什么必须是函数

组件中的 data 写成一个函数，**数据以函数返回值形式定义**。这样**每复用一次组件，就会返回一份新的 data**，类似于**给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。**而单纯的写成对象形式，就使得所有组件实例共用了一份 data，就会造成一个变了全都会变的结果。

## 22. vue和react的区别

- 相同点
  - 都使用Virtural DOM
    都使用组件化思想，流程基本一致
    都是响应式，推崇单向数据流
    都有成熟的社区，都支持服务端渲染
- 不同点
  - 1.数据绑定：Vue实现了双向的数据绑定，react数据流动是单向的
    2.数据渲染：大规模的数据渲染，react更快
    3.使用场景：React配合Redux架构适合大规模多人协作复杂项目，Vue适合小快的项目
    4.开发风格：react推荐做法jsx + inline style把html和css都写在js了
    	    vue是采用webpack + vue-loader单文件组件格式，html, js, css同一个文件

## 23 *scoped* 是如何实现样式穿透的？

- **vue2** 使用 `::v-deep` 操作符( >>> 的别名), vue3使用` :deep()`  
- 定义一个含有 scoped 属性的 style 标签之外，再定义一个不含有 scoped 属性的 style 标签，即在一个 vue 组件中定义一个全局的 style 标签，一个含有作用域的 style 标签：

## 24  说一下 ref 的作用是什么？

*ref* 的作用是被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 *$refs* 对象上。其特点是：

- 如果在普通的 *DOM* 元素上使用，引用指向的就是 *DOM* 元素
- 如果用在子组件上，引用就指向组件实例

所以常见的使用场景有：

1. 基本用法，本页面获取 *DOM* 元素
2. 获取子组件中的 *data*
3. 调用子组件中的方法

## 25 说说你对 SPA 单页面的理解，它的优缺点分别是什么？

SPA 仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转，而是利用路由机制实现 HTML 内容的变换。

![SPA应用.png](../../../../../%E7%A0%94%E7%A9%B6%E7%94%9F/%E7%A0%94%E4%BA%8C%E4%B8%8B/%E6%89%BE%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/assets/c33804685b8e4b0ab001aff0120ae98e-tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.webp) 

[图来源](https://juejin.cn/post/7018876571658223623)

## 26 **Vue 中的 Key 的作用是什么？**

> **key 的作用主要是为了高效的更新虚拟 DOM**。另外 *vue* 中在使用相同标签名元素的过渡切换时，也会使用到 *key* 属性，其目的也是为了让 *vue* 可以区分它们，否则 *vue* 只会替换其内部属性而不会触发过渡效果。

## 27.**你的接口请求一般放在哪个生命周期中？为什么要这样做？**

接口请求可以放在钩子函数 *created、beforeMount、mounted* 中进行调用，因为在这三个钩子函数中，*data* 已经创建，可以将服务端端返回的数据进行赋值。

但是推荐在 *created* 钩子函数中调用异步请求，因为在 *created* 钩子函数中调用异步请求有以下优点：

- 能更快获取到服务端数据，减少页面 *loading* 时间
- *SSR* 不支持 *beforeMount 、mounted* 钩子函数，所以放在 *created* 中有助于代码的一致性
- *created* 是在模板渲染成 *html* 前调用，即通常初始化某些属性值，然后再渲染成视图。如果在 *mounted* 钩子函数中请求数据可能导致页面闪屏问题

## 28. *vue* 为什么采用异步渲染

> 因为如果不采用异步更新，那么每次更新数据都会对当前组件进行重新渲染；所以为了性能考虑，*Vue* 会在本轮数据更新后，再去异步更新视图。
>
> 异步渲染的原理：
>
> 1. 调用 *notify( )* 方法，通知 *watcher* 进行更新操作
> 2. 依次调用 watcher 的 update 方法
> 3. 对 watcher 进行**去重**操作（通过id）**放到队列**里
> 4. 执行完后异步清空这个队列，nextTick 进行批量更新操作

## 29. 组件中写 *name* 选项有哪些好处

1. 可以**通过名字找到对应的组件**（ 递归组件：组件自身调用自身 ）
2. 可以通过 *name* 属性实现**缓存功能**（*keep-alive*）
3. 可以通过 *name* 来**识别组件**（跨级组件通信时非常重要）
4. 使用 *vue-devtools*  

## 30 说一说自定义指令有哪些生命周期？(vue2)

- bind: **只调用一次，指令第一次绑定到元素时调用**，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
- inserted: **被绑定元素插入父节点时调用**（父节点存在即可调用，不必存在于 document 中）。
- update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
- componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
- unbind: **只调用一次， 指令与元素解绑时调用。**

## 31vue 中相同逻辑如何进行抽离？

在 Vue 2 中，mixins 是创建可重用组件逻辑的主要方式。尽管  Vue 3 中保留了 mixins 支持，但对于组件间的逻辑复用，[使用组合式 API 的组合式函数](https://cn.vuejs.org/guide/reusability/composables.html)是现在更推荐的方式。 

组合式函数逻辑复用的核心思想就是在组合式函数里写逻辑代码，需要在模板中使用或其他地方使用的变量或者函数直接return出来，然后在需要使用这些逻辑的组件中引入即可。 



## 33  在 Vue 中要获取当前时间你会放到 computed 还是 methods 里？

放在 *computed* 里面比较适合。因为 *computed* 只有在它的相关依赖发生改变时才会重新求值。 

## 34 在给 vue 中的元素设置 key 值时可以使用 Math 的 random 方法么

*random* 是生成随机数，有一定概率多个 *item* 会生成相同的值，不能保证唯一。

如果是根据数据来生成 *item*，数据具有 *id* 属性，那么就可以使用 *id* 来作为 *key*。

如果不是根据数据生成 *item*，那么最好的方式就是使用时间戳来作为 *key*。或者使用诸如 *uuid* 之类的库来生成唯一的 *id*。

## 35. 插槽与作用域插槽的区别是什么？

插槽的作用是子组件提供了可替换模板，父组件可以更换模板的内容。

[作用域插槽](https://v2.cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD)实现在父组件中访问子组件的数据 

### 插槽有哪些：

默认插槽、具名插槽、动态插槽、作用域插槽

## 36. vue-router 如何实现动态路由 **addRoute**

1、用户登陆，获取后端返回的路由 

2、使用`router.addRoute`动态添加到路由 [文档](https://link.juejin.cn/?target=https%3A%2F%2Frouter.vuejs.org%2Fzh%2Fapi%2F%23router-addroutes) 

3、使用`router.getRoutes`读取路由 [文档](https://link.juejin.cn/?target=https%3A%2F%2Frouter.vuejs.org%2Fzh%2Fapi%2F%23router-addroute-2) 

4、注销的时候，把路由重置到登陆前的数据。

[举例](https://juejin.cn/post/6963211038850449416)：

```
mutations: {
    ADD_ROUTE(state) {
      let routerList = JSON.parse(JSON.stringify(state.userInfo.routerList))
      console.log(26, router.getRoutes().length)
      //路由未添加之前是4个,添加完之后是6个，我们用是否小于6个，来判断是否要添加
      if (router.getRoutes().length < 6) {
        routerList = filterAsyncRouter(routerList)//路由动态添加
        console.log('路由添加前', router.getRoutes())
        routerList.forEach((i) => {
          //在home父路由内添加子路由
          router.addRoute('home', i)
        })
        console.log('路由添加后', router.getRoutes())
      }
    }
}

```

 

## vue性能优化









## Axios封装？？？

`axios`是 进行前端开发时常用的一种与后端接口交换数据的网络请求库。

**而进行axios封装会产生许多好处**： **统一处理请求和响应** 、**简化API调用** 、**提高代码的可维护性** 

### axios封装示例：

- **创建axios实例**：在创建axios实例前需要先引入axios
- **设置请求拦截器**：在请求拦截器中可以进行一些在请求发送前需要进行的操作，如对请求数据的处理。另外，在请求拦截器中还可以进行请求拦截的错误处理。
- **设置响应拦截器**：在响应拦截器中可以进行一些响应数据的处理，并且对异常响应进行相应的错误处理 
- **编写接口请求函数**：引入封装的axios请求，设置接口的地址、请求的方式、请求的数据等。
- **调用接口请求函数**：调用封装的函数，传入请求的数据。

封装示例：

```
import axios from "axios";
import { ElMessage } from "element-plus";
//创建axios实例
let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})
//请求拦截器
request.interceptors.request.use(config => {
    return config;
});
//响应拦截器
request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    //处理网络错误
    let msg = '';
    let status = error.response.status;
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";

    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});
export default request;
```

## 跨域及如何实现跨域请求？？？

### 什么是跨域

跨域是浏览器受同源（协议、域名、端口）策略的限制，不允许不同源的站点之间进行某些操作（如发送ajax请求，操作dom，读取cookie），如果不进行特殊配置是不能操作成功的，并且控制台会报跨域错误。

解决措施

- jsonp
- cors： 常用
- 代理： 常用

**代理方式**：在实际开发中，只需要对开发服务器稍加配置即可完成

```
// vue 的开发服务器代理配置
// vue.config.js
module.exports = {
  devServer: { // 配置开发服务器
    proxy: { // 配置代理
      "/api": { // 若请求路径以 /api 开头
        target: "http://dev.taobao.com", // 将其转发到 http://dev.taobao.com
      },
    },
  },
};
```



