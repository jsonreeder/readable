import React from 'react';
import { Link } from 'react-router-dom';

export const Post = ({ post: { author, body, id } }) =>
  <div className="card">
    <div className="card-content">
      <div className="content">
        <Link to={`posts/${id}`}>
          {body}
        </Link>
        {author}
      </div>
    </div>
    <footer className="card-footer">
      <a className="card-footer-item">Comment</a>
      <a className="card-footer-item">Edit</a>
      <a className="card-footer-item">Delete</a>
    </footer>
  </div>;

export const Tabs = ({ categories, current }) => {
  const categoryNames = categories ? categories.map(c => c.name) : [];
  const tabs = ['all', ...categoryNames];

  return (
    <div className="tabs is-boxed is-large">
      <ul>
        {tabs.map(t =>
          <li className={t === current ? 'is-active' : ''} key={t}>
            <Link to={t === 'all' ? '/' : `/categories/${t}`}>
              {t}
            </Link>
          </li>,
        )}
      </ul>
    </div>
  );
};
