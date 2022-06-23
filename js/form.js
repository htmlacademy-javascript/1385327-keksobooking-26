
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFilterSelects = mapFilters.querySelectorAll('.map__features');
const mapFilterFieldsets = mapFilters.querySelectorAll('.map__filter');

const pageDisabled = (isDisabled) => {
  adForm.classList.toggle('ad-form--disabled', isDisabled);
  mapFilters.classList.toggle('map__filters--disabled', isDisabled);

  adFormFieldsets.forEach((item) => {
    item.disabled = isDisabled;
  });

  mapFilterFieldsets.forEach((item) => {
    item.disabled = isDisabled;
  });

  mapFilterSelects.forEach((item) => {
    item.disabled = isDisabled;
  });
  //if (isDisabled) {console.log('true');} else {console.log('folse');}
};

export {pageDisabled};
