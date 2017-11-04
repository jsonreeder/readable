import React, { Component } from 'react';
import { connect } from 'react-redux';

class Post extends Component {
  render() {
    const { match: { params: { postId } } } = this.props;
    return (
      <div className="box container">
        {postId}
      </div>
    );
  }
}
export default Post;
