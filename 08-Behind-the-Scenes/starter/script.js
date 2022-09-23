'use strict';

/*
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

// Variables
// console.log(me);
// console.log(job);
// console.log(year);

var me = 'jonas'; // 变量提升了，值为undefined
let job = 'teacher'; // 变量未提升，得到错误，在初始化之前，不能使用
const year = 1991; //变量未提升，得到错误，在初始化之前，不能使用

// Function
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
