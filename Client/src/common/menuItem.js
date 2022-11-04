import React, { Fragment } from 'react';

import { ConditionalLink } from './conditionalLink';

export const MenuItem = ({ title, to, image }) => (
  <Fragment>
    <ConditionalLink to={to}>
      <li aria-hidden="true" className="active-navbar-list">
        <img src={image} alt="icon" />
        <span>{title}</span>
      </li>
    </ConditionalLink>
  </Fragment>
);
