import {pageDisabled} from './page-switcher.js';
import {loadMap, createNearbyMarker} from './map.js';
import {setFormSubmit} from'./form-validation.js';
import {getData} from './api.js';
import {resetForm} from './form.js';

pageDisabled(true);

loadMap();
const getNearbyObject = (nearbyObject) =>{
  nearbyObject.forEach(({author, offer, location}) => createNearbyMarker({author, offer, location}));
};

// getData(getNearbyObject);
getData((data) => {getNearbyObject(data.slice(0, 10));});

setFormSubmit(resetForm);
