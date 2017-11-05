import { combineReducers } from 'redux';
import {
  RECEIVE_CATEGORIES,
  RECEIVE_COMMENTS,
  RECEIVE_POST,
  UPDATE_POST,
} from '../actions';

export const getAllCategories = state => state.allIds.map(id => state.byId[id]);
export const getAllComments = state => state.allIds.map(id => state.byId[id]);
export const getAllPosts = state => state.allIds.map(id => state.byId[id]);
export const getPost = (state, postId) => state.byId[postId];
export const getPostsForCategory = (state, categoryId) => {
  const allPosts = getAllPosts(state);
  return allPosts.filter(p => p.category === categoryId);
};

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
  const { post } = action;
  switch (action.type) {
    case RECEIVE_POST:
      return {
        allIds: [...state.allIds, post.id],
        byId: { ...state.byId, [post.id]: post },
      };
    case UPDATE_POST:
      return {
        ...state,
        byId: { ...state.byId, [post.id]: post },
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
