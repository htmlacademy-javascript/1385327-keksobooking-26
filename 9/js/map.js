import {pageDisabled} from './form.js';
import {elements, nearbyObject} from './create-object.js'; //console.log(nearbyObject); console.log(elements[0]);

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

pageDisabled(true);
//-----------------------------------------------------------------------------------------------------
const map = L.map('map-canvas')
  .on('load', () => {
    pageDisabled(false);
    //console.log('Карта инициализирована');
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
//--------------------------------------------------------------------------------------------------------
const setMainPin = () => {
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
  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', (evt) => {
    document.querySelector('.ad-form').querySelector('#address').value = `${evt.target.getLatLng().lat.toFixed(BasicMapSetup.digits)} ${evt.target.getLatLng().lng.toFixed(BasicMapSetup.digits)}`;
  });
};
setMainPin();
//------------------------------------------------------------------------------------------------
const createCustomPopup = (point) => {
  const bindElement = elements.findIndex((element) => element.textContent.includes(point));
  return elements[bindElement];
};

const markerGroup = L.layerGroup().addTo(map);

nearbyObject.forEach(({location}) => {
  const setNearbyPin = () => {
    const point = `${location.lat}, ${location.lng}`;
    const nearbyMarker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: pinIcon,
      },
    );
    nearbyMarker.addTo(markerGroup);
    nearbyMarker.bindPopup(createCustomPopup(point));
  };
  setNearbyPin(map);
});
