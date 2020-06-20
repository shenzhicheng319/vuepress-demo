# es6
ES6总结篇（一）小弟的第一滴血，希望大家多多包涵哈

简介

相信大家都看过**阮一峰老师**的《ECMAScript6简介》，博主也读过很多次了，每次阅读都有新的收获，然后博主打算整理成一套完整笔记，做一套**ES6总结系列**。老话常说，**读书先把厚书读薄，然后再把薄书读厚**，博主现在做的事是把书读薄的过程，当然了，也是为了方便大家快速的了解ES6的特性以及本书的重要知识点，废话不多说，直接开车。

第一章、EACMScript 6 简介
===================

1\. EACMScript与JavaScript的关系
----------------------------

大家对JavaScript起源都有一定了解，这个就不再赘述，直接引用ES6的总结：

    ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现。
    另外的 ECMAScript 方言还有 JScript 和ActionScript。日常场合，这两个词是可以互换的。
    

2\. Babel 转码器
-------------

1.  **Babel的作用**

*   1.1 **Babel** babeljs.io/ 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行

    // 转码前
    input.map(item => item + 1);
    
    // 转码后
    input.map(function (item) {
      return item + 1;
    });
    

由于ES6有兼容性问题，导致有些语法糖不能在某些浏览器上正确执行，经过**Babel**转码之后变成大家都兼容的ES5，就可以正常执行了。

2.  **安装以及配置**

*   2.2.1 在项目的命令行安装 `$ npm install --save-dev @babel/core`
*   2.2.2 **.babelrc文件**用来设置转码规则和插件，基本规格如下：

    {
        "presets": [
          "@babel/env", //最新转码规则
          "@babel/preset-react" //react 转码规则
        ],
        "plugins": []
    }
    

presets字段设定转码规则： 官方提供以下的规则集(需要先安装再在**.babelrc文件**中使用，安装如下)

    # 最新转码规则
    $ npm install --save-dev @babel/preset-env
    # react 转码规则
    $ npm install --save-dev @babel/preset-reac
    

**注意，以下所有 Babel 工具和模块的使用，都必须先写好.babelrc。**

*   2.2.3 **命令行工具@babel/cli、@babel/node、@babel/register** 它的安装命令如下：

    $ npm install --save-dev @babel/cli
    $ npm install --save-dev @babel/node #提供一个支持 ES6 的 REPL 环境
    $ npm install --save-dev @babel/register 
    #改写require命令，为它加上一个钩子。
    #每当使用require加载.js、.jsx、.es和.es6
    #后缀名的文件，就会先用 Babel 进行转码
    

@babel/cli 基本用法（**babel指令**）：

    # 转码结果输出到标准输出
    $ npx babel example.js
    
    # 转码结果写入一个文件
    # --out-file 或 -o 参数指定输出文件
    $ npx babel example.js --out-file compiled.js
    # 或者
    $ npx babel example.js -o compiled.js
    
    # 整个目录转码
    # --out-dir 或 -d 参数指定输出目录
    $ npx babel src --out-dir lib
    # 或者
    $ npx babel src -d lib
    
    # -s 参数生成source map文件
    $ npx babel src -d lib -s
    

@babel/node 基本用法（**babel-node指令**）

    $ npx babel-node
    > (x => x * 2)(1)
    2
    

@babel/register 基本用法

    //使用时必须首先加载@babel/register
    require('@babel/register');
    require('./es6.js');
    

