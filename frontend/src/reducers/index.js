import { combineReducers } from 'redux';
import {
  ADD_COMMENT,
  RECEIVE_CATEGORY,
  RECEIVE_COMMENT,
  RECEIVE_POST,
  REMOVE_COMMENT,
  SET_FILTER,
  START_EDITING_COMMENT,
  TOGGLE_MODAL_NEW,
  TOGGLE_MODAL_EDIT,
  UPDATE_CATEGORY,
  UPDATE_COMMENT,
  UPDATE_POST,
} from '../actions';

export const getAllCategories = state => state.allIds.map(id => state.byId[id]);
const getAllComments = state => state.allIds.map(id => state.byId[id]);
const getAllPosts = state => state.allIds.map(id => state.byId[id]);
export const getPost = (state, postId) => state.byId[postId];
export const getPostToEdit = state => {
  const { modal: { postId } } = state;
  return getPost(state.posts, postId);
};
export const getPostsForCategory = (state, categoryId) => {
  const allPosts = getAllPosts(state);
  return categoryId
    ? allPosts.filter(p => p.category === categoryId && !p.deleted)
    : allPosts.filter(p => !p.deleted);
};
export const getCommentsForPost = (state, postId) => {
  const allComments = getAllComments(state);
  return allComments.filter(c => c.parentId === postId && !c.deleted);
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
  postId: '',
};

const initialSort = {
  sortFilter: 'voteScoreUp',
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
    case START_EDITING_COMMENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: { ...state.byId[action.id], isEditing: true },
        },
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
    case ADD_COMMENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.parentId]: {
            ...getPost(state, action.comment.parentId),
            commentCount:
              getPost(state, action.comment.parentId).commentCount + 1,
          },
        },
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.parentId]: {
            ...getPost(state, action.comment.parentId),
            commentCount:
              getPost(state, action.comment.parentId).commentCount - 1,
          },
        },
      };
    default:
      return state;
  }
}

function modal(state = initialModal, action) {
  switch (action.type) {
    case TOGGLE_MODAL_NEW:
      return { isActive: !state.isActive };
    case TOGGLE_MODAL_EDIT:
      return { isActive: !state.isActive, postId: action.id };
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
