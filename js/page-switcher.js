
const adForm = document.querySelector('.ad-form');
const adFormFieldset = adForm.querySelectorAll('fieldset');
const adFormSlider = adForm.querySelector('.ad-form__slider');
const mapFilters = document.querySelector('.map__filters');
const mapFilterSelects = mapFilters.querySelectorAll('.map__features');
const mapFilterFieldset = mapFilters.querySelectorAll('.map__filter');

const pageDisabled = (isDisabled) => {
  adForm.classList.toggle('ad-form--disabled', isDisabled);
  mapFilters.classList.toggle('map__filters--disabled', isDisabled);

  if (isDisabled) { // блокировка работает только с set/remove
    adFormSlider.setAttribute('disabled', isDisabled);
  } else {
    adFormSlider.removeAttribute('disabled');
  }

  adFormFieldset.forEach((item) => {
    item.disabled = isDisabled;
  });

  mapFilterFieldset.forEach((item) => {
    item.disabled = isDisabled;
  });

  mapFilterSelects.forEach((item) => {
    item.disabled = isDisabled;
  });

};

export { pageDisabled };
