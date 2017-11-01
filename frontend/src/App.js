import React, { Component } from 'react';
import { getCategories } from './util/api';

class App extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    getCategories().then(categories => this.setState({ categories }));
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

    return categories.map(c =>
      <li key={c.name}>
        {c.name}
      </li>,
    );
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Readable</h1>
          {this.renderBreadcrumb()}
          <ul>
            {this.renderCategories()}
          </ul>
        </div>
      </section>
    );
  }
}

export default App;
