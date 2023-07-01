import axios from 'axios';
import SlimSelect from 'slim-select';

new SlimSelect({
  select: '#select',
});

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(data => data.data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => res.data);
}
