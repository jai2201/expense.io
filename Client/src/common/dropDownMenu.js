import React, { Fragment } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

import { connect } from 'react-redux';

function DropDownMenu(props) {
  const handleLogout = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    window.location.reload();
  };

  return (
    <Fragment>
      {props.db_user.user ? (
        <DropdownButton title={'User'}>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </DropdownButton>
      ) : null}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  db_user: state.auth,
});

export default connect(mapStateToProps, null)(DropDownMenu);
