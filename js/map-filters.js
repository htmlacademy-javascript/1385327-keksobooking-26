import { resetMarkerGroup } from './map.js';

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
const mapFiltersElement = document.querySelector('.map__filters');

const checkField = (cb) => {

  mapFiltersElement.addEventListener('change', () => { //evt
    resetMarkerGroup();
    cb();
  });
};

const compareObject = (object) => {

  const type = mapFiltersElement.querySelector('#housing-type').value;
  const price = mapFiltersElement.querySelector('#housing-price').value;
  const rooms = mapFiltersElement.querySelector('#housing-rooms').value;
  const guests = mapFiltersElement.querySelector('#housing-guests').value;
  const checkFeatures = mapFiltersElement.querySelector('#housing-features').querySelectorAll('input:checked');

  const verifyTypeHousing = () => object.offer.type === type || type === DEFAULT_VALUE;

  const verifyPriceHousing = () => object.offer.price >= PriceRanges[price.toUpperCase()].minPrice && object.offer.price <= PriceRanges[price.toUpperCase()].maxPrice;

  const verifyRoomsHousing = () => String(object.offer.rooms) === rooms || rooms === DEFAULT_VALUE;

  const verifyGuestsHousing = () => String(object.offer.guests) === guests || guests === DEFAULT_VALUE;

  const verifyFeaturesHousing = () => {

    if (checkFeatures.length) {
      if (object.offer.features) {
        return Array.from(checkFeatures).every((checkbox) => object.offer.features.includes(checkbox.value));
      }
    } else {
      return checkFeatures.length === 0;
    }
  };
  return  verifyTypeHousing(object, type) && verifyPriceHousing(object, price) && verifyRoomsHousing(object, rooms) && verifyGuestsHousing(object, guests) && verifyFeaturesHousing(object, checkFeatures);
};

export { compareObject, checkField };
