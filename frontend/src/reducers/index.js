import { combineReducers } from 'redux';
import {
  RECEIVE_CATEGORY,
  RECEIVE_COMMENT,
  RECEIVE_POST,
  SET_FILTER,
  TOGGLE_MODAL,
  UPDATE_CATEGORY,
  UPDATE_COMMENT,
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
export const getCommentsForPost = (state, postId) => {
  const allComments = getAllComments(state);
  return allComments.filter(c => c.parentId === postId);
};
export const getCategory = (state, categoryId) => state.byId[categoryId];
export const getComment = (state, commentId) => state.byId[commentId];

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

const initialModal = {
  isActive: false,
};

const initialSort = {
  sortFilter: false,
};

function categories(state = initialCategories, action) {
  const { category } = action;
  switch (action.type) {
    case RECEIVE_CATEGORY:
      return {
        allIds: [...state.allIds, category.name],
        byId: { ...state.byId, [category.name]: category },
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        byId: { ...state.byId, [category.name]: category },
      };
    default:
      return state;
  }
}

function comments(state = initialComments, action) {
  const { comment } = action;
  switch (action.type) {
    case RECEIVE_COMMENT:
      return {
        allIds: [...state.allIds, comment.id],
        byId: { ...state.byId, [comment.id]: comment },
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        byId: { ...state.byId, [comment.id]: comment },
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

function modal(state = initialModal, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return { isActive: !state.isActive };
    default:
      return state;
  }
}

function sort(state = initialSort, action) {
  switch (action.type) {
    case SET_FILTER:
      return { sortFilter: action.sortFilter };
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  comments,
  modal,
  posts,
  sort,
});
