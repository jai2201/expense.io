import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, Outlet } from 'react-router-dom';

import * as APPLICATION_URLS from './utils/applicationURLs';

import SideBar from './components/sideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './static/css/dashboard.css';
import './static/css/table.css';

export const ProtectedRoutes = () => {
  const authChecked = localStorage.getItem('token') ? true : false;
  return (
    <div className="dashboard">
      <div className="dashboardContainer">
        <SideBar />
        {authChecked ? (
          <Outlet />
        ) : (
          <Navigate to={APPLICATION_URLS.SIGNIN_PAGE} />
        )}
      </div>
    </div>
  );
};
