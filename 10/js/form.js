import { resetMap } from './map.js';
import { resetSlider } from './form-validation.js';

const adForm = document.querySelector('.ad-form');

const mapFilters = document.querySelector('.map__filters');
const mapFilterSelects = mapFilters.querySelectorAll('.map__features');
const mapFilterFieldsets = mapFilters.querySelectorAll('.map__filter');

const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const createSuccess = () => {
  const element = successTemplate.cloneNode(true);
  return element;
};

const createError = () => {
  const element = errorTemplate.cloneNode(true);
  return element;
};

const onMessageClick = () => {
  closeMessage();
};
const onMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    //evt.preventDefault();
    closeMessage();
  }
};

function openMessage (element) {
  document.body.append(element);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageClick);
}

function closeMessage () {
  document.body.lastChild.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onMessageClick);
}

// ------------------------------------------------------------------------------------------------------------
const filtersDisabled = (isDisabled) => {
  mapFilters.classList.toggle('map__filters--disabled', isDisabled);

  mapFilterFieldsets.forEach((item) => {
    item.disabled = isDisabled;
  });

  mapFilterSelects.forEach((item) => {
    item.disabled = isDisabled;
  });

};

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};


const resetForm = () => {
  adForm.reset();
  resetSlider();
  mapFilters.reset();
  resetMap();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export { openMessage, resetForm, filtersDisabled, blockSubmitButton, unblockSubmitButton, createSuccess, createError };
