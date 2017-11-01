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
      <ul>
        {categories.map(c =>
          <li key={c.name}>
            {c.name}
          </li>,
        )}
      </ul>
    );
  }

  renderPosts() {
    const { posts } = this.state;

    return (
      <ul>
        {posts.map(p =>
          <li key={p.body}>
            {p.body}
          </li>,
        )}
      </ul>
    );
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Readable</h1>
          {this.renderBreadcrumb()}
          {this.renderCategories()}
          {this.renderPosts()}
        </div>
      </section>
    );
  }
}

export default App;
