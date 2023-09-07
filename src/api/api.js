import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38328018-adf92d25e5f0a3816743083dd';

axios.defaults.baseURL = BASE_URL;

export const fetchImages = async (query, page, perPage) => {
  const params = {
    method: 'GET',
    baseURL: BASE_URL,
    params: {
      key: API_KEY,
      q: query,
      page: page,
      per_page: perPage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };

  const resp = await axios.get('', params);
  return resp.data;
};
