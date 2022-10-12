'use strict';

/*
//了解了构造函数的特点和箭头函数的特点之后，不难解释为什么箭头函数不能作为构造函数。因为箭头函数没有自己的this，在使用构造函数 new 一个对象的时候无法绑定和修改 this；同时箭头函数也没有 prototype 属性，无法将该属性赋给实例对象的 __proto__。

//构造函数创建对象
const Person = function (firstName, birthYear) {
  //实例属性
  this.firstName = firstName;
  this.birthYear = birthYear;

  //实例方法
  // 这个是一个非常糟糕的做法，绝对不要这样做，如果有一个几千个对象，这个方法就要执行几千遍，性能不好
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

// 1.New {} is created 创建一个空对象
// 2.function is called, this = {} 调用该函数，并且this指向该空对象
// 3.{} linked to prototype 创建的空对象链接到原型对象上__proto__ === 构造函数的prototype对象
// 4.function automatically return {} 函数自动返回创建的空对象
const jonas = new Person('jonas', 1991);
// console.log(jonas);

const xiaomai = new Person('xiaomai', 1993);
const xiaozhong = new Person('xiaozhong', 1993);
// console.log(xiaomai, xiaozhong);
// 判断对象时候属于某个类
// console.log(jonas instanceof Person); //true
const xiaoqian = 'xiaoqian';

// console.log(xiaoqian instanceof Person); //false

//原型
// console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// jonas.calcAge();
// xiaomai.calcAge();

// console.log(
//   jonas.__proto__,
//   xiaomai.__proto__,
//   jonas.__proto__ === xiaomai.__proto__,
//   jonas.__proto__ === Person.prototype
// );
//用于判断当前对象是否为另外一个对象的原型，如果是就返回 true，否则就返回 false。
// console.log(Person.prototype.isPrototypeOf(jonas));
Person.prototype.species = 'Homo Sapiens';
// console.log(jonas.species);

//判断属性是否是实例属性
// console.log(jonas.hasOwnProperty('firstName')); //true
// console.log(jonas.hasOwnProperty('species')); //false

console.log(jonas.__proto__); //Person.prototype
console.log(jonas.__proto__.__proto__); //Object.prototype
console.log(jonas.__proto__.__proto__.__proto__); //null

console.log(Person.prototype.constructor); //Person函数本身
console.dir(Person.prototype.constructor); //显示对象的所有属性和方法
const arr = [1, 2, 3, 4, 5, 6, 1];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); //true
console.log(arr.__proto__.__proto__); //Object.prototype

//出于多种原因，不要在数组原型上添加方法：
//1. 有可能在下个版本中，内置的方法会增加同名方法
// Array.prototype.unique = function () {
//   console.log(this);
//   return [...new Set(this)];
// };

// console.log(arr.unique()); //[1, 2, 3, 4, 5, 6]

const h1 = document.querySelector('h1');
console.dir(x => x + 1);

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
bmw.accelerate();
bmw.brake();
mercedes.accelerate();
mercedes.brake();
*/

/*
//class expression
// const PersonExCl = class {};

//class declaration
// 实例方法添加到原型上，所有的实例对象都可以访问
//静态方法
//


class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // 方法是添加在原型上的
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  //当我们需要验证的时候，满足条件才赋值
  set fullName(fullName) {
    if (fullName.includes(' ')) this._fullName = fullName;
    else alert('this is not a fullName');
  }

  get fullName() {
    return this._fullName;
  }

  // 静态方法
  static hey() {
    console.log('hey there static');
    console.log(this);
  }
}

//跟静态方法是一样的
// PersonCl.hey = function () {
//   console.log('Hey there');
//   console.log(this);
// };
const jessica = new PersonCl('jessica xiaomai', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);
console.log(jessica.fullName);
console.log(jessica._fullName);
console.dir(jessica.__proto__ === PersonCl.prototype); //true

//同样有效，原型上添加方法
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

PersonCl.hey();
PersonCl.hey.call(window);

// 1.Classes are not hoisted 类没有被提升，即使是类的声明
// 2.Class are first-class citized类也是一等公民，我们可以将类传给函数，也可以从函数中返回类
// 3.Classes are executed in strict mode 类里将以严格模式执行


*/
/*
// setter getter
const account = {
  owner: 'jonas',
  movements: [200, 300, -400, 600],
  // 当作普通的属性，而不是方法
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
//// 这个对象上，有一个latest，owner，movements， get latest属性
console.log(account);
account.latest = 50;
console.log(account.movements);
*/

