import React from 'react';
import { Route } from 'react-router-dom';
import Category from './components/Category';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import Navbar from './components/Navbar';

const App = () =>
  <div>
    <Navbar />
    <section className="section">
      <div className="container">
        <PostForm />
        <Route exact path="/" component={Category} />
        <Route exact path="/:categoryId" component={Category} />
        <Route exact path="/:categoryId/:postId" component={PostDetail} />
      </div>
    </section>
  </div>;

export default App;
