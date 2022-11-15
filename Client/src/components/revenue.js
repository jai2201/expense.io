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

function Revenue(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [values, setValues] = useState({
    revenueID: '',
    customerInvoiceNumber: '',
    projectWorkOrderNumber: '',
    clientInvoiceNumber: '',
    clientInvoiceDate: '',
    basicValue: '',
    cgst: '',
    sgst: '',
    igst: '',
    totalTax: '',
    selectedReveue: null,
  });

  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: 'Customer Invoice Number',
        accessor: 'R_CustomerInvoiceNumber',
        filterable: true,
      },
      {
        Header: 'Project Work Order Number',
        accessor: 'R_ProjectWorkOrderNumber',
        filterable: true,
      },
      {
        Header: 'Client Invoice Number',
        accessor: 'R_ClientInvoiceNumber',
        filterable: true,
      },
      {
        Header: 'Client Invoice Date',
        accessor: 'R_ClientInvoiceDate',
        filterable: true,
      },
      {
        Header: 'Basic Value',
        accessor: 'R_BasicValue',
        filterable: true,
      },
      {
        Header: 'CGST',
        accessor: 'R_CGST',
        filterable: true,
      },
      {
        Header: 'SGST',
        accessor: 'R_SGST',
        filterable: true,
      },
      {
        Header: 'IGST',
        accessor: 'R_IGST',
        filterable: true,
      },
      {
        Header: 'Total Tax',
        accessor: 'R_TotalTax',
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

  const fetchAllRevenues = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_REVENUES, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          props.set_all_revenues(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllRevenues();
  }, []);

  useEffect(() => {
    setFilteredData(props.revenues.revenues);
  }, [props.revenues.revenues]);

  const handleAddRevenue = (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      axios
        .post(
          BACKEND_URLS.ADD_NEW_REVENUE,
          {
            revenue: {
              customer_invoice_number: values.customerInvoiceNumber,
              project_work_order_number: values.projectWorkOrderNumber,
              client_invoice_date: values.clientInvoiceDate,
              client_invoice_number: values.clientInvoiceNumber,
              basic_value: values.basicValue,
              cgst: values.cgst,
              sgst: values.sgst,
              igst: values.igst,
              total_tax: values.totalTax,
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
            fetchAllRevenues();
            setAddModalShow(false);
            setValues({
              revenueID: '',
              customerInvoiceNumber: '',
              projectWorkOrderNumber: '',
              clientInvoiceNumber: '',
              clientInvoiceDate: '',
              basicValue: '',
              cgst: '',
              sgst: '',
              igst: '',
              totalTax: '',
              selectedReveue: null,
            });
          }
        })
        .catch((err) => {
          toast.error(
            `Failed to add the new revenue, please try again. ${err.response.data.message}`
          );
        });
    }
  };

  const selectEditRevenue = (revenue) => {
    setValues({
      revenueID: revenue['R_ID'],
      customerInvoiceNumber: revenue['R_CustomerInvoiceNumber'],
      projectWorkOrderNumber: revenue['R_ProjectWorkOrderNumber'],
      clientInvoiceNumber: revenue['R_ClientInvoiceNumber'],
      clientInvoiceDate: revenue['R_ClientInvoiceDateInFormat'],
      basicValue: revenue['R_BasicValue'],
      cgst: revenue['R_CGST'],
      sgst: revenue['R_SGST'],
      igst: revenue['R_IGST'],
      totalTax: revenue['R_TotalTax'],
      selectedReveue: null,
    });
    setEditModalShow(true);
  };

  const handleEditRevenue = (e) => {
    e.preventDefault();
    axios
      .put(
        BACKEND_URLS.EDIT_A_REVENUE,
        {
          revenue: {
            revenue_id: values.revenueID,
            customer_invoice_number: values.customerInvoiceNumber,
            project_work_order_number: values.projectWorkOrderNumber,
            client_invoice_date: values.clientInvoiceDate,
            client_invoice_number: values.clientInvoiceNumber,
            basic_value: values.basicValue,
            cgst: values.cgst,
            sgst: values.sgst,
            igst: values.igst,
            total_tax: values.totalTax,
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
          toast.success(`Successfully edited the revenue details.`, {
            autoClose: 6000,
          });
          fetchAllRevenues();
          setEditModalShow(false);
          setValues({
            revenueID: '',
            customerInvoiceNumber: '',
            projectWorkOrderNumber: '',
            clientInvoiceNumber: '',
            clientInvoiceDate: '',
            basicValue: '',
            cgst: '',
            sgst: '',
            igst: '',
            totalTax: '',
            selectedReveue: null,
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to edit the revenue details, please try again. ${err.response.data.message}`
        );
      });
  };

  const handleDeleteRevenue = (e) => {
    e.preventDefault();
    axios
      .delete(BACKEND_URLS.DELETE_A_REVENUE, {
        params: {
          revenue_id: values.revenueID,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success(`Successfully deleted the revenue.`, {
            autoClose: 6000,
          });
          fetchAllRevenues();
          setEditModalShow(false);
          setValues({
            revenueID: '',
            customerInvoiceNumber: '',
            projectWorkOrderNumber: '',
            clientInvoiceNumber: '',
            clientInvoiceDate: '',
            basicValue: '',
            cgst: '',
            sgst: '',
            igst: '',
            totalTax: '',
            selectedReveue: null,
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to delete the revenue, please try again. ${err.response.data.message}`
        );
      });
  };

  useEffect(() => {
    if (values.selectedReveue && values.selectedReveue != '') {
      props.set_selected_revenue(values.selectedReveue);
    } else {
      props.set_selected_revenue(null);
    }
  }, [values.selectedReveue]);

  return (
    <Fragment>
      <div className="application">
        <div className="appTab">
          <AddModal
            addModalShow={addModalShow}
            setAddModalShow={setAddModalShow}
            title="Add Revenue"
          >
            <form onSubmit={handleAddRevenue}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Customer Invoice Number</span>
                      <input
                        type="text"
                        value={values.customerInvoiceNumber}
                        onChange={handleChange('customerInvoiceNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Work Order Number</span>
                      <input
                        type="text"
                        required
                        value={values.projectWorkOrderNumber}
                        onChange={handleChange('projectWorkOrderNumber')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Client Invoice Number</span>
                      <input
                        type="text"
                        required
                        value={values.clientInvoiceNumber}
                        onChange={handleChange('clientInvoiceNumber')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span>Client Invoice Date</span>
                      <input
                        type="date"
                        required
                        value={values.clientInvoiceDate}
                        onChange={handleChange('clientInvoiceDate')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Basic Value</span>
                      <input
                        type="text"
                        value={values.basicValue}
                        onChange={handleChange('basicValue')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>CGST </span>
                      <input
                        type="text"
                        value={values.cgst}
                        onChange={handleChange('cgst')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>SGST </span>
                      <input
                        type="text"
                        value={values.sgst}
                        onChange={handleChange('sgst')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>IGST </span>
                      <input
                        type="text"
                        value={values.igst}
                        onChange={handleChange('igst')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Total Tax </span>
                      <input
                        type="text"
                        value={values.totalTax}
                        onChange={handleChange('totalTax')}
                        required
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
            title="Edit Revenue"
          >
            <form onSubmit={handleEditRevenue}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Customer Invoice Number</span>
                      <input
                        type="text"
                        value={values.customerInvoiceNumber}
                        onChange={handleChange('customerInvoiceNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project Work Order Number</span>
                      <input
                        type="text"
                        required
                        value={values.projectWorkOrderNumber}
                        onChange={handleChange('projectWorkOrderNumber')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Client Invoice Number</span>
                      <input
                        type="text"
                        required
                        value={values.clientInvoiceNumber}
                        onChange={handleChange('clientInvoiceNumber')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span>Client Invoice Date</span>
                      <input
                        type="date"
                        required
                        value={values.clientInvoiceDate}
                        onChange={handleChange('clientInvoiceDate')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Basic Value</span>
                      <input
                        type="text"
                        value={values.basicValue}
                        onChange={handleChange('basicValue')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>CGST </span>
                      <input
                        type="text"
                        value={values.cgst}
                        onChange={handleChange('cgst')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>SGST </span>
                      <input
                        type="text"
                        value={values.sgst}
                        onChange={handleChange('sgst')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>IGST </span>
                      <input
                        type="text"
                        value={values.igst}
                        onChange={handleChange('igst')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Total Tax </span>
                      <input
                        type="text"
                        value={values.totalTax}
                        onChange={handleChange('totalTax')}
                        required
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
              <button onClick={handleDeleteRevenue} className="redButton">
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
                  revenueID: '',
                  customerInvoiceNumber: '',
                  projectWorkOrderNumber: '',
                  clientInvoiceNumber: '',
                  clientInvoiceDate: '',
                  basicValue: '',
                  cgst: '',
                  sgst: '',
                  igst: '',
                  totalTax: '',
                  selectedReveue: null,
                });
              }}
            >
              <i className="fas fa-plus"></i> Add Revenue
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
                      selectEditRevenue(row.original);
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
  revenues: state.revenues,
});

const mapDispatchToProps = (dispatch) => ({
  set_all_revenues: (revenues) => dispatch(actions.set_all_revenues(revenues)),
  set_selected_revenue: (revenue) =>
    dispatch(actions.set_revenue_details(revenue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Revenue);
