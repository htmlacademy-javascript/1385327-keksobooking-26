import {pageDisabled} from './form.js';
import {getCreateObjects} from './create-object.js';

const BasicMapSetup = { // императорский Дворец так как попадает в диапазон в отличии от центра
  lat: 35.68563,
  lng: 139.75276,
  scale: 12,
  digits: 5
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


//--------------------------------------------------------------------------------------------------------

const setMainPin = (map) => {
  const mainPinMarker = L.marker(
    {
      lat: BasicMapSetup.lat,
      lng: BasicMapSetup.lng,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  mainPinMarker.addTo(map).on('move', (evt) => {
    document.querySelector('.ad-form').querySelector('#address').value = `${evt.target.getLatLng().lat.toFixed(BasicMapSetup.digits)} ${evt.target.getLatLng().lng.toFixed(BasicMapSetup.digits)}`;
  });
};

//------------------------------------------------------------------------------------------------
const markerGroup = L.layerGroup();

const createNearbyMarker = ({author, offer, location}) => {

  const createCustomPopup = () => {
    const element = getCreateObjects({author, offer});
    return element;
  };

  const nearbyMarker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: pinIcon,
    },
  );

  nearbyMarker.addTo(markerGroup).bindPopup(createCustomPopup({author, offer}));
};

const loadMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      pageDisabled(false); //console.log('Карта инициализирована');
    })
    .setView({
      lat: BasicMapSetup.lat,
      lng: BasicMapSetup.lng,
    }, BasicMapSetup.scale);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  setMainPin(map);
  markerGroup.addTo(map);
};


export {loadMap, createNearbyMarker};
