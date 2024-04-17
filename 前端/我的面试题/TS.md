# 五、TS面试题

[参考来源](https://juejin.cn/post/7160962909332307981)

## 1. TypeScript 是什么

TypeScript，简称 ts，是微软开发的一种静态的编程语言，它是 JavaScript 的超集。 那么它有什么特别之处呢?

1. 简单来说，js 有的 ts 都有，所有js 代码都可以在 ts 里面运行。
2. ts 支持类型支持，ts = type +JavaScript。

## 2. TypeScript 与 JavaScript 的区别

![Snipaste_2022-08-18_20-16-41.jpg](../../../../../%E7%A0%94%E7%A9%B6%E7%94%9F/%E7%A0%94%E4%BA%8C%E4%B8%8B/%E6%89%BE%E5%B7%A5%E4%BD%9C/%E5%89%8D%E7%AB%AF/assets/70e7d666a20b42939d300e8cd1a2ef71-tplv-k3u1fbpfcp-zoom-in-crop-mark-1512-0-0-0.webp)

## 3. TypeScript的类型

### 基础类型

#### 1.1 Boolean 、Number 、String 、Symbol

```
let flag:boolean = true;
let num:number = 123;
let str:string = 'this is ts';
let x: symbol = Symbol();
```

#### 1.2 Array、Tuple (元组)

数组类型，跟javascript一致，通过[]进行包裹，有两种写法：

```
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3]; // Array<number>泛型语法
```

**tuple**

元祖类型，允许表示一个已知元素数量和类型的数组，各元素的类型不必相同

```
let tupleArr:[number, string, boolean];

tupleArr = [12, '34', true]; //ok

typleArr = [12, '34'] // no ok

```

赋值的类型、位置、个数需要和定义（生明）的类型、位置、个数一致

#### 1.3 undefined 、 null

默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给 number 类型的变量。

```
let age: number = null
let realName: string = undefined
```

#### 1.4 any、unknown 、never

**any类型**: 使用any类型允许被赋值为任意类型，甚至可以调用其属性、方法

**unknown**

所有类型也都可以赋值给 `unknown`。这使得 `unknown` 成为 TypeScript 类型系统的另一种顶级类型（另一种是 `any`）。它的定义和 `any` 定义很像，但是它是一个安全类型，使用 `unknown` 做任何事情都是不合法的。

```
let num:any = 123;
num = 'str';
num = true;
```

**never**

`never`类型表示的是那些永不存在的值的类型。

有些情况下值会永不存在，比如，

- 如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值，因为抛出异常会直接中断程序运行。

- 函数中执行无限循环的代码，使得程序永远无法运行到函数返回值那一步。

  never 类型是任何类型的子类型，也可以赋值给任何类型。

  **没有类型是 never 的子类型**，没有类型可以赋值给 never 类型（除了 never 本身之外）。 即使 `any`也不可以赋值给 never 。

### ②、 函数类型

- 函数的类型实际上指的是：`函数参数`和`返回值`的类型

- 为函数指定类型的两种方式：

  1. 单独指定参数、返回值的类型

     ```
     // 函数声明
     function add(num1: number, num2: number): number {
       return num1 + num2
     }
     
     // 箭头函数
     const add = (num1: number, num2: number): number => {
       return num1 + num2
     }
     ```

  2. 同时指定参数、返回值的类型

     ```
     type AddFn = (num1: number, num2: number) => number
     
     const add: AddFn = (num1, num2) => {
       return num1 + num2
     }
     ```

#### void类型

如果函数没有返回值，那么，函数返回值类型为：`void` 

#### 可选参数

- 可选参数：在可传可不传的参数名称后面添加 `?`（问号）
- 注意：**可选参数只能出现在参数列表的最后**，也就是说可选参数后面不能再出现必选参数

#### 默认参数

跟 JS 的写法一样，在入参里定义初始值。

和可选参数不同的是，默认参数可以不放在函数入参的最后面

#### 函数重载

函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。 

### ③、 对象类型

对象类型，非原始类型，常见的形式通过{}进行包裹

```
let obj:object;
obj = {name: 'Wang', age: 25};
```

### ④、 interface 接口类型

当一个对象类型被多次使用时，一般会使用接口（`interface`）来描述对象的类型，达到复用的目的 

```
interface IPerson {
  name: string
  age: number
  sayHi(): void
}

let person: IPerson = {
  name: 'jack',
  age: 19,
  sayHi() {}
}
```

#### 4.2 接口继承

- 如果两个接口之间有相同的属性或方法，可以将**公共的属性或方法抽离出来，通过继承来实现复用**

```
interface Point2D { x: number; y: number }
// 继承 Point2D
interface Point3D extends Point2D {
  z: number
}
```

#### 4.3 interface 和 type的区别

- interface（接口）和 type（类型别名）的对比：

- 相同点：都可以给对象指定类型

- 不同点:

  - **interface** ：

    - 只能为对象指定类型
    - 可以使用extends继承
    - 多个同名的interface会合并

  - **type**：

    - 不仅可以为对象指定类型，实际上可以为任意类型指定别名
    - 可以使用&运算符实现继承效果
    - 多个同名的type会报错

  - `type` 适用于定义类型别名、联合类型、交叉类型等，并且不需要运行时信息。

    - ```
      // 类型别名（Type Aliases）：类型别名是给一个类型起一个新名字,联合类型表示一个值可以是多个类型中的一种
      type StringOrNumber = string | number;
      //  交叉类型（Intersection Types）：交叉类型表示一个值必须满足多个类型的要求。
      type Name = { name: string };
      type Age = { age: number };
      type Person = Name & Age;
      ```

  - `interface` 主要用于定义对象的类型和形状，支持继承和实现。

### ⑤、 联合类型

- 联合类型（Union Types）：联合类型表示一个值可以是多个类型中的一种。例如：

  ```
  type StringOrNumber = string | number;
  ```

### ⑥、字面量类型、枚举(enum)类型

**字面量类型**，也就是说某个特定的字符串也可以作为 TS 中的类型 

```
type World = "world";

type Greeting = `hello ${World}`;
// type Greeting = "hello world"
```

**枚举类型** 

每当需要表示一组固定的常量时，都应该使用枚举类型。 

```
// 创建枚举
enum Direction { Up, Down, Left, Right }

```



## 4. TS中的class类的关键字

**extends**

在 TypeScript 中，我们可以通过 `extends` 关键字来实现继承

**super**

子类没有定义自己的属性，可以不写 super ，但是如果子类有自己的属性，就要用到 super 关键字来把父类的属性继承过来。

**public**

`public`，公有的，一个类里默认所有的方法和属性都是 public。

**private**

`private`，私有的，只属于这个类自己，它的实例和继承它的子类都访问不到。

**protected**

`protected` 受保护的，继承它的子类可以访问，实例不能访问。

**static**

`static` 是静态属性，可以理解为是类上的一些常量，实例不能访问。

**abstract**

`abstract` 关键字来定义抽象类和抽象方法

抽象类，是指**只能被继承，但不能被实例化的类**，就这么简单。

抽象类有两个特点：

- 抽象类不允许被实例化
- 抽象类中的抽象方法必须被子类实现

## 5. 类型推断、类型断言、非空断言

### 5.1 **类型推断**

在 TS 中，某些没有明确指出类型的地方，**TS 的类型推论机制会帮助提供类型**  

```
// 变量 age 的类型被自动推断为：number
let age = 18

// 函数返回值的类型被自动推断为：number
function add(num1: number, num2: number) {
  return num1 + num2
}
```

### 5.2 **类型断言**

有时候你会比 TS 更加明确一个值的类型，此时，可以使用类型断言来指定**更具体**的类型。

类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。

`as`和`<>`都可以用来类型推断，但是尖括号格式会与 `react` 中 `JSX` 产生语法冲突，因此我们更推荐使用 `as` 语法。

```
// 尖括号 语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as 语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

[参考来源](https://juejin.cn/post/7108724041103441957)

### 5.3 **非空断言**

在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 `!` 可以用于断言操作对象是非 null 和非 undefined 类型。**具体而言，x! 将从 x 值域中排除 null 和 undefined 。**

```
const aLink = document.getElementById('link')! 
 //如果没有非空断言，使用aLink时会报错，因为页面可能没有link这个标签，得到的就是undefined
```

 

## 6. 泛型

- **泛型是可以在保证类型安全前提下，让函数等与多种类型一起工作，从而实现复用**，常用于：函数、接口、class 中

- 我们需要变量，这个变量代表了传入的类型，然后再返回这个变量，它是一种特殊的变量，只用于表示类型而不是值。

  这个类型变量在 `TypeScript` 中就叫做「泛型」。

  ```
  function returnItem<T>(param: T): T {
    return param
  }
  ```

## 7. TS内置的常用工具类型

### 7.1 typeof

在 TypeScript 中，`typeof` 操作符可以用来获取一个变量声明或对象的类型。

### 7.2 keyof

`keyof` 操作符是在 TypeScript 2.1 版本引入的，该操作符可以用于获取某种类型的所有键，其返回类型是联合类型。

```
interface Person {
  name: string;
  age: number;
}

type K1 = keyof Person; // "name" | "age"
```

### 7.3 in

`in` 用来遍历枚举类型：

```
type Keys = "a" | "b" | "c"

type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any, c: any }

