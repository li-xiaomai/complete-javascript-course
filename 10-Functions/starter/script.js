'use strict';
/*
//默认值
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers //可以动态计算
) {
  //es5 设置默认值
  // numPassengers ||= 1; //设置默认值
  // price ||= 199; //设置默认值
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
createBooking('LH123', undefined, 1000); //跳过第二个参数，让第二个用默认值
*/

/*
//传递基本类型，引用类型(会改变原始数据)
//函数传递中没有按值传递和按引用传递，其实都是按值传递，不过引用数据传的值是地址
const flight = 'LH234';
const jonas = {
  name: 'jonas Xiaomai',
  passport: 213213134,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;
  if (passenger.passport === 213213134) {
    alert('Ckeck in');
  } else {
    alert('Wrong passport');
  }
};
// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};
newPassport(jonas);
checkIn(flight, jonas);
*/

/*
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//高阶函数，函数作为参数传递
const transformer = function (str, fn) {
  console.log(`Original string:${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};
transformer('Javascript is the best!', upperFirstWord);
transformer('Javascript is the best!', oneWord);


const hign5 = function () {
  console.log('👏');
};
//高阶函数
document.body.addEventListener('click', hign5);
*/

/*
//高阶函数，返回函数
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('jonas');
greeterHey('xiaomai');
greet('Hey')('xiaozhong');

const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
*/

/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
lufthansa.book(239, 'xiaomai');
lufthansa.book(635, 'jonas');
const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;
// 常规函数的this是undefined  报错
// book(23, 'Sarah Williams');

//改变this的方法，call apply （会立即调用函数）bind（返回一个新函数）

// call 改变this指向,参数不变
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

const swiss = {
  airline: 'Swiss Air Line',
  iataCode: 'LX',
  bookings: [],
};
book.call(swiss, 583, 'Mary');
console.log(swiss);

const flightData = [239, 'xiaomai'];
book.call(eurowings, ...flightData);
console.log(eurowings);

//apply 改变this指向，参数变为数组
book.apply(swiss, [239, 'xiaomai']);
console.log(swiss);

//bind 不会立即执行函数，会返回一个新函数
const bookEW = book.bind(eurowings);
const bookSW = book.bind(swiss);
const bookLH = book.bind(lufthansa);
bookEW(23, 'xiaoqian');
console.log(eurowings);
bookSW(12, 'xiaoluo');
console.log(swiss);
bookLH(16, 'xiaozhong');
console.log(lufthansa);

// 这里的23相当于给原函数的第一次参数赋默认值
const bookEW23 = book.bind(eurowings, 23);
console.log(bookEW23);
bookEW23('xiaoli');
console.log(eurowings);

//event listeners
lufthansa.plans = 30;
lufthansa.buyPlane = function () {
  this.plans++;
  console.log(this.plans);
};

// 事件处理中函数的this,是发生事件的元素，所以要改变this指向需要指定this的指向
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//partial application 部分应用 可以预设参数
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
const addVAT = addTax.bind(null, 0.23); //addVAT =  value => value + value * 0.23;
console.log(addVAT(100));

const addV = function (rate) {
  return function (value) {
    return addTax(rate, value);
  };
};
console.log(addV(0.23)(100));
*/

/*
// const answer = [5, 2, 3];
const answers = [1, 5, 3, 9, 6, 1];

const displayResults = function (type = 'array') {
  if (type === 'array') {
    console.log([...this.answers]);
  } else if (type === 'string') {
    console.log(`Poll results are ${[...this.answers].join(',')}`);
  }
};

const registerNewAnswer = function () {
  const answer = Number(
    prompt(
      `What is your favourite programming language?\n${this.options.join(
        '\n'
      )}\n(Write option number)`
    )
  );
  if (!isNaN(answer)) {
    if (this.answers[answer] === undefined) {
      alert(`answer ${answer} would't make sense,right?`);
    } else {
      this.answers[answer]++;
      this.displayResults();
      this.displayResults('string');
    }
  } else {
    alert('not number');
  }
};

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  // registerNewAnswer() {
  //   const answer = Number(
  //     prompt(
  //       `What is your favourite programming language?\n${this.options.join(
  //         '\n'
  //       )}\n(Write option number)`
  //     )
  //   );
  //   if (!isNaN(answer)) {
  //     if (this.answers[answer] === undefined) {
  //       alert(`answer ${answer} would't make sense,right?`);
  //     } else {
  //       this.answers[answer]++;
  //       this.displayResults();
  //       this.displayResults('string');
  //     }
  //   } else {
  //     alert('not number');
  //   }
  // },
  registerNewAnswer,
  // displayResults(type = 'array') {
  //   if (type === 'array') {
  //     console.log([...this.answers]);
  //   } else if (type === 'string') {
  //     console.log(`Poll results are ${[...this.answers].join(',')}`);
  //   }
  // },
  displayResults,
};
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers });
poll.displayResults.call({ answers }, 'string');
*/

/*
const runOnce = function () {
  console.log('This will nerver run again!');
};

runOnce();

// IIFE 主要是为了保护我们的变量
(function () {
  console.log('This will nerver run again!');
})();

(() => console.log('This will nerver run again!'))();
*/

/*
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount}:passgeners`);
  };
};
const booker = secureBooking();
booker();
console.dir(booker);
*/

/*
//example 1 先声明一个变量，后面再赋值的，也会产生一个闭包
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};
g();
f();
console.dir(f);
h();
f();
console.dir(f);
*/
/*
//example 2  函数里面的定时器里的函数 也会产生一个闭包
const boardPassenger = function (n, wait) {
  // const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 group,each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait}`);
};
const perGroup = 1000;
boardPassenger(180, 3);

//立即执行函数里面的事件绑定函数
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.body.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
*/
