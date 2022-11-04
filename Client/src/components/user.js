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

const RenderOptionsForUserTypes = () => {
  return (
    <>
      <option value={null}>--SELECT--</option>
      <option value={'REVIEWER'}>REVIEWER</option>
      <option value={'APPROVER'}>APPROVER</option>
      <option value={'INITIATOR'}>INITIATOR</option>
    </>
  );
};

function User(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 'INITIATOR',
    isActive: 'true',
    selectedUser: null,
    userID: '',
    userTypeID: '',
  });

  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: 'Email',
        accessor: 'U_Email',
        filterable: true,
      },
      {
        Header: 'First Name',
        accessor: 'U_FirstName',
        filterable: true,
      },
      {
        Header: 'Last Name',
        accessor: 'U_LastName',
        filterable: true,
      },
      {
        Header: 'User Type',
        accessor: 'UT_Name',
        filterable: true,
      },
      {
        Header: 'Is Active',
        accessor: 'U_IsActive',
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

  const fetchAllUsers = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_USERS, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          props.set_all_users(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    setFilteredData(props.users.users);
  }, [props.users.users]);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      axios
        .post(
          BACKEND_URLS.ADD_NEW_USER,
          {
            user: {
              first_name: values.firstName.trim(),
              last_name: values.lastName.trim(),
              email: values.email.toLowerCase().trim(),
              password: values.password.trim(),
              user_type_id: CONSTANTS.USER_TYPE_ID_MAPPING[values.userType],
              is_active: 'true',
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
            fetchAllUsers();
            setAddModalShow(false);
            setValues({
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              userType: 'INITIATOR',
              isActive: 'true',
              selectedUser: null,
              userID: '',
              userTypeID: '',
            });
          }
        })
        .catch((err) => {
          toast.error(`Failed to add new user. ${err.response.data.message}`);
        });
    }
  };

  const selectEditUser = (user) => {
    setValues({
      userID: user['U_ID'],
      firstName: user['U_FirstName'],
      lastName: user['U_LastName'],
      email: user['U_Email'],
      password: '',
      userType: user['UT_Name'],
      userTypeID: user['U_UT_ID'],
      isActive: user['U_IsActive'],
      selectedUser: user,
    });
    setEditModalShow(true);
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    let new_user_object;
    if (values.password.trim() != '') {
      new_user_object = {
        user_id: values.userID,
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        email: values.email.toLowerCase().trim(),
        user_type_id: CONSTANTS.USER_TYPE_ID_MAPPING[values.userType],
        is_active: values.isActive,
        password: values.password.trim(),
      };
    } else {
      new_user_object = {
        user_id: values.userID,
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        email: values.email.toLowerCase().trim(),
        user_type_id: CONSTANTS.USER_TYPE_ID_MAPPING[values.userType],
        is_active: values.isActive,
      };
    }
    axios

      .put(
        BACKEND_URLS.EDIT_A_USER,
        { user: new_user_object },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          fetchAllUsers();
          setEditModalShow(false);
          setValues({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            userType: 'INITIATOR',
            isActive: 'true',
            selectedUser: null,
            userID: '',
            userTypeID: '',
          });
        }
      })
      .catch((err) => {});
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    axios
      .delete(BACKEND_URLS.DELETE_A_USER, {
        params: {
          user_id: values.userID,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          fetchAllUsers();
          setEditModalShow(false);
          setValues({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            userType: 'INITIATOR',
            isActive: 'true',
            selectedUser: null,
            userID: '',
            userTypeID: '',
          });
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (values.selectedUser && values.selectedUser != '') {
      props.set_selected_user(values.selectedUser);
    } else {
      props.set_selected_user(null);
    }
  }, [values.selectedUser]);

  return (
    <Fragment>
      <div className="application">
        <div className="appTab">
          <AddModal
            addModalShow={addModalShow}
            setAddModalShow={setAddModalShow}
            title="Add User"
          >
            <form onSubmit={handleAddUser}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>First Name</span>
                      <input
                        type="text"
                        value={values.firstName}
                        onChange={handleChange('firstName')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Last Name</span>
                      <input
                        type="text"
                        value={values.lastName}
                        onChange={handleChange('lastName')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Email</span>
                      <input
                        type="email"
                        value={values.email}
                        onChange={handleChange('email')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Password</span>
                      <input
                        type="password"
                        value={values.password}
                        onChange={handleChange('password')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>User Role</span>
                      <select
                        onChange={handleChange('userType')}
                        value={values.userType}
                      >
                        <RenderOptionsForUserTypes />
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
            title="Edit User"
          >
            <form onSubmit={handleEditUser}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>First Name</span>
                      <input
                        type="text"
                        value={values.firstName}
                        onChange={handleChange('firstName')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Last Name</span>
                      <input
                        type="text"
                        value={values.lastName}
                        onChange={handleChange('lastName')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Email</span>
                      <input
                        type="email"
                        value={values.email}
                        onChange={handleChange('email')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Is Active</span>
                      <select
                        onChange={handleChange('isActive')}
                        value={values.isActive}
                      >
                        <option value={null}>--SELECT--</option>
                        <option value={'true'}>Yes</option>
                        <option value={'false'}>No</option>
                      </select>
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>User Role</span>
                      <select
                        onChange={handleChange('userType')}
                        value={values.userType}
                      >
                        <RenderOptionsForUserTypes />
                      </select>
                      <br />
                      <br />
                    </td>
                  </tr>
                  {props.users.selected_user ? (
                    <tr>
                      <td>
                        <span>Password</span>
                        <input
                          type="text"
                          value={values.password}
                          onChange={handleChange('password')}
                        />
                        <br />
                        <br />
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
              <button type="submit" className="greenButton">
                Save Changes
              </button>
              <button onClick={handleDeleteUser} className="redButton">
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
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  userType: 'INITIATOR',
                  isActive: 'true',
                  selectedUser: null,
                  userID: '',
                  userTypeID: '',
                });
              }}
            >
              <i className="fas fa-plus"></i> Add User
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
                      selectEditUser(row.original);
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
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  set_all_users: (users) => dispatch(actions.set_all_users(users)),
  set_selected_user: (user) => dispatch(actions.set_user_details(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
