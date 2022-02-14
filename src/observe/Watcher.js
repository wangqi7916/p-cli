import Dep from "./Dep";

var uid = 0;
export default class Watcher {
  constructor(target, expression, callback) {
    this.id = uid++;
    this.target = target;
    this.getter = parsePath(expression);
    this.value = this.get();
    this.callback = callback;
  }

  update() {
    this.run();
  }

  run() {
    this.getaddInvoke(this.callback);
  }

  getaddInvoke(cb) {
    const value = this.get();
    if (value !== this.value || typeof value == "object") {
      const oldValue = this.value;
      this.value = value;
      cb.call(this.target, this.value);
    }
  }

  get() {
    Dep.target = this;
    const obj = this.target;
    var value;
    try {
      value = this.getter(obj);
    } finally {
      Dep.target = null;
    }
    return value;
  }
}

function parsePath(str) {
  let segments = str.split(".");
  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
