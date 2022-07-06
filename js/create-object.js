import {setElement, hideElement, setEndingWord} from './util.js';

const template = document.querySelector('#card').content.querySelector('.popup');

const createPopup = ({author, offer}) => {
  const element = template.cloneNode(true);

  const createElement = (selector, content) => {
    if (content) {
      setElement(element, selector, content);
    } else {
      hideElement(element.querySelector(selector));
    }
  };

  createElement('.popup__title', offer.title);

  createElement('.popup__text--address', offer.address);

  createElement('.popup__text--price', `${offer.price} ₽/ночь`);
  if (!offer.price) {
    hideElement(element.querySelector('.popup__text--price'));
  }

  const offerType = element.querySelector('.popup__type');
  offerType.textContent = '';
  switch(offer.type) {
    case 'palace': offerType.textContent='Дворец'; break;
    case 'float': offerType.textContent='Квартира'; break;
    case 'house': offerType.textContent='Дом'; break;
    case 'bungalow': offerType.textContent='Бунгало'; break;
    case 'hotel': offerType.textContent='Отель'; break;
    case undefined : hideElement(element.querySelector('.popup__type'));
  }

  createElement('.popup__text--capacity', `${offer.rooms} ${setEndingWord(offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${setEndingWord(offer.guests, ['гостя', 'гостей', 'гостей'])} `);
  if (!offer.rooms || !offer.guests) {
    hideElement(element.querySelector('.popup__text--capacity'));
  }

  createElement('.popup__text--time', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  if (!offer.checkin || !offer.checkout) {
    hideElement(element.querySelector('.popup__text--time'));
  }

  const features = element.querySelector('.popup__features');
  if (offer.features) {
    const featuresList = features.querySelectorAll('.popup__feature');

    featuresList.forEach((featuresListItem) => {
      const isNecessary = offer.features.some(
        (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
      );
      if (!isNecessary) {
        featuresListItem.remove();
      }
    });
  } else {
    hideElement(element.querySelector('.popup__features'));
  }

  createElement('.popup__description', offer.description);

  const photosContainer = element.querySelector('.popup__photos');
  const photoT = photosContainer.querySelector('.popup__photo');
  if (offer.photos) {
    photosContainer.innerHTML = '';
    offer.photos.forEach((photo) => {
      const item = photoT.cloneNode(true);
      item.src = photo;
      photosContainer.append(item);
    });
  } else {
    hideElement(element.querySelector('.popup__photos'));
  }

  const authorAvatar = element.querySelector('.popup__avatar');
  if (author.avatar) {
    authorAvatar.src = `${author.avatar}`;
  } else {
    hideElement(element.querySelector('.popup__avatar'));
  }

  return element;

};

export{createPopup};
