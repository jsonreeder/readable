import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tabs } from './helpers';
import { getAllCategories, getPostsForCategory } from '../reducers';
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
    const { categories } = this.props;
    const { match: { params: { categoryId } } } = this.props;
    return (
      <div>
        <Tabs categories={categories} current={categoryId} />
        {this.renderPosts()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: getAllCategories(state.categories),
  posts: getPostsForCategory(state.posts, ownProps.match.params.categoryId),
});

const mapDispatchToProps = {
  fetchCategories: fromActions.fetchCategories,
  fetchPostsForCategory: fromActions.fetchPostsForCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
