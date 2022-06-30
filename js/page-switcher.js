
const adForm = document.querySelector('.ad-form');
const adFormFieldset = adForm.querySelectorAll('fieldset');
const adFormSlider = adForm.querySelector('.ad-form__slider');
const mapFilters = document.querySelector('.map__filters');
const mapFilterSelects = mapFilters.querySelectorAll('.map__features');
const mapFilterFieldset = mapFilters.querySelectorAll('.map__filter');

const pageDisabled = (isDisabled) => {
  adForm.classList.toggle('ad-form--disabled', isDisabled);
  mapFilters.classList.toggle('map__filters--disabled', isDisabled);

  if (isDisabled){
    adFormSlider.setAttribute('disabled', isDisabled);

    adFormFieldset.forEach((item) => {
      item.setAttribute('disabled', isDisabled);
    });

    mapFilterFieldset.forEach((item) => {
      item.setAttribute('disabled', isDisabled);
    });

    mapFilterSelects.forEach((item) => {
      item.setAttribute('disabled', isDisabled);
    });
  } else {
    adFormSlider.removeAttribute('disabled');

    adFormFieldset.forEach((item) => {
      item.removeAttribute('disabled');
    });

    mapFilterFieldset.forEach((item) => {
      item.removeAttribute('disabled');
    });

    mapFilterSelects.forEach((item) => {
      item.removeAttribute('disabled');
    });
  }

};

export { pageDisabled };