```

### 7.4 infer

在条件类型语句中，可以用 `infer` 声明一个类型变量并且对它进行使用。

### 7.5 extends

有时候我们定义的泛型不想过于灵活或者说想继承某些类等，可以通过 extends 关键字添加泛型约束。

### 7.6 Partial、Readonly、Required

`Partial<T>` 的作用就是将某个类型里的属性全部变为可选项 `?`。

```
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

在以上代码中，首先通过 `keyof T` 拿到 `T` 的所有属性名，然后使用 `in` 进行遍历，将值赋给 `P`，最后通过 `T[P]` 取得相应的属性值。中间的 `?` 号，用于将所有属性变为可选。

`Readonly<T>`

将 T 中的所有属性设置为只读

`Required<T>`

将 T 中的所有属性设置为必须

### 7.7 Omit

`Omit<T, U>`从类型 `T` 中剔除 `U` 中的所有属性

```
interface IPerson {
    name: string
    age: number
}

type IOmit = Omit<IPerson, 'age'>
// 这样就剔除了 IPerson 上的 age 属性。
```

## 8. TS怎么自定义类型声明文件

**如下两种场景需要提供类型声明文件**

1. 项目内共享类型
2. 为已有 JS 文件提供类型声明

### 12.1 项目内共享类型

将公共的类型定义提取出来，写在index.d.ts文件中 , 并导出

