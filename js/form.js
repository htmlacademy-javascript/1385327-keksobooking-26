import { resetMap } from './map.js';
import { resetSlider, pristine } from './form-validation.js';
import { sendData } from './api.js';

const adForm = document.querySelector('.ad-form');

const mapFilters = document.querySelector('.map__filters');

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

const blockSubmitButton = () => {
  submitButton.setAttribute('disabled', true);
};

const unblockSubmitButton = () => {
  submitButton.removeAttribute('disabled');
};

const resetForm = () => {
  adForm.reset();
  resetSlider();
  mapFilters.reset();
  resetMap();
  pristine.reset();
};

const setFormReset = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();

  });
};

const setFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
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
