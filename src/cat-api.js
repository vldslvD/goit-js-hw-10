const options = {
  headers: {
    'x-api-key':
      'live_iIykE0oT3avQ4V5RPRaMr7R9O9UFdBWD678O3SqNJcYsJsWkS5RFhia2tGaz0ff7',
  },
};
export function fetchBreed() {
  const url = `https://api.thecatapi.com/v1/breeds`;

  return fetch(url, options).then(r => r.json());
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url, options).then(r => r.json());
}
