import React from 'react';
import { Route } from 'react-router-dom';
import Category from './components/Category';
import Home from './components/Home';
import PostDetail from './components/PostDetail';
import NewPost from './components/NewPost';

const App = () =>
  <div>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <h2 className="title is-2">
            <i className="fa fa-book" /> readable
          </h2>
        </div>
      </div>
      <div className="navbar-menu is-active">
        <div className="navbar-end">
          <div className="navbar-item">
            <button className="button is-info">
              <p>
                <i className="fa fa-pencil" /> New Post
              </p>
            </button>
          </div>
        </div>
      </div>
    </nav>
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
