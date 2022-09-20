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

/*
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
*/

/*
// Arrow function
const caclAge3 = (birthYear) => 2037 - birthYear;
const age3 = caclAge3(1991);
console.log(age3); // 46

const yearUntilRetirement = (birthYear) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  return retirement;
};
console.log(yearUntilRetirement(1991));

const whoYearUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  return `${firstName} retires in ${retirement}`;
};
console.log(whoYearUntilRetirement(1991, "xiaomai"));
console.log(whoYearUntilRetirement(1980, "Bob"));
*/

/*
const cutFruitPieces = (fruit) => fruit * 4;
function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);
  const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange`;
  return juice;
}

console.log(fruitProcessor(2, 3));
*/

/*
const caclAge = (birthYear) => 2037 - birthYear;

const whoYearUntilRetirement = (birthYear, firstName) => {
  const age = caclAge(birthYear);
  const retirement = 65 - age;

  if (retirement > 0) {
    return retirement;
  } else {
    return `已经退休了`;
  }

  // return `${firstName} retires in ${retirement}`;
};
console.log(whoYearUntilRetirement(1991, "xiaomai"));
console.log(whoYearUntilRetirement(1950, "xiaomai"));
*/

// challenge
// data 1
const dolphinScore1 = 44;
const dolphinScore2 = 23;
const dolphinScore3 = 71;
const koalaScore1 = 65;
const koalaScore2 = 54;
const koalaScore3 = 49;

// data 2
// const dolphinScore1 = 85;
// const dolphinScore2 = 54;
// const dolphinScore3 = 41;
// const koalaScore1 = 23;
// const koalaScore2 = 34;
// const koalaScore3 = 27;

const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;
const dolphinAverage = calcAverage(dolphinScore1, dolphinScore2, dolphinScore3);
const koalaAverage = calcAverage(koalaScore1, koalaScore2, koalaScore3);

const checkWinner = (dolphinAverage, koalaAverage) => {
  if (dolphinAverage >= 2 * koalaAverage) {
    console.log(`Dolphin win (${dolphinAverage} vs ${koalaAverage})`);
  } else if (koalaAverage >= 2 * dolphinAverage) {
    console.log(`Koala win (${koalaAverage} vs ${dolphinAverage})`);
  } else {
    console.log(`No team wins(${dolphinAverage} vs ${koalaAverage})`);
  }
};

checkWinner(dolphinAverage, koalaAverage);
