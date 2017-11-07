import React from 'react';
import { Route } from 'react-router-dom';
import Category from './components/Category';
import Home from './components/Home';
import PostDetail from './components/PostDetail';
import NewPost from './components/NewPost';
import Navbar from './components/Navbar';

const App = () =>
  <div>
    <Navbar />
    <section className="section">
      <div className="container">
        <NewPost />
        <Route exact path="/" component={Home} />
        <Route exact path="/categories/:categoryId" component={Category} />
        <Route exact path="/posts/:postId" component={PostDetail} />
      </div>
    </section>
  </div>;

export default App;
