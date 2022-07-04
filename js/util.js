const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomArrayElement = (elements) => {
  const element = elements[getRandomPositiveInteger(0, elements.length - 1)];
  return element;
};

const getNewArray = (elements) => {
  const newArray = [];
  const newArrayLength = getRandomPositiveInteger(1, elements.length);
  while(newArray.length < newArrayLength) {
    const index = getRandomPositiveInteger(0, elements.length-1);
    const element = elements[index];
    if (!newArray.includes(element)) {
      newArray.push(element);
    }
  }
  return newArray;
};

const fillArrayAvatar = (from, to, prefix, base, type) => {
  const newArray = [];
  for (let i = from; i <= to; ++i) {
    newArray.push(`${base}${i < 10 ? prefix + i: i}${type}`);
  }
  return newArray;
};

let avatarPull = [];

const getAvatar = (from, to, prefix, base, type) => {
  if (!avatarPull.length) {
    avatarPull = fillArrayAvatar(from, to, prefix, base, type);
  }
  const src = getRandomArrayElement(avatarPull);
  const index = avatarPull.indexOf(src);
  avatarPull.splice(index, 1);
  return src;
};

const setElement = (popup, classElement, content) => {
  popup.querySelector(classElement).textContent = content;
};

const hideElement = (element) => {
  element.classList.add('hidden');
};

const endingWord = (value, words) => {
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

export {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  getNewArray,
  getAvatar,
  setElement,
  hideElement,
  endingWord,
  showError,
  debounce
};
