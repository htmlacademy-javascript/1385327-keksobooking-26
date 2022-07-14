import { createElement, setEndingWord } from './util.js';

const template = document.querySelector('#card').content.querySelector('.popup');

const createPopup = ({author, offer}) => {
  const element = template.cloneNode(true);

  const typeElement = element.querySelector('.popup__type');
  const featuresElement = element.querySelector('.popup__features');
  const photosContainerElement = element.querySelector('.popup__photos');
  const photoTemplate = photosContainerElement.querySelector('.popup__photo');
  const avatarElement = element.querySelector('.popup__avatar');

  createElement(element, '.popup__title', offer.title);

  createElement(element, '.popup__text--address', offer.address);

  createElement(element, '.popup__text--price', `${offer.price} ₽/ночь`);

  if (offer.rooms && offer.guests) {
    createElement(element, '.popup__text--capacity', `${offer.rooms} ${setEndingWord(offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${setEndingWord(offer.guests, ['гостя', 'гостей', 'гостей'])}`);
  } else if (offer.rooms === 100 && offer.guests === 0) {
    createElement(element, '.popup__text--capacity', `${offer.rooms} ${setEndingWord(offer.rooms, ['комната', 'комнаты', 'комнат'])} не для ${setEndingWord(offer.guests, ['гостя', 'гостей', 'гостей'])}`);
  } else if (!offer.rooms && offer.guests) {
    createElement(element, '.popup__text--capacity', `Для ${offer.guests} ${setEndingWord(offer.guests, ['гостя', 'гостей', 'гостей'])}`);
  } else if (offer.rooms && !offer.guests) {
    createElement(element, '.popup__text--capacity', `${offer.rooms} ${setEndingWord(offer.rooms, ['комната', 'комнаты', 'комнат'])}`);
  } else {
    element.querySelector('.popup__text--capacity').remove();
  }

  if (offer.checkin && offer.checkout) {
    createElement(element, '.popup__text--time', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  } else if (!offer.checkin && offer.checkout) {
    createElement(element, '.popup__text--time', `Выезд до ${offer.checkout}`);
  } else if (offer.checkin && !offer.checkout) {
    createElement(element, '.popup__text--time', `Заезд после ${offer.checkin}`);
  } else {
    element.querySelector('.popup__text--time').remove();
  }

  createElement(element, '.popup__description', offer.description);

  switch(offer.type) {
    case 'palace': typeElement.textContent='Дворец'; break;
    case 'float': typeElement.textContent='Квартира'; break;
    case 'house': typeElement.textContent='Дом'; break;
    case 'bungalow': typeElement.textContent='Бунгало'; break;
    case 'hotel': typeElement.textContent='Отель'; break;
    default : element.querySelector('.popup__type').remove();
  }

  if (offer.features) {
    const featuresList = featuresElement.querySelectorAll('.popup__feature');

    featuresList.forEach((featuresListItem) => {
      const isNecessary = offer.features.some(
        (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
      );
      if (!isNecessary) {
        featuresListItem.remove();
      }
    });
  } else {
    element.querySelector('.popup__features').remove();
  }

  if (offer.photos) {
    photosContainerElement.innerHTML = '';
    offer.photos.forEach((photo) => {
      const item = photoTemplate.cloneNode(true);
      item.src = photo;
      photosContainerElement.append(item);
    });
  } else {
    element.querySelector('.popup__photos').remove();
  }

  if (author.avatar) {
    avatarElement.src = `${author.avatar}`;
  } else {
    element.querySelector('.popup__avatar').remove();
  }

  return element;

};

export { createPopup };
