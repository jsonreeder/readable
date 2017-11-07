import React, { Component } from 'react';

class NewPost extends Component {
  state = {
    body: '',
    category: 'react',
    title: '',
    username: '',
  };

  handleChange({ placeholder, value }) {
    this.setState({ [placeholder]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  isInvalid() {
    const { username, title, body, category } = this.state;
    return !username || !title || !body || !category;
  }

  render() {
    const { username, title, body, category } = this.state;
    const categories = ['react', 'redux', 'udacity'];

    return (
      <div className="modal is-active">
        <div className="modal-background"> </div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">New post</p>
            <button className="delete" aria-label="close" />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="username"
                  value={username}
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
                    placehlder="category"
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
            <button className="button">Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}

export default NewPost;
