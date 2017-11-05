import React from 'react';
import { Link } from 'react-router-dom';

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
