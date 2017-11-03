const api = 'http://localhost:3001';
const headers = {
  Authorization: 'quagmire',
};

export const fetchCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const fetchPosts = () =>
  fetch(`${api}/posts`, { headers }).then(res => res.json());
