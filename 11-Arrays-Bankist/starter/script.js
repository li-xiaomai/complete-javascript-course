'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
let sorted = false;
const displayMovements = function (acc, sorted = false) {
  //清空containerMovements元素下的所有内容
  containerMovements.innerHTML = '';
  let movments = sorted
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  console.log(sorted);
  movments.forEach(function (movement, key) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      key + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${movement} €</div>
        </div>
`;
    //添加html片段
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// 这个函数不返回任何值， 产生副作用，在acc上添加了一个属性username
const createUsernames = accs =>
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });

createUsernames(accounts);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur);
  labelSumIn.textContent = incomes;
  const out = Math.abs(
    acc.movements.filter(mov => mov < 0).reduce((acc, cur) => acc + cur)
  );
  labelSumOut.textContent = out;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter((interest, i, arr) => interest >= 1)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumInterest.textContent = interest;
};

const updateUI = function (currentAccount) {
  displayMovements(currentAccount);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
};
let currentAccount;
btnLogin.addEventListener('click', e => {
  // bug 当我们点击提交按钮的时候，会重新加载页面，所以要阻止默认方式
  e.preventDefault();
  const userName = inputLoginUsername.value;
  const pin = inputLoginPin.value;
  currentAccount = accounts.find(
    account => account.username === userName && account.pin === Number(pin)
  );
  if (currentAccount) {
    //清空输入框
    inputLoginUsername.value = inputLoginPin.value = '';
    //使用键盘登陆的时候，让输入框失去焦点
    inputLoginPin.blur();
    inputLoginUsername.blur();
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const account = inputTransferTo.value;
  const receiverAcc = accounts.find(acc => acc.username === account);
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(acc => acc > loanAmount * 0.1)
  ) {
    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const username = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);

  if (username === currentAccount.username && pin === currentAccount.pin) {
    const index = accounts.findIndex(
      item => item.pin === pin && item.username === username
    );
    if (index !== -1) {
      accounts.splice(index, 1);
      containerApp.style.opacity = 0;
    }
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

btnSort.addEventListener('click', function () {
  sorted = !sorted;
  displayMovements(currentAccount, sorted);
});

// console.log(containerMovements.innerHTML);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//数组的方法
// let arr = ['a', 'b', 'c', 'd', 'e'];

/*
//slice()返回一个新数组， 可以截取数组的一部分，但是不会改变原数组
console.log(arr.slice(2)); //从下标为2开始截取到末尾['c', 'd', 'e']
console.log(arr.slice(2, 4)); //从下标为2截取到下标是3的数据，不包括4。 ['c', 'd'] 截取的长度就是end-start/4-2=2
console.log(arr.slice(-2)); //从末尾-2开始截取 ['d', 'e']
console.log(arr.slice(-1)); //最后一个元素
console.log(arr.slice(1, -2)); //['b', 'c']

//浅拷贝
console.log(arr.slice()); //截取原数组的所有数据
console.log([...arr]);
*/

/*
//splice 会改变原数组 返回删除的元素组成的新数组
// console.log(arr.splice(2)); //['c', 'd', 'e']
// console.log(arr); //只剩下了删除完以后的元素组成的数组['a','b'],删除的元素已经从原数组中删除了

// console.log(arr.splice(-1)); //删掉了最后一个数组
// console.log(arr); // 原数组删除掉了最后一个数组

//splice 第二个参数是，删除元素的个数
arr.splice(1, 2);
console.log(arr);
*/

/*
// reverse 反转 原数组也反转了
let arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'k', 'i'];
console.log(arr2.reverse()); //['i', 'k', 'j']
console.log(arr2); //['i', 'k', 'j']
*/

/*
//concat 连接两个数组 不会改变原数组
let arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'k', 'i'];
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);
*/

/*
// join 用连接符，将数组转为字符串
let arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'k', 'i'];
const letters = arr.concat(arr2);
console.log(letters.join(' - ')); //a - b - c - d - e - j - k - i
*/

/*
//at()接收一个整数值并返回该索引的项目，允许正数和负数。负整数从数组中的最后一个项目开始倒数。
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

//获取数组的最后一个元素
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(arr.length - 1));
// console.log(arr.splice(-1)[0]); //会改变原数组

//字符串也有at()
console.log('jonas'.at(0));
*/

// 数组的遍历
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//for of
// for (const movement of movements) {
for (const [index, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

//forEach 里面的函数参数有三个，第一个是当前元素，第二个是当前元素的索引，第三个是整个数组
//continue和break无法再forEach中工作
console.log('---------forEach----------');
movements.forEach(function (movement, index, arr) {
  if (movement > 0) {
    console.log(`Movement${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement${index + 1}:You withdrew ${Math.abs(movement)}`);
  }
});

*/

/*
//遍历map
//map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (item, key, map) {
  console.log(`${key}:${item}`);
});

//遍历set
//set set是没有索引的，所以在forEach中，key的值跟value的值一样，所以我们在写的时候，尽量不要使用key
const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'EUR', 'USD', 'RGB']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (item, _, set) {
  console.log(`value:${item}`);
});
*/

/*
const julias = [3, 5, 2, 12, 7];
const kates = [4, 1, 15, 8, 3];
const juliasCopy = julias.slice();
juliasCopy.splice(0, 1);
juliasCopy.splice(-2);
// juliasCopy = julias.slice(1,3)

const checkDog = function (dogArr) {
  dogArr.forEach(function (item, index) {
    item >= 3
      ? console.log(
          `Dog number ${index + 1} is an adult, and is ${item} years old`
        )
      : console.log(`Dog number ${index + 1} is still a puppy 🐶`);
  });
};
checkDog(juliasCopy.concat(kates));
*/

/*
// map 返回与原数组个数对应的数组
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
//   // return 23;
// });
const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movementsUSD);
console.log(movements);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map((movement, index, arr) => {
  // if (movement > 0) {
  //   return `Movement ${index + 1}: You deposited ${movement}`;
  // } else {
  //   return `Movement ${index + 1}: You withdrew ${Math.abs(movement)}`;
  // }
  return `Movement ${index + 1}: You ${
    movement > 0 ? 'deposited' : 'withdrew'
  } ${Math.abs(movement)}`;
});
console.log(movementsDescriptions);
*/

/*
//filter 过滤符合条件的元素，组成新数组
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(mov => mov > 0);
const withdrawal = movements.filter(mov => mov < 0);
console.log(deposits, withdrawal);

const depositsFor = [];
for (const mov of movements) {
  mov > 0 && depositsFor.push(mov);
}
console.log(depositsFor);
*/

//reduce 将数组中的元素组成一个元素 reduce有两个参数，一个是函数，一个是acc的初始值。
// 当acc没有初始值，循环的下标从1开始
// 当acc有初始值，循环的下标从0开始
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(i, acc);
//   return acc + cur;
// });

// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

// let sum = 0;
// for (const mov of movements) {
//   sum += mov;
// }
// console.log(sum);

// maximum value
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const maximum = movements.reduce((acc, cur) => {
//   acc = cur > acc ? cur : acc;
//   return acc;
// });
// console.log(maximum);
/*
const dogs = [5, 2, 4, 1, 15, 8, 3];
const average = dogs =>
  dogs
    .map(item => (item <= 2 ? 2 * item : 16 + item * 4))
    .filter(item => item >= 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
// (2+3)/2=2.5 ====> 2/2 + 3/2 = 2.5

const avg1 = average(dogs);
console.log(avg1);

const avg2 = dogs =>
  dogs
    .map(item => (item <= 2 ? 2 * item : 16 + item * 4))
    .filter(item => item >= 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

    */
/*
//链式调用
// 这种链式的如果出错了，不好调试，所以我们要调试，可以在下一个方法中写上arr
const eurToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => mov * eurToUsd)
  .reduce((acc, cur) => acc + cur, 0);
console.log(totalDepositsUSD);
*/

/*
// find 返回满足条件的第一个元素,找不到返回undefined
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/

/*
//finIndex 返回满足条件的元素的下标，找不到返回-1
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const index = movements.findIndex(item => item > 500);
console.log(index);
const indexNo = movements.findIndex(item => item > 300 && item < -1000);
console.log(indexNo);
*/

/*
// includes 返回ture或者false
// 全等
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.includes(-450));
console.log(movements.some(mov => mov === -450));

//some 只要有条件满足返回true，不满足返回false
//有一个满足条件就返回true
const anyDeposits = movements.some(mov => mov > 1);
console.log(anyDeposits);

//every 所有元素都要满足条件才返回true,否则返回false
const every = movements.every(mov => mov > 0);
const every4 = account4.movements.every(mov => mov > 0);
console.log(every, every4);

//单独的回调
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.filter(deposit));
console.log(movements.every(deposit));
*/

/*

// flat()只展开一层，默认的参数是1，展开一层
//可以传递参数，想展开几层，就传入几层
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); //[1, 2, 3, 4, 5, 6, 7, 8]
const [first, second, ...other] = arr;
console.log([...first, ...second, ...other]);
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); //[Array(2), 3, 4, Array(2), 7, 8]
console.log(arrDeep.flat(2)); //[1, 2, 3, 4, 5, 6, 7, 8]

// const accountMovements = accounts.map(acc => acc.movements);
// const allMOvements = accountMovements.flat();
// const overBalance = allMOvements.reduce((acc, cur) => acc + cur, 0);
// console.log(overBalance);

// flat()
const overBalance2 = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, cur) => acc + cur, 0);
console.log(overBalance2);

//flatMap() 里面的回调函数是用来得到map的数据的，类似于map() ,然后再flat()
const overBalance3 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => acc + cur, 0);
console.log(overBalance3);
*/

/*
// string sort()会改变原数组的数据
const owners = ['jonas', 'xiaomai', 'boji', 'kuke'];
console.log(owners.sort());
console.log(owners);
//number 默认是按照字符串来排序的，所以先排-的，然后再按照第一位的字母顺序从小到大排序
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.sort()); //[-130, -400, -650, 1300, 200, 3000, 450, 70]

// const sorts = [1, 4, 5, 2, 3, 8];
//返回 <0 ,A,B
// 返回>0, B,A
//返回0，位置不变

// 主要看返回大于0的那个分支
// 如果第一个数大于第二个数，从小到大排序
// 如果第一个数小于第二个数，从大到小排序
//asc
// movements.sort((a, b) => {
//   if (a > b) {
//     return 1;
//   }
//   if (a < b) {
//     return -1;
//   }
// });
movements.sort((a, b) => a - b);

console.log(movements);

// des
// movements.sort((a, b) => {
//   if (a > b) {
//     return -1;
//   }
//   if (a < b) {
//     return 1;
//   }
// });

movements.sort((a, b) => b - a);
console.log(movements);
*/

/*
//fill 填充
const arr = [1, 2, 3, 4];
console.log(new Array(1, 2, 3, 4, 5));
const x = new Array(7);
console.log(x); //[empty × 7]创建一个长度为7的空数组
console.log(x.map(item => 5));
// x.fill(1);
// console.log(x); //[1,1,1,1,1,1,1]
// 从下标3开始处开始填充
console.log(new Array(5).fill(1, 3)); //[empty × 3, 1, 1]
// 用1来填充，从下标3处开始填充，到下标5处结束，不包含结束下标
console.log(new Array(7).fill(1, 3, 5)); //[empty × 3, 1, 1, empty × 2]
console.log(arr.fill(2, 0, 3)); //[2, 2, 2, 4]
*/

/*
//Array.from 动态创建数组
const y = Array.from({ length: 20 }, (t, i) => i + 1);
console.log(y);
const z = Array.from(
  { length: 7 },
  (_, i) => Math.trunc(Math.random() * 6) + 1
);
console.log(z);

// Array.from()从类数组中创建数组
// [...类数组] Array.from()都可以把类数组转为数组
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace(' €', ''))
  );
  console.log(movementsUI);

  // const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  // console.log(movementsUI2);
});
*/

/*
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);
console.log(bankDepositSum);

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 1000).length;
console.log(numDeposits1000);

const numDeposits10002 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur > 1000 ? ++count : count), 0);
console.log(numDeposits10002);

const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

const converTitleCase = function (title) {
  const expections = ['a', 'an', 'the', 'or', 'but', 'on', 'in', 'with'];
  // const arr = title.toLocaleLowerCase().split(' ');

  // arr.reduce((acc, cur, i) => {
  //   acc +=
  //     i > 0 && !expections.includes(cur)
  //       ? cur.replace(cur[0], cur[0].toLocaleUpperCase()) + ' '
  //       : cur + ' ';
  //   console.log(acc);
  //   return acc;
  // }, '');

  // const arrSum = arr.reduce((acc, cur, i) => {
  //   i > 0 && !expections.includes(cur)
  //     ? acc.push(cur.replace(cur[0], cur[0].toLocaleUpperCase()))
  //     : acc.push(cur);
  //   return acc;
  // }, []);
  // return arrSum.join(' ');

  const capitzalize = str => str[0].toLocaleUpperCase() + str.slice(1);
  return title
    .toLocaleLowerCase()
    .split(' ')
    .map(word => (expections.includes(word) ? word : capitzalize(word)))
    .join(' ');
};
console.log(converTitleCase('this is a nice title'));
console.log(converTitleCase('this is the NICE title'));
console.log(converTitleCase('this is with nice title'));
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
// 1
dogs.forEach(
  item => (item['recommendedFood'] = Math.trunc(item.weight ** 0.75 * 28))
);
console.log(dogs);

//2
let eat;
const sarahDog = dogs.find(item => item.owners.includes('Sarah'));

console.log(
  `it's eating too ${
    sarahDog.curFood > sarahDog.recommendedFood ? 'much' : 'little'
  }`
);

//3
const ownersEatTooMuch = dogs
  .filter(item => item.curFood > item.recommendedFood)
  .flatMap(item => item.owners);
const ownersEatTooLittle = dogs
  .filter(item => item.curFood < item.recommendedFood)
  .flatMap(item => item.owners);

console.log(ownersEatTooMuch, ownersEatTooLittle);

// 4
console.log(`${ownersEatTooMuch.join(' and ')}'s  dogs  eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s  dogs  eat too little`);

// 5
console.log(dogs.some(item => item.curFood === item.recommendedFood));

//6
const checkEatingOkay = item =>
  item.curFood > item.recommendedFood * 0.9 &&
  item.curFood > item.recommendedFood * 1.1;
console.log(dogs.some(checkEatingOkay));

//7
const eatingOkayDogs = dogs.filter(checkEatingOkay);
console.log(eatingOkayDogs);

//8
const arrAsc = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(arrAsc);
