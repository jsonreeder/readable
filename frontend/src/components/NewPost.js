import React, { Component } from 'react';

class NewPost extends Component {
  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background"> </div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Modal title</p>
            <button class="delete" aria-label="close" />
          </header>
          <section class="modal-card-body">
            <p>Content</p>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success">Save changes</button>
            <button class="button">Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}

export default NewPost;
