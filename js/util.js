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

export {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  getNewArray,
  getAvatar,
  setElement,
  hideElement,
  endingWord
};
