const api = 'http://localhost:3001';
const headers = {
  Authorization: 'quagmire',
  'Content-Type': 'application/json',
};

export const fetchCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const fetchComments = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers }).then(res => res.json());

export const fetchPosts = () =>
  fetch(`${api}/posts`, { headers }).then(res => res.json());

export const fetchPostsForCategory = categoryId =>
  fetch(`${api}/${categoryId}/posts`, { headers }).then(res => res.json());

export const upVotePost = postId =>
  fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ option: 'upVote' }),
  }).then(res => res.json());
