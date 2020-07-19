# js

1.如何理解 JS 中的this关键字？
--------------------

this表示当前对象，this的指向是根据调用的上下文来决定的，默认指向window对象。  
全局环境：全局环境就是在里面，这里的this始终指向的是window对象。  
局部环境：  
1.在全局作用域下直接调用函数，this指向window。  
2.对象函数调用，哪个对象调用就指向哪个对象。  
3.使用 new 实例化对象，在构造函数中的this指向实例化对象。  
4.使用call或apply改变this的指向。

2\. JavaScript 中的作用域（scope）是指什么？
--------------------------------

在 JavaScript 中，每个函数都有自己的作用域。作用域基本上是变量以及如何通过名称访问这些变量的规则的集合。只有函数中的代码才能访问函数作用域内的变量。

同一个作用域中的变量名必须是唯一的。一个作用域可以嵌套在另一个作用域内。如果一个作用域嵌套在另一个作用域内，最内部作用域内的代码可以访问另一个作用域的变量。

3.什么是闭包
-------

函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起构成闭包（closure）。也就是说，闭包可以让你从内部函数访问外部函数作用域。在 JavaScript 中，每当函数被创建，就会在函数生成时生成闭包。----MDN

个人通俗说法
闭包就是能够读取其他函数内部变量的函数。
由于在javascript中，只有函数内部的子函数才能读取局部变量，所以说，闭包可以简单理解成“定义在一个函数内部的函数“。
所以，在本质上，闭包是将函数内部和函数外部连接起来的桥梁。

4\. 解释 JavaScript 中的相等性。
------------------------

JavaScript 中有严格比较和类型转换比较：

严格比较（例如 ===）在不允许强制转型的情况下检查两个值是否相等；  
抽象比较（例如 ==）会自动转换类型之后检查两个值是否相等。

    var a = "42";
    var b = 42;
    a == b; // true
    a === b; // false

5\. 解释一下变量的提升
-------------

变量的提升是JavaScript的默认行为，这意味着将所有变量声明移动到当前作用域的顶部，并且可以在声明之前使用变量。初始化不会被提升，提升仅作用于变量的声明。

    var x = 1
    console.log(x + '——' + y) // 1——undefined
    var y = 2

6.如何理解事件委托
----------

在DOM树上绑定事件监听器并使用JS事件处理程序是处理客户端事件响应的典型方法。 从理论上讲，我们可以将监听器附加到HTML中的任何DOM元素，但由于事件委派，这样做是浪费而且没必要的。

*   什么是事件委托？  
    这是一种让父元素上的事件监听器也影响子元素的技巧。 通常，事件传播（捕获和冒泡）允许我们实现事件委托。 冒泡意味着当触发子元素（目标）时，也可以逐层触发该子元素的父元素，直到它碰到DOM绑定的原始监听器（当前目标）。 捕获属性将事件阶段转换为捕获阶段，让事件下移到元素; 因此，触发方向与冒泡阶段相反。 捕获的默认值为false。

7.解释一下严格模式(strict mode)
-----------------------

严格模式用于标准化正常的JavaScript语义。严格模式可以嵌入到非严格模式中，关键字 ‘use strict’。使用严格模式后的代码应遵循JS严格的语法规则。例如，分号在每个语句声明之后使用。

8.解释 JavaScript 中的 null 和 undefined。
------------------------------------

*   JavaScript 中有两种底层类型：null 和 undefined。它们代表了不同的含义：
*   尚未初始化：undefined；
*   空值：null。

    //null和undefined是两个不同的对象
    null == null  //true
    null === null  //true
    null == undefined //true
    null === undefined //flase

9. JavaScript 中的数据类型。
-----------------------

JavaScript提供两种数据类型: 基本数据类型和引用数据类型  
基本数据类型有:

*   String
*   Number
*   Boolean
*   Null
*   Undefined
*   Symbol

引用数据类型有:

*   Object
*   Array
*   Function

10.解释事件冒泡以及如何阻止它？
-----------------

