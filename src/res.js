import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchSearch } from './search-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const elements = {
  searchForm: document.querySelector('.search-form'),
  list: document.querySelector('.gallery'),
  butLoadMore: document.querySelector('.load-more'),
};

let currentPage = 1;
let perPage = 40;

elements.butLoadMore.classList.replace('load-more', 'load-more-hidden');
elements.searchForm.addEventListener('submit', hendlerSearch);

function hendlerSearch(evt) {
  evt.preventDefault();
  elements.list.innerHTML = '';

  const { searchQuery } = evt.target.elements;
  fetchSearch(searchQuery.value, currentPage, perPage)
    .then(data => {
      if (data.hits.length > 0) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
      elements.list.insertAdjacentHTML('beforeend', createMarkup(data.hits));

      var lightbox = new SimpleLightbox('.gallery a');
      elements.butLoadMore.classList.replace('load-more-hidden', 'load-more');
    })
    .catch(onSubmitError);

  elements.butLoadMore.addEventListener('click', onLoadMore);

  function onLoadMore() {
    currentPage += 1;
    let total_Page;

    fetchSearch(searchQuery.value, currentPage, perPage)
      .then(data => {
        total_Page = data.totalHits / perPage;
        console.log(currentPage);
        console.log(total_Hits);

        elements.list.insertAdjacentHTML('beforeend', createMarkup(data.hits));
        var lightbox = new SimpleLightbox('.gallery a');
        if (currentPage < total_Page) {
          elements.butLoadMore.classList.replace(
            'load-more-hidden',
            'load-more'
          );
        } else {
          elements.butLoadMore.classList.replace(
            'load-more',
            'load-more-hidden'
          );
          Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
      })
      .catch(onSubmitError);
  }
}

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
    '"Sorry, there are no images matching your search query. Please try again."'
  );
}
