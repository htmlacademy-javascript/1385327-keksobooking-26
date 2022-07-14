
const createElement = (element, selector, content) => {
  if (content) {
    element.querySelector(selector).textContent = content;
  } else {
    element.querySelector(selector).remove();
  }
};

const setEndingWord = (value, words) => {
  const lastDigit = value % 10;
  if (value > 10 && value < 20) {
    return words[2];
  }
  if (lastDigit > 1 && lastDigit < 5) {
    return words[1];
  }
  if (lastDigit === 1) {
    return words[0];
  }
  return words[2];
};

const showError = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '95px';
  alertContainer.style.width = '100%';
  alertContainer.style.height = '550px';
  alertContainer.style.overflow = 'auto';

  alertContainer.style.paddingTop = '300px';
  alertContainer.style.fontSize = '50px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = '#ffffff';
  alertContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  const image = document.createElement('div');
  image.style.zIndex = '1101';
  image.style.position = 'absolute';
  image.style.left = '50%';
  image.style.top = '100px';
  image.style.height = '121px';
  image.style.width = '109px';

  image.style.backgroundImage = 'url("../img/muffin-white.svg")';
  image.style.transform = 'translate(-50%)';

  alertContainer.append(image);

  setTimeout(() => {
    image.remove();
    alertContainer.remove();
  }, 5000);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { createElement, setEndingWord, showError, debounce };
