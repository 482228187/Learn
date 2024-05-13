# 六、React面试题

[2024前端高频面试题之-- react篇](https://juejin.cn/post/7349971654590857216)、[react面试题](https://juejin.cn/post/7194760495956492344)、[WEB前端面试题-面试官系列](https://vue3js.cn/interview/React/React.html)

## 1.React18有哪些更新？

- 并发模式
- 更新 render API
- 自动批处理
- Suspense 支持 SSR
- startTransition
- useTransition
- useDeferredValue
- useId
- 提供给第三方库的 Hook

## 2. JSX是什么，它和JS有什么区别

JSX 是 JavaScript 语法的扩展，它允许编写类似于 HTML 的代码。它可以编译为常规的 JavaScript 函数调用，从而为创建组件标记提供了一种更好的方法。 

## 3 react生命周期

[参考](https://juejin.cn/post/7285540804734468150)

React 的生命周期主要分为三个阶段：挂载、更新、卸载

![1713167431889](../../../../../%E7%A0%94%E7%A9%B6%E7%94%9F/%E7%A0%94%E4%BA%8C%E4%B8%8B/%E6%89%BE%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/assets/1713168143773.png)

### 挂载

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

- constructor()：构造函数，通常用于初始化组件的状态和绑定方法。 
- static getDerivedStateFromProps()： 是一个静态方法，用于在组件接收新的props时计算并返回新的state。 
- render()：是用来返回组件的UI结构，它是一个纯函数，其中不应该包含任何副作用或改变状态的操作。 
- componentDidMount()：这个函数是在组件挂载到DOM后执行的，可以在这里获取数据、进行一些异步请求或DOM操作。 

#### getDerivedStateFromProps

该方法是新增的生命周期方法，是一个静态的方法，因此**不能访问到组件的实例**。

执行时机：组件创建和更新阶段，不论是props变化还是state变化，都会调用。

**在每次render方法前调用**，第一个参数为即将更新的props，第二个参数为上一个状态的state，可以比较props 和 state来加一些限制条件，防止无用的state更新

该方法**需要返回一个新的对象作为新的state或者返回null表示state状态不需要更新**

### 更新

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

- static getDerivedStateFromProps()
- shouldComponentUpdate()：这个函数是用来判断组件是否需要重新渲染，返回一个布尔值，可以优化性能。 
- render()
- getSnapshotBeforeUpdate()： 它在组件更新（即将应用新props或state并重新渲染）之前触发。它允许你捕获组件更新前的一些信息，并在组件更新后使用这些信息。 
- componentDidUpdate()： 组件更新后触发，用于处理更新后的操作。 

#### getSnapshotBeforeUpdate

该周期函数在render后执行，执行之时DOM元素还没有被更新

该方法返回的一个Snapshot值(不返回报错)，作为componentDidUpdate第三个参数传入

```
js
复制代码getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('#enter getSnapshotBeforeUpdate');
    return 'foo';
}

componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('#enter componentDidUpdate snapshot = ', snapshot);
}
```

此方法的目的在于获取组件**更新前的一些信息**，比如组件的滚动位置之类的，在组件更新后可以根据这些信息恢复一些UI视觉上的状态

### 卸载

当组件从 DOM 中移除时会调用如下方法：

- componentWillUnmount()： 这个函数是在组件卸载前执行的，可以在这里进行一些清理工作，比如取消订阅、清除定时器、取消异步请求或移除事件监听器等。 

### 错误处理

当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

- static getDerivedStateFromError()：更改状态，从而显示降级组件
- componentDidCatch()：打印错误信息

## 4.React事件机制和原生DOM事件流有什么区别

而原生的事件是绑定到dom上面的，react所有事件都挂载在document上，当真实dom触发后冒泡到document后才会对react事件进行处理，所以：

- 原生事件先执行
- react合成事件再执行
- document上挂载的事件最后执行

react实现了一套自己的事件机制，包括事件注册、事件合成、事件冒泡、事件派发等。在react中这套事件被称为合成事件。

合成事件是 React模拟原生 DOM事件所有能力的一个事件对象，即浏览器原生事件的跨浏览器包装器

## 5.Redux工作原理

`redux`就是一个将状态进行集中管理的容器，遵循三大基本原则：

- 单一数据源
- state 是只读的
- 使用纯函数来执行修改

以下的情景可以使用redux:

- 某个组件的状态，需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

### 原理

[参考来源](https://juejin.cn/post/7281530284662751269)

在 Redux 中需要维护一个公共数据仓库 Store, 而数据流向只能通过 View 触发 Action、 Reducer更新派发, Store 改变从而驱动视图更新 

![img](../../../../../%E7%A0%94%E7%A9%B6%E7%94%9F/%E7%A0%94%E4%BA%8C%E4%B8%8B/%E6%89%BE%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/assets/c97cb4b6a9f849beb5ec17aaeb254a8b~tplv-k3u1fbpfcp-jj-mark_3024_0_0_0_q75.awebp) 

上文我们说到，一个组件如果想从 store 存取公用状态，需要进行四步操作：

1. import引入store

2. getState获取状态

3. dispatch修改状态

4. subscribe订阅更新

   ```
   const redux = require('redux');
   
   const initialState = {
     counter: 0
   }
   
   // 创建reducer
   const reducer = (state = initialState, action) => {
     switch (action.type) {
       case "INCREMENT":
         return {...state, counter: state.counter + 1};
       case "DECREMENT":
         return {...state, counter: state.counter - 1};
       case "ADD_NUMBER":
         return {...state, counter: state.counter + action.number}
       default: 
         return state;
     }
   }
   
   // 根据reducer创建store
   const store = redux.createStore(reducer);
   
   store.subscribe(() => {
     console.log(store.getState());
   })
   
   // 修改store中的state
   store.dispatch({
     type: "INCREMENT"
   })
   // console.log(store.getState());
   
   store.dispatch({
     type: "DECREMENT"
   })
   // console.log(store.getState());
   
   store.dispatch({
     type: "ADD_NUMBER",
     number: 5
   })
   // console.log(store.getState());
   ```

   

## 6.React-Router工作原理?  react-router-dom有哪些组件

![img](../../../../../%E7%A0%94%E7%A9%B6%E7%94%9F/%E7%A0%94%E4%BA%8C%E4%B8%8B/%E6%89%BE%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/assets/5258bf481631486bae2188b2625ead3c-tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.awebp) 

[图来源](https://juejin.cn/post/7213956241612914749)

`React Router`对应的`hash`模式和`history`模式对应的组件为：

- HashRouter
- BrowserRouter

```
// 1.import { BrowserRouter as Router } from "react-router-dom";
// 2.import { HashRouter as Router } from "react-router-dom";

import React from 'react';
import {
  BrowserRouter as Router,
  // HashRouter as Router  
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Backend from './pages/Backend';
import Admin from './pages/Admin';


function App() {
  return (
    <Router>
        <Route path="/login" component={Login}/>
        <Route path="/backend" component={Backend}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/" component={Home}/>
    </Router>
  );
}

export default App;
```

### 实现原理

路由描述了 `URL` 与 `UI`之间的映射关系，这种映射是单向的，即 URL 变化引起 UI 更新（无需刷新页面）

下面以`hash`模式为例子，改变`hash`值并不会导致浏览器向服务器发送请求，浏览器不发出请求，也就不会刷新页面

`hash` 值改变，触发全局 `window` 对象上的 `hashchange` 事件。所以 `hash` 模式路由就是利用 `hashchange` 事件监听 `URL` 的变化，从而进行 `DOM` 操作来模拟页面跳转

`react-router`也是基于这个特性实现路由的跳转

#### **BrowserRouter**:

`BrowserRouter` 利用浏览器的 `history.pushState()` 和 `history.replaceState()` 方法来操作浏览器的历史记录。

当用户点击链接或触发路由跳转时，React Router 会通过 `history` 包中的 `createBrowserHistory` 函数创建一个 `history` 对象，该对象使用 `pushState` 和 `replaceState` 来改变浏览器的历史记录。

在 `BrowserRouter` 组件的 `componentDidMount` 生命周期中，会注册 `popstate` 事件的监听器，用于监听浏览器的前进和后退按钮的点击。

当用户点击前进或后退按钮时，`popstate` 事件会被触发，`history` 对象的监听器会被调用，React Router 根据新的路径触发相应的路由匹配和渲染。



## 7.React hooks解决了什么问题? 函数组件与类组件的区别

在以前，函数组件也被称为无状态的组件，只负责渲染的一些工作

在有了hooks之后，函数组件也可以是有状态的组件，内部也可以维护自身的状态以及做一些逻辑方面的处理。

hooks的出现，使函数组件的功能得到了扩充，拥有了类组件相似的功能，在我们日常使用中，使用hooks能够解决大多数问题，并且还拥有代码复用机制，因此优先考虑hooks。

### 有哪些

#### useState

定义状态，解决了函数组件没有状态的问题 

在函数组件中通过`useState`实现函数内部维护`state`，参数为`state`默认的值，返回值是一个数组，第一个值为当前的`state`，第二个值为更新`state`的函数 

```
    const [state, setState] = useState({ name: 'jerry', age: 18 })

    const changeState = () => {
        setState({name:"tom"}) //覆盖整个state
    }
```

注意：

- 对象**不可局部更新** ：：state是一个对象时，不能局部更新对象属性，`useState`不会合并，会把整个对象覆盖。要用展开运算符自己进行属性值的覆盖。 
- **地址要变更**：对于引用类型，数据地址不变的时候，认为数据没有变化，不会更新视图。 
- `useState` 传入一个函数：`useState`初始化是惰性的 ，`initialState`只有在初始渲染中起作用，*后续渲染会被忽略*，如果初始state需要通过复杂的计算获得，可以传入一个函数，在函数中计算并返回初始state，次函数只在初始渲染时被调用。 
- `useState`异步回调问题：如何获取到更新后的state，使用`useEffect`，当`state`变化时触发

#### useEffect

给没有生命周期的组件添加结束渲染的信号，在**渲染结束后执行** ，函数组件中执行副作用函数的地方（如网络请求，修改UI）

`useEffect`第一个参数接受一个回调函数，默认情况下，`useEffect`会在第一次渲染和更新之后都会执行，相当于在`componentDidMount`和`componentDidUpdate`两个生命周期函数中执行回调 

```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

#### useContext

共享状态钩子。不同组件之间共享状态，避免props层层传递

- `React.createContext`
- `Context.Provider`

### useReducer

Action钩子，复杂版的`useState`

`useReducer()`是这样的：

`const [state, dispatch] = useReducer(reducer, initialState)`

#### 自己创建hooks

自己创建hooks就是一个将公共代码封装的过程

## 8.SetState是同步还是异步的，setState做了什么

- 在组件生命周期或React合成事件中，setState是异步
- 在setTimeout或者原生dom事件中，setState是同步

对同一个值进行多次 `setState`， `setState` 的批量更新策略会对其进行覆盖，取最后一次的执行结果 

如果是下一个`state`依赖前一个`state`的话，推荐给`setState`一个参数传入一个`function`，如下：

```
onClick = () => {
    this.setState((prevState, props) => {
      return {count: prevState.count + 1};
    });
    this.setState((prevState, props) => {
      return {count: prevState.count + 1};
    });
}
```

而在`setTimeout`或者原生`dom`事件中，由于是同步的操作，所以并不会进行覆盖现象

## 9. React父子组件的生命周期调用顺序

### 普通子组件

#### 挂载阶段

![1713168848367](../../../../../%E7%A0%94%E7%A9%B6%E7%94%9F/%E7%A0%94%E4%BA%8C%E4%B8%8B/%E6%89%BE%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/assets/1713168848367.png)

#### 更新阶段

![1713168911117](../../../../../%E7%A0%94%E7%A9%B6%E7%94%9F/%E7%A0%94%E4%BA%8C%E4%B8%8B/%E6%89%BE%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/assets/1713168911117.png)

#### 卸载阶段

![1713168922464](../../../../../%E7%A0%94%E7%A9%B6%E7%94%9F/%E7%A0%94%E4%BA%8C%E4%B8%8B/%E6%89%BE%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/assets/1713168922464.png)

### 懒加载组件

#### 挂载阶段

 ![1713168937868](../../../../../%E7%A0%94%E7%A9%B6%E7%94%9F/%E7%A0%94%E4%BA%8C%E4%B8%8B/%E6%89%BE%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/assets/1713168937868.png)

#### 更新阶段(和普通组件一样)

 ![1713168948987](../../../../../%E7%A0%94%E7%A9%B6%E7%94%9F/%E7%A0%94%E4%BA%8C%E4%B8%8B/%E6%89%BE%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/assets/1713168948987.png)

#### 卸载阶段(和普通组件一样)

## 11. React组件传值有哪些方式

组件传递的方式有很多种，根据传送者和接收者可以分为如下：

- **父组件向子组件传递**：父组件在调用子组件的时候，只需要在子组件标签内传递参数，子组件通过`props`属性就能接收父组件传递过来的参数 
- **子组件向父组件传递**：父组件向子组件传一个函数，然后通过这个函数的回调，拿到子组件传过来的值 
- 兄弟组件之间的通信：如果是兄弟组件之间的传递，则父组件作为中间层来实现数据的互通，通过使用父组件传递 
- 父组件向后代组件传递：`useContext`用于在函数式组件中访问上下文（`Context`）的值。 
- 非关系组件传递：redux 

[useContext使用](https://juejin.cn/post/7342793007938027530)

## 12 对immutable的理解,如何应用在react项目中

- Immutable 实现的原理是 Persistent Data Structure（持久化数据结构）
- 也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。
- 同时为了避免深拷贝把所有节点都复制一遍带来的性能损耗，Immutable 使用了结构共享的思路，即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。



## 13.react如何做到和vue中keep-alive的缓存效果

 手动保存状态：适用于数据较少的情况

在componentWillUnmount的时候将状态通过redux进行保存，然后在componentDidMount周期进行数据恢复。

通过路由实现：

基本思想是，将KeepAlive中的组件也就是children取出来，通过React Portals将children渲染到一个不会被卸载的组件keeper中，再使用Dom操作将keeper内的真实内容移入对应的keepalive

 

## 14.React如何做路由监听

监听的核心原理基于`useEffect`，和`useLocation`，通过`useEffect`监听当前location的变化，这样就实现的最基本的监听结构， 然后，我们可以在`useEffect`中记录和更新`from`、`to`的值，**可以根据自己的需要选择from、to的数据类型**，

[参考链接](https://juejin.cn/post/7195910055497580600) 

## 15.React有哪几种方式改变state

**setState方法：** 这是React中最常用的方式。使用setState方法可以更新组件的状态。setState接受一个新的状态对象或者一个返回新状态对象的函数作为参数。当状态更新时，React会重新渲染组件。例如： 

```
this.setState({ count: this.state.count + 1 });
// 或者
this.setState(prevState => ({ count: prevState.count + 1 }));

```

**useState Hook：** 在函数式组件中，可以使用useState Hook来声明和更新状态。useState返回一个状态值和一个更新状态的函数。例如： 

```
const [count, setCount] = useState(0);
// 更新状态
setCount(count + 1);

```

useReducer Hook： 当状态逻辑变得复杂时，可以使用useReducer Hook来管理状态。它类似于Redux中的reducer，接受一个状态和一个处理状态的函数，并返回新的状态。例如：

```
const initialState = { count: 0 };
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
const [state, dispatch] = useReducer(reducer, initialState);
// 更新状态
dispatch({ type: 'increment' });

```



## 16,react render原理，在什么时候触发

render存在两种形式：

- 类组件中的render方法
- 函数组件的函数本身

触发时机：

- 组件初始化
- 组件的状态或属性发生变化
- 父组件重新渲染导致子组件重新渲染

在`render`过程中，`React` 将新调用的 `render`函数返回的树与旧版本的树进行比较，这一步是决定如何更新 `DOM` 的必要步骤，然后进行 `diff` 比较，更新 `DOM`树 

一旦执行了setState就会执行render方法(无论值是否发生变化)，useState 会判断当前值有无发生改变确定是否执行render方法，一旦父组件发生渲染，子组件也会渲染

## 17. 如何提高组件的渲染效率

在之前文章中，我们了解到render的触发时机，简单来讲就是类组件通过调用setState方法， 就会导致render，父组件一旦发生render渲染，子组件一定也会执行render渲染

父组件渲染导致子组件渲染，子组件并没有发生任何改变，这时候就可以从避免无谓的渲染，具体实现的方式有如下：

- shouldComponentUpdate

  - 通过`shouldComponentUpdate`生命周期函数来比对 `state`和 `props`，确定是否要重新渲染

    默认情况下返回`true`表示重新渲染，如果不希望组件重新渲染，返回 `false` 即可

- PureComponent

  - 跟`shouldComponentUpdate`原理基本一致，通过对 `props` 和 `state`的浅比较结果来实现 

- React.memo

  - `React.memo`用来缓存组件的渲染，避免不必要的更新，其实也是一个高阶组件，与 `PureComponent` 十分类似。但不同的是， `React.memo` 只能用于函数组件 

  - ```
    import { memo } from 'react';
    
    function Button(props) {
      // Component code
    }
    
    export default memo(Button);
    ```

  - 如果需要深层次比较，这时候可以给`memo`第二个参数传递比较函数 

## 18.React 中 keys 的作用是什么？

跟`Vue`一样，`React` 也存在 `Diff`算法，而元素`key`属性的作用是用于判断元素是新创建的还是被移动的元素，从而减少不必要的元素渲染，因此`key`的值需要为每一个元素赋予一个确定的标识,。

## 19.React 中 refs 的作用是什么？

ref作用于不同的组件时：

1. 作用于内置的html组件，得到的是真实的dom
2. ref作用于类组件，得到的是类的实例
3. **ref不能作用于函数组件**

创建`ref`的形式：

- 传入字符串，使用时通过 this.refs.传入的字符串的格式获取对应的元素
- 传入对象，对象是通过 React.createRef() 方式创建出来，使用时获取到创建的对象中存在 current 属性就是对应的元素
- 传入函数，该函数会在 DOM 被挂载时进行回调，这个函数会传入一个 元素对象，可以自己保存，使用时，直接拿到之前保存的元素对象即可
- 传入hook，hook是通过 useRef() 方式创建，使用时通过生成hook对象的 current 属性就是对应的元素

```
function App(props) {
  const myref = useRef()
  return (
    <>
      <div ref={myref}></div>
    </>
  )
}
```



## 20.React diff 原理

diff算法就是更高效地通过对比新旧Virtual DOM来找出真正的Dom变化之处 

react中diff算法主要遵循三个层级的策略：

- tree层级
  - DOM节点跨层级的操作不做优化，只会对相同层级的节点进行比较
  - 只有删除、创建操作，没有移动操作
- conponent 层级
  - 如果是同一个类的组件，则会继续往下diff运算，如果不是一个类的组件，那么直接删除这个组件下的所有子节点，创建新的
- element 层级
  - 对于比较同一层级的节点们，每个节点在对应的层级用唯一的key作为标识
  - 提供了 3 种节点操作，分别为 INSERT_MARKUP(插入)、MOVE_EXISTING (移动)和 REMOVE_NODE (删除)
  - 通过key可以准确地发现新旧集合中的节点都是相同的节点，因此无需进行节点删除和创建，只需要将旧集合中节点的位置进行移动，更新为新集合中节点的位置
  - 由于dom节点的移动操作开销是比较昂贵的，在只修改文本的情况下，没有key的情况下要比有key的性能更好



## 21.受控组件和非受控组件有什么区别？

```
- 受控组件指 组件里的value受到state控制，用onChange事件处理函数处理value的变化并同步到state，
- 非受控组件即value与state没有关联，需要用到的时候，用ref获取
```

[参考](https://juejin.cn/post/7353087285468119059)

##  22.JSX转换成真实DOM的过程

其渲染流程如下所示：

1. 将函数组件或者类组件中的jsx结构，通过babel转换成React.createElement的形式，React.createElement对接收到的参数进行“格式化”，传递给ReactElement函数；
2. ReactElement函数将接收到的参数进行整合，最终构造成一个虚拟DOM对象并返回；
3. ReactDOM.render将生成好的虚拟DOM渲染到指定容器上，其中采用了批处理、事务等机制并且对特定浏览器进行了性能优化，最终转换为真实DOM

## 23.React是什么，有哪些特性

### React是什么

React，用于构建用户界面的 JavaScript 库，只提供了 UI 层面的解决方案

遵循组件设计模式、声明式编程范式和函数式编程概念，以使前端应用程序更高效

使用虚拟 `DOM` 来有效地操作 `DOM`，遵循从高阶组件到低阶组件的单向数据流

帮助我们将界面成了各个独立的小块，每一个块就是组件，这些组件之间可以组合、嵌套，构成整体页面

`react` 类组件使用一个名为 `render()` 的方法或者函数组件`return`，接收输入的数据并返回需要展示的内容

### `React` 特性有很多

例如：

- JSX 语法
- 单向数据绑定
- 虚拟 DOM
- 声明式编程
- Component

## 24. useEffect的触发时机

或者可以问：

- 数组可不可以什么都不传
- 数组里边内容如何确定

触发机制跟第二个参数有关：

- 第二个参数不传时：每次渲染完成后触发
- 第二个参数是一个空数组时：初始化渲染完成后触发，相当于didMounted
- 第二个参数是非空数组时：数组中数据有一项更新时触发

数组中的内容一般是props或者state，*是普通变量时不会触发执行*。

## 25 hooks使用规则

- Hooks只在**函数组件**的**顶层调用**，不要在循环、条件判断或者嵌套函数中调用钩子。在类组件中无法使用。
- 对于自定义Hooks，使用use开头命名。

## 26 useEffect 如何判断依赖项变化的

React使用**严格的引用相等性**检查来判断依赖项是否发生变化，用的是`Object.is`方法进行判断的。

*Object.is是基于===实现的，但有一些特殊的处理来解决 === 中的一些不准确之处。*

在`useEffect`的依赖项数组中，React会比较数组中的每个依赖项的前一个值和当前值。如果任何一个依赖项发生了**引用上的变化**，`useEffect`就会被触发。

React使用闭包的特性来保存上一次渲染时`useEffect`的依赖项数组中的每个依赖项的值。当组件首次渲染时，React会在内部创建一个变量来存储依赖项的值。然后，在下一次组件渲染时，React会使用这个变量来比较前一个值和当前值。

## 27 useEffect的第一个函数返回一个函数

返回一个clean-up 函数，用来清除副作用。clean-up的执行时机是每个useEffect执行前会执行上一个effect返回的clean-up函数。

## 28 useMemo、memo、useCallback

[参考来源](https://juejin.cn/post/7316321509856755752)

| 特性         | React.memo           | useMemo                    | useCallback                |
| ------------ | -------------------- | -------------------------- | -------------------------- |
| **用途**     | 避免不必要的重新渲染 | 记忆化计算结果             | 记忆化回调函数             |
| **适用场景** | 函数组件             | 记忆化计算结果             | 记忆化回调函数             |
| **参数**     | 一个组件             | 一个`计算函数`和依赖项数组 | 一个`回调函数`和依赖项数组 |
| **返回值**   | 一个记忆化的组件     | 一个记忆化的值             | 一个记忆化的回调函数       |
| **作用方式** | 对比 props 的变化    | 对比依赖项数组的变化       | 对比依赖项数组的变化       |

###  React.memo

- 用途：用于函数组件，通过对比组件的 props 变化来避免不必要的重新渲染。
- 工作原理：`React.memo` 对比组件接收到的 `props` 是否发生变化。仅当 `props` 发生变化时，才会重新渲染组件，否则会使用上一次的渲染结果。

```
const memoComponent = React.memo(MyComponent);
```

### useMemo

- 用途：用于记忆化计算结果，避免在每次渲染时都重新计算。
- 工作原理：`useMemo` 接收一个**计算函数**和一个依赖项数组。它仅在依赖项数组中的值发生变化时，才会重新计算，并返回记忆化的值。

```
const useMemoValue = useMemo(() => computeExpensiveValue(dep1, dep2), [dep1, dep2]);
```

### useCallback

- 用途：用于记忆化回调函数，避免在每次渲染时都重新创建回调。
- 工作原理：`useCallback` 接收一个**回调函数**和一个依赖项数组。它仅在依赖项数组中的值发生变化时，才会返回上一次的记忆化的回调函数。

```
const useCallbackValue = useCallback(() => {
    // 回调逻辑
}, [dep1, dep2]);
```



## 29 state和props有什么区别

一个组件的数据可以来源于组件内部，也可以来源于组件外部(比如父组件)。

组件内部的状态就是state，一般在constructor中定义。通过setState修改，会调用render方法重新渲染组件。 setState 还可以接受第二个参数，它是一个函数，会在 setState 调用完成并且组件开始重新渲染时被调用，可以用来监听渲染是否完成。

组件外部定义的状态是props，组件中的props不可以修改，只能通过传入新的props。

相同点：

- 两者都是 JavaScript 对象
- 两者都是用于保存状态
- props 和 state 都能触发渲染更新

区别：

- props 是外部传递给组件的，而 state 是在组件内被组件自己管理的，一般在 constructor 中初始化
- props 在组件内部是不可修改的，但 state 在组件内部可以进行修改 state 是多变的、可以修改



## 30  useEffect和useLayoutEffect有什么区别

相同点：

- 处理副作用：函数组件内不允许操作副作用。比如：改变DOM、设置订阅、操作定时器等
- 底层都是调用mountEffectlmpl方法，基本上可以替换使用

不同点：

- useEffect在像素变化之后异步调用，改变屏幕内容可能会造成页面的闪烁
- useLayoutEffect在像素变化之前同步调用，可能会造成页面延迟显示，但是不会闪烁：主要用于处理**DOM操作、调整样式、避免页面闪烁等**。因为是同步执行，所以要避免做大量计算，从而避免造成阻塞。
- useLayoutEffect先于useEffect执行

### 副作用

执行副作用操作是指在函数或代码块执行期间，除了返回一个值以外，**还对函数外部的环境产生了可观察的影响**。这些影响可能包括但不限于：

1. 修改函数外部的变量或状态。
2. 发送网络请求或进行其他 I/O 操作。
3. 修改全局状态。
4. 修改 DOM 结构。
5. 订阅外部事件。
6. 调用其他函数产生副作用等。

## 31 react组件的创建方式以及区别

### 创建方式

- 函数组件：通过一个函数，return 一个jsx语法声明的结构,  **推荐使用**
- React.createClass 方法创建：语法冗余，目前已经不太使用
- 继承 React.Component 创建的类组件：最终会被编译成createClass

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

## 32 React如何实现状态自动保存（vue中的keep-alive）

手动保存状态：适用于数据较少的情况

在componentWillUnmount的时候将状态通过redux进行保存，然后在componentDidMount周期进行数据恢复。

通过路由实现：

基本思想是，将KeepAlive中的组件也就是children取出来，通过React Portals将children渲染到一个不会被卸载的组件keeper中，再使用Dom操作将keeper内的真实内容移入对应的keepalive

 

## 33 super和super(props)的区别

在 React 中，类组件基于 ES6，所以在 constructor 中必须使用 super

在调用 super 过程，无论是否传入 props，React 内部都会将 porps 赋值给组件实例 porps 属性中

如果只调用了 super()，那么 this.props 在 super() 和构造函数结束之间仍是 undefined 

## 34 React事件绑定的方式有哪些？区别？

为了解决上面正确输出`this`的问题，常见的绑定方式有如下：

- render方法中使用bind
- render方法中使用箭头函数
- constructor中bind
- 定义阶段使用箭头函数绑定

上述四种方法的方式，区别主要如下：

- 编写方面：方式一、方式二写法简单，方式三的编写过于冗杂
- 性能方面：方式一和方式二在每次组件render的时候都会生成新的方法实例，性能问题欠缺。若该函数作为属性值传给子组件的时候，都会导致额外的渲染。而方式三、方式四只会生成一个方法实例

综合上述，方式四是最优的事件绑定方式