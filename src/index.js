import "./index.css";
import { add, minus } from "@/component/test/test";

import img from "@/assets/bg.jpeg";
console.log(img);
document.querySelector("#img").src = img;

console.log(add(1, 1000));
console.log(minus(1000, 1));
console.log("hello");

new Promise((resolve, reject) => {
  console.log(111);
});
