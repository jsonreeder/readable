import { combineReducers } from 'redux';
import { RECEIVE_CATEGORIES } from '../actions';
import { RECEIVE_COMMENTS } from '../actions';
import { RECEIVE_POSTS } from '../actions';

export const getAllCategories = state => state.allIds.map(id => state.byId[id]);
export const getAllComments = state => state.allIds.map(id => state.byId[id]);
export const getAllPosts = state => state.allIds.map(id => state.byId[id]);
export const getPost = (state, postId) => state.byId[postId];

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
    default:
      return state;
  }
}

function comments(state = initialComments, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      const categoryIds = action.comments.map(c => c.id);
      const commentsById = action.comments.reduce((obj, c) => {
        obj[c.id] = c;
        return obj;
      }, {});
      return {
        allIds: categoryIds,
        byId: commentsById,
      };
    default:
      return state;
  }
}

function posts(state = initialPosts, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      const categoryIds = action.posts.map(c => c.id);
      const postsById = action.posts.reduce((obj, c) => {
        obj[c.id] = c;
        return obj;
      }, {});
      return {
        allIds: categoryIds,
        byId: postsById,
      };
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  comments,
  posts,
});
