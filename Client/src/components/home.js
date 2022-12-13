import React, { useState, useEffect, Fragment } from 'react';

import '../static/css/home.css';

import axios from 'axios';

import * as BACKEND_URLS from '../utils/backendURLs';

import { connect } from 'react-redux';
import * as actions from '../store/actions/actions';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

function Home(props) {
  const [dashboardDetails, setDashboardDetails] = useState([]);
  const navigate = useNavigate();
  const fetchAllProjects = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_PROJECTS, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          props.set_all_projects(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDashboardDetails = () => {
    axios
      .get(BACKEND_URLS.DASHBOARD_DETAILS, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          setDashboardDetails(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllProjects();
    fetchDashboardDetails();
  }, []);

  return (
    <Fragment>
      <div className="application">
        <div className="selectTable">
          {dashboardDetails ? (
            <div className="pieCharts">
              {dashboardDetails.map((each_pie_chart_details) => {
                const labels = [
                  'Total Expense Amount',
                  'Total Revenue Amount',
                  'Total Inflow Payment Amount',
                  'Total Outflow Payment Amount',
                ];
                const data = {
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(0, 0, 0)',
                      ],
                      borderWidth: 0,
                      data: [
                        each_pie_chart_details['totalExpense'],
                        each_pie_chart_details['totalRevenue'],
                        each_pie_chart_details['totalInflowPayment'],
                        each_pie_chart_details['totalOutflowPayment'],
                      ],
                      hoverOffset: 4,
                    },
                  ],
                  labels: labels,
                };
                return (
                  <div className="pieChart">
                    <h3>
                      {each_pie_chart_details['projectDetails']['PR_Name']}
                    </h3>
                    <Pie data={data} />
                  </div>
                );
              })}
            </div>
          ) : null}
          <h2>List of all Projects</h2>
          <table>
            <tbody>
              {props.projects?.projects.map((each_project) => {
                return (
                  <tr
                    key={each_project['PR_ID']}
                    onClick={() => {
                      navigate(`/project/${each_project['PR_ID']}`);
                    }}
                  >
                    <td>{each_project['PR_Name']}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  projects: state.projects,
});

const mapDispatchToProps = (dispatch) => ({
  set_all_projects: (projects) => dispatch(actions.set_all_projects(projects)),
  set_selected_project: (project) =>
    dispatch(actions.set_project_details(project)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
