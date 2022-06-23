//import {pageDisabled} from './form.js';
import {createObject} from './data.js';
import {createNearbyMarker} from './map.js';
import './form-validation.js';

//pageDisabled(true);

const getNearbyObject = (count) => Array.from({length: count}, createObject);
const nearbyObject = getNearbyObject(10);

nearbyObject.forEach(({author, offer, location}) => createNearbyMarker({author, offer, location}));
