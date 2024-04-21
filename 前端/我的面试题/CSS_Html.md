# 一、CSS

## 1 盒子模型

所有 HTML 元素都可以视为一个盒子，该盒子包括： margin 、 border 、 padding、content

盒模型有2类， 标准盒模型和IE盒模型，最主要的区别还是在width和height的含义上

- 在标准盒模型中，width、height代表的是content的宽高
- 在IE盒模型中，width、height代表的是content + padding + border的宽高

`box-sizing: content-box;` 代表的是标准盒模型，`box-sizing: border-box;` 代表的是IE盒模型。

## 2.选择器

1. id选择器（#box） 
2. 类选择器（.one） 
3. 标签选择器（div） 
4. 后代选择器（#box div） 
5. 子选择器（.one>one_1） 
6. 相邻同胞选择器（.one+.two） 
7. 群组选择器（div,p） 

### 优先级

!important > 行内样式 > ID选择器 > 类选择器 > 标签选择器 > 通配符 > 浏览器默认属性

### 优先级计算

1. `!important`
2. 内联样式（1000）
3. ID 选择器（0100）
4. 类选择器 / 属性选择器 / 伪类选择器（0010）
5. 元素选择器 / 关系选择器 / 伪元素选择器（0001）
6. 通配选择器（0000）

### 继承

可继承的属性：font-size, font-family, color

不可继承的样式：border, padding, margin, width, height

## 3. 说说em/px/rem/vh/vw区别?

- `em`：相对于父元素的字体大小。父元素的字体大小是`16px`，那么`1em`就等于`16px` 
- `px`：固定像素单位。
- `rem`：相对于根元素（`html`）的字体大小。根元素的字体大小是`16px`，那么`1rem`就等于`16px` 
- `vh`：视口高度单位。`1vh` 等于视口高度的 1%
- `vw`：视口宽度单位。`1vw`等于视口宽度的1% 

## 4.BFC

理解：BFC是css布局的一个概念，是一块独立的渲染区域，一个环境，里面的元素不会影响到外部的元素

### 如何生成BFC：（脱离文档流）

​		     【1】根元素，即HTML元素（最大的一个BFC）

​		     【2】float的值不为none

​		     【3】position的值为absolute或fixed

​		     【4】overflow的值不为visible（默认值。内容不会被修剪，会呈现在元素框之外）

​		     【5】display的值为inline-block、table-cell、table-caption

### BFC布局规则：

`BFC`就是一个块级元素，块级元素会在垂直方向一个接一个的排列

`BFC`就是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签

垂直方向的距离由margin决定， 属于同一个`BFC`的两个相邻的标签外边距会发生重叠

计算`BFC`的高度时，浮动元素也参与计算

### BFC作用：

1. 利用 BFC 避免 margin 重叠
2. 自适应两栏布局
3. 清除浮动

## 5. 居中

### 水平垂直居中

**实现方式**

实现元素水平垂直居中的方式：

