/* 
let js = "amazing";
console.log(40 + 8 + 23 - 10);

console.log("Jonas");
console.log(23);

let firstName = "xiaomai";

console.log(firstName);
console.log(firstName);
console.log(firstName);

// Variable name conventions
let jonas_matilda = "JM";
let $function = 27;

let person = "jonas";
let PI = 3.14;

let myFirstJob = "Coder";
let myCurrentJob = "Teacher";

let job1 = "programmer";
let job2 = "teacher";

console.log(myFirstJob);
*/
/*
let javascriptIsFun = true;
console.log(javascriptIsFun);

// console.log(typeof true);
console.log(typeof javascriptIsFun);
// console.log(typeof 23);
// console.log(typeof "jonas");

javascriptIsFun = "Yes";
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(typeof year);

console.log(typeof null);
*/

/*
let age = 30;
age = 31;

const BIRTHDAY = 1990;
//BIRTHDAY = 1991;//常量不可以更改
//const JOB;// 常量初始必须赋值

var job = "programmer";
job = "teacher";

lastName = "xiaomai";
console.log(lastName); //发生变量提升。输出xiaomai
*/

/*
//Math operators
const NOW = 2037;
let ageJonas = NOW - 1991;
let ageXiaomai = NOW - 2018;
console.log(ageJonas, ageXiaomai);

console.log(ageJonas * 2, ageXiaomai / 10, 2 ** 3);

const firstName = "Jonas";
const lastName = "Xiaomai";
console.log(firstName + " " + lastName);
console.log(`${firstName} ${lastName}`);

// Assignment operators
let x = 10 + 5; //15
x += 10; //25  x = x + 10
x *= 4; // 100 x = x *4;
x++; //101 x = x + 1
x--; //100 x = x -1;
console.log(x); //100

// Comparision opeators
console.log(ageJonas > ageXiaomai); // true  <, >, <=,>=  ageJonas = 46 ageXiaomai = 19;
console.log(ageXiaomai >= 18); // ture

const isFullAge = ageXiaomai >= 18;
console.log(isFullAge);
console.log(NOW - 1991 > NOW - 2018);
*/

/*
const NOW = 2037;
let ageJonas = NOW - 1991;
let ageXiaomai = NOW - 2018;
console.log(NOW - 1991 > NOW - 2018);
console.log(25 - 10 - 5);
let x, y;
x = y = 25 - 10 - 5; // x = y = 10;
console.log(x, y);

const averageAge = (ageJonas + ageXiaomai) / 2;
console.log(ageJonas, ageXiaomai, averageAge);
*/

/*
// Challenge
// data 1
const MarksWeight = 78;
const MarksHeight = 1.69;
const JohnsWight = 92;
const JohnsHeight = 1.95;

// data 2
// const MarksWeight = 95;
// const MarksHeight = 1.88;
// const JohnsWight = 85;
// const JohnsHeight = 1.76;

const MarksBMI = MarksWeight / MarksHeight ** 2;
const JohnsBIM = JohnsWight / JohnsHeight ** 2;

const markHigherBIM = MarksBMI > JohnsBIM;
console.log(
  "MarksBMI:",
  MarksBMI,
  "JohnsBIM:",
  JohnsBIM,
  "markHigherBIM:",
  markHigherBIM
);
*/

/*
const firstName = "Jonas";
const job = "teacher";
const birthYear = 1991;
const year = 2037;

const jonas =
  "I'm " +
  " " +
  firstName +
  ", a " +
  (year - birthYear) +
  " years old " +
  job +
  " ! ";

console.log(jonas);
const jonasNew = `I'm  ${firstName},  a ${
  year - birthYear
} years old teacher !`;
console.log(jonasNew);

console.log(`Just a regular string...`);

console.log("String with \n\
muitiple \n\
lines");
console.log(`String
muliple
line`);
*/

