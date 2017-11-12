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

  sortPosts(posts) {
    const { sortFilter } = this.props;
    const sortCBs = {
      voteScoreUp: (p1, p2) => p2.voteScore - p1.voteScore,
      voteScoreDown: (p1, p2) => p1.voteScore - p2.voteScore,
      dateUp: (p1, p2) => p2.timestamp - p1.timestamp,
      dateDown: (p1, p2) => p1.timestamp - p2.timestamp,
    };

    return posts.sort(sortCBs[sortFilter]);
  }

  render() {
    const {
      categories,
      deletePost,
      downVotePost,
      match: { params: { categoryId } },
      posts,
      startEditingPost,
      upVotePost,
    } = this.props;
    const sortedPosts = this.sortPosts(posts);

    return (
      <div>
        <Tabs categories={categories} current={categoryId} />
        <PostList
          deletePost={deletePost}
          downVotePost={downVotePost}
          posts={sortedPosts}
          upVotePost={upVotePost}
          startEditingPost={startEditingPost}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: getAllCategories(state.categories),
  sortFilter: state.sort.sortFilter,
  posts: getPostsForCategory(state.posts, ownProps.match.params.categoryId),
});

const mapDispatchToProps = {
  deletePost: fromActions.deletePost,
  downVotePost: fromActions.downVotePost,
  fetchCategories: fromActions.fetchCategories,
  fetchPostsForCategory: fromActions.fetchPostsForCategory,
  startEditingPost: fromActions.toggleModalEdit,
  upVotePost: fromActions.upVotePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
