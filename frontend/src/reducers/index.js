import { combineReducers } from 'redux';

export const getAllCategories = state => state.allIds.map(id => state.byId[id]);

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
