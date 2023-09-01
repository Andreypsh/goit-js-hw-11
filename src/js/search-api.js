import axios from 'axios';

export async function fetchSearch(searchQuery, currentPage, perPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  try {
    const resp = await axios.get(`${BASE_URL}`, {
      params: {
        key: '39161352-76dbc1f2fe664dc2e60720445',
        q: `${searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: perPage,
      },
    });
    return resp.data;
  } catch (error) {
    console.log('ERROR: ' + error);
  }
}
