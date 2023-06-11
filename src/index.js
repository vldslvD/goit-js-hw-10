import { fetchBreed } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  catsSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

fetchBreed()
  .then(cats => {
    selectFiller(cats);
    hideLoader();
  })
  .catch(e => {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    hideLoader();
  });

refs.catsSelect.addEventListener('change', onOptionChange);

function selectFiller(cats) {
  refs.catsSelect.innerHTML = cats
    .map(el => `<option value="${el.id}">${el.name}</option>`)
    .join('');
  refs.catsSelect.classList.remove('hidden');
}
function onOptionChange(e) {
  showLoader();
  fetchCatByBreed(e.target.value)
    .then(cat => {
      catInfoFiller(cat);
      hideLoader();
    })
    .catch(e => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      hideLoader();
    });
}

function catInfoFiller(data) {
  const cat = data[0];
  const markup1 = `<img class="cat-photo" src=${cat.url} width="400px">
    <div class=info-wrapper>
    <h2 class="cat-name">${cat.breeds[0].name}</h2>
    <p class="cat-descr">${cat.breeds[0].description}</p>
    <p class="cat-photo"><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
    </div>`;
  refs.catInfo.innerHTML = markup1;
  refs.catInfo.classList.remove('hidden');
}

function showLoader() {
  refs.loader.classList.remove('loader-hide');
}
function hideLoader() {
  refs.loader.classList.add('loader-hide');
}

function showError() {
  refs.error.classList.remove('hidden');
}
function hideError() {
  refs.error.classList.add('hidden');
}
