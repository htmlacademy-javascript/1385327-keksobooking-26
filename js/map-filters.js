import { createNearbyMarker, removeMarkerGroup } from './map.js';

const DEFAULT_VALUE = 'any';
const PriceRanges = {
  ANY: {
    minPrice : 0,
    maxPrice : 100000,
  },
  MIDDLE: {
    minPrice : 10001,
    maxPrice : 50000,
  },
  LOW: {
    minPrice : 0,
    maxPrice : 10000,
  },
  HIGH: {
    minPrice : 50001,
    maxPrice : 100000,
  },
};
const mapFilters = document.querySelector('.map__filters');

const typeHousingElement = mapFilters.querySelector('#housing-type');
const priceHousingElement = mapFilters.querySelector('#housing-price');
const roomsHousingElement = mapFilters.querySelector('#housing-rooms');
const guestsHousingElement = mapFilters.querySelector('#housing-guests');

// console.log(typeHousingElement.value, priceHousingElement.value, roomsHousingElement.value, guestsHousingElement.value);
// console.log(typeof(roomsHousingElement.value));

const checkType = (cb) => {

  mapFilters.addEventListener('change', () => { //evt
    // console.log(typeHousingElement.value, priceHousingElement.value, roomsHousingElement.value, guestsHousingElement.value);
    // console.log(evt.target);
    removeMarkerGroup();
    cb();
  });
};


const typeHousing = (object, type) => object.offer.type === type || type === DEFAULT_VALUE;

const priceHousing = (object, price) => object.offer.price >= PriceRanges[price.toUpperCase()].minPrice && object.offer.price <= PriceRanges[price.toUpperCase()].maxPrice;

const roomsHousing = (object, rooms) => String(object.offer.rooms) === rooms || rooms === DEFAULT_VALUE;

const guestsHousing = (object, guests) => String(object.offer.guests) === guests || guests === DEFAULT_VALUE;

const compareObject = (object) => {
  const type = typeHousingElement.value;
  const price = priceHousingElement.value;
  const rooms = roomsHousingElement.value;
  const guests = guestsHousingElement.value;

  return  typeHousing(object, type) && priceHousing(object, price) && roomsHousing(object, rooms) && guestsHousing(object, guests);
};

const getNearbyObject = (nearbyObject) =>{
  nearbyObject.slice().filter(compareObject).slice(0, 10).forEach(({author, offer, location}) => {
    createNearbyMarker({author, offer, location});
    // console.log(offer.type, offer.price, offer.rooms, offer.guests);
  });
};

export { getNearbyObject, checkType };
