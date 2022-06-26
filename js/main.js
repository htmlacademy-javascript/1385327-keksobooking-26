import {pageDisabled} from './form.js';
import {loadMap, createNearbyMarker} from './map.js';
import './form-validation.js';
import {getData} from './api.js';

pageDisabled(true);

loadMap();
const getNearbyObject = (nearbyObject) =>{
  nearbyObject.forEach(({author, offer, location}) => createNearbyMarker({author, offer, location}));
};

getData(getNearbyObject);
//getData((data) => {getNearbyObject(data.slice(0, 10));});
