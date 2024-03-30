# JavaScript面试题

[参考博客](https://juejin.cn/post/7347324514365227047)，参考博客，

## 1. JS的数据类型及检测方法

基本数据类型：number、string、undefined、null、boolean、symbol（es6）、bigInt（es7）

 引用数据类型：object、array、function 

检测方法： 

+ typeof :检测基本数据类型，但是null和object都被检测为对象 

  ```
  typeof undefined // "undefined"
  
  typeof 0 // "number"
  
  typeof 10n // "bigint"
  
  typeof true // "boolean"
  
  typeof "foo" // "string"
  
  typeof Symbol("id") // "symbol"
  
  typeof Math // "object"  (1)
  
  typeof null // "object"  (2)
  
  typeof alert // "function"  (3)
  ```

+ Instance of: 主要用来检测引用数据类型，不能正确检测基本数据类型，他的原理是判断其原型链上能不能找到该类型的原型 , 语法`obj instanceof Class` 

```
class Rabbit {}
let rabbit = new Rabbit();

// rabbit 是 Rabbit class 的对象吗？
alert( rabbit instanceof Rabbit ); // true
```

+ Constructor: 用于检测引用数据类型，检测方法是获取示例的构造函数和某个类是否相同 

  ```
  function Rabbit() {}
  // 默认：
  // Rabbit.prototype = { constructor: Rabbit }
  
  alert( Rabbit.prototype.constructor == Rabbit ); // true
  ```

  

+ Object.prototype.toString.call(): 可以检测任何类

```
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]
```

## 2. ES6新增

- **let 和 const**：用于变量声明，提供块级作用域。
- **箭头函数（Arrow Functions）** ：简化了函数表达式的写法，使用 `=>` 符号
- **类（Classes）** ：引入了基于类的面向对象编程语法。

```
js
复制代码class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello, ${this.name}!`;
  }
}
```

- **模板字符串（Template Literals）** ：允许嵌入表达式的字符串字面量。
- **默认参数值**：允许函数参数有默认值。
- **解构赋值（Destructuring Assignment）** ：允许从数组或对象中提取数据并赋值给变量。

```
js
复制代码const [a, b] = [1, 2];
const { x, y } = { x: 10, y: 20 };
```

- **扩展运算符（Spread Operator）和剩余参数（Rest Parameters）** ：使用 `...` 实现。

```
js
复制代码const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5]; // Spread operator

function sum(...args) { // Rest parameters
  return args.reduce((sum, current) => sum + current, 0);
}
```

- **模块导入和导出（Modules）** ：使用 `import` 和 `export` 语法。
- **Promise 对象**：用于异步编程。
- **生成器和迭代器（Generators & Iterators）** ：引入生成器函数，可通过 `yield` 关键字暂停和恢复执行
- **新的数据结构**：如 `Map`, `Set`, `WeakMap`, `WeakSet`
- **Symbol 类型**：引入了新的原始数据类型 `Symbol`，可用作唯一的属性键。
- **新的静态方法和属性**：例如 `Array.from`, `Object.assign`, `Number.isFinite`, `Math.trunc` 等

 

[浏览器灵魂之问](https://juejin.cn/post/6844904021308735502)

[HTTP灵魂之问](https://juejin.cn/post/6844904100035821575)

[TCP灵魂之问](https://juejin.cn/post/6844904070889603085)

