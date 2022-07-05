import { resetMap } from './map.js';
import { resetSlider } from './form-validation.js';


const adForm = document.querySelector('.ad-form');

const mapFilters = document.querySelector('.map__filters');
const mapFilterSelects = mapFilters.querySelectorAll('.map__features');
const mapFilterFieldset = mapFilters.querySelectorAll('.map__filter');

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

  mapFilterFieldset.forEach((item) => {
    if (!isDisabled) {
      item.setAttribute('disabled', isDisabled);
    } else {
      item.removeAttribute('disabled');
    }
  });

  mapFilterSelects.forEach((item) => {
    if (!isDisabled) {
      item.setAttribute('disabled', isDisabled);
    } else {
      item.removeAttribute('disabled');
    }
  });

};

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
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});


// const setFormSubmit = () => {
//   adForm.addEventListener('submit', (evt) => {
//     evt.preventDefault();

//     if(isValid) {
//       blockSubmitButton();
//       sendData(
//         () => {
//           unblockSubmitButton();
//           resetForm();
//           openMessage(createSuccess());
//         },
//         () => {
//           unblockSubmitButton();
//           openMessage(createError());
//         },
//         new FormData(evt.target),
//       );
//     }
//   });
// };


export { openMessage, resetForm, filtersDisabled, blockSubmitButton, unblockSubmitButton, createSuccess, createError };
