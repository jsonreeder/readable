import React from 'react';

export const Breadcrumb = ({ path }) =>
  <nav className="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li className="is-active">
        <a aria-current="page">
          {path}
        </a>
      </li>
    </ul>
  </nav>;
