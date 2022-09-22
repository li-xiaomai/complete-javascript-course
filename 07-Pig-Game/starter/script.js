'use strict';
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');

const displayMessage = function (ele, message) {
  ele.textContent = message;
};

let playing, score, currentScore, activePlayer;
const init = function () {
  playing = true;
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  displayMessage(score0El, 0);
  displayMessage(score1El, 0);
  displayMessage(current0El, 0);
  displayMessage(current1El, 0);
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const addScore = function (num) {
  currentScore += num;
  displayMessage(
    document.querySelector(`#current--${activePlayer}`),
    currentScore
  );
};

const addTotalScore = function () {
  score[activePlayer] += currentScore;
  displayMessage(
    document.querySelector(`#score--${activePlayer}`),
    score[activePlayer]
  );

  if (score[activePlayer] >= 100) {
    playing = false;
    // btnRoll.removeEventListener('click', roll);
    // btnHold.removeEventListener('click', hold);
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  }
};

const clear = function () {
  displayMessage(document.querySelector(`#current--${activePlayer}`), 0);
  currentScore = 0;
  // warn activePlayer active不要用同一个名字，要产生局部变量，导致全局的activePlayer不会改变
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const roll = function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.setAttribute('src', `dice-${dice}.png`);
    if (dice !== 1) {
      addScore(dice);
    } else {
      clear();
    }
  }
};

const hold = function () {
  if (playing) {
    addTotalScore();
    clear();
  }
};

btnRoll.addEventListener('click', roll);
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', init);
