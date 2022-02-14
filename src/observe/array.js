import { def } from "./def";
// 改写的7个数组方法
const methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];

const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

methodsToPatch.forEach((methodName) => {
  // 缓存原来的方法, 因为push、pop功能不能被剥夺
  const original = arrayProto[methodName];
  // 定义新的方法
  def(
    arrayMethods,
    methodName,
    function () {
      console.log("lalalla");
      const ob = this.__ob__;
      let inserted,
        args = [...arguments];
      switch (methodName) {
        case "push":
        case "unshift":
          inserted = args;
          break;
        case "splice":
          inserted = args.slice(2);
          break;
      }
      if (inserted) {
        ob.observeArray(inserted);
      }
      ob.dep.notify();
      original.apply(this, args);
    },
    false
  );
});
