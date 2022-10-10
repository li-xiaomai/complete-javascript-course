'use strict';

const btnScrolTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  // 哈希作为链接，会跳转到页面的顶部,这是默认行为
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
//  Button scrolling
btnScrolTo.addEventListener('click', function (e) {
  // getBoundingClientRect方法返回一个 DOMRect 对象，其提供了元素的大小及其相对于视口的位置。
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('current scroll (x/y):', window.screenX, window.screenY);
  // console.log(window.pageXOffset, window.pageYOffset);

  // 适口的高度和宽度document.documentElement.clientHeight， document.documentElement.clientWidth
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // 现代的滑动 元素滚动到适口可见区域
  section1.scrollIntoView({ behavior: 'smooth', block: 'end' });
});

//利用事件冒泡实现事件委托
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target.classList);
  if (e.target.classList.contains('nav__link')) {
    const eleId = e.target.getAttribute('href');
    document.querySelector(eleId).scrollIntoView({ behavior: 'smooth' });
  }
});

// 鼠标进入移出nav__link时，链接透明度变化
document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    const target = e.target.closest('.operations__tab');

    // 当点击的是按钮中间的空白时
    if (!target) return;
    [...target.parentElement.children].forEach(el =>
      el.classList.remove('operations__tab--active')
    );
    target.classList.add('operations__tab--active');

    const parent = target.closest('.operations');
    parent
      .querySelectorAll('.operations__content')
      .forEach(el => el.classList.remove('operations__content--active'));

    parent
      .querySelector(`.operations__content--${target.dataset.tab}`)
      .classList.add('operations__content--active');
  });

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const img = e.target.closest('.nav').querySelector('.nav__logo');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    img.style.opacity = this;
  }
};

// 监听事件传参,只能接受一个参数bind
document
  .querySelector('.nav')
  .addEventListener('mouseover', handleHover.bind(0.5));
document
  .querySelector('.nav')
  .addEventListener('mouseout', handleHover.bind(1));

// 老方法
//   document.querySelector('.nav').addEventListener('mouseover', function (e) {
//     handleHover(e, 0.5);
//   });
// document.querySelector('.nav').addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

//sticky navigation
/*
//旧的方法
window.addEventListener('scroll', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(window.scrollY, s1coords.top, window.pageYOffset);
  if (window.scrollY >= s1coords.top + window.pageYOffset)
    document.querySelector('nav').classList.add('sticky');
  else document.querySelector('nav').classList.remove('sticky');
});
*/

const obsCallback = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting)
    document.querySelector('nav').classList.remove('sticky');
  else document.querySelector('nav').classList.add('sticky');
};
const navHeight = document.querySelector('.nav').getBoundingClientRect().height;
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const header = document.querySelector('.header');
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);

const sectionCallback = (entries, observe) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observe.unobserve(entry.target);
};
const sectionOption = {
  root: null,
  threshold: 0.15,
};
const sectionObserver = new IntersectionObserver(
  sectionCallback,
  sectionOption
);
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

//lazy loading images

const imgs = document.querySelectorAll('img[data-src]');
const imgObserverCallback = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgOption = {
  root: null,
  threshold: 0,
  rootMargin: '200px',
};
const imgObserver = new IntersectionObserver(imgObserverCallback, imgOption);
imgs.forEach(img => imgObserver.observe(img));

