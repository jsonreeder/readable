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
    const {
      comments,
      downVoteComment,
      downVotePost,
      post,
      upVoteComment,
      upVotePost,
      deleteComment,
    } = this.props;
    const thisCategory = post ? post.category : 'thisCategory';
    const { categories } = this.props;
    const sortedComments = comments.sort(
      (c1, c2) => c2.voteScore - c1.voteScore,
    );

    return (
      <div>
        <Tabs categories={categories} current={thisCategory} />
        {post &&
          <Post post={post} upVotePost={upVotePost} downVotePost={downVotePost}>
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
  deleteComment: fromActions.deleteComment,
  downVoteComment: fromActions.downVoteComment,
  fetchCategories: fromActions.fetchCategories,
  fetchCommentsForPost: fromActions.fetchCommentsForPost,
  fetchPost: fromActions.fetchPost,
  upVoteComment: fromActions.upVoteComment,
  upVotePost: fromActions.upVotePost,
  downVotePost: fromActions.downVotePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
