'use strict';

const messageEle = document.querySelector('.message');
const scoreEle = document.querySelector('.score');
const highScoreEle = document.querySelector('.highscore');
const numberEle = document.querySelector('.number');
const guessEle = document.querySelector('.guess');
const checkBtnEle = document.querySelector('.check');
const againtnEle = document.querySelector('.again');
const bodyEle = document.querySelector('body');

let number = Math.trunc(Math.random() * 20) + 1;
let scoreNumber = 20;
let hignScore = 0;
// comment 设置元素的内容

const displayMessage = function (ele, message) {
  ele.textContent = message;
};

checkBtnEle.addEventListener('click', function () {
  // comment 得到输入框的值，不用没吃都从input中取值
  const guessValue = guessEle.value;

  // comment: 判断输入框输入的是否为数字
  if (!guessValue) {
    // comment: 输入框输入的不是数字
    displayMessage(messageEle, 'No number!');
  } else {
    // comment: 输入框输入的是数字
    //comment 输入框的都是字符串数字，需要强转
    const guessNumber = Number(guessValue);

    //comment 输入的数字与猜的数字是否一致
    if (number === guessNumber) {
      // comment 输入的数字与猜的数字一致
      // comment 设置显示信息，以及样式
      displayMessage(numberEle, number);
      bodyEle.style.backgroundColor = '#60b347';
      numberEle.style.width = '30rem';
      //这轮的得分与之前的分数的高低，判断是否赢的比赛
      if (scoreNumber > hignScore) {
        // comment 设置高分的值，显示赢信息
        displayMessage(messageEle, 'You wined the game!');
        hignScore = scoreNumber;
        displayMessage(highScoreEle, hignScore);
      } else {
        // comment 显示失败的信息
        displayMessage(messageEle, 'You lost the game!');
      }
    } else {
      // comment 输入的数字与猜的数字不一致
      if (scoreNumber > 1) {
        // comment 没有用完20次机会，但是没猜中数字，显示提示信息，
        // comment 机会-1
        // comment 设置得分
        displayMessage(
          messageEle,
          number > guessNumber ? 'too low' : 'too high'
        );
        scoreNumber--;
        displayMessage(scoreEle, scoreNumber);
      } else {
        // comment 20次机会用完，比赛失败，设置得0分
        displayMessage(messageEle, 'You lost the game!');
        displayMessage(scoreEle, 0);
      }
    }
    // else if (number > guessNumber) {
    //   if (scoreNumber > 1) {
    //     messageEle.textContent = 'too low';
    //     scoreNumber--;
    //     scoreEle.textContent = scoreNumber;
    //   } else {
    //     messageEle.textContent = 'You lost the game!';
    //     scoreEle.textContent = 0;
    //   }
    // } else {
    //   if (scoreNumber > 1) {
    //     messageEle.textContent = 'too high';
    //     scoreNumber--;
    //     scoreEle.textContent = scoreNumber;
    //   } else {
    //     messageEle.textContent = 'You lost the game!';
    //     scoreEle.textContent = 0;
    //   }
    // }
  }
});

// comment
// 重来
// 除了最高得分，一切数据重来
againtnEle.addEventListener('click', function () {
  scoreNumber = 20;
  number = Math.trunc(Math.random() * 20) + 1;
  displayMessage(messageEle, 'Start guessing...');
  displayMessage(scoreEle, scoreNumber);
  displayMessage(numberEle, '?');
  guessEle.value = '';
  bodyEle.style.backgroundColor = '#222';
  numberEle.style.width = '15rem';
});
