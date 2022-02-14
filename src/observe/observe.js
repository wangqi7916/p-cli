import Observer from "./Observer";
// 创建observe函数
/*
observe(data) => 看data上有没有__ob__ => new Observer()
=> 遍历下一层属性，逐个defineReactive => 当设置某个属性值时，会出发set，里面有个newVal,也得被observe()
*/
export default function observe(value) {
  if (typeof value != "object") return;
  // 定义ob
  var ob;
  if (typeof value.__ob__ !== "undefined") {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}
