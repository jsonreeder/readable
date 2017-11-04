import React from 'react';
import { Link } from 'react-router-dom';

export const Breadcrumb = ({ links, paths }) =>
  <nav className="breadcrumb" aria-label="breadcrumbs">
    <ul>
      {paths.map((p, i) =>
        <li>
          {i === paths.length - 1
            ? p
            : <Link to={links[p]}>
                {p}
              </Link>}
        </li>,
      )}
    </ul>
  </nav>;
