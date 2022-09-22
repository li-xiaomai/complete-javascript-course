// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const x = '23';
if (x === 23) {
  console.log('dsf');
}

const age = (birthYear) => 2037 - birthYear;
console.log(age(1991));

// 测试数据
// const temperatures = ['sdf', -2, -6, -1, 'error', 9, 13, 17, 14, 9, 5];
// const temperatures = ['sdf', 'error', 'dsf'];
const temperatures = ['sdf', -3, -5, 'error', -9, 'dsf', -2, -11];

const caclaTemperatures = function (temperatures) {
  // bug 如果第一个数就是非数字

  let i = 0;
  let max;
  let min;

  //  1. 过滤掉所有的非数字
  //  2.给最小值，最大值赋初始值
  for (i; i < temperatures.length; i++) {
    if (typeof temperatures[i] !== 'number') {
      continue;
    } else {
      max = temperatures[i];
      min = temperatures[i];
      break;
    }
  }

  // 传进来的数组没有数字的时候，直接返回
  if (max === undefined && min === undefined) return `Non't have number `;

  // 从给最大值，最小值的index的下一个数字开始比较
  // 比较，找到最大值，最小值
  for (i + 1; i < temperatures.length; i++) {
    max = temperatures[i + 1] > max ? temperatures[i + 1] : max;
    min = temperatures[i + 1] < min ? temperatures[i + 1] : min;
  }
  console.log(min, max);

  // 最大值，最小值同为负数时，取绝对值再相减
  // 最小值，最小值一正一负，同为正时，直接相减
  // 返回最大值，最小值的差值
  return max < 0 && min < 0 ? Math.abs(min) - Math.abs(max) : max - min;
};

console.log(caclaTemperatures(temperatures));
