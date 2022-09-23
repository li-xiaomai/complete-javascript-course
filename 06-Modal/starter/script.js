'use strict';

const showModalEles = document.querySelectorAll('.show-modal');
const modalEle = document.querySelector('.modal');
const closeModalEle = document.querySelector('.close-modal');
const overlayEle = document.querySelector('.overlay');

const toggleModal = function () {
  modalEle.classList.toggle('hidden');
  overlayEle.classList.toggle('hidden');
};

for (let i = 0; i < showModalEles.length; i++) {
  showModalEles[i].addEventListener('click', toggleModal);
}

closeModalEle.addEventListener('click', toggleModal);

overlayEle.addEventListener('click', toggleModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalEle.classList.contains('hidden')) {
    toggleModal();
  }
});
/*
console.log(this);
const caclAge = function (birthYear) {
  const age = 2037 - birthYear;
  console.log(this);
  console.log(age);
};
caclAge(1991);

const caclAgeArrow = birthYear => {
  const age = 2037 - birthYear;
  console.log(this);
  console.log(age);
};
caclAgeArrow();

const jonas = {
  year: 1991,
  caclAge: function () {
    console.log(this);
  }
};
jonas.caclAge();

const xiaomai = {
  year: 2017
};
xiaomai.caclAge = jonas.caclAge;
xiaomai.caclAge();

const f = jonas.caclAge;
f();
*/
