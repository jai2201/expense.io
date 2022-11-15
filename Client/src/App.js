import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import * as APPLICATION_URLS from './utils/applicationURLs';

import { ProtectedRoutes } from './protectedRoutes';
import SignIn from './containers/signIn';
// import Dashboard from './containers/dashboard';

import Home from './components/home';
import Partner from './components/partner';
import Project from './components/project';
import Employee from './components/employee';
import Expense from './components/expense';
import User from './components/user';
import Payment from './components/payment';

import './static/css/base.css';
import Revenue from './components/revenue';
import ProjectDetail from './components/projectDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          exact="true"
          path={APPLICATION_URLS.SIGNIN_PAGE}
          element={<SignIn />}
        />
        <Route
          path={APPLICATION_URLS.DASHBOARD_PAGE}
          element={<ProtectedRoutes />}
        >
          <Route
            exact="true"
            path={APPLICATION_URLS.DASHBOARD_PAGE}
            element={<Home />}
          />
          <Route
            exact="true"
            path={APPLICATION_URLS.PROJECTS_PAGE}
            element={<Project />}
          />
          <Route
            exact="true"
            path={APPLICATION_URLS.EMPLOYEE_PAGE}
            element={<Employee />}
          />
          <Route
            exact="true"
            path={APPLICATION_URLS.EXPENSES_PAGE}
            element={<Expense />}
          />
          <Route
            exact="true"
            path={APPLICATION_URLS.PARTNER_PAGE}
            element={<Partner />}
          />
          <Route
            exact="true"
            path={APPLICATION_URLS.USER_PAGE}
            element={<User />}
          />
          <Route
            exact="true"
            path={APPLICATION_URLS.PAYMENT_PAGE}
            element={<Payment />}
          />
          <Route
            exact="true"
            path={APPLICATION_URLS.REVENUE_PAGE}
            element={<Revenue />}
          />
          <Route
            exact="true"
            path={APPLICATION_URLS.PROJECT_DETAILS_PAGE}
            element={<ProjectDetail />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
