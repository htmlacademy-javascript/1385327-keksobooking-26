import {getNearbyObject} from './data.js';
import {setElement, hiddenElement, endingWord} from './util.js';

const mapCanvas = document.querySelector('#map-canvas');

const template = document.querySelector('#card').content.querySelector('.popup');

const nearbyObject = getNearbyObject();

const listFragment = document.createDocumentFragment();

nearbyObject.forEach(({offer, author}) => {
  const element = template.cloneNode(true);

  const createElement = (selector, content) => {
    if (content) {
      setElement(element, selector, content);
    } else {
      hiddenElement(element.querySelector(selector));
    }
  };

  createElement('.popup__title', offer.title);

  createElement('.popup__text--address', offer.address);

  createElement('.popup__text--price', `${offer.price} ₽/ночь`);

  const offerType = element.querySelector('.popup__type');
  offerType.textContent = '';
  switch(offer.type) {
    case 'palace': offerType.textContent='Дворец'; break;
    case 'float': offerType.textContent='Квартира'; break;
    case 'house': offerType.textContent='Дом'; break;
    case 'bungalow': offerType.textContent='Бунгало'; break;
    case 'hotel': offerType.textContent='Отель';
  }

  createElement('.popup__text--capacity', `${offer.rooms} ${endingWord(offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${endingWord(offer.guests, ['гостя', 'гостей', 'гостей'])} `);

  createElement('.popup__text--time', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);

  const features = element.querySelector('.popup__features');
  const featuresList = features.querySelectorAll('.popup__feature');

  featuresList.forEach((featuresListItem) => {
    const isNecessary = offer.features.some(
      (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
    );
    if (!isNecessary) {
      featuresListItem.remove();
    }
  });

  createElement('.popup__description', offer.description);

  const photosContainer = element.querySelector('.popup__photos');
  photosContainer.innerHTML = '';

  if (offer.photos.length > 0) {
    for (let i = 0; i < offer.photos.length; i++) {
      const photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.src = `${offer.photos[i]}`;
      photo.width = '45';
      photo.height = '40';
      photo.alt = 'Фотография жилья';
      photosContainer.appendChild(photo);
    }
  } else {
    hiddenElement(element.querySelector('.popup__photos'));
  }

  const authorAvatar = element.querySelector('.popup__avatar');
  authorAvatar.src = `${author.avatar}`;

  mapCanvas.append(element);
});

mapCanvas.append(listFragment);
