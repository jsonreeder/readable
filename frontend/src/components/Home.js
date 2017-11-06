import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostList, Tabs } from './helpers';
import { getAllCategories, getAllPosts } from '../reducers';
import * as fromActions from '../actions';

class Home extends Component {
  componentDidMount() {
    const { fetchCategories, fetchPosts } = this.props;
    fetchCategories();
    fetchPosts();
  }

  render() {
    const { categories, posts, upVotePost, downVotePost } = this.props;
    return (
      <div>
        <Tabs categories={categories} current="all" />
        <PostList
          posts={posts}
          upVotePost={upVotePost}
          downVotePost={downVotePost}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: getAllCategories(state.categories),
  posts: getAllPosts(state.posts),
});

const mapDispatchToProps = {
  fetchCategories: fromActions.fetchCategories,
  fetchPosts: fromActions.fetchPosts,
  upVotePost: fromActions.upVotePost,
  downVotePost: fromActions.downVotePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
