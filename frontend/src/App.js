import React, { Component } from 'react';
import * as api from './util/api';

class App extends Component {
  state = {
    categories: [],
    posts: [],
  };

  componentDidMount() {
    api.getCategories().then(categories => this.setState({ categories }));
    api.getPosts().then(posts => this.setState({ posts }));
  }

  renderBreadcrumb() {
    return (
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li className="is-active">
            <a aria-current="page">Home</a>
          </li>
        </ul>
      </nav>
    );
  }

  renderCategories() {
    const { categories } = this.state;

    return (
      <section className="box container">
        <h2 className="title is-2">Categories</h2>
        <ul>
          {categories.map(c =>
            <li key={c.name}>
              {c.name}
            </li>,
          )}
        </ul>
      </section>
    );
  }

  renderPosts() {
    const { posts } = this.state;

    return (
      <section className="box container">
        <h2 className="title is-2">Posts</h2>
        <ul>
          {posts.map(p => this.renderPost(p.body, p.author))}
        </ul>
      </section>
    );
  }

  renderPost(body, author) {
    return (
      <li key={body}>
        <strong>{author}</strong> - {body}
      </li>
    );
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-1">Readable</h1>
          {this.renderBreadcrumb()}
          {this.renderCategories()}
          {this.renderPosts()}
        </div>
      </section>
    );
  }
}

export default App;
