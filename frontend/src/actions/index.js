import uuidv4 from 'uuid';
import * as api from '../util/api';
import { getCategory, getComment, getPost } from '../reducers';

export const RECEIVE_CATEGORY = 'RECEIVE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const RECEIVE_POST = 'RECEIVE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';

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

export const toggleModal = () => {
  return {
    type: TOGGLE_MODAL,
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

export function fetchPost(postId) {
  return async function(dispatch, getState) {
    const post = await api.fetchPost(postId);
    updateOrReceivePost(dispatch, getState, post);
  };
}

export function fetchPostsForCategory(categoryId) {
  return async function(dispatch, getState) {
    const posts = await api.fetchPostsForCategory(categoryId);
    updateOrReceivePosts(dispatch, getState, posts);
  };
}

export function createPost(body) {
  body.id = uuidv4();
  body.timestamp = Date.now();
  return async function(dispatch, getState) {
    const post = await api.createPost(body);
    updateOrReceivePost(dispatch, getState, post);
  };
}

export function createComment({ username, comment, parentId }) {
  const body = {
    author: username,
    body: comment,
    id: uuidv4(),
    parentId,
    timestamp: Date.now(),
  };

  return async function(dispatch, getState) {
    const comment = await api.createComment(body);
    updateOrReceiveComment(dispatch, getState, comment);
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
  comments.forEach(c => updateOrReceiveComment(dispatch, getState, c));
}

function updateOrReceiveComment(dispatch, getState, comment) {
  const state = getState();
  const existingComment = getComment(state.comments, comment.id);
  const actionCreator = existingComment ? updateComment : receiveComment;
  return dispatch(actionCreator(comment));
}

function updateOrReceivePosts(dispatch, getState, posts) {
  posts.forEach(p => updateOrReceivePost(dispatch, getState, p));
}

function updateOrReceivePost(dispatch, getState, post) {
  const state = getState();
  const existingPost = getPost(state.posts, post.id);
  const actionCreator = existingPost ? updatePost : receivePost;
  return dispatch(actionCreator(post));
}
