export function smartRepeat(str) {
  // 32[2[a]1[b]3[c]]
  /*
    index: 指针
    stack1: 存放数字，重复几次
    stack2: 存放字符串
    rest: 剩余的部分
  */
  let index = 0,
    stack1 = [],
    stack2 = [],
    rest = "";
  while (index < str.length - 1) {
    // 剩余部分
    rest = str.substring(index);
    // 1、当前剩余部分是不是以数字和[开头
    if (/^\d+\[/.test(rest)) {
      // 得到数字
      let times = Number(rest.match(/^(\d+)\[/)[1]);
      // 移动指针times后移，+1是加[
      index += times.toString().length + 1;
      stack1.push(times);
      stack2.push("");
      // 2、如果是字符
    } else if (/^\w+\]/.test(rest)) {
      // 如果这个字符是字母，那么此时就把栈顶改为这个字母
      let word = rest.match(/^(\w+)\]/)[1];
      stack2[stack2.length - 1] = word;
      index += word.length;
      // 3、如果是],就需要弹栈
    } else if (rest[0] == "]") {
      let times = stack1.pop(),
        word = stack2.pop();
      stack2[stack2.length - 1] += word.repeat(times);
      index++;
    }
  }
  return stack2[0].repeat(stack1[0]);
}

// 手写AST抽象语法树
// const templateString = `<div>
//         <h3 class="name" id="1">你好</h3>
//         <ul>
//             <li>A</li>
//             <li>B</li>
//             <li>C</li>
//         </ul>
//     </div>`;

function attrsParse(templateString) {
  if (templateString === undefined) return [];
  console.log("templateString", templateString);
  // isYinhao：当前是否在引号内， point：断点
  let isYinhao = false,
    point = 0,
    result = [];
  for (let i = 0; i < templateString.length; i++) {
    let char = templateString[i];
    if (char === '"') {
      isYinhao = !isYinhao;
    } else if (char == " " && !isYinhao) {
      result.push(templateString.substring(point, i).trim());
      point = i;
    }
  }
  // 循环结束最后的放进去
  result.push(templateString.substring(point).trim());
  result = result.map((item) => {
    const o = item.match(/^(.+)="(.+)"$/);
    return {
      name: o[1],
      value: o[2],
    };
  });
  return result;
}

export function parse(templateString) {
  // 指针
  let index = 0,
    rest = "",
    stack1 = [],
    stack2 = [{ children: [] }];
  const startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/,
    endRegExp = /^\<\/([a-z]+[1-6]?)\>/,
    wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/;
  while (index < templateString.length - 1) {
    rest = templateString.substring(index);
    // 遍历字符是不是一个开始标签
    if (startRegExp.test(rest)) {
      let tag = rest.match(startRegExp)[1],
        attrsString = rest.match(startRegExp)[2];
      // 将开始标记推入栈中
      stack1.push(tag);
      stack2.push({
        tag,
        children: [],
        attrs: attrsString != null ? attrsParse(attrsString.trim()) : [],
      });
      const attrsStringLnegth = attrsString != null ? attrsString.length : 0;
      // 指针移动长度加2，因为<>也占位
      index += tag.length + 2 + attrsStringLnegth;
    } else if (endRegExp.test(rest)) {
      // 指针移动长度加3，因为</>也占位
      let tag = rest.match(endRegExp)[1];
      // 此时，tag和栈1顶部的是相同的
      let pop_tag = stack1.pop();
      if (tag == pop_tag) {
        let pop_arr = stack2.pop();
        if (stack2.length > 0) {
          stack2[stack2.length - 1].children.push(pop_arr);
        }
      } else {
        throw new Error(stack1[stack1.length - 1] + "标签没有封闭");
      }
      index += tag.length + 3;
    } else if (wordRegExp.test(rest)) {
      let word = rest.match(wordRegExp)[1];
      // 看word是不是空
      if (!/^\s+$/.test(word)) {
        stack2[stack2.length - 1].children.push({ text: word, type: 3 });
      }
      index += word.length;
    } else {
      index++;
    }
  }
  return stack2[0].children[0];
}

/* 爬楼梯
假设你正在爬楼梯。需要 n 阶你才能到达楼顶。 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
*/

// 1、递归解法 O(n^2)
export function climbStairs1(n, map = new Map()) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  if (map.get(n)) {
    return map.get(n);
  } else {
    let result = climbStairs1(n - 1) + climbStairs1(n - 2);
    map.set(n, result);
    return result;
  }
}

// 2、循环解法，自底向上累加 O(n)
export function climbStairs2(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  let result = 0,
    pre = 2,
    prePre = 1;
  for (let i = 3; i <= n; i++) {
    result = pre + prePre;
    prePre = pre;
    pre = result;
  }
  return result;
}

/*
  给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
  你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
  你可以按任意顺序返回答案。
  示例：
  输入：nums = [2,7,11,15], target = 9
  输出：[0,1]
  解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
*/
// 1、双指针 O(n^2)
export function twoSum1(arr, target) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        result = [i, j];
      }
    }
  }
  return result;
}

// 2、存储法 [1, 2, 3, 5, 6], [1 => 0]
export function twoSum2(arr, target, map = new Map()) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let value = target - arr[i];
    let index = map.get(value);
    if (index != null) {
      result = [index, i];
    } else {
      map.set(arr[i], i);
    }
  }
  return result;
}

/*
  给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
  请注意 ，必须在不复制数组的情况下原地对数组进行操作。
  输入: nums = [0,1,0,3,12]
  输出: [1,3,12,0,0]
*/

export function moveZeroes(arr) {
  if (!arr) return;
  let point = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != 0) {
      arr[point++] = arr[i];
    }
  }
  for (let j = point; j < arr.length; j++) {
    arr[j] = 0;
  }
  return arr;
}

/*
  448. 找到所有数组中消失的数字
  给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。
  输入：nums = [4,3,2,7,8,2,3,1]
  输出：[5,6] 
*/

export function findDisappearedNumbers(nums) {
  let n = nums.length;
  for (const num of nums) {
    const x = (num - 1) % n;
    nums[x] += n;
  }
  console.log(nums);
  const ret = [];
  for (const [i, num] of nums.entries()) {
    if (num <= n) {
      ret.push(i + 1);
    }
  }
  return ret;
}

/*
  合并两个有序链表
  [1, 2, 4]
  [1, 3, 5]
*/

export function mergeTwoLists1(list1, list2) {
  let len1 = list1.length,
    len2 = list2.length,
    p1 = 0,
    p2 = 0,
    result = [];
  while (p1 < len1 && p2 < len2) {
    // debugger;
    if (list1[p1] >= list2[p2]) {
      result.push(list2[p2]);
      p2++;
    } else {
      result.push(list1[p1]);
      p1++;
    }
  }
  if (p1 >= len1) {
    result = result.concat(list1.slice(p2));
  }
  if (p2 >= len2) {
    result = result.concat(list2.slice(p1));
  }
  return result;
}

// export function mergeTwoLists2(l1, l2) {
//   if (l1 === null) {
//     return l2;
//   } else if (l2 === null) {
//     return l1;
//   } else if (l1.val < l2.val) {
//     l1.next = mergeTwoLists2(l1.next, l2);
//     return l1;
//   } else {
//     l2.next = mergeTwoLists2(l1, l2.next);
//     return l2;
//   }
// }
