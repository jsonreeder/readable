import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as fromActions from '../actions';

class CommentForm extends Component {
  state = {
    comment: '',
    username: '',
  };

  handleChange({ placeholder, value }) {
    this.setState({ [placeholder]: value });
  }

  clearForm() {
    this.setState({
      comment: '',
      username: '',
    });
    this.usernameInput.focus();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createComment, parentId } = this.props;
    createComment({ ...this.state, parentId });
    this.clearForm();
  }

  isInvalid() {
    const { comment, username } = this.state;
    return !comment || !username;
  }

  render() {
    const { username, comment } = this.state;

    return (
      <article className="media">
        <form
          className="media-content box"
          onSubmit={e => this.handleSubmit(e)}
        >
          <h4 className="title is-4">New comment</h4>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="username"
                value={username}
                ref={i => {
                  this.usernameInput = i;
                }}
                onChange={e => this.handleChange(e.target)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="comment"
                value={comment}
                onChange={e => this.handleChange(e.target)}
              />
            </div>
            <div className="field">
              <p className="control">
                <button
                  className="button is-primary"
                  disabled={this.isInvalid()}
                  type="submit"
                >
                  Post comment
                </button>
              </p>
            </div>
          </div>
        </form>
      </article>
    );
  }
}

const mapDispatchToProps = {
  createComment: fromActions.createComment,
};

export default connect(null, mapDispatchToProps)(CommentForm);
