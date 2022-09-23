'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z, arr);

//categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
let [main, , secondary] = restaurant.categories; //因为中间空了一个
console.log(main, secondary); //所以first = Italian, second = Vegetarian

//以前交换两个值
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);

//现在交换两个值
[main, secondary] = [secondary, main];
console.log(main, secondary);

//函数返回的是一个数组，我们可以解构为两个变量
const [start, end] = restaurant.order(2, 0);
console.log(start, end);

// 数组嵌套数组
const nested = [2, 3, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);// 2  [5,6]
// 里面的数组【5，6】又解构了
const [i, , [j, k]] = nested;
console.log(i, j, k); //2,5,6

//解构时，给变量设置默认值
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
