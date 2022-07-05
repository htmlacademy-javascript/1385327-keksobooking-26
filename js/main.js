import { pageDisabled } from './page-switcher.js';
import { loadMap, createNearbyMarker} from './map.js';
import { setFormSubmit } from './form-validation.js';
import { getData } from './api.js';
import { showError, debounce } from './util.js';
import { filtersDisabled } from './form.js';
import { checkField, compareObject } from './map-filters.js';

const NEARBY_OBJECT = 10;
const RERENDER_DELAY = 500;

pageDisabled(true);

loadMap();

const getNearbyObject = (nearbyObject) => {
  nearbyObject.slice().filter(compareObject).slice(0, NEARBY_OBJECT).forEach(({author, offer, location}) => {
    createNearbyMarker({author, offer, location});
  });
};

getData(
  (data) => {
    getNearbyObject(data);
    checkField( debounce(() => getNearbyObject(data), RERENDER_DELAY,));
  },
  () => {
    filtersDisabled(true);
    showError('Cервер временно недоступен, попробуйте перезагрузить страницу или обратиться позже');
  });

setFormSubmit();