//幻灯片
const slider = function () {
  // const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length;
  const createDots = function () {
    slides.forEach((_, index) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide='${index}'></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    console.log(
      slide,
      document.querySelector(`.dots__dot[data-slide="${slide}"]`)
    );
    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };
  // slider.style.overflow = 'visible';

  const goToSlide = function (curSlide) {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - curSlide) * 100}%)`;
    });
  };

  const nextSilde = function () {
    if (Number(curSlide) === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  };

  const preSlide = function () {
    console.log(curSlide);
    if (Number(curSlide) === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  };
  const init = function () {
    createDots();
    goToSlide(0);
    activeDot(0);
  };
  init();
  btnLeft.addEventListener('click', preSlide);

  btnRight.addEventListener('click', nextSilde);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && preSlide();
    e.key === 'ArrowRight' && nextSilde();
  });

  dotContainer.addEventListener('click', function (e) {
    console.log(e.target);
    if (e.target === dotContainer) return;

    curSlide = e.target.dataset.slide;
    goToSlide(curSlide);
    activeDot(curSlide);
  });
};

slider();
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/*
// 收集元素
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
// document.body.style.color = 'red';

// 如果页面中元素变化，HTMLCollection也会改变（页面中删除一个元素，HTMLCollection会变化，NodeList不会改变）
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section'); //NodeList
console.log(allSections);
document.getElementById('#section--1');
const allButtons = document.getElementsByTagName('button'); //HTMLCollection
console.log(allButtons);

console.log(document.getElementsByClassName('btn')); //HTMLCollection

//创建和插入元素
// insertAdjacentHTML;
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics';
message.innerHTML = `We use cookied for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>`;

// 实际只插入了一次，第二次相当于从第一个元素移动到最后一个元素
// prepend()创建的元素是header的第一个子元素
// header.prepend(message);
//append()创建的元素是header的最后一个子元素
header.append(message);

// 克隆message元素，里面的参数true/false 代表要不要克隆子元素
// header.append(message.cloneNode(true));

//before().after()作为header兄弟元素
// header.before(message);
// header.after(message);

// 删除元素remove()
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    //过去的做法
    // message.parentElement.removeChild(message);
  });
  */

/*
//设置样式的
//元素.syle. 是设置的内联样式
message.style.backgroundColor = '#37383d';
message.style.width = '800px';

console.log(message.style.height); //什么也没有，因为这个只会读取内联样式，但是内联样式上没有height
console.log(message.style.backgroundColor); //rgb(55, 56, 61)

//获得元素的所有样式getComputedStyle(元素)
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 100 + 'px';

console.log(message.style.height);

document.documentElement.style.setProperty('--color-primary', 'orangered');
*/

/*
//Attributes
const logo = document.querySelector('.nav__logo');

console.log(logo.alt); //Bankist logo
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt); //Beautiful minimalist logo

// 非标准的属性，可以用getAttribute()
console.log(logo.designer); //undefined 因为不是标准的属性
console.log(logo.getAttribute('designer')); //jonas
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company'));

// 使用getAttribute()得到是在html中写的属性值，用元素.属性 得到是绝对值
console.log(logo.src); //http://127.0.0.1:5500/img/logo.png 绝对地址
console.log(logo.getAttribute('src')); //img/logo.png 相对地址

const link = document.querySelector('.nav__link--btn');
console.log(link.href); //http://127.0.0.1:5500/#
console.log(link.getAttribute('href')); //#

// Data attributes
// dataset.属性值（驼峰）
console.log(logo.dataset.versionNumber); //3.0

// classes
logo.classList.add('c', 'j'); //添加类
logo.classList.remove('c'); //删除类
logo.classList.toggle('c'); //切换类
console.log(logo.classList.contains('c')); //是否含有某个类

// 不要使用这个，将会覆盖所有现有的类
// logo.className = 'jonas';
*/

/*
//事件捕获和冒泡，发生三个阶段，事件捕获，处理事件，事件冒泡
// rgb(255,255,255)
//随机生成一个最大值与最小值之间的整数
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
// 随机生成一个颜色
const randomColor = () => `rgb(
  ${randomInt(0, 255)},
  ${randomInt(0, 255)},
  ${randomInt(0, 255)}
)`;

//事件监听，子监听冒泡阶段的事件（默认行为），实现事件委托
//在事件绑定的时候，第三个传输传入true，就是监听的捕获阶段的事件
// e.target 是事件发生的地方
//e.currentTarge === this,就是绑定事件的地方
const addBackgroundColor = function (e) {
  console.log(e.target, e.currentTarget);
  console.log(this === e.currentTarget);
  e.preventDefault();
  this.style.backgroundColor = randomColor();

  // 停止冒泡
  // e.stopPropagation();
};

//
document
  .querySelector('.nav__link')
  .addEventListener('click', addBackgroundColor);

// document
//   .querySelector('.nav__item')
//   .addEventListener('click', addBackgroundColor);
document
  .querySelector('.nav__links')
  .addEventListener('click', addBackgroundColor);

//监听的捕获阶段的事件
document
  .querySelector('.nav')
  .addEventListener('click', addBackgroundColor, true);
*/

/*
//选择元素
const h1 = document.querySelector('h1');
console.log(h1);
/*
// 向下选择子元素
//选择的是h1的子元素.highlight
console.log(h1.querySelectorAll('.highlight'));
//所有节点的类型（9个）
console.log(h1.childNodes);
//所有的元素（3个）
console.log(h1.children);

//h1的第一个子元素
console.log(h1.firstElementChild);

//h1的最后一个子元素
console.log(h1.lastElementChild);
*/

/*
//向上选择父元素
console.log(h1.parentNode);
console.log(h1.parentElement);
console.log(h1.closest('.header'));
h1.closest('.header').style.background = 'var(--gradient-secondary)';
*/

/*
//选择兄弟姐妹
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

//元素类型
console.log(h1.previousSibling);
console.log(h1.nextSibling);
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(el => {
  //el是元素
  if (el !== h1) el.style.color = 'scale(0.5)';
});
*/

//DOM lifecycle
// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML parse and DOM tree buil!', e);
// });
// window.addEventListener('load', function (e) {
//   console.log('Page fully loaded', e);
// });
// window.addEventListener('beforeunload', function (e) {
//   e.returnValue = true;
// });
