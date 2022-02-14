import observe from "./observe";
import Dep from "./Dep";
/**
 *
 * 构建了闭包环境
 * val
 */
export default function defineReactive(data, key, val) {
  const dep = new Dep();
  if (arguments.length === 2) {
    val = data[key];
  }

  // 子元素进行observe，至此形成了递归
  let childOb = observe(val);
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log("你试图访问obj的", key);
      // 处于依赖的收集阶段
      if (Dep.target) {
        console.log("手机了");
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }
      return val;
    },
    set(newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
      childOb = observe(newVal);
      // 发布订阅
      dep.notify();
      console.log("你试图改变obj的", key);
    },
  });
}
