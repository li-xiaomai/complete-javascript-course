'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

/*
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
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 4,
    address = 'ds',
    time = '21:00',
  }) {
    console.log(starterIndex, mainIndex, address, time);
  },
};
restaurant.orderDelivery({
  starterIndex: 9,
  address: 'lll',
});

restaurant.orderDelivery({
  time: '22:30',
  address: 'via',
  mainIndex: 2,
  starterIndex: 2,
});

//对象解构
const { categories, openingHours } = restaurant;
console.log(categories, openingHours);

// 更改属性名
const { categories: tags, openingHours: hours } = restaurant;
console.log(tags, hours);

//默认值
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// 先定义，再改变
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

// 对象里面嵌套对象
// const restaurant = {
//   openingHours: {
//     thu: {
//       open: 12,
//       close: 22,
//     },
//   }
// }
const {
  openingHours: q,
  openingHours: {
    sat: { open: o, close: c },
  },
} = restaurant;
console.log(q, o, c);
/*

/*
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
*/

/*
const arr = [7, 8, 9];
const badArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badArr);

const goodArr = [1, 2, ...arr];
console.log(goodArr); // [1,2,7,8,9]

console.log(...goodArr); //1 2 7 8 9
console.log(1, 2, 7, 8, 9); //1 2 7 8 9

const restaurant = {
  mainMenu: ['Pizza', 'Pasta', 'Risotto', [1, 2]],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your declicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },
};
// const ingredients = [
//   prompt("let's make pasta! Ingredient 1?"),
//   prompt("let's make pasta! Ingredient 2?"),
//   prompt("let's make pasta! Ingredient 3?"),
// ];
// console.log(ingredients);
// restaurant.orderPasta(...ingredients);

const newMenu = [...restaurant.mainMenu, 'zhongcan'];
console.log(newMenu); //['Pizza', 'Pasta', 'Risotto', 'zhongcan']
console.log('------------------');

// 复制函数 浅拷贝
// const mainMenuCopy = [...newMenu];
// mainMenuCopy[3][1] = 10;
// console.log(newMenu, mainMenuCopy); //['Pizza', 'Pasta', 'Risotto', [1, 10]]

// 合并两个数组
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

const str = 'jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters); // ['j', 'o', 'n', 'a', 's', ' ', 'S.']
console.log(...str); // j o n a s
console.log('j', 'o', 'n', 'a', 's'); // j o n a s
// console.log(`${...str}`);

//object
const newRestaurant = { foundIn: 1998, ...restaurant, founder: 'xiaomai' };
console.log(newRestaurant);

// 复制对象 浅拷贝
const restaurantCopy = { ...newRestaurant };
restaurantCopy.founder = 'mary';
restaurantCopy.starterMenu[0] = 1;
console.log(
  restaurantCopy.founder,
  newRestaurant.founder,
  restaurantCopy.starterMenu[0],
  newRestaurant.starterMenu[0]
); // mary xiaomai 1 1
*/

/*
//rest
const arr = [1, 2, ...[3, 4]];
console.log(arr); // [1, 2, 3, 4]
const [a, b, ...others] = arr;
console.log(a, b, others); // 1,2,[3, 4]

const restaurant = {
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
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
  orderPizza: function (mainIngredient, ...other) {
    console.log(mainIngredient, other);
  },
};

// rest 是不包含跳过的其他元素的

//解构中收集元素
const [pizza, , risotto, ...other] = [
  ...restaurant.starterMenu,
  ...restaurant.mainMenu,
];
// other：['Caprese Salad', 'Pizza', 'Pasta', 'Risotto'] 没有跳过的‘Pasta’元素
console.log(pizza, risotto, other);
const {
  openingHours: { sat, ...weekdays },
} = restaurant;
console.log(sat, weekdays);

//function
const add = function (...rest) {
  console.log(rest); // 所有参数组成的一个数组
  let sum = 0;
  for (let i = 0; i < rest.length; i++) {
    sum += rest[i];
  }
  console.log(sum);
};

add(2, 3);
add(2, 3, 4, 3);
add(2, 3, 4, 3, 1, 8, 9, 7);
const x = [1, 2, 3, 4];
add(...x);
restaurant.orderPizza('1', '2', '3', '4');
restaurant.orderPizza('1');
*/

/*
// 短路
// OR 只要第一个数据为真，就返回第一个数据
// OR 第一个数据为假，返回第一个遇到真的数据，否则没有真的数据，直接返回最后一个数据
console.log('-----OR------');
console.log(3 || 'jonas'); // 3
console.log('' || 'jonas'); //jonas
console.log(true || 0); // true
console.log(undefined || null); // null

console.log(undefined || '' || 0 || 'hello' || 23 || null); // hello
console.log(undefined || '' || 0 || NaN || false || null); // null

// 下面两种方式是一样的，但是要避免第一种
const restaurant = {};
restaurant.numGuests = 23;
const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guest1); //23

const guest2 = restaurant.numGuests || 10;
console.log(guest2); //23

console.log('-----AND----');
// AND 只要第一个数据为假，就返回第一个数据
// AND 第一个数据为真，返回后面第一个遇到假的的数据，否则没有假的数据，直接返回最后一个数据
console.log(0 && 'jonas'); // 0
console.log(3 && 'jonas'); //jonas
console.log(true && 0); // 0
console.log('hello' && 23 && null && 'jonas'); //null
console.log('hello' && 23 && 'sdf' && 'jonas'); //jonas

// 下面两种方式是一样的，但是要避免第一种
restaurant.orderPizza = function (mainIngredient, ...other) {
  console.log(mainIngredient, other);
};
if (restaurant.orderPizza) {
  restaurant.orderPizza('23', '34');
}

restaurant.orderPizza && restaurant.orderPizza('23', '34');
*/

