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
class Person {
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
const [a, b] = [1, 2];
const { x, y } = { x: 10, y: 20 };
```

- **扩展运算符（Spread Operator）和剩余参数（Rest Parameters）** ：使用 `...` 实现。

```
const numbers = [1, 2, 3];
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
const greet = (message) => {
  return `${message}, ${this.name}`;
}

const person = { name: 'Alice' };
const result = greet.call(person, 'Hello'); // "Hello, Alice"
```

- `Apply`：与call方法类似，但它接收的是一个参数数组而不是列

```
const greet = (message) => {
  return `${message}, ${this.name}`;
}

const person = { name: 'Alice' };
const result = greet.apply(person, ['Hello']); // "Hello, Alice"
```

- `Bind`: call与apply都用于立即执行一个函数，但是bind不会立即调用函数，而是创建一个新函数，新函数被调用时它的this会被设置为bind方法的第一个参数

```
const greet = (message) => {
  return `${message}, ${this.name}`;
}

const person = { name: 'Alice' };
const boundGreet = greet.bind(person, 'Hello');

const result = boundGreet(); // "Hello, Alice"
```

## 5. ==和===区别

- **`=` 是相等运算符**，**它执行类型转换以尝试匹配值的类型后再比较它们的等价性**。当使用 `==` 比较两个变量时，如果它们的类型不相同，JavaScript 会尝试将它们转换为一个共同类型，然后再进行比较。

```
'2' == 2; // true，因为字符串 '2' 被转换为数字 2
```

- **`===` 是严格相等运算符，它不会执行类型转换。**如果两个变量的类型不同，则这两个变量被认定为不等。使用 `===` 比较时，**仅当变量的值和类型都相同时，它们才被认为是相等的**。

```
'2' === 2; // false，因为它们的类型不同
```

## 6. 原型及原型链

### 原型 (Prototype)

在 JavaScript 中，每个函数在创建时都会自动获得一个 `prototype` 属性，这个属性是一个具有 `constructor` 属性的对象，而 `constructor` 属性又指回函数本身。当使用构造函数创建对象时，这些对象内部会包含一个指向构造函数 `prototype` 属性的内部链接（通常在实现中用 `[[Prototype]]` 表示，可以通过 `__proto__` 属性或 `Object.getPrototypeOf()` 方法访问）。

```
function Person(name){
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
console.log(Person.prototype.__proto__ === Object.prototype); // 输出 true
console.log(person1.__proto__.__proto__ === Object.prototype); // 输出 true
console.log(person1.__proto__.__proto__.__proto__); // 输出 null，原型链的终点
```

`Object.prototype` 的原型是 `null`，这表示原型链的终点，即没有更多的原型对象可以查找。

##  7. 继承的方式

### 原型链继承

通过将子类的原型设置为父类的实例来实现继承。

```
function Parent() {
  this.property = true;
}

Parent.prototype.getParentProperty = function() {
  return this.property;
};

function Child() {
  this.childProperty = false;
}

// 继承 Parent
Child.prototype = new Parent();

var child = new Child();
console.log(child.getParentProperty()); // true
```

### 构造函数继承

在子类的构造函数中调用父类的构造函数，使用 `call` 或 `apply` 方法将子类实例的 `this` 绑定到父类函数上实现继承。

```
function Parent(name) {
  this.name = name;
}

function Child(name) {
  Parent.call(this, name);
}

var child = new Child("Alice");
console.log(child.name); // Alice
```

这种方式的缺点是方法都在构造函数中定义，因此每次创建实例都会创建一遍方法。

### 组合继承（原型链 + 构造函数）

结合了原型链继承和构造函数继承的优点，是 JavaScript 中最常用的继承模式。

```
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.sayName = function() {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name); // 继承属性
  this.age = age;
}

Child.prototype = new Parent(); // 继承方法
Child.prototype.constructor = Child; // 修正 constructor 指针

Child.prototype.sayAge = function() {
  console.log(this.age);
};

var child1 = new Child("Alice", 10);
child1.colors.push('black');
console.log(child1.colors); // ["red", "blue", "green", "black"]
child1.sayName(); // Alice
child1.sayAge(); // 10
```

### 原型式继承

使用 `Object.create` 方法创建一个新对象，使用现有的对象来提供新创建的对象的 `__proto__`。

```
var person = {
  name: 'Alice',
  friends: ['Bob', 'Eve']
};

var anotherPerson = Object.create(person);
anotherPerson.name = 'Clara';
anotherPerson.friends.push('Dave');

console.log(person.friends); // ["Bob", "Eve", "Dave"]
// 原型式继承的缺点是包含引用类型值的属性始终会共享相应的值。
```

### 寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种方式增强对象，最后再像真的是它做了所有工作一样返回对象。

```
function createAnother(original) {
  var clone = Object.create(original); // 通过调用函数创建一个新对象
  clone.sayHi = function() { // 以某种方式增强这个对象
    console.log('hi');
  };
  return clone; // 返回这个对象
}

var person = {
  name: "Alice",
  friends: ["Bob", "Eve"]
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi(); // "hi"
```

### 寄生组合式继承

通过借用构造函数来继承属性，通过原型链的混成形式来继承方法，基本思路是不必为了指定子类型的原型而调用超类型的构造函数。

```
function inheritPrototype(subType, superType) {
  var prototype = Object.create(superType.prototype); // 创建对象
  prototype.constructor = subType; // 增强对象
  subType.prototype = prototype; // 指定对象
}

function SuperType(name) {
  this.name = name;
}

SuperType.prototype.sayName = function() {
  console.log(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function() {
  console.log(this.age);
};

var instance = new SubType("Alice", 21);
instance.sayName(); // Alice
instance.sayAge(); // 21
```

寄生组合式继承是最有效率的继承方式，它只调用一次 SuperType 构造函数，并且避免了在 SubType.prototype 上创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。出于这些原因，寄生组合式继承被认为是引用类型最理想的继承范式

##   8. 作用域和闭包

**作用域**：是程序中定义变量的区域，分为全局作用域（代码的任何地方都能访问到的变量）和局部作用域（只能在函数或者代码块内部访问的变量）；局部作用域可以分为局部作用域和函数作用域

**闭包**：当一个函数嵌套在另一个函数中，内部函数会保留外部函数的作用域，即使外部函数已经执行完毕，内部函数依然可以访问外部函数中的变量

  常用的两个用途： 

- 在函数外部可以方位到内部的变量，可以通过这种方法来创建私有变量
- 已经结束运行的函数，上下文中的变量对象会继续留在内存中，因为闭包函数保留了这个对象的引用，所以变量不会被回收

闭包的坏处 ：

- 使用不当会造成内存泄露
- 闭包使得函数的变量都放在内存中，内存消耗较大，解决办法是退出函数之前把所有的变量删除
- 闭包会在父函数外部改变其内部的值



[HTTP灵魂之问](https://juejin.cn/post/6844904100035821575)

[TCP灵魂之问](https://juejin.cn/post/6844904070889603085)

