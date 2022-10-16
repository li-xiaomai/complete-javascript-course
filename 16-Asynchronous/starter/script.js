'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
  <h3 class="country__name">${data.name.common}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(
    1
  )}</p>
    <p class="country__row"><span>🗣️</span>${
      Object.values(data.languages)[0]
    }</p>
    <p class="country__row"><span>💰</span>${
      Object.values(data.currencies)[0].name
    }</p>
    </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeEnd', html);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

/*
// 同时发送几个请求，无法控制请求的返回顺序
const getCountryData = function (country) {
  // ajax
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  // console.log(request.responseText); //null 因为request.send()是异步的，所以结果没有立马出来，需要在成功的回调函数中得到数据
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    // Object.values(data.currencies) 将对象转为数组
    const html = `
    <article class="country">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
      </div>
      </article>`;
    countriesContainer.insertAdjacentHTML('beforeEnd', html);
    countriesContainer.style.opacity = 1;
  });
};
// 这种情况，哪个请求先返回，就执行数据，所以页面上显示数据没有顺序
getCountryData('china');
getCountryData('usa');
getCountryData('united king');
*/

/*
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
  <h3 class="country__name">${data.name.common}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(
    1
  )}</p>
    <p class="country__row"><span>🗣️</span>${
      Object.values(data.languages)[0]
    }</p>
    <p class="country__row"><span>💰</span>${
      Object.values(data.currencies)[0].name
    }</p>
    </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeEnd', html);
  countriesContainer.style.opacity = 1;
};

// 请求顺序返回  出现回调地狱
const getCountryAndNeighbour = function (country) {
  // ajax
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  // console.log(request.responseText); //null 因为request.send()是异步的，所以结果没有立马出来，需要在成功的回调函数中得到数据
  request.addEventListener('load', function () {
    const [, data] = JSON.parse(this.responseText);
    // Object.values(data.currencies) 将对象转为数组

    // render country 1
    renderCountry(data);

    const [, neighbour] = data.borders;

    if (!neighbour) return;
    console.log(neighbour);
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();
    request2,
      request2.addEventListener('load', function () {
        const [data2] = JSON.parse(this.responseText);

        // render country 2
        renderCountry(data2, 'neighbour');
      });

    // data.borders.forEach(country => getCountryData(country));
  });
};
getCountryAndNeighbour('china');

// 顺序执行出现回调地狱 callback hell
setTimeout(function () {
  console.log('1 second passed');
  setTimeout(function () {
    console.log('2 second passed');
    setTimeout(function () {
      console.log('3 second passed');
      setTimeout(function () {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

// 过去的做法
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

//promise的状态只能改变一次
// const request = fetch`https://restcountries.com/v3.1/name/china`; //消费了一个promise   返回了一个promise对象
// console.log(request);

// const renderCountry = function (data, className = '') {
//   const html = `
//   <article class="country ${className}">
//   <img class="country__img" src="${data.flags.svg}" />
//   <div class="country__data">
//   <h3 class="country__name">${data.name.common}</h3>
//   <h4 class="country__region">${data.region}</h4>
//   <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(
//     1
//   )}</p>
//     <p class="country__row"><span>🗣️</span>${
//       Object.values(data.languages)[0]
//     }</p>
//     <p class="country__row"><span>💰</span>${
//       Object.values(data.currencies)[0].name
//     }</p>
//     </div>
//     </article>`;
//   countriesContainer.insertAdjacentHTML('beforeEnd', html);
//   countriesContainer.style.opacity = 1;
// };

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       // response.json()//返回的也是一个promise
//       return response.json();//response.json()也是一个异步函数
//     })
//     .then(function (data) {
//       renderCountry(data[1]);
//     });
// };
// getCountryData('china');

/*
//当返回404,fetch函数会当作成功处理，不会当作错误处理
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      console.log(response);
      if (!response.ok) throw new Error(`Country not found ${response.status}`); // throw 会立即终止这个功能，相当于return
      return response.json();
    })
    .then(data => {
      renderCountry(data[1]);
      const [, neighbour] = data[1].borders;
      if (!neighbour) return;
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`); // throw 会立即终止这个功能，相当于return
      return response.json();
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.log(`${err.message}　 ☠ ☠ ☠ ☠ ☠  `);
      renderError(
        `Something went wrong 💥💥💥💥💥💥 ${err.message}, try again`
      );
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('china12');
});
*/

