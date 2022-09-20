"use strict";

/*
let hasDriverLicense = false;
const passTest = true;

if (passTest) hasDriverLicense = true;
if (hasDriverLicense) console.log(`I can drive`);

// const interface = "Audio";
// const private = 534;
// const if = 23;
*/

/*
function logger() {
  console.log(`My name is Jonas`);
}
// calling
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges`;
  return juice;
}
const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

// console.log(fruitProcessor(5, 0));

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);
*/

// Function declaration
function caclAge1(birthYear) {
  return 2037 - birthYear;
}
const age1 = caclAge1(1991);
console.log(age1);

// Function expression
const caclAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = caclAge2(1991);
console.log(age2);
