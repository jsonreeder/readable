import React, { Component } from 'react';
import { getCategories } from './util/api';

class App extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    getCategories().then(categories => this.setState({ categories }));
  }

  render() {
    const { categories } = this.state;
    console.log(categories);
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Categories</h1>
          <ul>
            {categories.map(c =>
              <li key={c.name}>
                {c.name}
              </li>,
            )}
          </ul>
        </div>
      </section>
    );
  }
}

export default App;
