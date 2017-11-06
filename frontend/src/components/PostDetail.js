import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Comment, Post, Tabs } from './helpers';
import * as fromActions from '../actions';
import { getAllCategories, getAllComments, getPost } from '../reducers';

class PostDetail extends Component {
  componentDidMount() {
    const {
      fetchCategories,
      fetchCommentsForPost,
      fetchPosts,
      match: { params: { postId } },
    } = this.props;
    fetchCategories();
    fetchPosts();
    fetchCommentsForPost(postId);
  }

  render() {
    const { comments, post } = this.props;
    const thisCategory = post ? post.category : 'thisCategory';
    const { categories } = this.props;
    return (
      <div>
        <Tabs categories={categories} current={thisCategory} />
        {post &&
          <Post post={post}>
            {comments.map(c => <Comment comment={c} />)}
          </Post>}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: getAllCategories(state.categories),
  comments: getAllComments(state.comments),
  post: getPost(state.posts, ownProps.match.params.postId),
});

const mapDispatchToProps = {
  fetchCategories: fromActions.fetchCategories,
  fetchCommentsForPost: fromActions.fetchCommentsForPost,
  fetchPosts: fromActions.fetchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
