
const adFormElement = document.querySelector('.ad-form');
const formFieldsetElements = adFormElement.querySelectorAll('fieldset');
const formSliderElement = adFormElement.querySelector('.ad-form__slider');

const mapFiltersElement = document.querySelector('.map__filters');
const mapFeaturesElements = mapFiltersElement.querySelectorAll('.map__features');
const mapFilterElements = mapFiltersElement.querySelectorAll('.map__filter');

const setAdFormSwitcher = (isDisabled) => {
  adFormElement.classList.toggle('ad-form--disabled', isDisabled);

  if (isDisabled){
    formSliderElement.setAttribute('disabled', isDisabled);

    formFieldsetElements.forEach((item) => {
      item.setAttribute('disabled', isDisabled);
    });
  } else {
    formSliderElement.removeAttribute('disabled');

    formFieldsetElements.forEach((item) => {
      item.removeAttribute('disabled');
    });
  }

};

const setMapFiltersSwitcher = (isDisabled) => {
  mapFiltersElement.classList.toggle('map__filters--disabled', isDisabled);

  mapFilterElements.forEach((item) => {
    if (isDisabled) {
      item.setAttribute('disabled', isDisabled);
    } else {
      item.removeAttribute('disabled');
    }
  });

  mapFeaturesElements.forEach((item) => {
    if (isDisabled) {
      item.setAttribute('disabled', isDisabled);
    } else {
      item.removeAttribute('disabled');
    }
  });

};

const setPageSwitcher = (isDisabled) => {
  setAdFormSwitcher(isDisabled);
  setMapFiltersSwitcher(isDisabled);
};

export { setPageSwitcher, setMapFiltersSwitcher, setAdFormSwitcher };
