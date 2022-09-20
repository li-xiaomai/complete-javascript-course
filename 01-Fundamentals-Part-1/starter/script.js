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
