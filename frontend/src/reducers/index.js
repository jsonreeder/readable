import { combineReducers } from 'redux';

const initialCategories = {
  allIds: [],
  byId: {},
};

const initialComments = {
  allIds: [],
  byId: {},
};

const initialPosts = {
  allIds: [],
  byId: {},
};

function categories(state = initialCategories, action) {
  return state;
}

function comments(state = initialComments, action) {
  return state;
}

function posts(state = initialPosts, action) {
  return state;
}

export default combineReducers({
  categories,
  comments,
  posts,
});
