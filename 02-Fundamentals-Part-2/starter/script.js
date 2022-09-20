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

/*
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
*/

/*
const friend1 = "qianli";
const friend2 = "xiaomai";
const friend3 = "moumou";

const friends = ["qianli", "xiaomai", "moumou"];
console.log(friends);

const years1 = new Array(1991, 1992, 1993);
console.log(years1);
console.log(friends[0]);
console.log(friends[1]);
console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = "jay";
console.log(friends);

const firstName = "jonas";
const jonas = [firstName, "xiaomai", 2037 - 1991, "teacher", friends];
console.log(jonas);
console.log(jonas.length);

const caclAge = (birthYear) => 2037 - birthYear;
const years = new Array(1990, 1967, 2002, 2010, 2018);
const age1 = caclAge(years[0]);
const age2 = caclAge(years[1]);
const age3 = caclAge(years[years.length - 1]);
console.log(age1, age2, age3);
const ages = [
  caclAge(years[0]),
  caclAge(years[1]),
  caclAge(years[years.length - 1]),
];
console.log(ages);
*/

/*
const friends = ["qianli", "xiaomai", "moumou"];
// add elements
const newLength = friends.push("Jay"); // 4
console.log(friends); //["qianli", "xiaomai", "moumou"， 'Jay']
console.log(newLength); // 4

friends.unshift("John");
console.log(friends);

// remove elements
const popedElement = friends.pop();
console.log(friends);
console.log(popedElement);

const firstElment = friends.shift();
console.log(friends);
console.log(firstElment);

console.log(friends.indexOf("xiaomai"));
console.log(friends.indexOf("John"));

friends.push(23);
console.log(friends.includes("xiaomai"));
console.log(friends.includes("John"));
console.log(friends.includes("23"));
console.log(friends.includes(23));

if (friends.includes("xiaomai")) {
  console.log("You have a friend called xiaomai");
} else {
  console.log("You have not a friend called xiaomai");
}
*/

const calcTip = (bill) =>
  bill >= 50 && bill <= 500 ? bill * 0.15 : bill * 0.2;

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const total = [tips[0] + bills[0], tips[1] + bills[1], tips[2] + bills[2]];
console.log(tips, total);
