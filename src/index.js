import axios from 'axios';
import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let inputValue = event.target[0].value;
  console.log(inputValue);

  async function getSearch() {
    const search = await axios.get(
      `https://pixabay.com/api/?key=33268326-bb3a299852ac950b9c9a6ecaa&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    // console.log(search);
    return search.data.hits;
  }
  getSearch().then(pictures => {
    pictures.forEach(picture => {
      //console.log(picture);
      let template = `<div class="photo-card">
  <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${picture.likes} Likes</b>
    </p>
    <p class="info-item">
      <b>${picture.views} Views</b>
    </p>
    <p class="info-item">
      <b>${picture.comments} Comments</b>
    </p>
    <p class="info-item">
      <b>${picture.downloads} Downloads</b>
    </p>
  </div>
</div>`;
      gallery.innerHTML = gallery.innerHTML + template;
    });
  });
}

function showPictures(pictureArray) {}
