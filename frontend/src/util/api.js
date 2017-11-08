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

export const fetchPost = postId =>
  fetch(`${api}/posts/${postId}`, { headers }).then(res => res.json());

export const fetchPostsForCategory = categoryId =>
  fetch(`${api}/${categoryId}/posts`, { headers }).then(res => res.json());

export const upVotePost = postId => voteOnPost(postId, 'upVote');
export const downVotePost = postId => voteOnPost(postId, 'downVote');

export const voteOnPost = (postId, option) =>
  fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ option }),
  }).then(res => res.json());

export async function createPost(body) {
  const post = await fetch(`${api}/posts`, {
    headers,
    method: 'POST',
    body: JSON.stringify(body),
  });
  return post.json();
}

export async function createComment(body) {
  const comment = await fetch(`${api}/comments`, {
    headers,
    method: 'POST',
    body: JSON.stringify(body),
  });
  return comment.json();
}
