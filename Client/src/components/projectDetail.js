import React, { useState, useEffect, Fragment } from 'react';

import '../static/css/home.css';

import axios from 'axios';

import * as BACKEND_URLS from '../utils/backendURLs';

import { connect } from 'react-redux';
import * as actions from '../store/actions/actions';
import { useParams } from 'react-router-dom';

function ProjectDetail(props) {
  const params = useParams();

  const [projectDetails, setProjectDetails] = useState([]);
  const [projectExpenses, setProjectExpenses] = useState([]);
  const [projectPayments, setProjectPayments] = useState([]);
  const [projectReveneus, setProjectRevenues] = useState([]);

  const fetchProjectDetails = () => {
    axios
      .get(BACKEND_URLS.GET_PROJECT_DETAILS, {
        headers: {
          token: localStorage.getItem('token'),
        },
        params: {
          project_id: params.project_id,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setProjectDetails(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchProjectRevenues = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_REVENUES_FOR_A_SPECIFIC_PROJECT, {
        headers: {
          token: localStorage.getItem('token'),
        },
        params: {
          project_id: params.project_id,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setProjectRevenues(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchProjectExpenses = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_EXPENSES_FOR_A_PROJECT, {
        headers: {
          token: localStorage.getItem('token'),
        },
        params: {
          project_id: params.project_id,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setProjectExpenses(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchProjectPayments = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_PAYMENTS_FOR_A_PROJECT, {
        headers: {
          token: localStorage.getItem('token'),
        },
        params: {
          project_id: params.project_id,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setProjectPayments(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  return (
    <Fragment>
      <div className="application">
        <div className="selectTable">
          {projectDetails[0] ? (
            <>
              <h2>Project Name - {projectDetails[0]['PR_Name']}</h2>
              <h6>Project Code - {projectDetails[0]['PR_Code']}</h6>
              <h6>Project Type - {projectDetails[0]['PRT_Name']}</h6>
              <h6>
                Project Client Name - {projectDetails[0]['PR_ClientName']}
              </h6>
              <h6>
                Project Concern Person Name -
                {projectDetails[0]['PR_ConcernPersonName']}
              </h6>
              <h6>
                Project Concern Person Number -
                {projectDetails[0]['PR_ConcernPersonNumber']}
              </h6>
              <h6>
                Project Work Order Number -
                {projectDetails[0]['PR_WorkOrderNumber']}
              </h6>
              <h6>
                Project Work Order Value -
                {projectDetails[0]['PR_WorkOrderValue']}
              </h6>
              <h6>
                Project Work Order Date -
                {projectDetails[0]['PR_WorkOrderDateInFormat']}
              </h6>
              <h6>
                Project Execution Start Date -
                {projectDetails[0]['PR_ExecutionStartDate']}
              </h6>
            </>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
