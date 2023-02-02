import axios from 'axios';
import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const searchQuery = form.querySelector("input[name='searchQuery']");
let page = 1;
let perPage = 40;
let totalHits = 0;
let pictureId = 1;

loadMoreBtn.style.visibility = 'hidden';
form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleloadMoreBtn);

function removePictures() {
  const elements = gallery.getElementsByClassName('photo-card');
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
  let pictureId = 1;
}

async function getSearch() {
  loadMoreBtn.style.visibility = 'hidden';

  const search = await axios
    .get(
      `https://pixabay.com/api/?key=33268326-bb3a299852ac950b9c9a6ecaa&q=${searchQuery.value}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .catch(error => {
      console.log(error); //Logs a string: Error: Request failed with status code 404
      return [];
    });
  console.log(search);
  totalHits = search.data.totalHits;

  return search.data.hits;
}

function handleSubmit(event) {
  event.preventDefault();
  page = 1;
  removePictures();
  getSearch().then(pictures => {
    if (pictures.length > 0) {
      showPictures(pictures);
      loadMoreBtn.style.visibility = 'visible';
    } else {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  });
}

function handleloadMoreBtn(event) {
  page++;
  console.log(page);
  getSearch().then(pictures => {
    if (pictures.length > 0) {
      showPictures(pictures);
      loadMoreBtn.style.visibility = 'visible';
    }

    if (totalHits <= page * perPage) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.style.visibility = 'hidden';
    }
  });
}

function showPictures(pictureArray) {
  pictureArray.forEach(picture => {
    let template = `<div class="photo-card">
  <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
    <b>Likes</b>
    <span class="info-item_value">${picture.likes}</span>
    </p>
    <p class="info-item">
    <b>Views</b>
    <span class="info-item_value">${picture.views}</span>
    </p>
    <p class="info-item">
    <b>Comments</b>
    <span class="info-item_value">${picture.comments}</span>
    </p>
    <p class="info-item">
    <b>Downloads</b>
    <span class="info-item_value">${picture.downloads}</span>
    </p>
  </div>
</div>`;
    gallery.innerHTML = gallery.innerHTML + template;
    pictureId++;
  });
}
