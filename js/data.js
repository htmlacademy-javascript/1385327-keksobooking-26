import {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  getNewArray,
  getAvatar
} from './util.js';

const AUTHOR_AVATAR = {
  from: 1,
  to: 10,
  prefix: '0',
  srcBase: 'img/avatars/user',
  srcType: '.png'
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


const createObject = () => {
  const newObject = {
    author: {
      avatar: getAvatar(AUTHOR_AVATAR.from, AUTHOR_AVATAR.to, AUTHOR_AVATAR.prefix, AUTHOR_AVATAR.srcBase, AUTHOR_AVATAR.srcType),
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

export {createObject};