```
export interface Token {
  token: string
  refreshToken: string
}
```

导入接口并使用

```
<script setup lang='ts'>
import {Token} from '.' 
function fn(token:Token){
  
}
</script>
```

### 12.2 为已有 JS 文件提供类型声明

**编写同名的.d.ts文件**

```
demo.ts
utils/index.js
utils/index.d.ts // 这里是重点
```

**定义类型声明文件** 它的作用是提供声明，不需要提供逻辑代码；

declare 关键字:用于类型声明，为其他地方(比如，.js 文件)已存在的变量声明类型，而不是创建一个新的变量。

- 对于 type、interface 等这些明确就是 TS 类型的(只能在 TS 中使用的)，可以省略 declare 关键字。
- 对于 let、function 等具有双重含义(在 JS、TS 中都能用)，应该使用 declare 关键字，明确指定此处用于类型声明。

 

## 9. 说说对 TypeScript 中命名空间与模块的理解

**模块**

`TypeScript` 与`ECMAScript` 2015 一样，任何包含顶级 `import` 或者 `export` 的文件都被当成一个模块

相反地，如果一个文件不带有顶级的`import`或者`export`声明，那么它的内容被视为全局可见的

**命名空间**

命名空间一个最明确的目的就是解决重名问题

 命名空间也是用来解决重名问题。

`TypeScript` 中命名空间使用 `namespace` 来定义，语法格式如下：

```
namespace SomeNameSpace1 {
  export const a1 = 1;
  export const str1 = "randy";
  export const say = () => {
    console.log("SomeNameSpace1");
  };
}
```

使用方式和对象相似。

```
SomeNameSpace1.a1
SomeNameSpace1.str1
SomeNameSpace1.say
```

[参考来源](https://juejin.cn/post/7110026625177092109)

## 10. 说说你对 TypeScript 装饰器的理解？

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上

是一种在不改变原类和使用继承的情况下，动态地扩展对象功能

### 装饰器类型

在 `TypeScript` 里，主要有类装饰器、方法装饰器、属性装饰器、参数装饰器。

## 11. Vue3中父子传值 , 用TS怎么写，怎么设置默认值



```
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```

设置默认值：

```
export interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

# 