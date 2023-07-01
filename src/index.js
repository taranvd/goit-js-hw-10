import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_KPdK3k5GNe6S3gV4nn9uTqCz1wMKqixW36edQeNqOdtJqveZYJB9OLOTGxxFh9YT';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

const imgEl = document.createElement('img');

document.addEventListener('DOMContentLoaded', () => {
  loader.style.display = 'block';
  breedSelect.style.display = 'none';

  fetchBreeds()
    .then(breeds => {
      breedSelect.style.display = 'block';
      loader.style.display = 'none';
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.warn(error);
      loader.style.display = 'none';
      errorEl.style.display = 'block';
    });
});

breedSelect.addEventListener('change', e => {
  catInfo.textContent = '';
  imgEl.src = '';
  catInfo.style.display = 'none';
  loader.style.display = 'block';

  const valueId = e.target.value;

  fetchCatByBreed(valueId).then(res => {
    loader.style.display = 'none';
    res.forEach(img => {
      imgEl.src = img.url;
      catInfo.style.display = 'flex';
      img.breeds.forEach(data => {
        createMarkupForCatInfo(data);
      });
    });

    catInfo.append(imgEl);
  });
});

function createMarkupForCatInfo(data) {
  const catInfoTextBlock = document.createElement('div');
  const catName = document.createElement('h2');
  const catDesc = document.createElement('p');
  const catTemp = document.createElement('p');
  const catOrigin = document.createElement('p');

  //* add classes
  catInfoTextBlock.classList.add('cat-info-text');
  catName.classList.add('cat-name');
  catDesc.classList.add('cat-desc');
  catTemp.classList.add('cat-temp');

  //* update element
  catName.textContent = data.name;
  catDesc.textContent = data.description;
  catTemp.innerHTML = `<b>Temperament:</b> ${data.temperament}`;
  catOrigin.innerHTML = `<b>Origin: </b> ${data.origin}`;

  //* insert element
  catInfoTextBlock.append(catName, catDesc, catTemp, catOrigin);

  return catInfo.appendChild(catInfoTextBlock);
}
