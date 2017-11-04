import React, { Component } from 'react';
import { Breadcrumb } from './helpers';
import { connect } from 'react-redux';
import { getAllCategories, getAllPosts } from '../reducers';
import * as fromActions from '../actions';

class Home extends Component {
  componentDidMount() {
    const { fetchCategories, fetchPosts } = this.props;
    fetchCategories();
    fetchPosts();
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
    return (
      <div>
        <Breadcrumb links={{ home: '/', posts: '/' }} paths={['home']} />
        {this.renderCategories()}
        {this.renderPosts()}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
