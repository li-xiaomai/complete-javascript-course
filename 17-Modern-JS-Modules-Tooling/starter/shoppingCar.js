console.log('Exporting module');
const shopingCost = 10;
export const cars = [];
//导出分为  命名导出，默认导出
// 命名导出可以导出多个;
//默认导出 默认导出只能有一次
// 导出只能在顶级进行
export const addToCar = function (product, quantity) {
  cars.push({ product, quantity });
  console.log(`${product} ${quantity} added to car`);
};
// 会阻塞代码执行
// console.log('start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/posts');
// console.log('finished fetching users');
//报错  导出只能在顶级进行
// if (true) {
//   export const addToCar = function (product, quantity) {
//     cars.push({ product, quantity });
//     console.log(`${product} ${quantity} added to car`);
//   };
// }

const totalPrice = 237;
const totalQuantity = 37;
export { totalPrice, totalQuantity as tq };

// 默认导出
export default function (product, quantity) {
  cars.push({ product, quantity });
  console.log(`${product} ${quantity} added to car`);
}

// export default addToCar;
