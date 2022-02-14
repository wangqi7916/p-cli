import "./index.css";
import {
  smartRepeat,
  parse,
  climbStairs1,
  climbStairs2,
  twoSum1,
  twoSum2,
  moveZeroes,
  findDisappearedNumbers,
  mergeTwoLists1,
} from "@/suanfa/index.js";
import bus from "@/utils/model.js";
import "@/observe/index.js";

import img from "@/assets/bg.jpeg";
console.log(img);
document.querySelector("#img").src = img;

// 函数柯里化
// 是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术
// fn.length 函数形参个数
// arguments 函数内部实际参数个数
// 1、
function createCurry(func, args) {
  var arity = func.length;
  var args = args || [];

  return function () {
    var _args = [].slice.call(arguments);
    [].push.apply(_args, args);

    // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
    if (_args.length < arity) {
      return createCurry.call(this, func, _args);
    }

    // 参数收集完毕，则执行func
    return func.apply(this, _args);
  };
}

// 2、
function curry(fn, ...args) {
  if (args.length >= fn.length) {
    return fn.call(this, ...args);
  }

  return (...rest) => {
    return curry.call(this, fn, ...args, ...rest);
  };
}

function add(a, b, c) {
  console.log(Object.prototype.toString.call(arguments));
  return a + b + c;
}

let r = createCurry(add);
console.log(r(1)(2)(3));

let r1 = curry(add, 2);
console.log(r1(2)(3));

// 3、
var currying = function (fn) {
  var args = [].slice.call(arguments, 1);

  return function () {
    // 主要还是收集所有需要的参数到一个数组中，便于统一计算
    var _args = args.concat([].slice.call(arguments));
    return fn.apply(null, _args);
  };
};

console.log(currying(add, 100, 2, 3)());

// smartRepeat
console.log(smartRepeat("3[2[a]1[b]3[c]]"));

const templateString = `<div>
        <h3 class="name" id="1">你好</h3>
        <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
        </ul>
    </div>`;

console.log(parse(templateString));

function cf(who, where) {
  console.log(`${who}在${where}吃饭!`);
}

function hs(who, where) {
  console.log(`${who}在${where}喝水!`);
}

function wan(who, where) {
  console.log(`${who}在${where}玩!`);
}

function sleep(who, where) {
  console.log("在家睡");
}

bus.on("eat", cf);
bus.on("eat", hs);
bus.emit("eat", "wq", "家");
bus.emit("eat", "wmj", "家");

bus.on("wan", wan);
bus.emit("wan", "wq", "家");

bus.once("sleep", sleep);
bus.emit("sleep");
bus.emit("sleep");

// 爬楼梯
console.log("climbStairs1", climbStairs1(10));
console.log("climbStairs2", climbStairs2(10));

// 两数之和
console.log("twoSum1", twoSum1([1, 2, 3, 5, 6], 9));
console.log("twoSum2", twoSum2([1, 2, 3, 5, 6], 9));

// 移动0
console.log("moveZeroes", moveZeroes([0, 1, 0, 3, 12]));

// 获取数组中消失的数字
console.log(
  "findDisappearedNumbers",
  findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])
);

// 合并两个有序链表
console.log("mergeTwoLists1", mergeTwoLists1([1, 2, 4], [1, 3, 5]));
