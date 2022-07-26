## 关于 Javascript 中数组相关知识的总结

#### 1，数组分类中，有许多关于原地删除数组元素的题目，那么这里，梳理下 js 中操作数组的方法，以及他们的原理，是不是原地操作，空间时间复杂度是怎么样的。

###### 1.1 Array.prototype.concat()
***concat()*** 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

语法
```javascript
var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])
```

注意
* ***concat*** 返回了一个新的数组，由被调用对象中的元素组成
* ***concat*** 方法不会改变任何作为参数提供的数组，而是返回一个浅拷贝，它包含与原始数组相同的元素副本，对于 ***字符串，数字和布尔值*** 它会复制他们的值，对于对象，***concat*** 复制的是对象引用

示例代码
```javascript
const o1 = { a: 1 };
const o2 = { b: 1 };
const a = [o1], b = [o2];

const c = a.concat(b);
console.log(c); // [ { a: 1 }, { b: 1 } ]

// concat 复制的是 o1 的引用
o1.a = 2;
console.log(c); // [ { a: 2 }, { b: 1 } ]
```

###### 1.2 Array.prototype.every()
***every()*** 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

语法
```javascript
arr.every(callback(element[, index[, array]])[, thisArg])
```

注意
* 每一次调用 callback 返回 true 就才返回 true
* 一旦有一次返回 false，则立刻返回 false

看一下 ***ECMA-262 第 5 版中指定的 every 实现方法***
```javascript
if (!Array.prototype.every) {
  Array.prototype.every = function(callbackfn, thisArg) {
    'use strict';
    var T, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the this
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method
    //    of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callbackfn) is false, throw a TypeError exception.
    if (typeof callbackfn !== 'function') {
      throw new TypeError();
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0.
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method
        //    of O with argument Pk.
        kValue = O[k];

        // ii. Let testResult be the result of calling the Call internal method
        //     of callbackfn with T as the this value and argument list
        //     containing kValue, k, and O.
        var testResult = callbackfn.call(T, kValue, k, O);

        // iii. If ToBoolean(testResult) is false, return false.
        if (!testResult) {
          return false;
        }
      }
      k++;
    }
    return true;
  };
}
```