事件冒泡是指嵌套最深的元素触发一个事件，然后这个事件顺着嵌套顺序在父元素上触发。

防止事件冒泡的一种方法是使用 event.stopPropagation()或 event.cancelBubble （低于 IE 9）。

11.window.onload的作用？
--------------------

window.onload是等文档和资源都加载完成后调用的事件，保证js获取元素 的时候，已经加载。

12.说说你对作用域链的理解？
---------------

作用域链是js中的一种查找机制，从当前作用域查找，当前作用域没有往上一级作用域查找，一直到最外层，如果都找不到则是is not define

13.定时器的分类？他们的区别及用法是什么？
----------------------

    Js中有两种定时器：setInterval：间歇执行，setTimeout：延迟执行  
    setInterval(函数，时间) 时间单位ms，  
    语法：setInterval(function(){},1000); 隔一秒执行函数一次  
    一般用于倒计时，轮播图  
    setTimeout(函数，时间) 时间单位ms，  
    语法：setTimeout(function(){},1000); 延迟一秒执行函数一次，只会执行一次  
    一般用于广告，广告弹出层  

14.把下面的字符串去重，并去除掉特殊字符按照数字在前字母在后的顺序排序字符串
---------------------------------------

    如下：'1233fddfd&3434fdsaff&454545&4545444rfdsfds&545gdsgs'
    var str = '1233fddfd&3434fdsaff&454545&4545444rfdsfds&545gdsgs';
    var n = '';
    var s='';
    for(var i=0; i<str.length; i++){
        if((str[i]>=0&&str[i]<=9)&&n.indexOf(str[i])==-1){
            n+=str[i];
        }else if((str.charCodeAt(i)>=97&&str.charCodeAt(i)<=122)&&s.indexOf(str[i]) == -1){
            s+=str[i];
        }
    }
    console.log(n+s); //12345fdsarg

15.截取字符串'abcdefg'中的def。
-----------------------

    var str = 'abcdefg';
    if(str.indexOf('def')!==-1){
        console.log(str.substr(str.indexOf('def'),3));
    }

16.数组方法
--------------------------------------

修改器方法
下面的这些方法会改变调用它们的对象自身的值：

    Array.prototype.pop()
    删除数组的最后一个元素，并返回这个元素。
    Array.prototype.push()
    在数组的末尾增加一个或多个元素，并返回数组的新长度。
    Array.prototype.reverse()
    颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。
    Array.prototype.shift()
    删除数组的第一个元素，并返回这个元素。
    Array.prototype.sort()
    对数组元素进行排序，并返回当前数组。
    Array.prototype.splice()
    在任意的位置给数组添加或删除任意个元素。
    Array.prototype.unshift()
    在数组的开头增加一个或多个元素，并返回数组的新长度。

访问方法
下面的这些方法绝对不会改变调用它们的对象的值，只会返回一个新的数组或者返回一个其它的期望值。

    Array.prototype.concat()
    返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。
    Array.prototype.includes() 
    判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。
    Array.prototype.join()
    连接所有数组元素组成一个字符串。
    Array.prototype.slice()
    抽取当前数组中的一段元素组合成一个新数组。
    Array.prototype.toString()
    返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 Object.prototype.toString() 方法。
    Array.prototype.toLocaleString()
    返回一个由所有数组元素组合而成的本地化后的字符串。遮蔽了原型链上的 Object.prototype.toLocaleString() 方法。
    Array.prototype.indexOf()
    返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。

迭代方法
在下面的众多遍历方法中，有很多方法都需要指定一个回调函数作为参数。在每一个数组元素都分别执行完回调函数之前，数组的length属性会被缓存在某个地方，所以，如果你在回调函数中为当前数组添加了新的元素，那么那些新添加的元素是不会被遍历到的。此外，如果在回调函数中对当前数组进行了其它修改，比如改变某个元素的值或者删掉某个元素，那么随后的遍历操作可能会受到未预期的影响。总之，不要尝试在遍历过程中对原数组进行任何修改，虽然规范对这样的操作进行了详细的定义，但为了可读性和可维护性，请不要这样做。

    Array.prototype.forEach()
    为数组中的每个元素执行一次回调函数。
    Array.prototype.every()
    如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。
    Array.prototype.some()
    如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。
    Array.prototype.filter()
    将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。
    Array.prototype.find() 
    找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。
    Array.prototype.map()
    返回一个由回调函数的返回值组成的新数组。
    Array.prototype.reduce()
    从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

