import * as api from '../util/api';
import { getCategory, getComment, getPost } from '../reducers';

export const RECEIVE_CATEGORY = 'RECEIVE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const RECEIVE_POST = 'RECEIVE_POST';
export const UPDATE_POST = 'UPDATE_POST';

export const receiveCategory = category => {
  return {
    type: RECEIVE_CATEGORY,
    category,
  };
};

export const updateCategory = category => {
  return {
    type: UPDATE_CATEGORY,
    category,
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

export function upVotePost(postId) {
  return async function(dispatch) {
    const post = await api.upVotePost(postId);
    return dispatch(updatePost(post));
  };
}

export function downVotePost(postId) {
  return async function(dispatch) {
    const post = await api.downVotePost(postId);
    return dispatch(updatePost(post));
  };
}

export function fetchCategories(postId) {
  return async function(dispatch, getState) {
    const categories = await api.fetchCategories();
    updateOrReceiveCategories(dispatch, getState, categories);
  };
}

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

function updateOrReceiveCategories(dispatch, getState, categories) {
  const state = getState();
  categories.forEach(c => {
    const existingCategory = getCategory(state.categories, c.name);
    const actionCreator = existingCategory ? updateCategory : receiveCategory;
    return dispatch(actionCreator(c));
  });
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
