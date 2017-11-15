import uuidv4 from 'uuid';
import * as api from '../util/api';
import { getCategory, getComment, getPost } from '../reducers';

export const ADD_COMMENT = 'ADD_COMMENT';
export const RECEIVE_CATEGORY = 'RECEIVE_CATEGORY';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const SET_FILTER = 'SET_FILTER';
export const START_EDITING_COMMENT = 'START_EDITING_COMMENT';
export const TOGGLE_MODAL_EDIT = 'TOGGLE_MODAL_EDIT';
export const TOGGLE_MODAL_NEW = 'TOGGLE_MODAL_NEW';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
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

export const toggleModalNew = () => {
  return {
    type: TOGGLE_MODAL_NEW,
  };
};

export const toggleModalEdit = id => {
  return {
    type: TOGGLE_MODAL_EDIT,
    id,
  };
};

export const setFilter = sortFilter => {
  return {
    type: SET_FILTER,
    sortFilter,
  };
};

export const startEditingComment = id => ({
  type: START_EDITING_COMMENT,
  id,
});

export const addComment = comment => ({
  type: ADD_COMMENT,
  comment,
});

export const removeComment = comment => ({
  type: REMOVE_COMMENT,
  comment,
});

export function upVotePost(postId) {
  return async function(dispatch) {
    const post = await api.upVote(postId, 'post');
    return dispatch(updatePost(post));
  };
}

export function downVotePost(postId) {
  return async function(dispatch) {
    const post = await api.downVote(postId, 'post');
    return dispatch(updatePost(post));
  };
}

export function upVoteComment(commentId) {
  return async function(dispatch) {
    const comment = await api.upVote(commentId, 'comment');
    return dispatch(updateComment(comment));
  };
}

export function downVoteComment(commentId) {
  return async function(dispatch) {
    const comment = await api.downVote(commentId, 'comment');
    return dispatch(updateComment(comment));
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
    const cb = categoryId ? api.fetchPostsForCategory : api.fetchPosts;
    const posts = await cb(categoryId);
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

export function editPost(body, id) {
  return async function(dispatch, getState) {
    const post = await api.editPost(body, id);
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
    dispatch(addComment(comment));
    updateOrReceiveComment(dispatch, getState, comment);
  };
}

export function editComment(commentBody, id) {
  const body = {
    body: commentBody,
  };

  return async function(dispatch, getState) {
    const comment = await api.editComment(body, id);
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

export function deletePost(id) {
  return async function(dispatch, getState) {
    const post = await api.remove(id, 'post');
    updateOrReceivePost(dispatch, getState, post);
  };
}

export function deleteComment(id) {
  return async function(dispatch, getState) {
    const comment = await api.remove(id, 'comment');
    dispatch(removeComment(comment));
    updateOrReceiveComment(dispatch, getState, comment);
  };
}
