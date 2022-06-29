import { showError } from './util.js';
import { filtersDisabled } from './form.js';

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      filtersDisabled(true);
      showError('Cервер временно недоступен, попробуйте перезагрузить страницу или обратиться позже');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://26.javascript.pages.academ/keksobooking',
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Пожалуйста, попробуйте еще раз'); // ------------------------------------зачем? в каком случае?
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Пожалуйста, попробуйте еще раз'); // ------------------------------------зачем? в каком случае?
    });
};

export { getData, sendData };
