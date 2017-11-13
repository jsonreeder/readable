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

  renderPostNotFound() {
    return (
      <div className="section">
        <p>404: Post not found</p>
        <p>
          Go <Link to="/">home</Link>.
        </p>
      </div>
    );
  }

  renderPost() {
    const {
      comments,
      deleteComment,
      deletePost,
      downVoteComment,
      downVotePost,
      post,
      startEditingComment,
      startEditingPost,
      upVoteComment,
      upVotePost,
    } = this.props;

    const sortedComments = comments.sort(
      (c1, c2) => c2.voteScore - c1.voteScore,
    );

    return (
      <Post
        startEditingPost={startEditingPost}
        post={post}
        upVotePost={upVotePost}
        downVotePost={downVotePost}
        remove={deletePost}
      >
        {sortedComments.map(
          c =>
            c.isEditing
              ? <CommentForm comment={c} key={c.id} parentId={post.id} />
              : <Comment
                  comment={c}
                  downVoteComment={downVoteComment}
                  key={c.id}
                  upVoteComment={upVoteComment}
                  startEditingComment={startEditingComment}
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
        {post && !post.deleted ? this.renderPost() : this.renderPostNotFound()}
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
  downVotePost: fromActions.downVotePost,
  fetchCategories: fromActions.fetchCategories,
  fetchCommentsForPost: fromActions.fetchCommentsForPost,
  fetchPost: fromActions.fetchPost,
  startEditingPost: fromActions.toggleModalEdit,
  startEditingComment: fromActions.startEditingComment,
  upVoteComment: fromActions.upVoteComment,
  upVotePost: fromActions.upVotePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
