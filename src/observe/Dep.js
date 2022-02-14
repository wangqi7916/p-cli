var uid = 0;
export default class Dep {
  constructor() {
    console.log("dep 构造函数");
    // 订阅者列表
    this.subs = [];
    this.id = uid++;
  }

  // 添加订阅
  addSub(sub) {
    this.subs.push(sub);
  }

  // 添加依赖
  depend() {
    // 全局的位置
    if (Dep.target) {
      this.addSub(Dep.target);
    }
  }

  // 更新
  notify() {
    const subs = this.subs.slice();
    // 遍历
    for (let i = 0; i < subs.length; i++) {
      subs[i].update();
    }
  }
}
