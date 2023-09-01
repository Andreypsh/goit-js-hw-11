import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchSearch } from './search-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const elements = {
  searchQuery: document.querySelector('input[name="searchQuery"]'),
  searchForm: document.querySelector('.search-form'),
  list: document.querySelector('.gallery'),
  butLoadMore: document.querySelector('.load-more'),
};

let currentPage = 0;
let perPage = 40;
let input = elements.searchQuery.value;
elements.butLoadMore.classList.replace('load-more', 'load-more-hidden');
elements.searchForm.addEventListener('submit', hendlerSearch);

function hendlerSearch(evt) {
  evt.preventDefault();
  elements.list.innerHTML = '';
  currentPage = 1;
  input = elements.searchQuery.value;
  fetchSearch(input, currentPage, perPage)
    .then(data => {
      if (data.hits.length > 0) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      elements.list.insertAdjacentHTML('beforeend', createMarkup(data.hits));
      new SimpleLightbox('.gallery a');
      elements.butLoadMore.classList.replace('load-more-hidden', 'load-more');
    })
    .catch(onSubmitError);
}

function onLoadMore() {
  input = elements.searchQuery.value;
  currentPage += 1;
  fetchSearch(input, currentPage, perPage).then(data => {
    elements.list.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    var lightbox = new SimpleLightbox('.gallery a');
    let total_Page = data.totalHits / perPage;
    if (currentPage >= total_Page) {
      elements.butLoadMore.classList.replace('load-more', 'load-more-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  });
}
elements.butLoadMore.addEventListener('click', onLoadMore);

function createMarkup(data) {
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
       <div class="img_block">
    <a class="gallery_link" href =${largeImageURL}><img class="gallery_image" src=${webformatURL} alt=${tags} loading="lazy" /></a></div>
    <ul class="info">
      <li class="info-item">
        Likes<p>${likes}</p>
      </li>
      <li class="info-item">
        Views<p>${views}</p>
        </li>
        <li class="info-item">
        Comments<p>${comments}</p>
        </li>
      <li class="info-item">
        Downloads<p>${downloads}</p>
        </li>
        </ul>
  </div>`
    )
    .join('');
}

function onSubmitError() {
  elements.butLoadMore.classList.replace('load-more', 'load-more-hidden');
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
