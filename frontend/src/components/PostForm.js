import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as fromActions from '../actions';

class PostForm extends Component {
  state = {
    body: '',
    category: 'react',
    title: '',
    author: '',
  };

  handleChange({ placeholder, value }) {
    this.setState({ [placeholder || 'category']: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { closeModal, createPost } = this.props;
    createPost(this.state);
    this.setState({
      body: '',
      category: '',
      title: '',
      author: '',
    });
    closeModal();
  }

  isInvalid() {
    const { author, title, body, category } = this.state;
    return !author || !title || !body || !category;
  }

  render() {
    const { author, title, body, category } = this.state;
    const { closeModal, isActive } = this.props;
    const categories = ['react', 'redux', 'udacity'];

    return (
      <div className={`modal ${isActive ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={closeModal} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">New post</p>
            <button
              className="delete"
              aria-label="close"
              onClick={closeModal}
            />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Author</label>
              <div className="control">
                <input
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
                    value={category}
                    onChange={e => this.handleChange(e.target)}
                  >
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
            <button className="button" onClick={closeModal}>
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
});

const mapDispatchToProps = {
  createPost: fromActions.createPost,
  closeModal: fromActions.toggleModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);