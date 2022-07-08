const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp'];

const avatarInputElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');

const photoInputElement = document.querySelector('#images');
const photoPreviewElement = document.querySelector('.ad-form__photo');

avatarInputElement.addEventListener('change', () => {
  const [file] = avatarInputElement.files;
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

const createImage = (address) => {
  const image = document.createElement('img');
  image.alt = 'Фотография жилья';
  image.style = 'width: 100%; height: 100%; object-fit: cover';
  image.src = address;

  photoPreviewElement.append(image);
};

photoInputElement.addEventListener('change', () => {
  const [file] = photoInputElement.files;
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    photoPreviewElement.innerHTML = '';
    createImage(URL.createObjectURL(file));
  }
});

const resetImages = () => {
  avatarPreviewElement.src = 'img/muffin-grey.svg';
  photoPreviewElement.innerHTML = '';
};

export { resetImages };
