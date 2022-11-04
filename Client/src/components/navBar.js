import React, { Fragment } from 'react';

import '../static/css/navBar.css';

import DropDownMenu from '../common/dropDownMenu';

export default function Navbar() {
  return (
    <Fragment>
      <div className="navbar">
        <DropDownMenu />
      </div>
    </Fragment>
  );
}