/*
//空值合并操作符
const restaurant = {};
restaurant.numGuests = 0; //0
restaurant.numGuests = ''; //''
restaurant.numGuests = undefined; //右侧的值
restaurant.numGuests = null; //右侧的值
// 只有左侧的值是undefined和null的时候，返回右侧的值，否则返回左侧的值
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);

const guests = restaurant.numGuests || 10;
console.log(guests); //23
*/

/*
const rest1 = {
  name: 'xiaomai',
  numGuests: 0,
};
const rest2 = {
  name: 'xiaozhong',
  owner: 'zhongzhonger',
};

// or assignment operator 如果变量值是虚假值，将为变量赋值
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// nullish assignment operator 如果变量值是undefined, null，将为变量赋值
rest1.numGuests ??= '<ANONYMOUS>';
rest2.numGuests ??= '<ANONYMOUS>';

// and assignment operator 如果变量值为真，改变变量的值，为假，不做任何改变
// rest1.owner = rest1.owner && '<ANONYMOUS>'; //{name: 'xiaomai', numGuests: 0, owner: undefined}
rest1.owner &&= '<ANONYMOUS>'; //{name: 'xiaomai', numGuests: 0}
rest2.owner &&= '<ANONYMOUS>'; //{name: 'xiaozhong', owner: '<ANONYMOUS>', numGuests: '<ANONYMOUS>'}
console.log(rest1, rest2);
*/

/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//1
const {
  players: [players1, players2],
} = game;
console.log(players1, players2);
//2
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);
//3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);
//4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);
//5
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);
//6
const printGoals = function (...players) {
  console.log(players);
};
printGoals('xiaomai', 'xiaoli', 'xiaozhong', 'xiaoqian');
printGoals('xiaomai', 'xiaoli');
printGoals('xiaomai', 'xiaoli', 'xiaozhong');
printGoals(...game.scored);
//7 找出三个数据里面的最小值
const win =
  (draw < team1 && draw < team2 && 'draw') ||
  (team2 < draw && team2 < team1 && 'team2') ||
  (team1 < draw && team1 < team2 && 'team1');
console.log(win);

const [a, b, c] = [20, 12, 45];
*/

/*
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

//计算属性
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  //es6 属性名跟属性值相等时，省略掉属性值
  openingHours,
  // es6 函数不用写成函数表达式，
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  //es6
  orderDelivery({
    starterIndex = 1,
    mainIndex = 4,
    address = 'ds',
    time = '21:00',
  }) {
    console.log(starterIndex, mainIndex, address, time);
  },
};

console.log(restaurant?.openingHours?.fri?.open);

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const item of days) {
  const open = restaurant?.openingHours[item]?.open ?? 'closed';
  console.log(`on ${item} , we open at ${open}`);
}

//检查方法是否存在，存在就调用，不存在就提示不存在
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.order1?.(0, 1) ?? 'Method does not exist');

//检查数组是否为空
const user = [];
console.log(user[0]?.name ?? 'user are empty');
//以前写法
if (user.length > 0) console.log(user[0].name);
else console.log('user are empty');

*/
/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menu) console.log(item);
for (const [index, item] of menu.entries()) {
  // console.log(`${item[0] + 1}:${item[1]}`);
  console.log(index + 1, item);
}
// console.log([...menu.entries()]);
// console.log(menu.entries());
*/

// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
/*
const openingHours = {
  Thu: {
    open: 12,
    close: 22,
  },
  Fri: {
    open: 11,
    close: 23,
  },
  Sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const properties = Object.keys(openingHours); // 得到对象属性名的一个数组
let openStr = `We can open on ${properties.length} days`;
for (const day of properties) {
  openStr += ` ${day},`;
  console.log(openStr);
}

const values = Object.values(openingHours);
const entries = Object.entries(openingHours);

for (const [index, { open, close }] of entries) {
  console.log(`On ${index},we open at  ${open}, we close at ${close}`);
}
*/

/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//1
for (const [index, item] of game.scored.entries())
  console.log(`Goal ${index + 1}: ${item}`);

//2
let sum = 0;
for (const item of Object.values(game.odds)) {
  sum += item;
}
console.log(sum / Object.keys(game.odds).length);

//3
for (const [index, item] of Object.entries(game.odds)) {
  console.log(`Odd of ${game[index] ?? 'draw'}: ${item}`);
}
//4
const scorers = {};
for (const [index, item] of game.scored.entries()) {
  scorers[item] = scorers[item] ? scorers[item] + 1 : 1;
}
console.log(scorers);
*/

/*
const ordersSet = new Set([
  'xiaomai',
  'xiaozhong',
  'xiaoqian',
  'xiaomai',
  'xiaoqian',
]);
console.log(ordersSet);
console.log(ordersSet.size);
console.log(new Set('xiaomai'));
console.log(ordersSet.has('xiaomai'));
ordersSet.add('xiaoluo');
ordersSet.add('xiaoluo');
console.log(ordersSet);
ordersSet.delete('xiaomai');
console.log(ordersSet);
// ordersSet.clear();
// console.log(ordersSet);

for (const item of ordersSet) console.log(item);

const staff = ['xiaomai', 'xiaoqian', 'xiaoli', 'xiaomai', 'xiaoli'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

console.log(new Set(staff).size);
console.log(new Set('xiaomai').size);
*/
