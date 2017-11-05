import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb } from './helpers';
import * as fromActions from '../actions';
import { getAllCategories } from '../reducers';

class Categories extends Component {
  componentDidMount() {
    const { fetchCategories } = this.props;
    fetchCategories();
  }

  renderCategories() {
    const { categories } = this.props;
    return categories.map(c =>
      <div className="box container" key={c.name}>
        <Link to={`/categories/${c.name}`}>
          {c.name}
        </Link>
      </div>,
    );
  }

  render() {
    return (
      <div>
        <Breadcrumb
          links={{
            home: '/',
            categories: '/categories',
          }}
          paths={['home', 'categories']}
        />
        {this.renderCategories()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: getAllCategories(state.categories),
});

const mapDispatchToProps = {
  fetchCategories: fromActions.fetchCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
