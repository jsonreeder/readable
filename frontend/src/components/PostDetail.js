import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Comment, Post, Tabs } from './helpers';
import CommentForm from './CommentForm';
import * as fromActions from '../actions';
import { getAllCategories, getCommentsForPost, getPost } from '../reducers';

class PostDetail extends Component {
  componentDidMount() {
    const {
      fetchCategories,
      fetchCommentsForPost,
      fetchPost,
      match: { params: { postId } },
    } = this.props;
    fetchCategories();
    fetchPost(postId);
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
            {comments.map(c => <Comment comment={c} key={c.id} />)}
            <CommentForm parentId={post.id} />
          </Post>}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: getAllCategories(state.categories),
  comments: getCommentsForPost(state.comments, ownProps.match.params.postId),
  post: getPost(state.posts, ownProps.match.params.postId),
});

const mapDispatchToProps = {
  fetchCategories: fromActions.fetchCategories,
  fetchCommentsForPost: fromActions.fetchCommentsForPost,
  fetchPost: fromActions.fetchPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
