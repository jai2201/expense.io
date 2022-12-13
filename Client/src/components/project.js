import React, { useMemo, useState, Fragment, useEffect } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { connect } from 'react-redux';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as BACKEND_URLS from '../utils/backendURLs';
import * as actions from '../store/actions/actions';
import * as CONSTANTS from '../utils/applicationConstants';

import AddModal from '../common/addModal';
import EditModal from '../common/editModal';

const RenderOptionsForProjectTypes = () => {
  return (
    <>
      <option value={null}>--SELECT--</option>
      {CONSTANTS.PROJECT_TYPES?.map((each_project_type) => {
        return (
          <option value={each_project_type} key={each_project_type}>
            {each_project_type}
          </option>
        );
      })}
    </>
  );
};

function Project(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [values, setValues] = useState({
    projectID: '',
    projectType: '',
    projectTypeID: '',
    projectName: '',
    projectCode: '',
    projectLocation: '',
    projectClientName: '',
    projectConcernPersonName: '',
    projectConcernPersonNumber: '',
    projectConcernPersonEmail: '',
    projectWorkOrderNumber: '',
    projectWorkOrderValue: '',
    projectWorkOrderDate: '',
    projectWorkOrderValidityYear: '',
    projectWorkOrderValidityMonth: '',
    projectWorkExecutionStartDate: '',
    selectedProject: null,
  });

  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: 'Project Name',
        accessor: 'PR_Name',
        filterable: true,
      },
      {
        Header: 'Project Type',
        accessor: 'PRT_Name',
        filterable: true,
      },
      {
        Header: 'Project Code',
        accessor: 'PR_Code',
        filterable: true,
      },
      {
        Header: 'Project Location',
        accessor: 'PR_Location',
        filterable: true,
      },
      {
        Header: 'Project Client Name',
        accessor: 'PR_ClientName',
        filterable: true,
      },
      {
        Header: 'Project Concern Person Name',
        accessor: 'PR_ConcernPersonName',
        filterable: true,
      },
      {
        Header: 'Project Concern Person Number',
        accessor: 'PR_ConcernPersonNumber',
        filterable: true,
      },
      {
        Header: 'Project Concern Person Email',
        accessor: 'PR_ConcernPersonEmail',
        filterable: true,
      },
      {
        Header: 'Project Work Order Number',
        accessor: 'PR_WorkOrderNumber',
        filterable: true,
      },
      {
        Header: 'Project Work Order Value',
        accessor: 'PR_WorkOrderValue',
        filterable: true,
      },
      {
        Header: 'Project Work Order Date',
        accessor: 'PR_WorkOrderDateInFormat',
        filterable: true,
      },
      {
        Header: 'Project Work Order Validity Year',
        accessor: 'PR_WorkOrderValidityYear',
        filterable: true,
      },
      {
        Header: 'Project Work Execution Start Date',
        accessor: 'PR_ExecutionStartDateInFormat',
        filterable: true,
      },
    ],
    []
  );

  const data = useMemo(() => filteredData, [filteredData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
  } = tableInstance;

  const { globalFilter } = state;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

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

  useEffect(() => {
    fetchAllProjects();
  }, []);

  useEffect(() => {
    setFilteredData(props.projects.projects);
  }, [props.projects.projects]);

  const handleAddProject = (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      axios
        .post(
          BACKEND_URLS.ADD_NEW_PROJECT,
          {
            project: {
              project_type_id:
                CONSTANTS.PROJECT_TYPE_MAPPING[values.projectType],
              project_name: values.projectName,
              project_code: values.projectCode,
              project_location: values.projectLocation,
              client_name: values.projectClientName,
              concern_person_name: values.projectConcernPersonName,
              concern_person_number: values.projectConcernPersonNumber,
              concern_person_email: values.projectConcernPersonEmail,
              work_order_number: values.projectWorkOrderNumber,
              work_order_value: values.projectWorkOrderValue,
              work_order_date: values.projectWorkOrderDate,
              work_order_validity_year: values.projectWorkOrderValidityYear,
              work_order_validity_month: values.projectWorkOrderValidityMonth,
              execution_start_date: values.projectWorkExecutionStartDate,
            },
          },
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            fetchAllProjects();
            setAddModalShow(false);
            setValues({
              projectID: '',
              projectType: '',
              projectTypeID: '',
              projectName: '',
              projectCode: '',
              projectLocation: '',
              projectClientName: '',
              projectConcernPersonName: '',
              projectConcernPersonNumber: '',
              projectConcernPersonEmail: '',
              projectWorkOrderNumber: '',
              projectWorkOrderValue: '',
              projectWorkOrderDate: '',
              projectWorkOrderValidityYear: '',
              projectWorkOrderValidityMonth: '',
              projectWorkExecutionStartDate: '',
              selectedProject: null,
            });
          }
        })
        .catch((err) => {
          toast.error(
            `Failed to add the new project, please try again. ${err.response.data.message}`
          );
        });
    }
  };

  const selectEditProject = (project) => {
    setValues({
      projectID: project['PR_ID'],
      projectType: project['PRT_Name'],
      projectTypeID: project['PR_PRT_ID'],
      projectName: project['PR_Name'],
      projectCode: project['PR_Code'],
      projectLocation: project['PR_Location'],
      projectClientName: project['PR_ClientName'],
      projectConcernPersonName: project['PR_ConcernPersonName'],
      projectConcernPersonNumber: project['PR_ConcernPersonNumber'],
      projectConcernPersonEmail: project['PR_ConcernPersonEmail'],
      projectWorkOrderNumber: project['PR_WorkOrderNumber'],
      projectWorkOrderValue: project['PR_WorkOrderValue'],
      projectWorkOrderDate: project['PR_WorkOrderDateInFormat'],
      projectWorkOrderValidityYear: project['PR_WorkOrderValidityYear'],
      projectWorkOrderValidityMonth: project['PR_WorkOrderValidityMonth'],
      projectWorkExecutionStartDate: project['PR_ExecutionStartDateInFormat'],
      selectedProject: project,
    });
    setEditModalShow(true);
  };

  const handleEditProject = (e) => {
    e.preventDefault();
    axios
      .put(
        BACKEND_URLS.EDIT_A_PROJECT,
        {
          project: {
            project_id: values.projectID,
            project_type_id: CONSTANTS.PROJECT_TYPE_MAPPING[values.projectType],
            project_name: values.projectName,
            project_code: values.projectCode,
            project_location: values.projectLocation,
            client_name: values.projectClientName,
            concern_person_name: values.projectConcernPersonName,
            concern_person_number: values.projectConcernPersonNumber,
            concern_person_email: values.projectConcernPersonEmail,
            work_order_number: values.projectWorkOrderNumber,
            work_order_value: values.projectWorkOrderValue,
            work_order_date: values.projectWorkOrderDate,
            work_order_validity_year: values.projectWorkOrderValidityYear,
            work_order_validity_month: values.projectWorkOrderValidityMonth,
            execution_start_date: values.projectWorkExecutionStartDate,
          },
        },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          fetchAllProjects();
          setEditModalShow(false);
          setValues({
            projectID: '',
            projectType: '',
            projectTypeID: '',
            projectName: '',
            projectCode: '',
            projectLocation: '',
            projectClientName: '',
            projectConcernPersonName: '',
            projectConcernPersonNumber: '',
            projectConcernPersonEmail: '',
            projectWorkOrderNumber: '',
            projectWorkOrderValue: '',
            projectWorkOrderDate: '',
            projectWorkOrderValidityYear: '',
            projectWorkOrderValidityMonth: '',
            projectWorkExecutionStartDate: '',
            selectedProject: null,
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to edit the project details, please try again. ${err.response.data.message}`
        );
      });
  };

  const handleDeleteProject = (e) => {
    e.preventDefault();
    axios
      .delete(BACKEND_URLS.DELETE_A_PROJECT, {
        params: {
          project_id: values.projectID,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          fetchAllProjects();
          setEditModalShow(false);
          setValues({
            projectID: '',
            projectType: '',
            projectTypeID: '',
            projectName: '',
            projectCode: '',
            projectLocation: '',
            projectClientName: '',
            projectConcernPersonName: '',
            projectConcernPersonNumber: '',
            projectConcernPersonEmail: '',
            projectWorkOrderNumber: '',
            projectWorkOrderValue: '',
            projectWorkOrderDate: '',
            projectWorkOrderValidityYear: '',
            projectWorkOrderValidityMonth: '',
            projectWorkExecutionStartDate: '',
            selectedProject: null,
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to delete the project, please try again. ${err.response.data.message}`
        );
      });
  };

  useEffect(() => {
    if (values.selectedProject && values.selectedProject != '') {
      props.set_selected_project(values.selectedProject);
    } else {
      props.set_selected_project(null);
    }
  }, [values.selectedProject]);

  return (
    <Fragment>
      <div className="application">
        <div className="appTab">
          <AddModal
            addModalShow={addModalShow}
            setAddModalShow={setAddModalShow}
            title="Add Project"
          >
            <form onSubmit={handleAddProject}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Project Name</span>
                      <input
                        type="text"
                        value={values.projectName}
                        onChange={handleChange('projectName')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Code</span>
                      <input
                        type="text"
                        value={values.projectCode}
                        onChange={handleChange('projectCode')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Client Name</span>
                      <input
                        type="text"
                        value={values.projectClientName}
                        onChange={handleChange('projectClientName')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Project Type</span>
                      <select
                        onChange={handleChange('projectType')}
                        value={values.projectType}
                      >
                        <RenderOptionsForProjectTypes />
                      </select>
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Location</span>
                      <input
                        type="text"
                        value={values.projectLocation}
                        onChange={handleChange('projectLocation')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Concern Person Name</span>
                      <input
                        type="text"
                        value={values.projectConcernPersonName}
                        onChange={handleChange('projectConcernPersonName')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span>Project Concern Person Email</span>
                      <input
                        type="text"
                        value={values.projectConcernPersonEmail}
                        onChange={handleChange('projectConcernPersonEmail')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Concern Person Number</span>
                      <input
                        type="text"
                        value={values.projectConcernPersonNumber}
                        onChange={handleChange('projectConcernPersonNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Work Order Number</span>
                      <input
                        type="text"
                        value={values.projectWorkOrderNumber}
                        onChange={handleChange('projectWorkOrderNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Project Work Order Value</span>
                      <input
                        type="text"
                        value={values.projectWorkOrderValue}
                        onChange={handleChange('projectWorkOrderValue')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Work Order Date</span>
                      <input
                        type="date"
                        required
                        value={values.projectWorkOrderDate}
                        onChange={handleChange('projectWorkOrderDate')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Work Order Validity in years</span>
                      <input
                        type="number"
                        value={values.projectWorkOrderValidityYear}
                        onChange={handleChange('projectWorkOrderValidityYear')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Project Work Order Validity in months</span>
                      <input
                        type="number"
                        min={1}
                        max={12}
                        value={values.projectWorkOrderValidityMonth}
                        onChange={handleChange('projectWorkOrderValidityMonth')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Work Execution Start Date</span>
                      <input
                        type="date"
                        value={values.projectWorkExecutionStartDate}
                        onChange={handleChange('projectWorkExecutionStartDate')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type="submit" className="greenButton">
                Save Changes
              </button>
            </form>
          </AddModal>
          <EditModal
            editModalShow={editModalShow}
            setEditModalShow={setEditModalShow}
            title="Edit Project"
          >
            <form onSubmit={handleEditProject}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Project Name</span>
                      <input
                        type="text"
                        value={values.projectName}
                        onChange={handleChange('projectName')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Code</span>
                      <input
                        type="text"
                        value={values.projectCode}
                        onChange={handleChange('projectCode')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Client Name</span>
                      <input
                        type="text"
                        value={values.projectClientName}
                        onChange={handleChange('projectClientName')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Project Type</span>
                      <select
                        onChange={handleChange('projectType')}
                        value={values.projectType}
                      >
                        <RenderOptionsForProjectTypes />
                      </select>
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Location</span>
                      <input
                        type="text"
                        value={values.projectLocation}
                        onChange={handleChange('projectLocation')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Concern Person Name</span>
                      <input
                        type="text"
                        value={values.projectConcernPersonName}
                        onChange={handleChange('projectConcernPersonName')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span>Project Concern Person Email</span>
                      <input
                        type="text"
                        value={values.projectConcernPersonEmail}
                        onChange={handleChange('projectConcernPersonEmail')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Concern Person Number</span>
                      <input
                        type="text"
                        value={values.projectConcernPersonNumber}
                        onChange={handleChange('projectConcernPersonNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Work Order Number</span>
                      <input
                        type="text"
                        value={values.projectWorkOrderNumber}
                        onChange={handleChange('projectWorkOrderNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Project Work Order Value</span>
                      <input
                        type="text"
                        value={values.projectWorkOrderValue}
                        onChange={handleChange('projectWorkOrderValue')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Work Order Date</span>
                      <input
                        type="date"
                        required
                        value={values.projectWorkOrderDate}
                        onChange={handleChange('projectWorkOrderDate')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Work Order Validity in years</span>
                      <input
                        type="number"
                        value={values.projectWorkOrderValidityYear}
                        onChange={handleChange('projectWorkOrderValidityYear')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Project Work Order Validity in months</span>
                      <input
                        type="number"
                        min={1}
                        max={12}
                        value={values.projectWorkOrderValidityMonth}
                        onChange={handleChange('projectWorkOrderValidityMonth')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Work Execution Start Date</span>
                      <input
                        type="date"
                        value={values.projectWorkExecutionStartDate}
                        onChange={handleChange('projectWorkExecutionStartDate')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type="submit" className="greenButton">
                Save Changes
              </button>
              <button onClick={handleDeleteProject} className="redButton">
                Delete
              </button>
            </form>
          </EditModal>
          <div>
            <button
              className="blueButton"
              onClick={() => {
                setAddModalShow(true);
                setValues({
                  projectID: '',
                  projectType: '',
                  projectTypeID: '',
                  projectName: '',
                  projectCode: '',
                  projectLocation: '',
                  projectClientName: '',
                  projectConcernPersonName: '',
                  projectConcernPersonNumber: '',
                  projectConcernPersonEmail: '',
                  projectWorkOrderNumber: '',
                  projectWorkOrderValue: '',
                  projectWorkOrderDate: '',
                  projectWorkOrderValidityYear: '',
                  projectWorkOrderValidityMonth: '',
                  projectWorkExecutionStartDate: '',
                  selectedProject: null,
                });
              }}
            >
              <i className="fas fa-plus"></i> Add Project
            </button>
          </div>
        </div>
        <div className="selectTable">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="tableHeading"
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={column.id}
                    >
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <i className="fas fa-angle-down sortIcon"></i>
                          ) : (
                            <i className="fas fa-angle-up sortIcon"></i>
                          )
                        ) : (
                          ''
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    key={row.id}
                    onClick={() => {
                      selectEditProject(row.original);
                    }}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Project);
