import { pageDisabled, mapFiltersDisabled,  } from './page-switcher.js';
import { createPopup } from './create-object.js';
import { showError, debounce } from './util.js';
import { getData } from './api.js';
import { compareObject } from './map-filters.js';

const NEARBY_OBJECT = 10;

const RERENDER_DELAY = 500;

const copyData =[];

const mapFiltersElement = document.querySelector('.map__filters');

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

const nearbyPinIcon = L.icon({
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

const setAddress = () => {
  const point = mainPinMarker.getLatLng();
  document.querySelector('.ad-form').querySelector('#address').value = `${point.lat.toFixed(BasicMapSetup.digits)} ${point.lng.toFixed(BasicMapSetup.digits)}`;
};

const setMainPin = () => {
  mainPinMarker.addTo(map).on('move', () => {
    setAddress();
  });
};

const markerGroup = L.layerGroup();

const createNearbyMarker = ({author, offer, location}) => {

  const nearbyPinMarker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: nearbyPinIcon,
    },
  );
  nearbyPinMarker.addTo(markerGroup).bindPopup(createPopup({author, offer}));
};

const resetMainPin =() => {
  mainPinMarker.setLatLng({
    lat: BasicMapSetup.lat,
    lng: BasicMapSetup.lng,
  });
  setAddress();
};

const resetMarkerGroup = () => {
  markerGroup.clearLayers();
  markerGroup.closePopup();
};

const createObject = (data) => {
  data.forEach(({author, offer, location}) => {
    createNearbyMarker({author, offer, location});
  });
};

const getNearbyObject = (data) => {
  mapFiltersDisabled(false);
  createObject(data.slice(0, NEARBY_OBJECT));

  mapFiltersElement.addEventListener('change', debounce(() => {
    resetMarkerGroup();
    createObject(data.filter(compareObject).slice(0, NEARBY_OBJECT));
  }, RERENDER_DELAY));
};

const resetMap = () => {
  map.setView({
    lat: BasicMapSetup.lat,
    lng: BasicMapSetup.lng,
  }, BasicMapSetup.scale);

  resetMainPin();
  resetMarkerGroup();
  createObject(copyData.slice(0, NEARBY_OBJECT));
};

const loadMap = () => {
  map.on('load', () => {
    pageDisabled(false);
    getData(
      (data) => {
        copyData.push(...data);
        getNearbyObject(copyData);
      },
      () => {
        mapFiltersDisabled(true);
        showError('Cервер временно недоступен, попробуйте перезагрузить страницу или обратиться позже');
      }
    );
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

export { loadMap,  resetMap };
