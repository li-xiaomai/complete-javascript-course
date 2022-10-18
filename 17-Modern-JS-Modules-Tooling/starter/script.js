// import { addToCar, totalPrice as price, qt } from './shoppingCar.js'; //totalPrice as price price是别名
// console.log('Importing module');
// // console.log(shopingCost);
// addToCar('bread', 5);
// console.log(tq);
// console.log(price);

// import * as ShoppingCar from './shoppingCar.js'; //导出shoppingCar.js所有命名导出，文件名需要加上.js后缀  ShoppingCar是别名
// console.log(ShoppingCar.tq);
// console.log(ShoppingCar.totalPrice);
// ShoppingCar.addToCar('bread', 5);

// 导入不是导出的副本，其实是指向的同一个地方
// import add, { cars } from './shoppingCar.js'; // 默认导入，可以给默认导出随便起名
// add('pizza', 2);
// add('bread', 5);
// console.log(cars);

// 不建议这样使用
// import add, { addToCar, totalPrice as price, qt } from './shoppingCar.js';// 在现实中，不应该把默认导出，跟命名导出混合使用

// 模块中的顶级等待，可以不用再写
// async function(){
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

// }
// 但是阻止了整个模块的执行 会先输出data,再输出11111
// console.log('start fetching ');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log(11111);

// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   return { title: data.at(-1).title, body: data.at(-1).body };
// };

// const data = getLastPost(); // promise函数返回的是一个promise
// console.log(data); //Promise {<pending>}

// const data = await getLastPost();
// console.log(data);

// module pattern
// const shoppingCar = (function () {
//   const shopingCost = 10;
//   const cart = [];
//   const totalPrice = 237;
//   const totalQuantity = 23;
//   const addToCar = function (product, quantity) {
//     console.log(this);
//     cart.push({ product, quantity }); //这里可以使用cart是因为闭包，不是因为返回的对象里面有cart,使用的this.cart才是因为返回的对象里面有this
//     console.log(`${product} ${quantity} added to car`);
//     console.log(shopingCost);
//   };
//   return {
//     addToCar,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();
// shoppingCar.addToCar('apples', 4);
// shoppingCar.addToCar('pizza', 3);
// console.log(shoppingCar.shopingCost); //undefined

// //CommonJS modules 在node中支持
// // Export
// export.addToCart =  function (product, quantity) {
//       console.log(this);
//       cart.push({ product, quantity }); //这里可以使用cart是因为闭包，不是因为返回的对象里面有cart,使用的this.cart才是因为返回的对象里面有this
//       console.log(`${product} ${quantity} added to car`);
//       console.log(shopingCost);
//     };

// // Import
// const {addToCart} =  require('./shoppingCar.js')
