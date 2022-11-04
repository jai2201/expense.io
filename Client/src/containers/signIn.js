import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../store/actions/actions';
import signInImage from '../static/images/signIn.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as APPLICATION_URLS from '../utils/applicationURLs';
import * as BACKEND_URLS from '../utils/backendURLs';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import '../static/css/signIn.css';

function SignIn(props) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email_id: '',
    password: '',
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(BACKEND_URLS.LOGIN_URL, {
        user: {
          email: values.email_id.toLowerCase().trim(),
          password: values.password.trim(),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          props.login_success();
          localStorage.setItem('token', res.data.data);
          navigate(APPLICATION_URLS.DASHBOARD_PAGE);
        }
      })
      .catch((err) => {
        console.log(err);
        props.login_failed();
        if (err.response) {
        }
      });
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate(APPLICATION_URLS.DASHBOARD_PAGE);
    }
  }, []);

  return (
    <Fragment>
      <div className="signin">
        <div>
          <img src={signInImage} alt="intro" />
        </div>
        <div>
          <h5>Sign in</h5>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email/UserID"
              onChange={handleChange('email_id')}
              value={values.email_id}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange('password')}
              value={values.password}
            />
            <button type="submit">Continue</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

const mapDispatchToProps = (dispatch) => ({
  login_success: () => dispatch(actions.login_success()),
  login_failed: () => dispatch(actions.login_failure()),
});

export default connect(null, mapDispatchToProps)(SignIn);
