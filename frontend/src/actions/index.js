import * as api from '../util/api';
import { getComment, getPost } from '../reducers';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const RECEIVE_POST = 'RECEIVE_POST';
export const UPDATE_POST = 'UPDATE_POST';

export const receiveCategories = categories => {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  };
};

export const receiveComment = comment => {
  return {
    type: RECEIVE_COMMENT,
    comment,
  };
};

export const updateComment = comment => {
  return {
    type: UPDATE_COMMENT,
    comment,
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

export function fetchCommentsForPost(postId) {
  return async function(dispatch, getState) {
    const comments = await api.fetchComments(postId);
    updateOrReceiveComments(dispatch, getState, comments);
  };
}

export function fetchPosts() {
  return async function(dispatch, getState) {
    const posts = await api.fetchPosts();
    updateOrReceivePosts(dispatch, getState, posts);
  };
}

export function fetchPostsForCategory(categoryId) {
  return async function(dispatch, getState) {
    const posts = await api.fetchPostsForCategory(categoryId);
    updateOrReceivePosts(dispatch, getState, posts);
  };
}

function updateOrReceiveComments(dispatch, getState, comments) {
  const state = getState();
  comments.forEach(c => {
    const existingComment = getComment(state.comments, c.id);
    const actionCreator = existingComment ? updateComment : receiveComment;
    return dispatch(actionCreator(c));
  });
}

function updateOrReceivePosts(dispatch, getState, posts) {
  const state = getState();
  posts.forEach(p => {
    const existingPost = getPost(state.posts, p.id);
    const actionCreator = existingPost ? updatePost : receivePost;
    return dispatch(actionCreator(p));
  });
}
