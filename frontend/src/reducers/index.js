import { combineReducers } from 'redux';
import { RECEIVE_CATEGORIES } from '../actions';

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
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const categoryIds = action.categories.map(c => c.name);
      const categoriesById = action.categories.reduce((obj, c) => {
        obj[c.name] = c;
        return obj;
      }, {});
      return {
        allIds: categoryIds,
        byId: categoriesById,
      };
  }
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
