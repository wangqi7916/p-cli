// 1、
for (var i = 1; i <= 5; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 10);
  })(i);
}

for (var i = 1; i <= 5; i++) {
  setTimeout(
    (function (i) {
      return function () {
        console.log(i);
      };
    })(i),
    10
  );
}

// 2、

for (var i = 1; i <= 5; i++) {
  func(i);
}

function func(i) {
  setTimeout(function () {
    console.log(i);
  }, 10);
}

// 3
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function (i) {
      console.log(i);
    },
    10,
    i
  );
}