/*
const getJSON = function (url, errorMsg = 'Something went wrong 💥💥💥💥💥💥') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`); // throw 会立即终止这个功能，相当于return
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders;
      if (!neighbour) throw new Error(`No neighour found`);
      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.log(`${err.message}　 ☠ ☠ ☠ ☠ ☠  `);
      renderError(
        `Something went wrong 💥💥💥💥💥💥 ${err.message}, try again`
      );
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('australia');
});
*/

/*

// 52.508,13.381
//19.037,72.873
//-33.933,18.474

//geocode auth=10563718282691e15957217x5157



const coords = [52.508, 13.381];

const whereAmI = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?json=1&auth=10563718282691e15957217x5157`
  )
    .then(response => {
      if (!response.ok)
        throw new Error(`请求过快，稍后再试 ,${response.status}`);
      return response.json();
    })
    .then(data => {
      const { city, country } = data;

      console.log(`You are in ${city}, ${country}`);
      return data;
    })
    .then(data => {
      const url = `https://restcountries.com/v3.1/name/${data.country}`;
      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error(`${errorMsg} ${response.status}`); // throw 会立即终止这个功能，相当于return
          return response.json();
        })
        .then(data => {
          renderCountry(data[0]);
          const neighbour = data[0].borders[0];
          if (!neighbour) throw new Error(`No neighour found`);
          return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
        })
        .then(response => {
          if (!response.ok) throw new Error(`${errorMsg} ${response.status}`); // throw 会立即终止这个功能，相当于return
          return response.json();
        })
        .then(data => {
          console.log(data);
          renderCountry(data[0], 'neighbour');
        })
        .catch(err => {
          console.log(`${err.message}　 ☠ ☠ ☠ ☠ ☠  `);
          renderError(
            `Something went wrong 💥💥💥💥💥💥 ${err.message}, try again`
          );
        })
        .finally(() => {
          countriesContainer.style.opacity = 1;
        });
    });
};
whereAmI(...coords);
whereAmI(...[19.037, 72.873]);
// whereAmI(...[-33.933, 18.474]);
*/

/*
//事件循环，回调队列，微队列，微队列优先于回调队列
// promise中的回调是微任务

////1
// console.log('Test start'); //1
// setTimeout(() => {
//   console.log('0 sec timer'), 0; //4
// });
// Promise.resolve('Resolved promise 1').then(res => console.log(res)); //3
// console.log('Test end'); //2

////2
//因为第二个微任务要执行的很久的时间，所以定时器，不会在0秒之后执行。这里只能保证不会在0秒之前执行
console.log('Test start'); //1
setTimeout(() => {
  console.log('0 sec timer'), 0; //5
});
Promise.resolve('Resolved promise 1').then(res => console.log(res)); //3
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res); //4
}); //3
console.log('Test end'); //2
*/

//Promise
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lotter draw happening ');
//   setTimeout(() => {
//     const random = Math.random();
//     if (random >= 0.5) {
//       resolve('You Win 💰');
//     }
//     if (random < 0.5) {
//       reject(new Error('You lost your money 💩'));
//     }
//   }, 2000);
// });
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
// wait()
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 second passed');
//     return wait(2);
//   })
//   .then(() => {
//     console.log('3 second passed');
//     return wait(3);
//   })
//   .then(() => {
//     console.log('4 second passed');
//     return wait(4);
//   });

// setTimeout(function () {
//   console.log('1 second passed');
//   setTimeout(function () {
//     console.log('2 second passed');
//     setTimeout(function () {
//       console.log('3 second passed');
//       setTimeout(function () {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('abc')).catch(err => console.error(err));

