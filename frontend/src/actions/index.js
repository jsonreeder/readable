import * as api from '../util/api';
import { getAllPosts } from '../reducers';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const UPDATE_POST = 'UPDATE_POST';

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

export const receivePost = post => {
  return {
    type: RECEIVE_POST,
    post,
  };
};

export const updatePost = post => {
  return {
    type: UPDATE_POST,
    post,
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

export const fetchPosts = () => (dispatch, getState) => {
  const { state: { posts } } = getState();
  const allPosts = getAllPosts(posts);
  api.fetchPosts().then(posts =>
    posts.forEach(p => {
      const existingPost = posts[p.id];
      if (existingPost && p === existingPost) {
        return;
      }
      return dispatch(receivePost(p));
    }),
  );
};

export const fetchPostsForCategory = categoryId => dispatch =>
  api
    .fetchPostsForCategory(categoryId)
    .then(posts => posts.forEach(p => dispatch(receivePost(p))));
