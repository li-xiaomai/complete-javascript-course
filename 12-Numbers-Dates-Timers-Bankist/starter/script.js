'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-09-30T21:31:17.178Z',
    '2022-09-29T07:42:02.383Z',
    '2022-09-27T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
const formatCur = (value, locale, currency) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);

const formatMovmentDate = function (now, locale) {
  const calcDaysPass = (date1, date2) =>
    Math.trunc(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));
  const daysPassed = calcDaysPass(new Date(), now);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // const date = `${now.getDate()}`.padStart(2, 0);
  // const month = `${now.getMonth() + 1}`.padStart(2, 0);
  // const year = now.getFullYear();
  // const hour = now.getHours();
  // const minute = now.getMinutes();
  // const second = now.getSeconds();
  // return `${year}/${month}/${date}`;

  return new Intl.DateTimeFormat(locale).format(now);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const now = new Date(acc.movementsDates[i]);
    const displayDate = formatMovmentDate(now, acc.locale);

    const formatMov = formatCur(mov.toFixed(2), acc.locale, acc.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formatBalance = formatCur(
    acc.balance.toFixed(2),
    acc.locale,
    acc.currency
  );
  labelBalance.textContent = `${formatBalance}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const formatIncomes = formatCur(incomes.toFixed(2), acc.locale, acc.currency);
  labelSumIn.textContent = `${formatIncomes}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const formatOut = formatCur(
    Math.abs(out).toFixed(2),
    acc.locale,
    acc.currency
  );
  labelSumOut.textContent = `${formatOut}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  const formatInterest = formatCur(
    interest.toFixed(2),
    acc.locale,
    acc.currency
  );
  labelSumInterest.textContent = `${formatInterest}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
const startLogoutTimer = function () {
  // setTimeout(function () {}, 5 * 1000 * 60);

  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };
  let time = 300;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// Event handlers
let currentAccount;
let timer;
// FAKE ALWAYS LOGIN
// currentAccount = account1;
// updateUI(currentAccount);

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    const now = new Date();

    // const locale = navigator.language; //zh-CN

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const date = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const minute = now.getMinutes();
    // const second = now.getSeconds();
    // labelDate.textContent = `${year}/${month}/${date} ${hour}:${minute}:${second}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';
  clearInterval(timer);
  timer = startLogoutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach((item, index) => {
    if (index % 2 == 0) item.style.backgroundColor = 'red';
  });
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
//二进制
console.log(23 === 23.0);
console.log(0.2 + 0.1);
console.log(0.2 + 0.1 === 0.3);
//转换 将字符串转换为数字：强制转换number() 、添加一个+
console.log(Number('23'));
console.log(+'23');
//parseing 解析为十进制的数 必须可以转换为数字开头的字符串,第二个参数，是第一个参数当作几进制的数
console.log(Number.parseInt('30px', 10)); //30
console.log(Number.parseInt('fpx', 16)); //15
console.log(Number.parseInt('30px', 2)); //NaN 因为二进制中没有30，所以解析失败
console.log(Number.parseInt('e20')); //NaN

console.log(Number.parseFloat(' 2.5rem ')); //2.5
console.log(Number.parseInt('  2.5rem   ')); //2

//parseInt() parseFloat()也是全局的函数，但是这是以前的做法，现在已经放在NUmber对象上了
console.log(parseFloat(' 2.5rem ')); //2.5
console.log(parseInt('  2.5rem   ')); //2

// 判断是否是NaN  返回true false
console.log(Number.isNaN(2)); //false
console.log(Number.isNaN('dsf')); //false
console.log(Number.isNaN(+'20px')); //true   +'20px'是NaN
console.log(Number.isNaN(23 / 0)); //false   23/0 = Infinity

//判断是否是是数字，是数字就返回true 否则返回false
console.log(Number.isFinite(23)); //true
console.log(Number.isFinite('20')); //false
console.log(Number.isFinite(+'20px')); //false
console.log(Number.isFinite(23 / 0)); //false

//判断是否是一个整数
console.log(Number.isInteger(20)); //true
console.log(Number.isInteger(20.0)); //true
console.log(Number.isInteger(20.3)); //false
console.log(Number.isInteger(23 / 0)); //false
*/

/*
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2)); //25的1/2次方，也是开平方根
console.log(8 ** (1 / 3)); //开立方根
// Math.max()会强制转换，但是不会parseing
console.log(Math.max(5, 18, 23, 11, 2)); //最大值23
console.log(Math.max(5, 18, '23', 11, 2)); //最大值23
console.log(Math.max(5, 18, '23px', 11, 2)); //无法解析NaN

// Math.min()会强制转换，但是不会parseing
console.log(Math.min(5, 18, 23, 11, 2)); //2
console.log(Math.min(5, 18, 23, 11, '2')); //2
console.log(Math.min(5, 18, 23, 11, '2px')); //NaN 无法解析NaN

//Math.PI
console.log(Math.PI * Number.parseFloat('10px') ** 2); //半径为10的圆的面积

// Math.random() [0,1)
console.log(Math.random()); //[0,1)
console.log(Math.trunc(Math.random() * 6)); //[0,6)
console.log(Math.trunc(Math.random() * 6) + 1); //[1,6]

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min) + 1) + min; //返回的数据是[最小值+1，最大值]
// console.log(randomInt(-3, -2));

//Math.trunc()去掉小数部分
console.log(Math.trunc(23.3)); //23
console.log(Math.trunc(-23.3)); //-23
console.log(Math.trunc(-0.5)); //-0
console.log(Math.trunc(0.5)); //0

//Math.round() 四舍五入到最靠近的整数，负数，正数在0.5的时候，都是靠大
console.log(Math.round(23.3)); //23
console.log(Math.round(-23.3)); //-23
console.log(Math.round(-23.6)); //-24
console.log(Math.round(23.6)); //24
console.log(Math.round(23.5)); //24
console.log(Math.round(-23.5)); //-23
console.log(Math.round(-0.5)); //-0
console.log(Math.round(0.5)); //1

// Math.ceil()向上舍入
console.log(Math.ceil(23.3)); //24
console.log(Math.ceil(23.9)); //24
console.log(Math.ceil(-23.3)); //-23
console.log(Math.ceil(-23.9)); //-23
console.log(Math.ceil(-0.5)); //-0
console.log(Math.ceil(0.5)); //1
console.log(Math.ceil(-23.5)); //-23
console.log(Math.ceil(23.5)); //24
// Math.floor()向下舍入
console.log(Math.floor(23.3)); //23
console.log(Math.floor(23.9)); //23
console.log(Math.floor(-23.3)); //-24
console.log(Math.floor(-23.9)); //-24
console.log(Math.floor(-0.5)); //-1
console.log(Math.floor(0.5)); //0
console.log(Math.floor(-23.5)); //-24
console.log(Math.floor(23.5)); //23

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min; //返回的数据是[最小值+1，最大值]
console.log(randomInt(-3, 1));

// toFixed() 保留的小数位数 ，返回的是一个字符串
console.log((2.7).toFixed(0));
console.log(+(-2.7).toFixed(2)); //
console.log(+(-2.78767567).toFixed(2)); //
*/

/*
//取模 可以用来判断是偶数还是奇数
console.log(5 % 2); //1
console.log(5 / 2); //2.5
console.log(8 % 2); //0
console.log(6 % 2); //0

const isEven = n => n % 2 === 0;
console.log(isEven(1));
console.log(isEven(2));
console.log(isEven(-2));
*/

/*
// 分隔符 _只能在放置在前后都有数字的地方，不能连续,只能用在数字上，不能是字符串数字
const dismeter = 23_400_000_000;
console.log(dismeter);

const price = 335_99;
console.log(price);
const PI = 3.1_415926;
console.log(PI);
console.log(Number('234_0000')); //NaN
console.log(Number.parseInt('234_0000')); //234
*/

/*
//bigInt
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);

console.log(432432423423423423423432n);
console.log(BigInt(43243423423432));
console.log(BigInt(4324323423432));
const huge = 432432423423423423423432n;
console.log(huge * 1232432n);
console.log(100n + 200n);
// console.log(100n + 200);//报错 bigint是不能跟常规数字混合
console.log(100n * BigInt(234));

//bigInt 跟常规数字的逻辑运算
console.log(20n > 15); //true
console.log(20n === 20); //false
console.log(typeof 20n);

console.log(huge + ' is REALLY Big!!!');
// console.log(Math.sqrt(16n)); //报错

console.log(11n / 3n); //3n 会返回接近的整数，一般都是去掉小数
console.log(10 / 3); //3.33333333....
*/

/*
//创建日期
const now = new Date();
console.log(now);

console.log(new Date('Fri Sep 30 2022 16:48:03'));
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2022, 8, 30, 16, 51, 3)); //月份会大一个月
console.log(new Date(2022, 8, 31, 16, 51, 3)); //因为9月没有31号，所以会自动到10，1 Sat Oct 01 2022 16:51:03 GMT+0800 (中国标准时间)

console.log(new Date(0)); //Sun Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //Sun Jan 04 1970 08:00:00 GMT+0800 (中国标准时间)
*/

/*
const future = new Date(2022, 8, 30, 16, 51, 3);
console.log(future);
// 得到年，月，日，星期几，小时，分，秒,时间戳
console.log(future.getFullYear()); //2022年
console.log(future.getMonth()); //8月
console.log(future.getDate()); //30号
console.log(future.getDay()); //5 星期五
console.log(future.getHours()); //16小时
console.log(future.getMinutes()); //51分钟
console.log(future.getSeconds()); //3秒

console.log(future.toISOString()); //2022-09-30T08:51:03.000Z

console.log(new Date(1664527863000)); //Fri Sep 30 2022 16:51:03 GMT+0800 (中国标准时间)
//获取时间戳
console.log(future.getTime()); //1664527863000
console.log(Date.now()); //1664528664857

//设置年月日时分秒
future.setFullYear(2023);
future.setMonth(9);
console.log(future);
*/

// const future = new Date(2022, 8, 29);
// console.log(+future); //1664527863000
// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
// const day1 = calcDaysPassed(new Date(), future);
// console.log(Math.trunc(day1));

//根据国家来格式化日期
// const locale = navigator.language; //zh-CN
// const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric',
//   weekday: 'long',
// };
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

/*
// 格式化数字
const num = 387897.32;
const options = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  // useGrouping: true,
};
console.log(new Intl.NumberFormat('en-US', options).format(num)); //387,897.32
*/

// 定时器 只执行一次 setTimeOut()
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients
);
console.log('Waiting...');
// 清空定时器
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

//反复执行 setInterval()
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000 );