- 父元素position: relative子元素  position: absolute +  top、 left、right、bottom:0 +margin:auto
- 父元素position: relative子元素  position: absolute+   top: 50%;left: 50%+transform：`translate(-50%, -50%);
- table布局： 设置父元素为`display:table-cell`，vertical-align: middle; text-align: center; 子元素设置 `display: inline-block`。  
- flex布局：   display: flex;   justify-content: center;     align-items: center;
- grid布局：  display: grid;   align-items:center;  justify-content: center;

### 水平居中

- 元素为行内元素，设置父元素 text-align:center 
- 如果元素宽度固定， 可以设置左右 margin 为 auto ; 
- 如果元素为绝对定位，设置父元素 position 为 relative ，元素设 left:0;right:0;margin:auto; 
- 使用 flex-box 布局，指定 justify-content 属性为center 
- display 设置为 tabel-ceil

### 垂直居中

- 将显示方式设置为表格， display:table-cell ,同时设置 vertial-align：middle 
- 使用 flex 布局，设置为 align-item： center 
- 绝对定位中设置 bottom:0,top:0 ,并设置 margin:auto 
- 绝对定位中固定高度时设置 top:50%，margin-top 值为高度⼀半的负值 
- 文本垂直居中设置 line-height 为 height 值

## 6. **flexbox（弹性盒布局模型）,以及适用场景？**

该布局模型的目的是提供一种更加高效的方式来对容器中的条目进行布局、对齐和分配空间。在传统的布局方式中，block 布局是把块在垂直方向从上到下依次排列的；而 inline 布局则是在水平方向来排列。弹性盒布局并没有这样内在的方向限制，可以由开发人员自由操作。 

Flex Container的属性有：

- flex-direction，决定主轴的方向
- flex-wrap，决定Flex item时候可以换行
- justify-content，定义了item在主轴上的对齐方式
- align-items，定义了item在交叉轴上如何对齐
- align-content，定义了多根轴线的对齐方式，如果项目只有一根轴线，该属性不起作用

对于项目布局

- order: 数值越小，排序越前
- flex-grow: 拉伸布局
- flex-shrink: 收缩布局
- flex: 结合order 、grow、 shrink布局
- flex-basis: 基本布局
- aligin-self: 布局

适用场景：弹性布局适合于移动前端开发、两栏三栏自适应布局 。 

## 7.怎么理解回流跟重绘？什么场景下会触发

**浏览器计算页面布局的过程就叫做`回流`**

GPU将已经计算好几何信息的容器在屏幕上亮起来就是`重绘`

### 触发回流：页面上有容器的几何属性发生变更

1. 改变窗口的尺寸
2. 改变元素的尺寸
3. display: none | block;（增加或删除可见元素）
4. 页面初次渲染

### 触发重绘：容器非几何属性变更，比如颜色等

1. 修改背景颜色
2. 修改背景图片
3. 边框颜色
4. 字体颜色
5. 回流

 **回流 会带来重绘，重绘不一定带来回流**

## 7. 画三角形

首先，需要把元素的宽度、高度设为0。然后设置边框样式，如设置四个边框大小为40px solid 将三个边框颜色设置为透明，剩下那个设置为红色。

```
width: 0;
height: 0;
border-top: 40px solid transparent;
border-left: 40px solid transparent;
border-right: 40px solid transparent;
border-bottom: 40px solid #ff0000;
```

## 8. 让Chrome支持小于12px 的文字方式有哪些？

常见的解决方案有：

- zoom
- -webkit-transform:scale()
- -webkit-text-size-adjust:none

`Zoom` 是非标属性，有兼容问题，**缩放会改变了元素占据的空间大小，触发重排**

`-webkit-transform:scale()` **大部分现代浏览器支持， 缩放不会改变了元素占据的空间大小，页面布局不会发生变化**

`-webkit-text-size-adjust`对谷歌浏览器有版本要求，在27之后，就取消了该属性的支持，并且只对英文、数字生效



## 9 常用定位方式有哪些 相对于谁定位

position 属性指定了元素的定位类型。

position 属性的五个值：

- static： static是默认值，元素在正常的流中，top、right、bottom、left和z-index属性无效。 
- relative：相对定位元素的定位是相对其正常位置。 top、right、bottom、left和z-index属性有效。 
- fixed：元素脱离正常的流，相对于浏览器窗口进行定位 
- absolute：绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于<html>
- sticky：粘性定位的元素是依赖于用户的滚动，在 **position:relative** 与 **position:fixed** 定位之间切换。 

## 10 display属性值有哪些？

block 转换成块状元素。 

inline 转换成行内元素。 

none 设置元素不可见。 

inline-block 象行内元素⼀样显示，但其内容象块类型元素⼀样显示。 

list-item 像块类型元素⼀样显示， 并添加样式列表标记。

table 此元素会作为块级表格来显示 

inherit 规定应该从父元素继承 display 属性的值

## 11 如何实现一个不定宽高的div垂直水平居中

- 父元素position: relative子元素  position: absolute+   top: 50%;left: 50%+transform：`translate(-50%, -50%);
- table布局： 设置父元素为`display:table-cell`，vertical-align: middle; text-align: center; 子元素设置 `display: inline-block`。  
- flex布局：   display: flex;   justify-content: center;     align-items: center;
- grid布局：  display: grid;   align-items:center;  justify-content: center;

## 12 如何实现一个左边宽度固定右边宽度自适应的两栏布局

使用弹性布局 父元素使用display：flex，左边元素设置宽度大小，右边元素设置flex：1

```
<style>
    .box{
        display: flex;
    }
    .left {
        width: 100px;
    }
    .right {
        flex: 1;
    }
</style>
<div class="box">
    <div class="left">左边</div>
    <div class="right">右边</div>
</div>
```



# 二、HTML

## 1 语义化的理解

就是用正确的标签做正确的事情 。 

HTML 语义化就是让页面的内容结构化，便于对**浏览器 、搜索引擎解析**； 

在没有样式 CSS 情况下也以⼀种⽂档格式显示， 并且是**容易阅读的。** 

搜索引擎的爬虫依赖于标记来确定上下⽂和各个关键字的权重，**利于 SEO** 。 

使阅读源代码的⼈对网站更容易将网站分块，便于阅读维护理解

## 2. src与href 区别

src 用于替换当前元素， href用于在当前⽂档和引用资源之间确立联系。 

src  指向外部资源的位置，在请求 src 资源时会将其指向的资源下载并应用到⽂档内，例如 js 脚本， img 图片和 frame 等元素，当浏览器解析到该元素时，会暂停其它资源下载，直到将该资源加载、编译、执行完毕。所以一般将js脚本放在底部。

href 指向网络资源，当浏览器识别到它指向的⽂件时，就会并⾏下载资源，不会停⽌对当前⽂档的处理，通常用于a、link元素。

## 3. **iframe 标签有那些优点和缺点？ **

iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。

**优点：**

- 用来加载速度较慢的内容（如广告）
- 可以使脚本可以并行下载
- 可以实现跨子域通信

**缺点：**

- iframe 会阻塞主页面的 onload 事件
- 无法被一些搜索引擎索识别
- 会产生很多页面，不容易管理

## 4.行内元素、空元素、块级元素

⾏内元素有： a b span img input select strong 

块级元素有： div ul ol li dl dt dd h1 h2 h3 h4… p 

空元素：`<br>` `<hr>` `<img>`  `<input>` ` <link>`  `<meta> `

⾏内元素不可以设置宽高，不独占⼀⾏ 

块级元素可以设置宽高， 独占⼀⾏

## 5 Canvas和SVG有什么区别？

- svg 绘制出来的每⼀个图形的元素都是独立的 DOM 节点， 能够方便的绑定事件或，也可以通过脚本和CSS进行修改 。 canvas 输出的是⼀整幅画布，不支持事件处理器，只能通过脚本修改
- svg 输出的图形是矢量图形，放大缩⼩不会失真和锯齿 。而 canvas 输出标量画布，就像⼀张图片⼀样，放大会失真或者锯齿

