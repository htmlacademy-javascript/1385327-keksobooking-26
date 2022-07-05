import { pageDisabled } from './page-switcher.js';
import { loadMap, createNearbyMarker} from './map.js';
import { setFormSubmit } from './form-validation.js';
import { getData } from './api.js';
import { showError, debounce } from './util.js';
import { filtersDisabled, setFormReset } from './form.js';
import { changeFilterField, compareObject } from './map-filters.js';

const NEARBY_OBJECT = 10;
const RERENDER_DELAY = 500;

pageDisabled(true);

loadMap();

const getNearbyObject = (data) => {
  data.slice().filter(compareObject).slice(0, NEARBY_OBJECT).forEach(({author, offer, location}) => {
    createNearbyMarker({author, offer, location});
  });
};

getData(
  (data) => {
    getNearbyObject(data);
    changeFilterField( debounce(() => getNearbyObject(data), RERENDER_DELAY,));
  },
  () => {
    filtersDisabled(true);
    showError('Cервер временно недоступен, попробуйте перезагрузить страницу или обратиться позже');
  }
);

setFormSubmit();
setFormReset();
