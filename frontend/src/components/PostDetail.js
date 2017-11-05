import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from './helpers';
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

  renderPost(body, author) {
    return (
      <p>
        <strong>{author}</strong> - {body}
      </p>
    );
  }

  renderComments() {
    const { comments } = this.props;
    return (
      <ul>
        {comments.map(c =>
          <li key={c.id}>
            {c.author}: {c.body}
          </li>,
        )}
      </ul>
    );
  }

  render() {
    const { post } = this.props;
    const thisCategory = post ? post.category : 'thisCategory';
    const { categories } = this.props;
    return (
      <div>
        <Tabs categories={categories} current={thisCategory} />
        <div className="box container">
          {post && this.renderPost(post.author, post.body)}
          {this.renderComments()}
        </div>
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
