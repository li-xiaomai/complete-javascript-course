' strict mode';
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// Object.freeze()只冻结第一级
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = (limits, user) => limits?.[user] ?? 0;
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  // let lim = spendingLimits[user] ? spendingLimits[user] : 0;
  // let lim = spendingLimits?.[user] ?? 0;
  const cleanUser = user.toLowerCase(user);
  // let limit = getLimit(limits, cleanUser);
  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;

  // if (!user) user = 'jonas';
  // user = user.toLowerCase();

  // let lim;
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // }

  // if (value <= lim) {
  //   budget.push({ value: -value, description: description, user: user });
  // }
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(newBudget3);

const checkExpense = (state, limits) =>
  state.map(item =>
    item.value < -getLimit(limits, item.user)
      ? { ...item, flag: 'limit' }
      : item
  );

// const checkExpense = function (state, limits) {
//   return state.map(item => {
//     // let lim;
//     // lim = spendingLimits?.[item.user] ?? 0;
//     return item.value < -getLimit(limits, item.user)
//       ? { ...item, flag: 'limit' }
//       : item;
//   });

// for (let el of budget) {
//   let lim;
//   if (spendingLimits[el.user]) {
//     lim = spendingLimits[el.user];
//   } else {
//     lim = 0;
//   }

//   if (el.value < -lim) {
//     el.flag = 'limit';
//   }
// }
// };
const finalBudget = checkExpense(newBudget3, spendingLimits);

console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  return state
    .filter(item => item.value <= -bigLimit)
    .map(item => item.description.slice(-2))
    .join(' / ');
  // .reduce((str, cur) => {
  //   return `${str} / ${cur.description.slice(-2)}`;
  // }, '');

  // let output = '';
  // output = budget.reduce((acc, cur) => {
  //   if (!(cur.value <= -bigLimit)) return acc;
  //   return (acc += `${cur.description.slice(-2)} / `);
  // }, '');
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);

  // let output = '';
  // for (let el of budget) {
  //   if (el.value <= -limit) {
  //     output += el.description.slice(-2) + ' / '; // Emojis are 2 chars
  //   }
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

const limit = logBigExpenses(finalBudget, 10);
console.log(limit);
