//import './create-object.js';
import {pageDisabled, pageEnable} from'./form.js';

pageDisabled();
// pageEnable();
document.querySelector('.promo').onclick = () => {pageEnable();}; // для тестирования
