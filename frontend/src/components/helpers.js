import React from 'react';
import { Link } from 'react-router-dom';

export const Breadcrumb = ({ links, paths }) =>
  <nav className="breadcrumb" aria-label="breadcrumbs">
    <ul>
      {paths.map((p, i) =>
        <li className={i === paths.length - 1 ? 'is-active' : ''} key={i}>
          <Link to={links[p] || ''}>
            {p}
          </Link>
        </li>,
      )}
    </ul>
  </nav>;

export const Tabs = ({ categories, current }) => {
  const categoryNames = categories ? categories.map(c => c.name) : [];
  const tabs = ['all', ...categoryNames];

  return (
    <div className="tabs is-boxed is-large">
      <ul>
        {tabs.map(t =>
          <li className={t === current ? 'is-active' : ''} key={t}>
            <Link to={`/categories/${t}`}>
              {t}
            </Link>
          </li>,
        )}
      </ul>
    </div>
  );
};
