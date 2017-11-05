import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumb } from './helpers';
import { getAllCategories, getAllPosts } from '../reducers';
import * as fromActions from '../actions';

class Category extends Component {
  componentDidMount() {
    const {
      fetchCategories,
      fetchPostsForCategory,
      match: { params: { categoryId } },
    } = this.props;
    fetchCategories();
    fetchPostsForCategory(categoryId);
  }

  renderPosts() {
    const { posts } = this.props;

    return (
      <section className="box container">
        <h2 className="title is-2">Posts</h2>
        <ul>
          {posts.map(p => this.renderPost(p.body, p.author, p.id))}
        </ul>
      </section>
    );
  }

  renderPost(body, author, id) {
    return (
      <li key={body}>
        <Link to={`/posts/${id}`}>
          <strong>{author}</strong> - {body}
        </Link>
      </li>
    );
  }

  render() {
    const { match: { params: { categoryId } } } = this.props;
    return (
      <div>
        <Breadcrumb
          links={{ home: '/', categories: '/categories' }}
          paths={['home', 'categories', categoryId]}
        />
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
  fetchPostsForCategory: fromActions.fetchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
