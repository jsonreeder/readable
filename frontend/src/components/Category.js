import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostList, Tabs } from './helpers';
import { getAllCategories, getPostsForCategory } from '../reducers';
import * as fromActions from '../actions';

class Category extends Component {
  componentDidMount() {
    const {
      fetchCategories,
      fetchPostsForCategory,
      match: { params: { categoryId } },
    } = this.props;
    fetchCategories();
    fetchPostsForCategory(categoryId);
  }

  render() {
    const { categories, posts } = this.props;
    const { match: { params: { categoryId } } } = this.props;
    return (
      <div>
        <Tabs categories={categories} current={categoryId} />
        <PostList posts={posts} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: getAllCategories(state.categories),
  posts: getPostsForCategory(state.posts, ownProps.match.params.categoryId),
});

const mapDispatchToProps = {
  fetchCategories: fromActions.fetchCategories,
  fetchPostsForCategory: fromActions.fetchPostsForCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
