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
    const {
      categories,
      downVotePost,
      posts,
      sortFilter,
      upVotePost,
    } = this.props;
    const sortCBs = {
      voteScoreUp: (p1, p2) => p2.voteScore - p1.voteScore,
      voteScoreDown: (p1, p2) => p1.voteScore - p2.voteScore,
      dateUp: (p1, p2) => p2.timestamp - p1.timestamp,
      dateDown: (p1, p2) => p1.timestamp - p2.timestamp,
    };
    const sortedPosts = posts.sort(sortCBs[sortFilter]);

    return (
      <div>
        <Tabs categories={categories} current="all" />
        <PostList
          posts={sortedPosts}
          upVotePost={upVotePost}
          downVotePost={downVotePost}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: getAllCategories(state.categories),
  sortFilter: state.sort.sortFilter,
  posts: getAllPosts(state.posts),
});

const mapDispatchToProps = {
  fetchCategories: fromActions.fetchCategories,
  fetchPosts: fromActions.fetchPosts,
  upVotePost: fromActions.upVotePost,
  downVotePost: fromActions.downVotePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
