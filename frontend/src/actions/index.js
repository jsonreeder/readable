import * as api from '../util/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const receiveCategories = categories => {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  };
};

export const receiveComments = comments => {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  };
};

export const receivePosts = posts => {
  return {
    type: RECEIVE_POSTS,
    posts,
  };
};

export const fetchCategories = () => dispatch =>
  api
    .fetchCategories()
    .then(categories => dispatch(receiveCategories(categories)));

export const fetchComments = postId => dispatch => {
  return api
    .fetchComments(postId)
    .then(comments => dispatch(receiveComments(comments)));
};

export const fetchPosts = () => dispatch =>
  api.fetchPosts().then(posts => dispatch(receivePosts(posts)));
