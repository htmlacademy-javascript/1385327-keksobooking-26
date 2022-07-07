import { pageDisabled } from './page-switcher.js';
import { loadMap } from './map.js';
import { validateForm } from './form-validation.js';
import { setFormReset, setFormSubmit } from './form.js';

pageDisabled(true);

loadMap();

validateForm();

setFormSubmit();

setFormReset();
