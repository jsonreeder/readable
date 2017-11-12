import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

  renderPost() {
    const {
      comments,
      downVoteComment,
      downVotePost,
      startEditingPost,
      post,
      upVoteComment,
      upVotePost,
      deleteComment,
      deletePost,
    } = this.props;

    const sortedComments = comments.sort(
      (c1, c2) => c2.voteScore - c1.voteScore,
    );

    if (post.deleted) {
      return (
        <p>
          This post has been deleted. Go <Link to="/">home</Link>.
        </p>
      );
    }

    return (
      <Post
        startEditingPost={startEditingPost}
        post={post}
        upVotePost={upVotePost}
        downVotePost={downVotePost}
        remove={deletePost}
      >
        {sortedComments.map(c =>
          <Comment
            comment={c}
            downVoteComment={downVoteComment}
            key={c.id}
            upVoteComment={upVoteComment}
            remove={deleteComment}
          />,
        )}
        <CommentForm parentId={post.id} />
      </Post>
    );
  }

  render() {
    const { categories, post } = this.props;
    const thisCategory = post ? post.category : 'thisCategory';
    return (
      <div>
        <Tabs categories={categories} current={thisCategory} />
        {post && this.renderPost()}
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
  deleteComment: fromActions.deleteComment,
  deletePost: fromActions.deletePost,
  downVoteComment: fromActions.downVoteComment,
  startEditingPost: fromActions.toggleModalEdit,
  fetchCategories: fromActions.fetchCategories,
  fetchCommentsForPost: fromActions.fetchCommentsForPost,
  fetchPost: fromActions.fetchPost,
  upVoteComment: fromActions.upVoteComment,
  upVotePost: fromActions.upVotePost,
  downVotePost: fromActions.downVotePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
