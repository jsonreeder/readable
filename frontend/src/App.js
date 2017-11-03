import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as api from './util/api';
import { getAllCategories, getAllPosts } from './reducers';
import * as fromActions from './actions';

class App extends Component {
  componentDidMount() {
    const { fetchCategories, fetchPosts } = this.props;
    fetchCategories();
    fetchPosts();
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
    const { categories } = this.props;

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
    const { posts } = this.props;

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
    console.log(this.props);
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

const mapStateToProps = state => ({
  categories: getAllCategories(state.categories),
  posts: getAllPosts(state.posts),
});

const mapDispatchToProps = {
  fetchCategories: fromActions.fetchCategories,
  fetchPosts: fromActions.fetchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
