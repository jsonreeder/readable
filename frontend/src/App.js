import React, { Component } from 'react';
import { getCategories } from './util/api';

class App extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    getCategories().then(categories => this.setState({ categories }));
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
          <h1 className="title">Categories</h1>
          <ul>
            {this.renderCategories()}
          </ul>
        </div>
      </section>
    );
  }
}

export default App;
