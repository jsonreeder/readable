import React, { Component } from 'react';

class NewPost extends Component {
  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background"> </div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">New post</p>
            <button class="delete" aria-label="close" />
          </header>
          <section class="modal-card-body">
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input className="input" type="text" placeHolder="username" />
              </div>
            </div>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input className="input" type="text" placeHolder="title" />
              </div>
            </div>
            <div className="field">
              <label className="label">Body</label>
              <div className="control">
                <input className="input" type="text" placeHolder="body" />
              </div>
            </div>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select">
                  <select>
                    <option>Category</option>
                    <option>Category</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success">Submit</button>
            <button class="button">Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}

export default NewPost;
