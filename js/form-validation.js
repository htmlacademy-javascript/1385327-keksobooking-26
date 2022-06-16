const form = document.querySelector('.ad-form');
const titleField = form.querySelector('#title');
const addressField = form.querySelector('#address');
const typeField = form.querySelector('#type');
const priceField = form.querySelector('#price');
const roomsField = form.querySelector('#room_number');
const guestsField = form.querySelector('#capacity');

//const enableValidator = () => {};
const TITLE_SIZE = {
  min: 30,
  max: 100
};
const TOKYO_DOWNTOWN = {
  lat: 35.6895,
  lng: 139.692
};
const typePrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
  maxPrice: 100000
};

const pristine =  new Pristine(form, {
  classTo: 'ad-form__element',
  successClass: 'ad-form__element--valid',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text'
});

const validateTitle =  (value) => value.length >= TITLE_SIZE.min && value.length <= TITLE_SIZE.max;
const getErrorTitleMessage = (value) => {
  if (value.length <= TITLE_SIZE.min) {
    return `Минимальная длина ${TITLE_SIZE.min} символов`;
  } else if (value.length >= TITLE_SIZE.max) {
    return `Максимальная длина ${TITLE_SIZE.max} символов`;
  } else {
    return 'Это поле обязательно для заполнения';
  }
};
pristine.addValidator(titleField, validateTitle, getErrorTitleMessage);

addressField.value = `${TOKYO_DOWNTOWN.lat} ${TOKYO_DOWNTOWN.lng}`; // Координаты центра Токио по умолчанию (и чтоб не ругался)

const setForType = () => {
  switch (typeField.value) {
    case 'bungalow' : {priceField.placeholder = 0; break;}
    case 'flat' : {priceField.placeholder = 1000; break;}
    case 'hotel' : {priceField.placeholder = 3000; break;}
    case 'house' : {priceField.placeholder = 5000; break;}
    case 'palace' : {priceField.placeholder = 10000;}
  }
};
setForType();

const validatePrice = () => Number(priceField.value) >= typePrice[typeField.value] && typePrice.maxPrice >= Number(priceField.value);
const getErrorPriceMessage = () => {
  if (Number(priceField.value) < typePrice[typeField.value]) {
    return `Минимальная цена должна быть больше ${typePrice[typeField.value]}`;
  } else if (Number(priceField.value) > typePrice.maxPrice) {
    return `Стоимость не должна превышать ${typePrice.maxPrice}`;
  }
};
pristine.addValidator(priceField, validatePrice, getErrorPriceMessage);

const onTypeChange = () => {
  setForType();
  pristine.validate(priceField);
};
typeField.addEventListener('change', onTypeChange);
priceField.addEventListener('change', onTypeChange);

const validateRoomsAndGuests = () => (Number(guestsField.value) <= Number(roomsField.value) && Number(roomsField.value) !== 100 && Number(guestsField.value) !== 0) || (Number(roomsField.value) === 100 && Number(guestsField.value) === 0);

const getErrorRoomsMessage = () => {
  if (Number(roomsField.value) < Number(guestsField.value)) {
    return 'Количество гостей не должно превышать количество комнат';
  }else if(Number(roomsField.value) !== 100 && Number(guestsField.value) === 0) {
    return 'не для гостей выбирайте 100 комнат';
  }
};

const getErrorGuestsMessage = () => {
  if (Number(guestsField.value) > Number(roomsField.value)) {
    return 'Количество комнат не может быть меньше количества гостей';
  } else if(Number(roomsField.value) === 100 && Number(guestsField.value) !== 0) {
    return '100 комнат это не для гостей';
  }
};
pristine.addValidator(guestsField, validateRoomsAndGuests, getErrorRoomsMessage);
pristine.addValidator(roomsField, validateRoomsAndGuests, getErrorGuestsMessage);

const onRoomsChange = () => {
  pristine.validate(roomsField);
  pristine.validate(guestsField);
};
roomsField.addEventListener('change',  onRoomsChange);

const onGuestsChange = () => {
  pristine.validate(guestsField);
  pristine.validate(roomsField);
};
guestsField.addEventListener('change', onGuestsChange);

form.addEventListener('submit', (evt) => {
  if(pristine.validate()) {
    //evt.preventDefault();
    return true;
  }
  evt.preventDefault();
});
