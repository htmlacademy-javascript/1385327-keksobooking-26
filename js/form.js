import { resetMap } from './map.js';
import { resetSlider, pristine } from './form-validation.js';
import { resetImages } from './form-photo.js';
import { sendData } from './api.js';

const adFormElement = document.querySelector('.ad-form');

const mapFiltersElement = document.querySelector('.map__filters');

const submitButtonElement = adFormElement.querySelector('.ad-form__submit');
const resetButtonElement = adFormElement.querySelector('.ad-form__reset');

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
    evt.preventDefault();
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

const blockSubmitButton = () => {
  submitButtonElement.setAttribute('disabled', true);
};

const unblockSubmitButton = () => {
  submitButtonElement.removeAttribute('disabled');
};

const resetForm = () => {
  adFormElement.reset();
  resetSlider();
  resetImages();
  pristine.reset();

  mapFiltersElement.reset();
  resetMap();
};

const setFormReset = () => {
  resetButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  });
};

const setFormSubmit = () => {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if(pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          resetForm();
          openMessage(createSuccess());
        },
        () => {
          unblockSubmitButton();
          openMessage(createError());
        },
        new FormData(evt.target),
      );
    }
  });
};

export { resetForm, setFormReset, setFormSubmit };