/*
// 基于回调的API
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

// 将基于回调函数的API转为基于promise
const getPosition = function () {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);//跟上面注释的是一个意思
  });
};

// getPosition()
//   .then(pos => whereAmI(pos.coords.latitude, pos.coords.longitude))
//   .catch(err => console.log(err));


const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `https://geocode.xyz/${lat},${lng}?json=1&auth=10563718282691e15957217x5157`
      );
    })

    .then(response => {
      if (!response.ok)
        throw new Error(`请求过快，稍后再试 ,${response.status}`);
      return response.json();
    })
    .then(data => {
      const { city, country } = data;

      console.log(`You are in ${city}, ${country}`);
      return data;
    })
    .then(data => {
      const url = `https://restcountries.com/v3.1/name/${data.country}`;
      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error(`${errorMsg} ${response.status}`); // throw 会立即终止这个功能，相当于return
          return response.json();
        })
        .then(data => {
          renderCountry(data[0]);
          const neighbour = data[0].borders[0];
          if (!neighbour) throw new Error(`No neighour found`);
          return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
        })
        .then(response => {
          if (!response.ok) throw new Error(`${errorMsg} ${response.status}`); // throw 会立即终止这个功能，相当于return
          return response.json();
        })
        .then(data => {
          console.log(data);
          renderCountry(data[0], 'neighbour');
        })
        .catch(err => {
          console.log(`${err.message}　 ☠ ☠ ☠ ☠ ☠  `);
          renderError(
            `Something went wrong 💥💥💥💥💥💥 ${err.message}, try again`
          );
        })
        .finally(() => {
          countriesContainer.style.opacity = 1;
        });
    });
};

btn.addEventListener('click', whereAmI);
*/

/*
const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const imgEl = document.createElement('img');
    imgEl.src = imgPath;
    imgEl.addEventListener('load', function () {
      imgContainer.appendChild(imgEl);
      resolve(imgEl);
    });
    imgEl.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
let currentImg;
createImage('./img/img-1.jpg')
  .then(imgEl => {
    currentImg = imgEl;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('./img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.log(err));
*/

// const getPosition = function () {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject); //跟上面注释的是一个意思
//   });
// };

//fetch 出现403，404不会拒绝。需要手动抛出异常
//async await其实是then的语法糖
//同步等待
// const whereAmI = async function () {
//   try {
//     const {
//       coords: { latitude: lat, longitude: lng },
//     } = await getPosition();

//     const countryRes = await fetch(
//       `https://geocode.xyz/${lat},${lng}?json=1&auth=10563718282691e15957217x5157`
//     );

//     if (!countryRes.ok) throw new Error('请求出错');
//     const { country } = await countryRes.json();
//     const res = await fetch(`https://restcountries.com/v3.1/name/${country}`); //会同步等待
//     if (!res.ok) throw new Error('请求过多，稍后再试');
//     const data = await res.json(); // res.json() 是一个prmose
//     console.log(data);
//     renderCountry(data[0]);
//     countriesContainer.style.opacity = 1;
//   } catch (err) {
//     console.log(err.message);
//     renderError(`💥 ${err.message}`);
//     countriesContainer.style.opacity = 1;
//   }
// };
// console.log('1:Will get location');
// whereAmI();

// console.log('2:Finished getting location');

// whereAmI()
//   .then(city => console.log(2, city))
//   .catch(err => console.log(2, err))
//   .finally(() => {
//     console.log('3:Finished getting location');
//   });
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(2, city);
//   } catch (err) {
//     console.log(err);
//   }
//   console.log('3:Finished getting location');
// })();

//捕获异常，不会阻塞代码
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   console.log(err.message);
// }
// console.log(1111);

// Promise.all()

Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('failed'),
  Promise.resolve('another success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

Promise.all([
  Promise.resolve('success'),
  Promise.reject('failed'),
  Promise.resolve('another success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

Promise.any([
  Promise.resolve('success'),
  Promise.reject('failed'),
  Promise.resolve('another success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));