/*
const age = 15;
// const isOldEnough = age >= 18;

if (age >= 18) {
  console.log("xiaomai can start driving license!");
} else {
  const yearLeft = 18 - age;
  console.log(`xiaomai is too young, Wait another ${yearLeft} years`);
}

const birthYear = 1991;
let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}

console.log(century);
*/

/*
// challenge
// data 1
// const MarksWeight = 78;
// const MarksHeight = 1.69;
// const JohnsWight = 92;
// const JohnsHeight = 1.95;

// data 2
const MarksWeight = 95;
const MarksHeight = 1.88;
const JohnsWight = 85;
const JohnsHeight = 1.76;

const MarksBMI = MarksWeight / MarksHeight ** 2;
const JohnsBMI = JohnsWight / JohnsHeight ** 2;

if (MarksBMI > JohnsBMI) {
  console.log(`Mark's BMI(${MarksBMI}) is higher than John's(${JohnsBMI})`);
} else if (MarksBMI < JohnsBMI) {
  console.log(`John's BMI(${JohnsBMI}) is higher than Mark's${MarksBMI}`);
}
*/

/*
// type conversion 强制转换
const inputYear = "1991";
console.log(Number(inputYear) + 18); //2009   1991 +18

console.log(Number("xiaomai")); // NaN
console.log(typeof NaN);

console.log(String(23)); //'23'

//type coercion 隐式转换
console.log(inputYear + 18); //199118  发生隐式转换，将数字18转为字符串18
console.log("I am " + 23 + " years old");
console.log("I am " + " 23 " + " years old ");
console.log("23" - "10" - 3); // 遇到减号，发生隐式类型转换，将字符串数字转为数字 23 - 10 -3 =10
console.log("23" * "10"); // 遇到*
console.log("23" / "10"); // 遇到/

let n = "1" + 1; //隐式转位：11 字符串拼接
n -= 1; //隐式转换为 11 - 1 = 10
console.log(n); // 10
*/

/*
// type conversion 强制类型转换 布尔值
//5 falsy values: 0 '' undefined null NaN
console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(undefined));
console.log(Boolean(null));
console.log(Boolean(NaN));

// type coersion 隐式转换 布尔值
const money = 100;
if (money) {
  console.log(`Don't spend it all`);
} else {
  console.log(`You should get a job`);
}

let height = 0;
if (height) {
  console.log(`Height is defined`);
} else {
  console.log(`Height is undefined`);
}
*/

/*
const age = "18";
if (age === 18) console.log(`You just become a adult:strict`);
if (age == 18) console.log(`You just become a adult:loose`);

const favourite = prompt(`what's your favourite number?`); // 得到的值是一个字符串
console.log(favourite);
console.log(typeof favourite); // string

if (favourite === 23) {
  //'23' === 23
  console.log(`23 is an amazaing number`); //不执行这句话
} else if (Number(favourite) === 23) {
  console.log(`type conversion Number(prompt(23)) is an amazaing number `);
} else {
  console.log("number is not 23");
}

if (Number(favourite) !== 23) {
  console.log("Why not is 23");
}
*/

/*
const hasDriversLicens = true;
const hasGoodVision = true;

console.log(hasDriversLicens && hasGoodVision);
console.log(hasDriversLicens || hasGoodVision);
console.log(!hasDriversLicens);

// const shouldDrive = hasDriversLicens && hasGoodVision;

if (hasDriversLicens && hasGoodVision) {
  console.log(`She is able drive`);
} else {
  console.log(`Someone else should drive...`);
}

const isTired = false;
if (hasDriversLicens && hasGoodVision && !isTired) {
  console.log(`She is able drive`);
} else {
  console.log(`Someone else should drive...`);
}
*/

