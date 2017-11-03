import * as api from '../util/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const receiveCategories = categories => {
  console.log('received', categories);
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  };
};

export const fetchCategories = () => dispatch =>
  api
    .fetchCategories()
    .then(categories => dispatch(receiveCategories(categories)));
