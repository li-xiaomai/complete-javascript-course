'use strict';
// import leaflet from './node_modules';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;
  constructor(distance, duration, coords) {
    this.distance = distance; //in km
    this.duration = duration; //in min
    this.coodrs = coords; //[lat,lng]
  }

  setDescription(des) {
    //告诉prettier不要格式化这段代码
    // prettier-ignore
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(distance, duration, cadence, coords) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this.calcPace();
    this.setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(distance, duration, elevationgain, coords) {
    super(distance, duration, coords);
    this.elevationgain = elevationgain;
    this.calcSpeed();
    this.setDescription();
  }

  calcSpeed() {
    this.speed = this.duration / this.distance / 60;
    return this.speed;
  }
}

// //////////////////////////////////////////////
class App {
  #map;
  #mapEvent;
  #workouts = [];
  #mapZoomLevel = 13;
  constructor() {
    this.#getPosition();
    this.#getLocalStorage();
    form.addEventListener('submit', this.#newWorkout.bind(this)); //本身的this=form
    inputType.addEventListener('change', this.#toggleElevationField.bind(this)); ////本身的this=inputType
    containerWorkouts.addEventListener('click', this.#moveToPopup.bind(this));
  }

  #getPosition() {
    navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(
        this.#loadMap.bind(this), // //this.#loadMap是作为回调函数，相当于是普通调用的，里面的this是undefined,需要绑定this
        function () {
          alert('Counld not get your position');
        }
      );
  }
  #loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coodrs = [30.62781234085356, 104.06390141793021]; //[latitude,longitude]//因为用了代理，所以显示的位置不对，这里就用现在位置的固定坐标
    this.#map = L.map('map').setView(coodrs, this.#mapZoomLevel); //第二个参数是地图的缩放比例

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // L.marker(coodrs).addTo(this.#map).bindPopup('workout').openPopup();

    this.#map.on('click', this.#showForm.bind(this)); //本身的this=this.#map

    this.#workouts.forEach(workout => {
      this.#renderWorkout(workout);
      this.#renderWorkoutMarker(workout);
    });
  }
  #showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  #hiddenForm() {
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
  }
  #toggleElevationField() {
    inputCadence.parentElement.classList.toggle('form__row--hidden');
    inputElevation.parentElement.classList.toggle('form__row--hidden');
  }
  #newWorkout(e) {
    e.preventDefault();

    //get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    let workout = null;
    const {
      latlng: { lat, lng },
    } = this.#mapEvent;
    const validInputs = (...inputs) =>
      inputs.every(input => Number.isFinite(input));

    const allPositive = (...inputs) => inputs.every(input => input > 0);

    //if workout  activity  running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      //check if data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('input have to  positive numbers');

      workout = new Running(distance, duration, cadence, [lat, lng]);
    }

    //if workout  activity  cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('input have to  positive numbers');
      workout = new Cycling(distance, duration, elevation, [lat, lng]);
    }

    //add new object to workout arrar
    this.#workouts.push(workout);

    //store workouts in local storage
    this.#setLocalStorage();
    // Render workout on map as market
    this.#renderWorkoutMarker(workout);
    //render workout on  list
    this.#renderWorkout(workout);

    //hide form + clear fields
    this.#hiddenForm();
  }

  #renderWorkoutMarker(workout) {
    L.marker(workout.coodrs)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  #renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
        </div>
    `;

    if (workout.type === 'running')
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
    </li>
    `;

    if (workout.type === 'cycling')
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed.toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevationgain}</span>
        <span class="workout__unit">m</span>
      </div>
    </li>
    `;
    form.insertAdjacentHTML('afterend', html);
  }

  #setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  #getLocalStorage() {
    // JSON.parse()会丢失对象的原型链，恢复的只是普通对象
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return;
    this.#workouts = data;
  }

  #moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;
    const workout = this.#workouts.find(
      workout => workout.id === workoutEl.dataset.id
    );
    console.log(workout);
    this.#map.setView(workout.coodrs, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    console.log(workout instanceof Workout);
    // workout.click();
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