/*
// challenge
// data 1
// const dolphinsScore1 = 96;
// const dolphinsScore2 = 108;
// const dolphinsScore3 = 89;
// const koalasScore1 = 88;
// const koalasScore2 = 91;
// const koalasScore3 = 110;

//data 2
const dolphinsScore1 = 97;
const dolphinsScore2 = 112;
const dolphinsScore3 = 101;
const koalasScore1 = 109;
const koalasScore2 = 95;
const koalasScore3 = 123;

//data 3
// const dolphinsScore1 = 97;
// const dolphinsScore2 = 112;
// const dolphinsScore3 = 101;
// const koalasScore1 = 109;
// const koalasScore2 = 95;
// const koalasScore3 = 106;

const dolphinsAverage = (dolphinsScore1 + dolphinsScore2 + dolphinsScore3) / 3;
const koalasAverage = (koalasScore1 + koalasScore2 + koalasScore3) / 3;

if (dolphinsAverage > koalasAverage) {
  console.log(
    `Dolphine(${dolphinsAverage}) : Koala(${koalasAverage}) ---> dolphins(${dolphinsAverage}) is winner`
  );
} else if (dolphinsAverage == koalasAverage) {
  console.log("no body win");
} else {
  console.log(
    `Dolphine(${dolphinsAverage}) : Koala(${koalasAverage}) ---> koalas(${koalasAverage}) is winner`
  );
}

if (dolphinsAverage > koalasAverage && dolphinsAverage >= 100) {
  console.log(
    `Dolphine(${dolphinsAverage}) : Koala(${koalasAverage}) ---> dolphins(${dolphinsAverage}) is winner`
  );
} else if (koalasAverage > dolphinsAverage && koalasAverage >= 100) {
  console.log(
    `Dolphine(${dolphinsAverage}) : Koala(${koalasAverage}) ---> koalas(${koalasAverage}) is winner`
  );
} else if (
  koalasAverage === dolphinsAverage &&
  koalasAverage >= 100 &&
  dolphinsAverage >= 100
) {
  console.log(
    `Dolphine(${dolphinsAverage}) : Koala(${koalasAverage}) ---> Both win`
  );
} else {
  console.log(
    `Dolphine(${dolphinsAverage}) : Koala(${koalasAverage}) ---> no body win`
  );
}
*/

/*
const day = "monday";
switch (day) {
  case "monday": //day === 'monday
    console.log("plan course structure");
    console.log("Go to coding meetup");
    break;
  case "tuesday":
    console.log("Prepare theory videos");
    break;
  case "wednesday":
  case "thursday":
    console.log("Writing code examples");
    break;
  case "friday":
    console.log("Record videos");
    break;
  case "saturday":
  case "sunday":
    console.log("enjoy the weekend ");
    break;
  default:
    console.log("Not a valid day");
}

if (day === "monday") {
  console.log("plan course structure");
  console.log("Go to coding meetup");
} else if (day === "tuesday") {
  console.log("Prepare theory videos");
} else if (day === "wednesday" || day === "thursday") {
  console.log("Writing code examples");
} else if (day === "friday") {
  console.log("Record videos");
} else if (day === "saturday" || day === "sunday") {
  console.log("enjoy the weekend ");
} else {
  console.log("Not a valid day");
}
*/

/*
3 + 4;
1991;
true && false;

if (23 > 10) {
  const str = "23 is bigger";
}

const me = "jonas";
console.log(`I'm ${2037 - 1991} years old ${me}`);
*/

/*
const age = 22;
age >= 18
  ? console.log("I like to drink wine")
  : console.log("I like to drink water");

const drink = age >= 18 ? "wine" : "water";
console.log(drink);

let drink2;
if (age >= 18) {
  drink2 = "wine";
} else {
  drink2 = "water";
}
console.log(`I like to drink ${drink2}`);

console.log(`I like to drink ${age >= 18 ? "wine" : "water"}`);
*/

//data 1
const bill = 275;

//data 2
// const bill = 40;

//data 3
// const bill = 430;

let tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
console.log(
  `The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`
);

if (bill >= 50 && bill <= 300) {
  tip = bill * 0.15;
} else {
  tip = bill * 0.2;
}
console.log(
  `The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`
);
