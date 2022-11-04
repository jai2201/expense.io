import React, { useState, useEffect, Fragment } from 'react';

import '../static/css/home.css';

import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as BACKEND_URLS from '../utils/backendURLs';

import { connect } from 'react-redux';
import * as actions from '../store/actions/actions';

function Home(props) {
  return (
    <Fragment>
      <div className="homePage">HOME</div>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
