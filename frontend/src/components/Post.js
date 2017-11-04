import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb } from './helpers';
import * as fromActions from '../actions';
import { getAllComments, getPost } from '../reducers';

class Post extends Component {
  componentDidMount() {
    const {
      fetchComments,
      fetchPosts,
      match: { params: { postId } },
    } = this.props;
    fetchPosts();
    fetchComments(postId);
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
    const thisPost = post ? post.id : 'thisPost';
    return (
      <div>
        <Breadcrumb
          links={{
            home: '/',
            categories: '/categories',
            [thisCategory]: `/categories/${thisCategory}`,
            [thisPost]: '/',
          }}
          paths={['home', 'categories', thisCategory, thisPost]}
        />
        <div className="box container">
          {post && this.renderPost(post.author, post.body)}
          {this.renderComments()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  comments: getAllComments(state.comments),
  post: getPost(state.posts, ownProps.match.params.postId),
});

const mapDispatchToProps = {
  fetchComments: fromActions.fetchComments,
  fetchPosts: fromActions.fetchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
