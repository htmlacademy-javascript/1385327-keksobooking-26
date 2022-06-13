import './create-object.js';
import {pageDisabled, pageEnable} from'./form.js';

pageDisabled();
// pageEnable();
document.querySelector('.promo').addEventListener('click', pageEnable); // для тестирования
