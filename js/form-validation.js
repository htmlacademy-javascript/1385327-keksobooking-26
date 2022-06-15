const form = document.querySelector('.ad-form');
const titleField = form.querySelector('#title');
const priceField = form.querySelector('#price');
const roomsField = form.querySelector('#room_number');
const room = roomsField.options[roomsField.selectedIndex].value;
const guestsField = form.querySelector('#capacity');
const guest = guestsField.options[guestsField.selectedIndex].value;
const typeField = form.querySelector('#type');

//const enableValidator = () => {};
const TITLE_SIZE = {
  min: 30,
  max: 100
};
const typePrice = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000
};
// const ROOM_NUMBERS = [1, 2, 3, 100];
// const CAPACITY = [1, 2, 3, 'не для гостей'];

const pristine =  new Pristine(form, {
  classTo: 'ad-form__element',
  successClass: 'ad-form__element--valid',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text'
});


pristine.addValidator(
  titleField,
  (value) => value.length >= TITLE_SIZE.min && value.length <= TITLE_SIZE.max,
  `От ${TITLE_SIZE.min} до ${TITLE_SIZE.max} символов`
);

const validatePrice = () => priceField.value >= typePrice[typeField.value];
const getErrorPriceMessage = () => `Минимальная цена должна быть больше ${typePrice[typeField.value]}`;
//const validateRoomsAndGuests = () => Number(guestsField.value) <= Number(roomsField.value) && Number(roomsField.value) !== 100 && Number(guestsField.value) !== 0 || Number(roomsField.value) === 100 && Number(guestsField.value) === 0;
const validateRoomsAndGuests = () => Number(guest) <= Number(room) && Number(room) !== 100 && Number(guest) !== 0 || Number(room) === 100 && Number(guest) === 0;
pristine.addValidator(priceField, validatePrice, getErrorPriceMessage);
pristine.addValidator(guestsField, validateRoomsAndGuests, 'Количество гостей не должно превышать количество комнат');
pristine.addValidator(roomsField, validateRoomsAndGuests, 'Количество гостей не должно превышать количество комнат');

form.addEventListener('submit', (evt) => {
  if(pristine.validate()) {
    return true;
  }
  evt.preventDefault();
});
// pristine.addValidator(
//   priceField,
//   (value) => value >= PRICE_SIZE.min && value <= PRICE_SIZE.max,
//   `От ${PRICE_SIZE.min} до ${PRICE_SIZE.max} рублей`
// );

// pristine.addValidator(
//   guestsField,  roomsField,
//   (Number(room) === 100 && Number(guest) === 0) || (Number(guest) <= Number(room) && Number(room) !== 100 && Number(guest) !== 0),
//   `Число гостей ${room} не должно превышать числа комнат`
// );

// pristine.addValidator(
//   guestsField,
//   (Number(roomsField.value) === 100 && Number(guestsField.value) === 0) ||
//   (Number(guestsField.value) <= Number(roomsField.value) &&
//   Number(roomsField.value) !== 100 &&
//   Number(guestsField.value) !== 0),
//   `555777333`
// );

// form.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   pristine.validate();
// });

// var pristine = new Pristine(document.getElementById("form1"));
// var elem = document.getElementById("email");
// pristine.addValidator(elem, function(value) {if (value.length && value[0] === value[0].toUpperCase()){return true;}return false;
// }, "The first character must be capitalized", 2, false);

// Pristine.addValidator("my-range", function(value, param1, param2) {
//   return parseInt(param1) <= value && value <= parseInt(param2)
// }, "The value (${0}) must be between ${1} and ${2}", 5, false);
