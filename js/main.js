// 'use strict';
/*
function getNumber(num1, num2) {
  if (Math.abs(+num1) > Math.abs(+num2)) {
    [num1, num2] = [num2, num1];
  }
  return Math.floor((Math.random()*(Math.abs(+num2)-Math.abs(+num1)+1))+Math.abs(+num1));
}
getNumber();

function getRandomNumber(fromNumber, toNumber, floatNumber,) {
  if (Math.abs(+fromNumber) > Math.abs(+toNumber)) {
    [fromNumber, toNumber] = [toNumber, fromNumber];
  }
  return +((Math.random()*(Math.abs(+toNumber)-Math.abs(+fromNumber)))+Math.abs(+fromNumber)).toFixed(Math.abs(+floatNumber));
}
getRandomNumber();
*/

const NEARBY_COUNT = 10;

const AUTHOR_AVATAR = {
  from: 1,
  to: 10,
  prefix: '0'
};
const OBJECT_TITLE = [
  'заголовок 1',
  'заголовок 2',
  'заголовок 3',
  'заголовок 4'
];
const OBJECT_PRICE = {
  from: 0,
  to: 100500,
};
const OBJECT_TYPE = [
  'palace',
  'float',
  'house',
  'bungalow',
  'hotel'
];
const OBJECT_ROOMS = {
  from: 0,
  to: 105,
};
const OBJECT_GUESTS = {
  from: 0,
  to: 105,
};
const OBJECT_CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];
const OBJECT_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];
const OBJECT_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const OBJECT_DESCRIPTION = [
  'описание 1',
  'описание 2',
  'описание 3',
  'описание 4',
  'описание 5'
];
const OBJECT_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const OBJECT_COORDINATES = {
  lat: {
    from: 35.65000,
    to: 35.70000,
    digits: 5
  },
  lng: {
    from: 139.7000,
    to: 139.8000,
    digits: 5
  }
};

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomArrayElement = (elements) => {
  const element = elements[getRandomPositiveInteger(0, elements.length - 1)];
  return element;
};

const getNewArray = (elements) => {
  const newArray = [];
  const newArrayLength = getRandomPositiveInteger(1, elements.length);
  while(newArray.length < newArrayLength) {
    const index = getRandomPositiveInteger(0, elements.length-1);
    const element = elements[index];
    if (!newArray.includes(element)) {
      newArray.push(element);
    }
  }
  return newArray;
};
/*
const fillArrayAvatar = (a, b, c) => {
  const arrayNew = [];
  for (let i = a; i <= b; ++i) {
    arrayNew.push(`img/avatars/user${i < 10 ? c +i: i}.png`);
  }
  return arrayNew;
};

const arrayAvatar = fillArrayAvatar(AUTHOR_AVATAR.from, AUTHOR_AVATAR.to, AUTHOR_AVATAR.prefix);
let avatarPull = [];

const getAvatar = () => {
  if (!avatarPull.length) {
    avatarPull = arrayAvatar;
  }
  const src = getRandomArrayElement(avatarPull);
  const index = avatarPull.indexOf(src);
  avatarPull.splice(index, 1);
  return src;
};
*/
const fillArrayAvatar = (a, b, c) => {
  const arrayNew = [];
  for (let i = a; i <= b; ++i) {
    arrayNew.push(`img/avatars/user${i < 10 ? c +i: i}.png`);
  }
  return arrayNew;
};

let avatarPull = [];

const getAvatar = (a, b, c) => {
  if (!avatarPull.length) {
    avatarPull = fillArrayAvatar(a, b, c);
  }
  const src = getRandomArrayElement(avatarPull);
  const index = avatarPull.indexOf(src);
  avatarPull.splice(index, 1);
  return src;
};

const createObject = () => {
  const newObject = {
    author: {
      avatar: getAvatar(AUTHOR_AVATAR.from, AUTHOR_AVATAR.to, AUTHOR_AVATAR.prefix),
    },
    offer: {
      title:getRandomArrayElement(OBJECT_TITLE),
      address: '',
      price: getRandomPositiveInteger(OBJECT_PRICE.from, OBJECT_PRICE.to),
      type: getRandomArrayElement(OBJECT_TYPE),
      rooms: getRandomPositiveInteger(OBJECT_ROOMS.from, OBJECT_ROOMS.to),
      guests: getRandomPositiveInteger(OBJECT_GUESTS.from, OBJECT_GUESTS.to),
      checkin: getRandomArrayElement(OBJECT_CHECKIN),
      checkout: getRandomArrayElement(OBJECT_CHECKOUT),
      features: getNewArray(OBJECT_FEATURES),
      description: getRandomArrayElement(OBJECT_DESCRIPTION),
      photos: getNewArray(OBJECT_PHOTOS),
    },
    location: {
      lat: getRandomPositiveFloat(OBJECT_COORDINATES.lat.from, OBJECT_COORDINATES.lat.to, OBJECT_COORDINATES.lat.digits),
      lng: getRandomPositiveFloat(OBJECT_COORDINATES.lng.from, OBJECT_COORDINATES.lng.to, OBJECT_COORDINATES.lng.digits),
    }
  };
  newObject.offer.address = `${newObject.location.lat}, ${newObject.location.lng}`;
  return newObject;
};

const nearbyObject = Array.from({length: NEARBY_COUNT}, createObject);
//console.log(nearbyObject);
Object.entries(nearbyObject);
