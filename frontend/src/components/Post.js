import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as fromActions from '../actions';
import { getAllComments } from '../reducers';

class Post extends Component {
  componentDidMount() {
    const { fetchComments, match: { params: { postId } } } = this.props;
    fetchComments(postId);
  }

  renderComments() {
    const { comments } = this.props;
    return (
      <ul>
        {comments.map(c =>
          <li>
            {c.author}: {c.body}
          </li>,
        )}
      </ul>
    );
  }

  render() {
    const { match: { params: { postId } } } = this.props;
    return (
      <div className="box container">
        {postId}
        {this.renderComments()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: getAllComments(state.comments),
});

const mapDispatchToProps = {
  fetchComments: fromActions.fetchComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
