import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Post from './components/Post';
import * as fromActions from './actions';

const App = () =>
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/posts/:postId" component={Post} />
  </div>;

export default App;
