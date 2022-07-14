
const adFormElement = document.querySelector('.ad-form');
const addressElement = adFormElement.querySelector('#address');
const typeElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');
const sliderElement = document.querySelector('.ad-form__slider');
const roomsElement = adFormElement.querySelector('#room_number');
const guestsElement = adFormElement.querySelector('#capacity');
const checkinElement = adFormElement.querySelector('#timein');
const checkoutElement = adFormElement.querySelector('#timeout');

const TOKYO_DOWNTOWN = {
  lat: 35.68563,
  lng: 139.75276
};
const typePrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
  maxPrice: 100000
};

const pristine =  new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  successClass: 'ad-form__element--valid',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text'
});

addressElement.value = `${TOKYO_DOWNTOWN.lat} ${TOKYO_DOWNTOWN.lng}`;

const setForType = () => {
  switch (typeElement.value) {
    case 'bungalow' : {priceElement.placeholder = typePrice.bungalow; break;}
    case 'flat' : {priceElement.placeholder = typePrice.flat; break;}
    case 'hotel' : {priceElement.placeholder = typePrice.hotel; break;}
    case 'house' : {priceElement.placeholder = typePrice.house; break;}
    case 'palace' : {priceElement.placeholder = typePrice.palace;}
  }
};

setForType();

noUiSlider.create(sliderElement, {
  range: {
    min: typePrice.bungalow,
    max: typePrice.maxPrice,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const validatePrice = () => Number(priceElement.value) >= typePrice[typeElement.value] && typePrice.maxPrice >= Number(priceElement.value);
const getErrorPriceMessage = () => {
  if (Number(priceElement.value) < typePrice[typeElement.value]) {
    return `Минимальная цена за ночь ${typePrice[typeElement.value]}`;
  } else if (Number(priceElement.value) > typePrice.maxPrice) {
    return `Стоимость не должна превышать ${typePrice.maxPrice}`;
  }
};
pristine.addValidator(priceElement, validatePrice, getErrorPriceMessage);

const onTypeChange = () => {
  setForType();
  pristine.validate(priceElement);
};

const onPriceChange = () => {
  sliderElement.noUiSlider.set(Number(priceElement.value));
};

sliderElement.noUiSlider.on('slide', () => {
  setForType();
  priceElement.value = sliderElement.noUiSlider.get();
  pristine.validate(priceElement);
});

const resetSlider = () => {
  sliderElement.noUiSlider.reset();
};

const validateRoomsAndGuests = () => (Number(guestsElement.value) <= Number(roomsElement.value) && Number(roomsElement.value) !== 100 && Number(guestsElement.value) !== 0) || (Number(roomsElement.value) === 100 && Number(guestsElement.value) === 0);

const getErrorRoomsMessage = () => {
  if (Number(roomsElement.value) < Number(guestsElement.value)) {
    return 'Количество гостей не должно превышать количество комнат';
  }else if(Number(roomsElement.value) !== 100 && Number(guestsElement.value) === 0) {
    return 'выберите 100 комнат';
  }else if(Number(roomsElement.value) === 100 && Number(guestsElement.value) !== 0) {
    return '100 комнат не для гостей';
  }
};

pristine.addValidator(guestsElement, validateRoomsAndGuests, getErrorRoomsMessage);

const onRoomsChange = () => {
  pristine.validate(guestsElement);
};

const onGuestsChange = () => {
  pristine.validate(guestsElement);
};

const onCheckinChange = () => {
  checkoutElement.value = checkinElement.value;
};
const onCheckoutChange = () => {
  checkinElement.value = checkoutElement.value;
};

const validateForm = () => {
  typeElement.addEventListener('change', onTypeChange);
  priceElement.addEventListener('change', onPriceChange);
  roomsElement.addEventListener('change', onRoomsChange);
  guestsElement.addEventListener('change', onGuestsChange);
  checkinElement.addEventListener('change', onCheckinChange);
  checkoutElement.addEventListener('change', onCheckoutChange);
};

export { resetSlider, pristine, validateForm };
