import observe from "./observe";
import Watcher from "./Watcher";
let obj = {
  a: {
    b: 1,
    m: {
      n: 1,
    },
  },
  g: [11, 22, 33],
};

observe(obj);
new Watcher(obj, "a.m.n", (val) => {
  console.log("****", val);
});

// obj.a.m.n = 8;
console.log("打印", obj);

for (var i = 1; i <= 5; i++) {
  setTimeout(
    function (i) {
      console.log(i);
    },
    100,
    i
  );
}
