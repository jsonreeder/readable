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

  componentWillReceiveProps(nextProps) {
    const { fetchPostsForCategory } = this.props;
    const oldId = this.props.match.params.categoryId;
    const newId = nextProps.match.params.categoryId;
    oldId !== newId && fetchPostsForCategory(newId);
  }

  render() {
    const { categories, posts, upVotePost, downVotePost } = this.props;
    const { match: { params: { categoryId } } } = this.props;
    const sortedPosts = posts.sort((p1, p2) => p2.voteScore - p1.voteScore);

    return (
      <div>
        <Tabs categories={categories} current={categoryId} />
        <PostList
          posts={sortedPosts}
          upVotePost={upVotePost}
          downVotePost={downVotePost}
        />
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
  upVotePost: fromActions.upVotePost,
  downVotePost: fromActions.downVotePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
