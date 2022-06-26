import { showAlert} from './util.js';
const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academ/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showAlert('сервер недоступен, попробуйте обратиться позже');
    });
};

export {getData};
