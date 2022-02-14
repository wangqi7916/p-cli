import defineReactive from "./defineReactive";
import { def } from "./def";
import { arrayMethods } from "./array";
import observe from "./observe";
import Dep from "./Dep";
export default class Observer {
  constructor(value) {
    // 每一个Observer的实例身上，都有一个dep
    this.dep = new Dep();
    // __ob__属性
    def(value, "__ob__", this, false);
    if (Array.isArray(value)) {
      // 将数组的原型指向arrayMethods
      Object.setPrototypeOf(value, arrayMethods);
      this.observeArray(value);
    } else {
      // Observer类目的是：讲一个正常的Object转换为每个层级属性都是响应式的
      this.walk(value);
    }
  }

  // 遍历
  walk(value) {
    for (let key in value) {
      defineReactive(value, key);
    }
  }

  observeArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      observe(arr[i]);
    }
  }
}