/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
//方法用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）。已有对象作为创建对象的原型xiaomai.__proto__=== PersonProto
const xiaomai = Object.create(PersonProto);
xiaomai.name = 'xiaomai';
xiaomai.birthYear = 1991;
xiaomai.calcAge();
console.log(xiaomai.age);
console.log(xiaomai);
console.log(xiaomai.__proto__ === PersonProto); //true

const sarah = Object.create(PersonProto);
sarah.init('sarah', 2000);
sarah.calcAge();
// 添加的方法是实例方法
xiaomai.age = function () {
  console.log(2037 - this.birthYear);
};
console.log(xiaomai);

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speendUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new Car('Ford', 120);

console.log(ford.speendUS);
console.log(ford);
ford.speedUS = 600;
*/

/*
//继承
//构造函数继承
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const xiaomai = new Person('xiaomai', 1991);
const Student = function (firstName, birthYear, course) {
  Person.call(this, ...[firstName, birthYear]);
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  this.course = course;
};
Student.prototype = Object.create(Person.prototype); //相当于Student.prototype.__proto__ =Person.prototype
// Student.prototype = Person.prototype;//将地址给了，在子类的原型上修改了，会同步到父类的原型对象上，不会形成原型链
Student.prototype.constructor = Student; // 因为Student.prototype = Object.create(Person.prototype);,所以原先的原型链断了，Student.prototype，constructore = Student就不相等了，Student.prototype，constructore = Person,所以需要手动设置回来

console.log(Student.prototype);
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} annd I study ${this.course}`);
};
const mike = new Student('Mike', 2000, 'Computer Science');
// mike.introduce();
// console.log(mike.__proto__ === Student.prototype);
// console.log(Student.prototype.__proto__ === Person.prototype);

console.log(mike, xiaomai);
mike.calcAge();
*/

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   get speendUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed}, with a charge 0f ${this.charge}`
  );
};
const tesla = new EV('Tesla', 120, 90);
tesla.chargeBattery(90);
tesla.accelerate();
tesla.brake();
console.log(tesla);
*/

/*
//类继承
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // 方法是添加在原型上的
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  //当我们需要验证的时候，满足条件才赋值
  set _fullName(fullName) {
    if (fullName.includes(' ')) this.fullName = fullName;
    else alert('this is not a fullName');
  }

  get _fullName() {
    return this.fullName;
  }

  // 静态方法
  static hey() {
    console.log('hey there static');
    console.log(this);
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // 必须是第一步，调用super()
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.firstName} annd I study ${this.course}`);
  }
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old,but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha', 2000, 'Computer Science');
console.log(martha);
martha.introduce();
martha.calcAge();
*/

/*
//Object.create()实现继承
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
const xiaomai = Object.create(PersonProto);

const studentProto = Object.create(PersonProto);
studentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

studentProto.introduce = function () {
  console.log(`My name is ${this.firstName} annd I study ${this.course}`);
};
const jay = Object.create(studentProto);
// 实例方法
jay.calcHeight = function () {
  console.log(`I'm 160cm`);
};
jay.init('joy', 2000, 'Computer Science');
jay.introduce();
jay.calcAge();
console.log(jay);
*/

/*
//实现属性和方法的private,第一种方法是约定_属性名,这种只是约定，在class外还是可以调用的，第二种就是用#属性名/方法名,在class外部不可以调用,es2019中提出的
class Account {
  //Public fields(instances)
  locale = navigator.language;

  // private fields(instances)
  #movments = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    console.log(`Thanks for opening an account, ${owner}`);
  }

  getMovements() {
    return this.#movments;
  }
  // Public interface
  //返回this,可以实现链式调用
  deposit(val) {
    this.#movments.push(val);
    return this;
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan()) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
    return this;
  }

  // private methods
  #approveLoan(val) {
    return true;
  }

  static helper() {
    console.log('Helper is stactic function');
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
// acc1.#movments.push(200);//#movements是一个private
// acc1.movments.push(-140);

acc1.deposit(200);
acc1.withdraw(140);
acc1.requestLoan(1000);
// acc1.#approveLoan(1000);//private methods
console.log(acc1.getMovements());
console.log(acc1);
Account.helper();
// console.log(acc1.#pin); //#pin 是private

//因为返回了this,所以可以实现链式调用
acc1
  .deposit(500)
  .deposit(600)
  .withdraw(100)
  .requestLoan(300)
  .withdraw(290)
  .deposit(400);

console.log(acc1);
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed}, with a charge 0f ${this.#charge}`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate().chargeBattery(90).brake().accelerate();
console.log(rivian);
