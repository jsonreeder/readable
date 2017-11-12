import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPostToEdit } from '../reducers';
import * as fromActions from '../actions';

class PostForm extends Component {
  state = {
    author: '',
    body: '',
    category: '',
    title: '',
  };

  componentWillReceiveProps(newProps) {
    const { post: oldPost } = this.props;
    const { post: newPost } = newProps;
    if (newPost && oldPost !== newPost) {
      const { author, body, category, title } = newPost;
      this.setState({
        author,
        body,
        category,
        title,
      });
    }
  }

  handleChange({ placeholder, value }) {
    this.setState({ [placeholder || 'category']: value });
  }

  closeAndClear() {
    const { closeModal } = this.props;
    this.clearForm();
    closeModal();
  }

  clearForm() {
    this.setState({
      author: '',
      body: '',
      category: '',
      title: '',
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createPost, editPost, post } = this.props;
    const { body, title } = this.state;
    post ? editPost({ body, title }, post.id) : createPost(this.state);
    this.closeAndClear();
  }

  isInvalid() {
    const { author, title, body, category } = this.state;
    return !author || !title || !body || !category;
  }

  render() {
    const { author, title, body, category } = this.state;
    const { isActive, post } = this.props;
    const categories = ['react', 'redux', 'udacity'];

    return (
      <div className={`modal ${isActive ? 'is-active' : ''}`}>
        <div
          className="modal-background"
          onClick={() => this.closeAndClear()}
        />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              {post ? 'Edit post' : 'New post'}
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => this.closeAndClear()}
            />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Author</label>
              <div className="control">
                <input
                  disabled={!!post}
                  className="input"
                  type="text"
                  placeholder="author"
                  value={author}
                  onChange={e => this.handleChange(e.target)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="title"
                  value={title}
                  onChange={e => this.handleChange(e.target)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Body</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="body"
                  value={body}
                  onChange={e => this.handleChange(e.target)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select">
                  <select
                    disabled={!!post}
                    value={category}
                    onChange={e => this.handleChange(e.target)}
                  >
                    <option value="" disabled>
                      Choose one
                    </option>
                    {categories.map(c =>
                      <option key={c}>
                        {c}
                      </option>,
                    )}
                  </select>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-success"
              disabled={this.isInvalid()}
              onClick={e => this.handleSubmit(e)}
            >
              Submit
            </button>
            <button className="button" onClick={() => this.closeAndClear()}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isActive: state.modal.isActive,
  post: getPostToEdit(state),
});

const mapDispatchToProps = {
  createPost: fromActions.createPost,
  closeModal: fromActions.toggleModalNew,
  editPost: fromActions.editPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
