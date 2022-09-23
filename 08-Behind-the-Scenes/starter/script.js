'use strict';

/*
// 作用域，作用域链
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, You are ${age} , born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;

      const output = 'NEW OUTPUT';
      const firstName = 'xiaomai';

      const str = `Oh, and you're a millenial,  ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }

    console.log(output);
    // console.log(str); // 这里是不可以访问的，因为str是在块作用域内定义的变量
    console.log(millenial); //这里是可以访问的，在块作用域内的变量，只有let，const定义的才是属于块作用域内，var定义的变量会变成函数内的变量，所以这里可以访问。
    // add(2, 3);
    // console.log(add(2, 3)); //关掉严格模式
  }
  printAge();
  return age;
}
const firstName = 'jonas';
calcAge(1991);
*/

/*
// 提升
// Variables 变量提升
// console.log(me);
// console.log(job);
// console.log(year);



var me = 'jonas'; // 变量提升了，值为undefined
let job = 'teacher'; // 变量未提升，得到错误，在初始化之前，不能使用
const year = 1991; //变量未提升，得到错误，在初始化之前，不能使用

// Function 提升
console.log(addDecl(2, 3)); // 5 函数声明会提升，值就是实际的函数，所以调用会执行
// console.log(addExpr(2, 3)); // const addExpr 是不会变量提升，得到错误，在初始化之前，不能使用
// console.log(addArrow(2, 3)); // const addArrow 是不会变量提升，得到错误，在初始化之前，不能使用
// console.log(addExprVar(2, 3)); // var addExprVar 变量提升，值是undefined,得到错误，因为undefined不是函数，所以无法调用
// console.log(addArrowVar(2, 3)); // var addArrowVar 变量提升，变量提升，值是undefined,得到错误，因为undefined不是函数，所以无法调用

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

var addExprVar = function (a, b) {
  return a + b;
};

var addArrowVar = (a, b) => a + b;

// Example
// 因为变量提升，numProducts 的值为undefined,导致！numproducts为true,执行了deleteShoppingCart
if (!numProducts) deleteShoppingCart();
var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

// var定义的变量挂在window上，let\const生成一个块级作用域
var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); //true
console.log(y === window.y); //false
console.log(z === window.z); //false
*/

// this
/*
// window 全局的this指向window
console.log(this); //window 全局的this指向window

// 常规函数没有依附在任何对象上，所以this指向是undefined
const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); //undefined
};
calcAge(1991);

//箭头函数是没有自己的this，所以箭头函数里面的this，是其父元素的this，这里是window，因为calcAgeArrow的父元素的global
const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // window
};
calcAgeArrow(1991);

//对象上的this,是调用这个方法的对象
const jonas = {
  year: 1991,
  calcYear: function () {
    console.log(this);
    console.log(2037 - this.year);
  }
};
jonas.calcYear(); //这里是jonas对象

const xiaomai = {
  year: 2017
};
xiaomai.calcAge = jonas.calcYear;
xiaomai.calcAge(); //这里是xiaomai对象

// 将对象上的方法，赋值给一个变量，这个变量就变成了一个常规函数，this就是undefined
const f = jonas.calcYear;
// f();

//事件绑定的this,就是事件绑定的对象
const f1 = function () {
  console.log(this);
};
document.querySelector('h1').addEventListener('click', f1);
*/

/*
const firstName = 'xiaomai';
const jonas = {
  firstName: 'jonas',
  year: 1991,
  calcYear: function () {
    console.log(this);
    console.log(2037 - this.year);

    // 第一种解决办法
    const self = this;
    // 因为这是一个常规函数，所以里面的this是undefined
    // const isMillenial = function () {
    //   console.log(this);
    //   console.log(self.year >= 1981 && self.year <= 1991);
    // };

    //第二种解决办法
    // 里层函数是箭头函数，箭头函数的this,是指向父作用域的this
    const isMillenial = () => {
      console.log(this);
      console.log(self.year >= 1981 && self.year <= 1991);
    };
    isMillenial();
  },
  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  }
};
jonas.calcYear();
// jonas.greet();
// console.log(this.firstName);

const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};

addExpr(2, 5);
addExpr(2, 5, 4);
const addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
// addArrow(3, 4);
*/
