const form = document.querySelector('.ad-form');
const titleField = form.querySelector('#title');
const addressField = form.querySelector('#address');
const typeField = form.querySelector('#type');
const priceField = form.querySelector('#price');
const roomsField = form.querySelector('#room_number');
const guestsField = form.querySelector('#capacity');
const checkinField = form.querySelector('#timein');
const checkoutField = form.querySelector('#timeout');

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
  }
};
pristine.addValidator(titleField, validateTitle, getErrorTitleMessage);

addressField.value = `${TOKYO_DOWNTOWN.lat} ${TOKYO_DOWNTOWN.lng}`; // Координаты центра Токио по умолчанию (и чтоб не ругался)

const setForType = () => {
  switch (typeField.value) {
    case 'bungalow' : {priceField.placeholder = typePrice.bungalow; break;} // 0
    case 'flat' : {priceField.placeholder = typePrice.flat; break;} // 1000
    case 'hotel' : {priceField.placeholder = typePrice.hotel; break;} // 3000
    case 'house' : {priceField.placeholder = typePrice.house; break;} // 5000
    case 'palace' : {priceField.placeholder = typePrice.palace;} // 10000
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
// ------------------------------------------------------------------------------------------------------------
const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');
valueElement.value = typePrice[titleField.value];

noUiSlider.create(sliderElement, {
  range: {
    min: typePrice.bungalow,
    max: typePrice.maxPrice,
  },
  start: typePrice[typeField.value],
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

sliderElement.noUiSlider.on('update', () => { // отслеживание ползунка
  setForType();
  valueElement.value = sliderElement.noUiSlider.get(); //Получим актуальное значение слайдера
  //console.log('polzunok', valueElement.value);
});
//console.log(valueElement.value);
typeField.addEventListener('change', () => {
  //setForType();
  valueElement.value = sliderElement.noUiSlider.set(Number(priceField.value));
  //sliderElement.noUiSlider.reset();
  //pristine.validate(priceField);
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: typePrice.bungalow,
      max: typePrice.maxPrice,
    },
    start: Number(priceField.value),
    step: 1,
  }); //console.log('116', valueElement.value); console.log(typePrice[typeField.value]);
});
// ------------------------------------------------------------------------------------------------------------
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
// ------------------------------------------------------------------------------------------------------------
const onCheckinChange = () => {
  if (checkinField.value !== checkoutField.value) {
    checkoutField.value = checkinField.value;
  }
};
const onCheckoutChange = () => {
  if (checkinField.value !== checkoutField.value) {
    checkinField.value = checkoutField.value;
  }
};
checkinField.addEventListener('change', onCheckinChange);
checkoutField.addEventListener('change', onCheckoutChange);
// ------------------------------------------------------------------------------------------------------------
form.addEventListener('submit', (evt) => {
  if(pristine.validate()) {
    //evt.preventDefault(); console.log('true');
    return true;
  }
  evt.preventDefault();
});
