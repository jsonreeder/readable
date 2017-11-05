import * as api from '../util/api';
import { getPost } from '../reducers';

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

export function fetchPosts() {
  return async function(dispatch, getState) {
    const state = getState();
    const posts = await api.fetchPosts();

    posts.forEach(p => {
      const existingPost = getPost(state.posts, p.id);
      const actionCreator = existingPost ? updatePost : receivePost;
      return dispatch(actionCreator(p));
    });
  };
}

export const fetchPostsForCategory = categoryId => dispatch =>
  api
    .fetchPostsForCategory(categoryId)
    .then(posts => posts.forEach(p => dispatch(receivePost(p))));