*   2.2.4 polyfill （用来转换babel无法转换的API以及一些语法） 使用core-js和**regenerator-runtime(提供generator函数的转码)**。
*   安装：`$ npm install --save-dev core-js regenerator-runtime`
*   使用

    import 'core-js';
    import 'regenerator-runtime/runtime';
    // 或者
    require('core-js');
    require('regenerator-runtime/runtime);
    

Babel 默认不转码的 API 非常多，详细清单可以查看babel-plugin-transform-runtime模块的[github.com/babel/babel…](definitions.js)文件

*   **浏览器环境**
*   Babel 也可以用于浏览器环境，使用@babel/standalone模块提供的浏览器版本，将其插入网页。

    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">
    // Your ES6 code
    </script>
    

注意，网页实时将 ES6 代码转为 ES5，对性能会有影响。生产环境需要加载已经转码完成的脚本。

Babel 提供一个REPL 在线编译器，可以在线将 ES6 代码转为 ES5 代码。转换后的代码，可以直接作为 ES5 代码插入网页运行。

第二章、let 和 const 命令
==================

1\. let 的特性以及用法
---------------

1.  首先，我先总结一下**var**缺点

*   1.1 允许重复的变量声明：导致数据被覆盖
*   1.2 变量提升：怪异的数据访问、闭包问题
*   1.3 全局变量挂载到全局对象：全局对象成员污染问题

    // 1. 允许重复的变量声明：导致数据被覆盖
    var a = 1;
    function print(){
        console.log(a)
     }
    // 假设这里有一千行代码
    var a = 2;
    print(); // 2
    
    // 2. 变量提升：怪异的数据访问
    
    if (Math.random() < 0.5) {
        var a = "abc";
        console.log(a);
     }
    else {
       console.log(a);
    }
    console.log(a); // 无论怎样访问都是abc
    
    // 3. 全局变量挂载到全局对象：全局对象成员污染问题
    
    var abc = "123";
    console.log(window.abc); // 123
    
    // var console = "abc";
    // console.log(console) // abc 这个很可怕
    

2.  let (完美的解决了这些问题)
    1.  let声明的变量不会挂载到全局对象
    2.  let声明的变量，不允许当前作用域范围内重复声明
    3.  使用let不会有变量提升，因此，不能在定义let变量之前使用它(形成暂时性死区)

*   **暂时性死区**：在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。
*   **块级作用域**：代码执行时遇到花括号，会创建一个块级作用域，花括号结束，销毁块级作用域

    // 1. let声明的变量不会挂载到全局对象
    
    let a = 123;
    console.log(window.a) // undefined
    
    // 2. let声明的变量，不允许当前作用域范围内重复声明
    
    if (Math.random() < 0.5) {
        let a = 123; //定义在当前块级作用域
        console.log(a) //当前块级作用域中的a
    } else {
        //这是另外一个块级作用域，该作用域中找不到a
        console.log(a)
    }
    
    //3. 使用let不会有变量提升，因此，不能在定义let变量之前使用它
    
    console(c); // Uncaught ReferenceError: c is not defined 形成了暂时性死区
    let c = 6;
    

**暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。**

2\. const 特性以及方法
----------------

*   const和let完全相同，仅在于用const声明的变量，必须在声明时赋值，而且不可以重新赋值。（这里就不再举例其使用了）
*   实际上，在开发中，应该尽量使用const来声明变量，以保证变量的值不会随意篡改，原因：

1.  根据经验，开发中的很多变量，都是不会更改，也不应该更改的。
2.  后续的很多框架或者是第三方JS库，都要求数据不可变，使用常量可以一定程度上保证这一点。

**注意**

1.  常量不可变，是指声明的常量的内存空间不可变，并不保证内存空间中的地址指向的其他空间不可变
2.  常量的命名
    1.  特殊的常量：该常量从字面意义上，一定是不可变的，比如圆周率、月地距地或其他一些绝不可能变化的配置。通常，**该常量的名称全部使用大写，多个单词之间用下划线分割**
    2.  普通的常量：使用和之前一样的命名即可
3.  在for循环中，循环变量不可以使用常量，只能用let 关于主义的第一点，我举个例子

    const a = {
        name: "kevin",
        age: 123
    };
    a.name = "abc";
    console.log(a) // abc
    
    // const PI = 3.14;
    // const MOON_EARTH_DISTANCE = 3245563424; //月地距离
    

3\. 顶层对象属性
----------

1.  顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象

    var a = 1;
    // 如果在 Node 的 REPL 环境，可以写成 global.a
    // 或者采用通用方法，写成 this.a
    window.a // 1
    
    let b = 1;
    window.b // undefined let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性
    

2.  globalThis 对象 因为环境的不同，顶层对象在各种实现里面是不统一的
    1.  浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
    2.  浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
    3.  Node 里面，顶层对象是global，但其他环境都不支持。 在不同环境中获取顶层对象的this ES6 提供了两个方法

    // 方法一
    (typeof window !== 'undefined'
       ? window
       : (typeof process === 'object' &&
          typeof require === 'function' &&
          typeof global === 'object')
         ? global
         : this);
    
    // 方法二
    var getGlobal = function () {
      if (typeof self !== 'undefined') { return self; }
      if (typeof window !== 'undefined') { return window; }
      if (typeof global !== 'undefined') { return global; }
      throw new Error('unable to locate global object');
    };
    

而且，ES6最后提到：

*   ES2020 在语言标准的层面，引入globalThis作为顶层对象。也就是说，任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的this。
*   垫片库global-this模拟了这个提案，可以在所有环境拿到globalThis。

第三章、变量的解构赋值
===========

*   在此，我这里主要介绍工作中我们常用的几种解构赋值：

1.  对象的结构
2.  数组的结构
3.  参数的结构
4.  其他的结构

1\. 对象的结构
---------

**1\. 什么是解构**

*   ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring） **解构不会对被解构的目标造成任何影响**
*   **在解构中使用默认值**

    {同名变量 = 默认值}
    const user = {
        name: "kevin",
        age: 11,
        sex: "男",
        address: {
            province: "四川",
            city: "成都"
        }
    }
    //解构出user中的name、province
    //定义两个变量name、province
    //再解构
    const { name, address: { province } } = user;
    console.log(name, province) 
    // name: kevin  province: 四川
    

*   **非同名属性解构**

    {属性名:变量名}
    let obj = {};
    let arr = [];
    ({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
    obj // {prop:123}
    arr // [true]
    //如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错
    
    let {foo: {bar}} = {baz: 'baz'};
    // 报错
    

2\. 数组的结构
---------

    let [a, b, c] = [1, 2, 3];
    // a:1 b:2 c:3
    

这种写法属于**模式匹配**，只要等号两边的模式相同，左边的变量就会被赋予对应的值

*   下面一些使用嵌套数组进行解构的例子以及一些情况

    let [foo, [[bar], baz]] = [1, [[2], 3]];
    foo // 1    bar // 2    baz // 3
    
    let [ , , third] = ["foo", "bar", "baz"];
    third // "baz"
    
    // 1. 不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
    let [x, y] = [1, 2, 3];
    x // 1  y // 2
    
    let [a, [b], d] = [1, [2, 3], 4];
    a // 1  b // 2  d // 4
    // 2. 数组解构出 值和数组（运用扩展运算符... 在接下来的章节里会就介绍到）
    
    let [head, ...tail] = [1, 2, 3, 4];
    head // 1   tail // [2, 3, 4]
    
    // 3. 如果解构不成功，变量的值就等于undefined。
    
    let [x, y, ...z] = ['a'];
    x // "a"    y // undefined  z // []
    
    // 4. 如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。
    
    // 4.1 要么转为对象以后不具备 Iterator 接口
    
    let [foo] = 1;
    let [foo] = false;
    let [foo] = NaN;
    let [foo] = undefined;
    let [foo] = null;
    
    // 4.2 本身就不具备 Iterator 接口
    
    let [foo] = {};
    

从最后的例子可以看出，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。

    function* fibs() {
      let a = 0;
      let b = 1;
      while (true) {
        yield a;
        [a, b] = [b, a + b];
      }
    }
    
    let [first, second, third, fourth, fifth, sixth] = fibs();
    sixth // 5
    

上面代码中，fibs是一个 Generator 函数（参见《Generator 函数》一章），原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。

3\. 参数的结构
---------

废话不多说，直接上例子

    function add([x, y]){
      return x + y;
    }
    add([1, 2]); // 3
    // 函数add的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量x和y。
    // 对于函数内部的代码来说，它们能感受到的参数就是x和y。
    

箭头函数也可以解构赋值

    [[1, 2], [3, 4]].map(([a, b]) => a + b);
    // [ 3, 7 ]
    

函数参数的解构也可以使用**默认值** 在第五章会给出介绍

    function move({x = 0, y = 0} = {}) { //x y 在参数上设置默认值
      return [x, y];
    }
    move({x: 3, y: 8}); // [3, 8]
    move({x: 3}); // [3, 0]
    move({}); // [0, 0]
    move(); // [0, 0]
    // 函数move的参数是一个对象，通过对这个对象进行解构，得到变量x和y的值。
    // 如果解构失败，x和y等于默认值。
    

undefined就会触发函数参数的默认值。

    [1, undefined, 3].map((x = 'yes') => x);
    // [ 1, 'yes', 3 ]
    

4\. 其他的解构
---------

1.  对象的解构也可以指定默认值 设置**默认值**

    var {x = 3} = {};
    x // 3
    
    var {x, y = 5} = {x: 1};
    x // 1
    y // 5
    
    var {x: y = 3} = {};
    y // 3
    
    var {x: y = 3} = {x: 5};
    y // 5
    
    var { message: msg = 'Something went wrong' } = {};
    msg // "Something went wrong"
    

*   默认值生效的条件是，对象的属性值严格等于undefined。

    var {x = 3} = {x: undefined};
    x // 3
    
    var {x = 3} = {x: null};
    x // null  因为null与undefined不严格相等，所以是个有效的赋值，导致默认值3不会生效
    

**注意点**

1.  如果要将一个已经声明的变量用于解构赋值，必须非常小心。

    // 错误的写法
    let x;
    {x} = {x: 1};
    // SyntaxError: syntax error因为JavaScript引擎会将{x}理解成一个代码块，从而发生语法错误。
    // 只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。
    // 正确的写法
    let x;
    ({x} = {x: 1});
    

2.  解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式

    ({} = [true, false]);
    ({} = 'abc');
    ({} = []);
    

3.  由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。

    let arr = [1, 2, 3];
    let {0 : first, [arr.length - 1] : last} = arr;
    first // 1
    last // 3 
    

第四章、字符串的扩展
==========

1\. 更好的Unicode支持
----------------

首先，介绍一下码元：

1.  早期，由于存储空间宝贵，Unicode使用16位二进制来存储文字。我们将一个16位的二进制编码叫做一个**码元（Code Unit）**。后来，由于技术的发展，Unicode对文字编码进行了扩展，将某些文字扩展到了32位（占用两个码元），并且，将某个文字对应的二进制数字叫做**码点（Code Point）**。

ES6为了解决这个困扰，为字符串提供了方法：codePointAt，根据字符串码元的位置得到其码点。

同时，ES6为正则表达式添加了一个flag: u，如果添加了该配置，则匹配时，使用码点匹配

    const text = "𠮷"; //占用了两个码元（32位）
    
    console.log("字符串长度：", text.length); // 2
    console.log("使用正则测试：", /^.$/u.test(text)); // true
    console.log("得到第一个码元：", text.charCodeAt(0)); // 55362
    console.log("得到第二个码元：", text.charCodeAt(1)); // 57271
    
    //𠮷：\ud842\udfb7
    console.log("得到第一个码点：", text.codePointAt(0)); // 134071
    console.log("得到第二个码点：", text.codePointAt(1)); // 57271
    

然后我们完成一个自己的**判断字符串char，是32位，还是16位**方法

    function is32bit(char, i) {
        //如果码点大于了16位二进制的最大值，则其是32位的
        return char.codePointAt(i) > 0xffff;
    }
    

得到一个字符串码点的真实长度

    function getLengthOfCodePoint(str) {
        var len = 0;
        for (let i = 0; i < str.length; i++) {
            //i在索引码元
            if (is32bit(str, i)) {
                //当前字符串，在i这个位置，占用了两个码元
                i++;
            }
            len++;
        }
        return len;
    }
    
    console.log("𠮷是否是32位的：", is32bit("𠮷", 0)) // 𠮷是否是32位的： true
    console.log("ab𠮷ab的码点长度：", getLengthOfCodePoint("ab𠮷ab")) // ab𠮷ab的码点长度： 5
    

2\. 增加的字符串API(只举出工作中常用的四种)
--------------------------

*   includes 判断字符串中是否包含指定的子字符串
*   startsWith 判断字符串中是否以指定的字符串开始
*   endsWith 判断字符串中是否以指定的字符串结尾
*   repeat 将字符串重复指定的次数，然后返回一个新字符串

    const text = "我真是狠人";
    
    console.log("是否包含“狠”：", text.includes("狠"));
    console.log("是否以“我”开头：", text.startsWith("我"));
    console.log("是否以“狠人”结尾：",
    
    text.endsWith("狠人"));
    console.log("重复4次：", text.repeat(4));
    // 由于过于简单，就不把console结果展示啦，有兴趣的可以直接试一下，哈哈哈
    

3\. 模板字符串
---------

**模板字符串是此章节的灵魂**

*   ES6之前处理字符串繁琐的两个方面：

1.  多行字符串
2.  字符串拼接

*   在ES6中，提供了模板字符串的书写，可以非常方便的换行和拼接，要做的，仅仅是将字符串的开始或结尾改为 ` 符号

如果要在字符串中拼接js表达式，只需要在模板字符串中使用`${JS表达式}`

    var love1 = "秋葵";
    var love2 = "香菜";
    
    var text = `A喜欢${love1}
    B也喜欢${love2}
    表达式可以是任何有意义的数据${1 + 3 * 2 / 0.5}
    表达式是可以嵌套的：${`表达式中的模板字符串${love1 + love2}`}
    \n\n
    奥布瓦的发顺丰
    在模板字符串中使用\${JS表达式}可以进行插值
    `;
    
    console.log(text);
    

在模板字符串书写之前，可以加上标记:

    标记名`模板字符串`
    

标记是一个函数，函数参数如下：

1.  参数1：被插值分割的字符串数组
2.  后续参数：所有的插值

    var love1 = "秋葵";
    var love2 = "香菜";
    
    var text = myTag`邓哥喜欢${love1}，邓哥也喜欢${love2}。`;
    
    //相当于： 
    // text = myTag(["A喜欢", "，B也喜欢", "。"], "秋葵", "香菜")
    
    function myTag(parts) {
        const values = Array.prototype.slice.apply(arguments).slice(1);
        let str = "";
        for (let i = 0; i < values.length; i++) {
            str += `${parts[i]}：${values[i]}`;
            if (i === values.length - 1) {
                str += parts[i + 1];
            }
        }
        return str;
    }
    
    console.log(text); //A喜欢：秋葵，B也喜欢：香菜
    

第五章、函数的扩展
=========

1\. 在书写形参时，直接给形参赋值，附的值即为**默认值**（在解构的时候有过应用）
-------------------------------------------

这样一来，当调用函数时，如果没有给对应的参数赋值（给它的值是undefined），则会自动使用默认值

1.  留意暂时性死区 形参

*   和ES6中的let或const声明一样，具有作用域，并且根据参数的声明顺序，存在暂时性死区。

2.  对arguments的影响

*   只要给函数加上参数默认值，该函数会自动变量严格模式下的规则：arguments和形参脱离
    
*   暂时性死区
    

    function test(a = b, b) {
        console.log(a, b);
    }
    test(undefined, 2);// 报错 因为传a值undefined, 然后会给a赋默认值 b ,但是此时 b还没有赋值，所以报错。在上边解构赋值中也介绍过
    
    function sum(a, b = 1, c = 2) {
        return a + b + c;
    }
    
    console.log(sum(10, undefined, undefined))
    console.log(sum(11))
    console.log(sum(1, undefined, 5))  // 这种情况才是正常
    

*   对arguments的影响

    function test(a, b = 1) {
        console.log("arugments", arguments[0], arguments[1]); //arugments 1 2
        console.log("a:", a, "b:", b); //a: 1 b: 2
        a = 3;
        console.log("arugments", arguments[0], arguments[1]); //arugments 1 2
        console.log("a:", a, "b:", b); //a: 3 b: 2
    }
    
    test(1, 2);
    

ES6的剩余参数专门用于手机末尾的所有参数，将其放置到一个形参数组中。语法:
--------------------------------------

    function (...形参名){
    
    }
    

**注意：**

1.  一个函数，仅能出现一个剩余参数
2.  一个函数，如果有剩余参数，剩余参数必须是最后一个参数

    function test(a, b, ...args) {
        console.log(a, b, args);
    }
    
    test(1, 32, 46, 7, 34); //1 32 [46, 7, 34]
    

2\. 展开运算符：`...要展开的东西`
---------------------

    const arr1 = [3, 67, 8, 5];
    
    //克隆arr1数组到arr2
    
    const arr2 = [0, ...arr1, 1];
    
    console.log(arr2, arr1 === arr2)
    // -------------------------------------
    const obj1 = {
        name: "A",
        age: 18,
        love: "B",
        address: {
            country: "中国",
            province: "BJ",
            city: "BJ"
        }
    }
    
    // 浅克隆到obj2
    
    const obj2 = {
        ...obj1,
        name: "C"
    };
    
    console.log(obj2)
    
    console.log(obj1.address === obj2.address)
    

3\. 明确函数的双重用途
-------------

ES6提供了一个特殊的API，可以使用该API在函数内部，判断该函数是否使用了new来调用

    new.target 
    //该表达式，得到的是：如果没有使用new来调用函数，则返回undefined
    //如果使用new调用函数，则得到的是new关键字后面的函数本身
    
    function Person(firstName, lastName) {
        //判断是否是使用new的方式来调用的函数
    
        // //过去的判断方式
        // if (!(this instanceof Person)) {
        //     throw new Error("该函数没有使用new来调用")
        // }
    
        if (new.target === undefined) {
            throw new Error("该函数没有使用new来调用")
        }
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = `${firstName} ${lastName}`;
    }
    
    const p1 = new Person("张", "三");
    console.log(p1)
    
    
    
    const p2 = Person("张", "三");
    console.log(p2); // 报错，该函数没有使用new来调用
    
    const p3 = Person.call(p1, "张", "三")
    console.log(p3);// 报错，该函数没有使用new来调用
    

4\. 箭头函数
--------

1.  ES5中this的问题（本文主要是来介绍ES6的，暂且将之前的总结直接放在这里，在之后的博文中会仔细描述一下ES5系列）
    
    1.  通过对象调用函数，this指向对象
    2.  直接调用函数，this指向全局对象
    3.  如果通过new调用函数，this指向新创建的对象
    4.  如果通过apply、call、bind调用函数，this指向指定的数据
    5.  如果是DOM事件函数，this指向事件源
2.  箭头函数是一个函数表达式，理论上，任何使用函数表达式的场景都可以使用箭头函数
    

完整语法：

    (参数1, 参数2, ...)=>{
        //函数体
    }
    

如果参数只有一个，可以省略小括号

    参数 => {
    
    }
    

如果箭头函数只有一条返回语句，可以省略大括号，和return关键字

    参数 => 返回值
    

    const print = num => {
        console.log("给我的数字是：", num)
    }
    print(2);
    
    const arr = [1,2,4,56,22,43,23,2,23,12,1];
    arr.sort((a, b)=> a - b);
    console.log(arr);
    

**注意**

*   箭头函数中，不存在this、arguments、new.target，如果使用了，则使用的是函数外层的对应的this、arguments、new.target 也就是说**在箭头函数中，this是固定的。因为箭头函数本身就是引用的外层函数的this**
*   箭头函数没有原型
*   箭头函数不能作用构造函数使用
*   不可以使用yield命令，因此箭头函数不能用作 Generator 函数

    // ES6
    function foo() {
      setTimeout(() => {
        console.log('id:', this.id);
      }, 100);
    }
    
    // ES5
    function foo() {
      var _this = this;
    
      setTimeout(function () {
        console.log('id:', _this.id);
      }, 100);
    }
    

除了this，arguments、super、new.target这三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。

    function foo() {
      setTimeout(() => {
        console.log('args:', arguments);
      }, 100);
    }
    
    foo(2, 4, 6, 8)
    // args: [2, 4, 6, 8]
    

另外，由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。

    (function() {
      return [
        (() => this.x).bind({ x: 'inner' })()
      ];
    }).call({ x: 'outer' });
    // ['outer']
    //代码中，箭头函数没有自己的this，所以bind方法无效，内部的this指向外部的this。
    

**应用比较多的场景**

1.  临时性使用的函数，并不会可以调用它，比如：
    1.  事件处理函数
    2.  异步处理函数
    3.  其他临时性的函数
2.  为了绑定外层this的函数
3.  在不影响其他代码的情况下，保持代码的简洁，最常见的，数组方法中的回调函数

本文主要引用阮一峰老师的《ECMAScript6简介》