import React from 'react';
import { Route } from 'react-router-dom';
import Category from './components/Category';
import Home from './components/Home';
import PostDetail from './components/PostDetail';

const App = () =>
  <div>
    <section className="section">
      <div className="container">
        <h1 className="title is-1">Readable</h1>
        <Route exact path="/" component={Home} />
        <Route exact path="/categories/:categoryId" component={Category} />
        <Route exact path="/posts/:postId" component={PostDetail} />
      </div>
    </section>
  </div>;

export default App;
