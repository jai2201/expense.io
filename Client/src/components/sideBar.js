import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MenuItem } from '../common/menuItem';
import * as BACKEND_URLS from '../utils/backendURLs';
import * as APPLICATION_URLS from '../utils/applicationURLs';
import * as actions from '../store/actions/actions';

import '../static/css/sideBar.css';
import { useNavigate } from 'react-router-dom';

function Sidebar(props) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="sideBar">
        <div className="sideBarUpper">
          <MenuItem
            to={APPLICATION_URLS.DASHBOARD_PAGE}
            image={require('../static/images/dummy.png')}
            title="Home"
          />
          {/* <MenuItem
            to={APPLICATION_URLS.EXPENSES_PAGE}
            image={require('../static/images/dummy.png')}
            title="Expenses"
          /> */}
          {/* <MenuItem
            to={APPLICATION_URLS.PAYMENT_PAGE}
            image={require('../static/images/dummy.png')}
            title="Payments"
          /> */}
          {/* <MenuItem
            to={APPLICATION_URLS.REVENUE_PAGE}
            image={require('../static/images/dummy.png')}
            title="Revenues"
          /> */}
          <MenuItem
            to={APPLICATION_URLS.PROJECTS_PAGE}
            image={require('../static/images/dummy.png')}
            title="Projects"
          />
          <MenuItem
            to={APPLICATION_URLS.PARTNER_PAGE}
            image={require('../static/images/dummy.png')}
            title="Partners"
          />
          <MenuItem
            to={APPLICATION_URLS.VEHICLES_PAGE}
            image={require('../static/images/dummy.png')}
            title="Vehicles"
          />
          <MenuItem
            to={APPLICATION_URLS.USER_PAGE}
            image={require('../static/images/dummy.png')}
            title="Users"
          />
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  db_user: state.auth,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
