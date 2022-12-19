import React, { useState, useEffect, Fragment } from 'react';

import '../static/css/home.css';

import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import * as BACKEND_URLS from '../utils/backendURLs';

import { connect } from 'react-redux';
import * as actions from '../store/actions/actions';
import { useParams } from 'react-router-dom';
import Expense from './expense';
import Revenue from './revenue';
import Payment from './payment';
import Employee from './employee';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

function ProjectDetail(props) {
  const params = useParams();

  const [projectDetails, setProjectDetails] = useState([]);
  const [projectGraphDetails, setProjectGraphDetails] = useState([]);
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

  const fetchProfitAndLossGraphDetails = () => {
    axios
      .get(BACKEND_URLS.GET_PROJECT_GRAPH_DETAILS, {
        headers: {
          token: localStorage.getItem('token'),
        },
        params: {
          project_id: params.project_id,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setProjectGraphDetails(res.data.data);
        }
      });
  };

  useEffect(() => {
    fetchProjectDetails();
    fetchProfitAndLossGraphDetails();
  }, []);

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const mapOfDatasets = new Map();
  mapOfDatasets.set('Diesel Expenses', {
    label: 'Diesel Expenses',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: '#FF6347',
  });
  mapOfDatasets.set('Insurance Expenses', {
    label: 'Insurance Expenses',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: '#A52A2A',
  });
  mapOfDatasets.set('Project Expenses', {
    label: 'Project Expenses',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: '#DC143C',
  });
  mapOfDatasets.set('Rent-Guest House', {
    label: 'Rent-Guest House',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: '#E9967A',
  });
  mapOfDatasets.set('Business Promotion', {
    label: 'Business Promotion',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: '#FFA07A',
  });
  mapOfDatasets.set('Repair & Maintenance', {
    label: 'Repair & Maintenance',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: '#FF8C00',
  });
  mapOfDatasets.set('Site & Staff Expenses', {
    label: 'Site & Staff Expenses',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: '#9ACD32',
  });
  mapOfDatasets.set('Electricity Expenses', {
    label: 'Electricity Expenses',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: '#556B2F',
  });
  mapOfDatasets.set('Finance Cost', {
    label: 'Finance Cost',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: '#6B8E23',
  });
  mapOfDatasets.set('Miscellaneous Expenses', {
    label: 'Miscellaneous Expenses',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: '#008B8B',
  });
  mapOfDatasets.set('Printing & Stationery Expenses', {
    label: 'Printing & Stationery Expenses',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: '#8B008B',
  });
  mapOfDatasets.set('Rates, Taxes & Fees', {
    label: 'Rates, Taxes & Fees',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: '#BA55D3',
  });
  mapOfDatasets.set('Telephone & Mobile Expenses', {
    label: 'Telephone & Mobile Expenses',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    backgroundColor: 'rgb(75, 192, 192)',
  });
  mapOfDatasets.set('Revenues', {
    label: 'Revenues',
    data: [],
    backgroundColor: 'rgb(255, 99, 132)',
  });
  if (projectGraphDetails !== []) {
    const mapOfData = new Map(projectGraphDetails);
    mapOfData.forEach((monthObject, index) => {
      const revenueAmountOfMonth = monthObject['revenueAmount'];
      const expenses = monthObject['expenses'];
      expenses.forEach((each_expense) => {
        const expenseObject = mapOfDatasets.get(each_expense['EC_Category']);
        expenseObject.data[index - 1] = -each_expense['sum'];
      });
      const object = mapOfDatasets.get('Revenues');
      object.data.push(revenueAmountOfMonth);
    });
  }
  const dataValues = Array.from(mapOfDatasets.values());

  const data = {
    labels,
    datasets: dataValues,
  };

  return (
    <Fragment>
      <div className="application">
        <div className="selectTable">
          {projectDetails[0] ? (
            <div>
              <div className="projectDetails">
                <table>
                  <thead>
                    <tr className="tableHeading">
                      <th>Project Name</th>
                      <th>Project Code</th>
                      <th>Project Type</th>
                      <th>Project Client Name</th>
                      <th>Project Concern Person Name</th>
                      <th>Project Concern Person Number</th>
                      <th>Project Work Order Value</th>
                      <th>Project Work Order Date</th>
                      <th>Project Execution Start Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{projectDetails[0]['PR_Name']}</td>
                      <td>{projectDetails[0]['PR_Code']}</td>
                      <td>{projectDetails[0]['PRT_Name']}</td>
                      <td>{projectDetails[0]['PR_ClientName']}</td>
                      <td>{projectDetails[0]['PR_ConcernPersonName']}</td>
                      <td>{projectDetails[0]['PR_WorkOrderNumber']}</td>
                      <td>{projectDetails[0]['PR_WorkOrderValue']}</td>
                      <td>{projectDetails[0]['PR_WorkOrderDateInFormat']}</td>
                      <td>{projectDetails[0]['PR_ExecutionStartDate']}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <center>
                <h2>Charts</h2>
                <div className="barChartForProjectDetails">
                  <Bar options={options} data={data} />
                </div>
              </center>
              <Tabs>
                <TabList>
                  <Tab>Expenses</Tab>
                  <Tab>Revenues</Tab>
                  <Tab>Payments</Tab>
                  <Tab>Employees</Tab>
                </TabList>
                <TabPanel>
                  <Expense projectID={projectDetails[0]['PR_ID']} />
                </TabPanel>
                <TabPanel>
                  <Revenue
                    projectWorkOrderNumber={
                      projectDetails[0]['PR_WorkOrderNumber']
                    }
                  />
                </TabPanel>
                <TabPanel>
                  <Payment projectID={projectDetails[0]['PR_ID']} />
                </TabPanel>
                <TabPanel>
                  <Employee projectID={projectDetails[0]['PR_ID']} />
                </TabPanel>
              </Tabs>
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
