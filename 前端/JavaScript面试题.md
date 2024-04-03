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

## 3. let、const、var区别

|            | var      | let    | const  |
| ---------- | -------- | ------ | ------ |
| 块级作用域 | 没有     | 有     | 有     |
| 变量提升   | 有       | 没有   | 没有   |
| 暂时性死区 | 没有     | 有     | 有     |
| 初始值     | 可以没有 | 可以有 | 必须有 |
| 重复声明   | 可以     | 不可以 | 不可以 |

## 4. call、apply、bind区别

都是js中函数原型上的方法，用于设置函数执行时的上下文

- `call`：`call`方法允许调用一个函数，也允许指定函数内部的`this`值，它接收一个参数列表，第一个参数是`this`指向对象

```
js
复制代码const greet = (message) => {
  return `${message}, ${this.name}`;
}

const person = { name: 'Alice' };
const result = greet.call(person, 'Hello'); // "Hello, Alice"
```

- `Apply`：与call方法类似，但它接收的是一个参数数组而不是列

```
js
复制代码const greet = (message) => {
  return `${message}, ${this.name}`;
}

const person = { name: 'Alice' };
const result = greet.apply(person, ['Hello']); // "Hello, Alice"
```

- `Bind`: call与apply都用于立即执行一个函数，但是bind不会立即调用函数，而是创建一个新函数，新函数被调用时它的this会被设置为bind方法的第一个参数

```
js
复制代码const greet = (message) => {
  return `${message}, ${this.name}`;
}

const person = { name: 'Alice' };
const boundGreet = greet.bind(person, 'Hello');

const result = boundGreet(); // "Hello, Alice"
```

## 5. ==和===区别

- **`=` 是相等运算符**，**它执行类型转换以尝试匹配值的类型后再比较它们的等价性**。当使用 `==` 比较两个变量时，如果它们的类型不相同，JavaScript 会尝试将它们转换为一个共同类型，然后再进行比较。

```
js
复制代码'2' == 2; // true，因为字符串 '2' 被转换为数字 2
```

- **`===` 是严格相等运算符，它不会执行类型转换。**如果两个变量的类型不同，则这两个变量被认定为不等。使用 `===` 比较时，**仅当变量的值和类型都相同时，它们才被认为是相等的**。

```
js
复制代码'2' === 2; // false，因为它们的类型不同
```

## 6. 原型及原型链

### 原型 (Prototype)

在 JavaScript 中，每个函数在创建时都会自动获得一个 `prototype` 属性，这个属性是一个具有 `constructor` 属性的对象，而 `constructor` 属性又指回函数本身。当使用构造函数创建对象时，这些对象内部会包含一个指向构造函数 `prototype` 属性的内部链接（通常在实现中用 `[[Prototype]]` 表示，可以通过 `__proto__` 属性或 `Object.getPrototypeOf()` 方法访问）。

```
js
复制代码function Person(name){
  this.name = name;
}

Person.prototype.sayName = function(){ // Person.prototype是通过Person构造函数创建的所有实例共享的原型对象
  console.log(this.name);
};

var person1 = new Person("Alice");
person1.sayName(); // 输出 "Alice"
// person1.__proto__（或 Object.getPrototypeOf(person1)）指向Person.prototype，所以 person1可以访问sayName方法
console.log(person1.__proto__ === Person.prototype); // 输出 true
```

### 原型链 (Prototype Chain)

原型链是一个对象查找属性和方法时的查找机制。如果在对象自身上找不到请求的属性或方法，JavaScript 会沿着这个对象的原型链向上查找，直到找到属性或方法或者到达原型链的顶端（也就是 `Object.prototype`）。如果在原型链的任何一级上找到了属性或方法，查找过程就会停止；如果一直没找到，通常会返回 `undefined`（对于方法调用则会抛出错误）。

### 原型链的终点

在原型链的最顶端是 `Object.prototype`。它是所有默认对象原型链的最终点：

```
js
复制代码console.log(Person.prototype.__proto__ === Object.prototype); // 输出 true
console.log(person1.__proto__.__proto__ === Object.prototype); // 输出 true
console.log(person1.__proto__.__proto__.__proto__); // 输出 null，原型链的终点
```

`Object.prototype` 的原型是 `null`，这表示原型链的终点，即没有更多的原型对象可以查找。

##  

[浏览器灵魂之问](https://juejin.cn/post/6844904021308735502)

[HTTP灵魂之问](https://juejin.cn/post/6844904100035821575)

[TCP灵魂之问](https://juejin.cn/post/6844904070889603085)

