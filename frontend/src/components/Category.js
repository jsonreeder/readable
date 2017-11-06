import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostList, Tabs } from './helpers';
import { getAllCategories, getPostsForCategory } from '../reducers';
import * as fromActions from '../actions';

class Category extends Component {
  componentDidMount() {
    const { fetchCategories } = this.props;
    fetchCategories();
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPostsForCategory } = this.props;
    const oldId = this.props.match.params.categoryId;
    const newId = nextProps.match.params.categoryId;
    oldId === newId && fetchPostsForCategory(newId);
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
