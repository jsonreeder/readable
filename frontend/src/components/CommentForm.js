import React, { Component } from 'react';

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
  }

  handleSubmit(e) {
    e.preventDefault();
    /* const { createPost } = this.props;*/
    /* createPost(this.state);*/
    this.setState({
      body: '',
      category: '',
      author: '',
    });
    this.clearForm();
  }

  isInvalid() {
    const { author, body } = this.state;
    return !author || !body;
  }

  render() {
    const { author, body } = this.state;

    return (
      <article className="media">
        <div className="media-content box">
          <h4 className="title is-4">New comment</h4>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="username"
                value={author}
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
                value={body}
                onChange={e => this.handleChange(e.target)}
              />
            </div>
            <div className="field">
              <p className="control">
                <button
                  className="button is-primary"
                  onClick={e => this.handleSubmit(e)}
                >
                  Post comment
                </button>
              </p>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default CommentForm;
