import * as api from '../util/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const receiveCategories = categories => {
  console.log('received', categories);
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  };
};

export const receivePosts = posts => {
  console.log('received', posts);
  return {
    type: RECEIVE_POSTS,
    posts,
  };
};

export const fetchCategories = () => dispatch =>
  api
    .fetchCategories()
    .then(categories => dispatch(receiveCategories(categories)));

export const fetchPosts = () => dispatch =>
  api.fetchPosts().then(posts => dispatch(receivePosts(posts)));
