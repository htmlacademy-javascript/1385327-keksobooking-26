import { pageDisabled } from './page-switcher.js';
import { createPopup } from './create-object.js';

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

const map = L.map('map-canvas');

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

const getPoint = () => {
  const point = mainPinMarker.getLatLng();
  document.querySelector('.ad-form').querySelector('#address').value = `${point.lat.toFixed(BasicMapSetup.digits)}, ${point.lng.toFixed(BasicMapSetup.digits)}`;
};

const setMainPin = () => {
  mainPinMarker.addTo(map).on('move', () => {
    getPoint();
  });
};
// const setMainPin = () => {
//   mainPinMarker.addTo(map).on('move', (evt) => {
//     document.querySelector('.ad-form').querySelector('#address').value = `${evt.target.getLatLng().lat.toFixed(BasicMapSetup.digits)} ${evt.target.getLatLng().lng.toFixed(BasicMapSetup.digits)}`;
//   });
// };

const resetMainPin =() => {
  mainPinMarker.setLatLng({
    lat: BasicMapSetup.lat,
    lng: BasicMapSetup.lng,
  });
  getPoint();//document.querySelector('.ad-form').querySelector('#address').value = `${BasicMapSetup.lat} ${BasicMapSetup.lng}`;
};

const markerGroup = L.layerGroup();

const createNearbyMarker = ({author, offer, location}) => {

  const nearbyMarker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: pinIcon,
    },
  );
  nearbyMarker.addTo(markerGroup).bindPopup(createPopup({author, offer}));
};

const loadMap = () => {
  map.on('load', () => {
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

const removeMarkerGroup = () => {
  markerGroup.clearLayers();
};

const resetMap = () => {
  map.setView({
    lat: BasicMapSetup.lat,
    lng: BasicMapSetup.lng,
  }, BasicMapSetup.scale);

  resetMainPin();
  map.closePopup();
};

export { loadMap, createNearbyMarker, resetMap, removeMarkerGroup };