17.split() join()
----------------------

split是字符串的方法，将字符串按照特定标志分割成数组  
例：str.split('').reverse().join('')反转字符串

18.编写一个数组去重的方法。
---------------

    function sort(arr) {
        for(var i = 0;i<arr.length;i++){
            for(var j = i+1;j<arr.length;j++){
                if(arr[i] == arr[j]){
                    arr.splice(j,1);
                    j--; //删除一个元素后，后面的元素会依次往前，下标也需要依次往前
                }
            }
        }
        return arr
    }

19.冒泡算法排序？
----------

    for(var i = 0;i<arr.length;i++){
        for(var j = 0;j<arr.length-i;j++){
            if(arr[j] > arr[j+1]){ //
                var temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }

20.DOM怎样添加、移除、移动、复制、创建和查找节点
---------------------------

    获取子节点
    父节点.children
    父节点.childNodes
    获取父节点
    子节点.parentNode
    子节点.offsetParent
    创建
    document.createElement(‘标签名’)
    document.createTextNode(‘文本内容’)
    添加
    父节点.appendChild(子节点)
    父节点.insertBefore(newChild，refChild)
    复制
    被复制的节点.cloneNode(true)
    删除：
    节点.remove()
    父节点.removeChild（子节点）
    替换
    父节点.replaceChild（newChild，refChild）

21.什么是window对象? 什么是document对象?
------------------------------

window是js中最大的对象，表示窗口，包含document  
document文档对象，表示HTML

22.offsetWidth、clientWidth、scrollTop的区别？
----------------------------------------

offsetWidth：占位宽，包含 内容宽+左右padding+左右border  
clientWidth：可视宽，包含 内容宽+左右padding  
scrollTop：页面被卷去的高

23.如何获取url地址中搜索内容？
------------------

window.location.search

24.事件、IE与火狐的事件机制有什么区别？
----------------------

IE的事件流是冒泡流，而火狐同时支持冒泡流和捕获流。

25.事件绑定和普通事件有什么区别。
------------------

标签.事件：如果给同一个元素添加同一个事件，后面的会覆盖前面  
事件绑定：可以给同一个元素添加同一个事件，不会被覆盖

26.解释一下事件流？
-----------

事件捕获阶段：当事件发生的时候，将事件从window依次往子元素传递  
确定目标阶段：确定事件目标  
事件冒泡阶段：事件目标开始处理事件，处理完以后会将事件依次传递给父元素，一直到window  
事件都是在事件冒泡处理,ie只有冒泡

27.拖拽效果中有几种事件？
--------------

按下onmousedown，拖拽onmousemove，弹起onmouseup

28.cookie的利弊？
-------------

    优点：极高的扩展性和可用性
    1.通过良好的编程，控制保存在cookie中的session对象的大小。
    2.通过加密和安全传输技术（SSL），减少cookie被破的可能性。
    3.只在cookie中存放不敏感数据，即使被盗也不会有重大损失。
    4.控制cookie的生命期，使之不会永远有效。偷盗者很可能拿到一个过期的cookie。
    缺点：
    1.Cookie数量和长度的限制。每个domain最多只能有20条cookie，每个cookie长度不能超过4KB，否则会被截掉。
    2.安全性问题。如果cookie被人拦截了，那人就可以取得所有的session信息。即使加密也与事无补，因为拦截者并不需要知道cookie的意义，他只要原样转发cookie就可以达到目的了。
    3.有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务器端保存一个计数器。如果我们把这个计数器保存在客户端，那么它起不到任何作用。
    因为这些弊端（主要是cookie的大小和多少都受限制，并且每次你请求一个新的页面的时候Cookie都会被发送过去，这样无形中浪费了带宽，另外cookie还需要指定作用域，不可以跨域调用），IE8以后，就出现一个web storage；它仅仅是为了本地缓存数据而存在；但是Cookie也是不可以或缺的：Cookie的作用是与服务器进行交互，作为HTTP规范的一部分而存在。

29.call()和apply()的区别和作用？
------------------------

都是用来改变this的指向，在传值的过程中会有些区别  
call（this的指向，参数1，参数2…）  
apply（this的指向,\[参数1，参数2…\]）

30.创建ajax的过程。
-------------

    function ajax(json) {
        json.data = json.data||''; //如果没有请求参数，为空
        json.contentType = json.contentType || 'application/x-www-form-urlencoded'; //如果没有字符编码，用默认的
            //1.创建对象
        if (window.XMLHttpRequest) { //正常
            var ajax = new XMLHttpRequest();
        } else { //兼容ie6
        var ajax = new ActiveXObject('Microsoft.XMLHTTP');
    }
    
    ​ //2.建立连接
    ​ if (json.type.toUpperCase() =='get'.toUpperCase()) {
    ​   ajax.open('GET',json.url+"?"+json.data,true);
    ​ //3.发送请求
    ​   ajax.send();
    ​ } else {
    ​   ajax.open('POST',json.url,true);
    ​ //3.设置请求头 ajax.setRequestHeader('Content-type',json.contentType+";charset=utf-8");
    ​ //4.发送请求
    ​   ajax.send(json.data);
    ​ }
    ​ //4.监听结果
    ​ ajax.onreadystatechange = function () {
    ​   if(ajax.readyState == 4 && ajax.status == 200){
​           json.success(ajax.response);
    ​   }
    ​ }
    }

31.ajax请求的时候get 和post方式的区别，什么时候用post。
-------------------------------------

1、GET请求会将参数跟在URL后进行传递，而POST请求则是作为HTTP消息的实体内容发送给WEB服务器。当然在Ajax请求中，这种区别对用户是不可见的  
2、GEt传输数据容量小，不安全，post传输数据内容大，更加安全;

32.ajax请求时，如何解释json数据。
----------------------

如果是字符串形式的json：eval("("+ajax.response+")")  
如果是本地的json文件：JSON.parse(data)

33.同步和异步的区别?
------------

同步

所有的操作都做完，才返回给用户。这样用户在线等待的时间太长，给用户一种卡死了的感觉（就是系统迁移中，点击了迁移，界面就不动了，但是程序还在执行，卡死了的感觉）。这种情况下，用户不能关闭界面，如果关闭了，即迁移程序就中断了。

异步
将用户请求放入消息队列，并反馈给用户，系统迁移程序已经启动，你可以关闭浏览器了。然后程序再慢慢地去写入数据库去。这就是异步。但是用户没有卡死的感觉，会告诉你，你的请求系统已经响应了。你可以关闭界面了。

同步，是所有的操作都做完，才返回给用户结果。即写完数据库之后，再响应用户。
异步，不用等所有操作都做完，就相应用户请求。即先响应用户请求，然后慢慢去写数据库。

34.js哪些操作会造成内存泄露？
-----------------

1）意外的全局变量引起的内存泄露  
    function leak() { leak='xxx';//leak成为一个全局变量，不会被回收 }  
2）被遗忘的定时器或者回调  
3）闭包引起的内存泄漏

35.$(document).ready() 方法和window.onload 有什么区别？
----------------------------------------------

window.onload与ready的区别  
1.window.onload会覆盖之前的  
ready的区别，不会覆盖，会叠加  
2.window.onload等文档和资源都加载完成以后调用  
ready只要文档加载完成以后就会调用

36.怎么解决跨域问题？
------------

通过jsonp解决跨域，即通过script标签的src属性引入一个js文件，通过回调函数将数据返回  
KaTeX parse error: Expected 'EOF', got '&' at position 34: …script src=’url&̲callback=showDa….ajax()方法中，只需配置一个dataType:‘jsonp’，就可以发起一个跨域请求