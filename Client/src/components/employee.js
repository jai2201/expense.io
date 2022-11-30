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

function Employee({ projectID, ...props }) {
  const [filteredData, setFilteredData] = useState([]);
  const [values, setValues] = useState({
    employeeID: '',
    employeeName: '',
    employeeCode: '',
    employeeDesignation: '',
    employeeSalary: '',
    employeeDateOfJoining: '',
    employeeDateOfExit: '',
    employeeProjectID: projectID,
    employeeIsActive: '',
    selectedEmployee: null,
  });

  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: 'Employee Name',
        accessor: 'EM_Name',
        filterable: true,
      },
      {
        Header: 'Project Name',
        accessor: 'PR_Name',
        filterable: true,
      },
      {
        Header: 'Employee Code',
        accessor: 'EM_Code',
        filterable: true,
      },
      {
        Header: 'Employee Designation',
        accessor: 'EM_Designation',
        filterable: true,
      },
      {
        Header: 'Employee Salary',
        accessor: 'EM_Salary',
        filterable: true,
      },
      {
        Header: 'Employee Date of Joining',
        accessor: 'EM_DateOfJoiningInFormat',
        filterable: true,
      },
      {
        Header: 'Employee Date of Exit',
        accessor: 'EM_DateOfExitInFormat',
        filterable: true,
      },
      {
        Header: 'Is Active',
        accessor: 'EM_IsActive',
        filterable: true,
        Cell: (e) => (
          <input disabled type="checkbox" defaultChecked={e.value} />
        ),
      },
    ],
    [filteredData]
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

  const fetchAllEmployeesForAProject = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_EMPLOYEES_FOR_A_PROJECT, {
        headers: {
          token: localStorage.getItem('token'),
        },
        params: {
          project_id: projectID,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          props.set_all_employees(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllEmployeesForAProject();
  }, []);

  useEffect(() => {
    setFilteredData(props.employees.employees);
  }, [props.employees.employees]);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      axios
        .post(
          BACKEND_URLS.ADD_NEW_EMPLOYEE,
          {
            employee: {
              project_id: values.employeeProjectID,
              employee_code: values.employeeCode,
              employee_name: values.employeeName,
              employee_designation: values.employeeDesignation,
              employee_salary: values.employeeSalary,
              employee_date_of_joining: values.employeeDateOfJoining,
              employee_date_of_exit: values.employeeDateOfExit,
              is_active: values.employeeIsActive,
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
            fetchAllEmployeesForAProject();
            setAddModalShow(false);
            setValues({
              employeeID: '',
              employeeProjectID: projectID,
              employeeName: '',
              employeeCode: '',
              employeeDesignation: '',
              employeeSalary: '',
              employeeDateOfJoining: '',
              employeeDateOfExit: '',
              employeeIsActive: '',
              selectedEmployee: null,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            `Failed to add the new employee, please try again. ${err.response.data.message}`
          );
        });
    }
  };

  const selectEditEmployee = (employee) => {
    setValues({
      employeeID: employee['EM_ID'],
      employeeName: employee['EM_Name'],
      employeeCode: employee['EM_Code'],
      employeeDesignation: employee['EM_Designation'],
      employeeSalary: employee['EM_Salary'],
      employeeDateOfJoining: employee['EM_DateOfJoiningInFormat'],
      employeeDateOfExit: employee['EM_DateOfExitInFormat'],
      employeeProjectID: employee['EM_PR_ID'],
      employeeIsActive: employee['EM_IsActive'],
      selectedEmployee: employee,
    });
    setEditModalShow(true);
  };

  const handleEditEmployee = (e) => {
    e.preventDefault();
    axios
      .put(
        BACKEND_URLS.EDIT_A_EMPLOYEE,
        {
          employee: {
            project_id: values.employeeProjectID,
            employee_id: values.employeeID,
            employee_code: values.employeeCode,
            employee_name: values.employeeName,
            employee_designation: values.employeeDesignation,
            employee_salary: values.employeeSalary,
            employee_date_of_joining: values.employeeDateOfJoining,
            employee_date_of_exit: values.employeeDateOfExit,
            is_active: values.employeeIsActive,
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
          toast.success(`Successfully edited the employee details.`, {
            autoClose: 6000,
          });
          fetchAllEmployeesForAProject();
          setEditModalShow(false);
          setValues({
            employeeID: '',
            employeeProjectID: projectID,
            employeeName: '',
            employeeCode: '',
            employeeDesignation: '',
            employeeSalary: '',
            employeeDateOfJoining: '',
            employeeDateOfExit: '',
            employeeIsActive: '',
            selectedEmployee: null,
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to edit the employee details, please try again. ${err.response.data.message}`
        );
      });
  };

  const handleDeleteEmployee = (e) => {
    e.preventDefault();
    axios
      .delete(BACKEND_URLS.DELETE_A_EMPLOYEE, {
        params: {
          employee_id: values.employeeID,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success(`Successfully deleted the employee.`, {
            autoClose: 6000,
          });
          fetchAllEmployeesForAProject();
          setEditModalShow(false);
          setValues({
            employeeID: '',
            employeeProjectID: projectID,
            employeeName: '',
            employeeCode: '',
            employeeDesignation: '',
            employeeSalary: '',
            employeeDateOfJoining: '',
            employeeDateOfExit: '',
            employeeIsActive: '',
            selectedEmployee: null,
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to delete the employee, please try again. ${err.response.data.message}`
        );
      });
  };

  useEffect(() => {
    if (values.selectedEmployee && values.selectedEmployee != '') {
      props.set_selected_employee(values.selectedEmployee);
    } else {
      props.set_selected_employee(null);
    }
  }, [values.selectedEmployee]);

  return (
    <Fragment>
      <div className="application">
        <div className="appTab">
          <AddModal
            addModalShow={addModalShow}
            setAddModalShow={setAddModalShow}
            title="Add Employee"
          >
            <form onSubmit={handleAddEmployee}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Employee Name</span>
                      <input
                        type="text"
                        value={values.employeeName}
                        onChange={handleChange('employeeName')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Employee Code</span>
                      <input
                        type="text"
                        value={values.employeeCode}
                        onChange={handleChange('employeeCode')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Employee Designation</span>
                      <input
                        type="text"
                        value={values.employeeDesignation}
                        onChange={handleChange('employeeDesignation')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Employee Salary</span>
                      <input
                        type="text"
                        value={values.employeeSalary}
                        onChange={handleChange('employeeSalary')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Date Of Joining</span>
                      <input
                        type="date"
                        required
                        value={values.employeeDateOfJoining}
                        onChange={handleChange('employeeDateOfJoining')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Date of Exit</span>
                      <input
                        type="date"
                        value={values.employeeDateOfExit}
                        onChange={handleChange('employeeDateOfExit')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Is Active</span>
                      <select
                        onChange={handleChange('employeeIsActive')}
                        value={values.employeeIsActive}
                      >
                        <option value={null}>--SELECT--</option>
                        <option value={'true'}>Yes</option>
                        <option value={'false'}>No</option>
                      </select>
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
            title="Edit Employee"
          >
            <form onSubmit={handleEditEmployee}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Employee Name</span>
                      <input
                        type="text"
                        value={values.employeeName}
                        onChange={handleChange('employeeName')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Employee Code</span>
                      <input
                        type="text"
                        value={values.employeeCode}
                        onChange={handleChange('employeeCode')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Employee Designation</span>
                      <input
                        type="text"
                        value={values.employeeDesignation}
                        onChange={handleChange('employeeDesignation')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Employee Salary</span>
                      <input
                        type="text"
                        value={values.employeeSalary}
                        onChange={handleChange('employeeSalary')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Date Of Joining</span>
                      <input
                        type="date"
                        required
                        value={values.employeeDateOfJoining}
                        onChange={handleChange('employeeDateOfJoining')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Date of Exit</span>
                      <input
                        type="date"
                        value={values.employeeDateOfExit}
                        onChange={handleChange('employeeDateOfExit')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Is Active</span>
                      <select
                        onChange={handleChange('employeeIsActive')}
                        value={values.employeeIsActive}
                      >
                        <option value={null}>--SELECT--</option>
                        <option value={'true'}>Yes</option>
                        <option value={'false'}>No</option>
                      </select>
                      <br />
                      <br />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type="submit" className="greenButton">
                Save Changes
              </button>
              <button
                type="button"
                className="redButton"
                onClick={handleDeleteEmployee}
              >
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
                  employeeID: '',
                  employeeProjectID: projectID,
                  employeeName: '',
                  employeeCode: '',
                  employeeDesignation: '',
                  employeeSalary: '',
                  employeeDateOfJoining: '',
                  employeeDateOfExit: '',
                  employeeIsActive: '',
                  selectedEmployee: null,
                });
              }}
            >
              <i className="fas fa-plus"></i> Add Employee
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
                      selectEditEmployee(row.original);
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
  employees: state.employees,
});

const mapDispatchToProps = (dispatch) => ({
  set_all_employees: (employees) =>
    dispatch(actions.set_all_employees(employees)),
  set_selected_employee: (employee) =>
    dispatch(actions.set_employee_details(employee)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
