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

function Payment({ projectID, ...props }) {
  const [filteredData, setFilteredData] = useState([]);
  const [values, setValues] = useState({
    paymentID: '',
    paymentType: '',
    transactionDate: '',
    transactionID: '',
    bankReferenceNumber: '',
    invoiceNumber: '',
    totalAmount: '',
    selectedPayment: null,
  });

  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: 'Payment Type',
        accessor: 'P_Type',
        filterable: true,
      },
      {
        Header: 'Transaction Date',
        accessor: 'P_TransactionDateInFormat',
        filterable: true,
      },
      {
        Header: 'Transaction ID',
        accessor: 'P_TransactionID',
        filterable: true,
      },
      {
        Header: 'Bank Reference Number',
        accessor: 'P_BankReferenceNumber',
        filterable: true,
      },
      {
        Header: 'Invoice Number',
        accessor: 'P_InvoiceNumber',
        filterable: true,
      },
      {
        Header: 'Total Amount',
        accessor: 'P_TotalAmount',
        filterable: true,
      },
      {
        Header: 'Is Mapped',
        accessor: 'P_IsMappedOrUnmapped',
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

  const fetchProjectPayments = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_PAYMENTS_FOR_A_PROJECT, {
        headers: {
          token: localStorage.getItem('token'),
        },
        params: {
          project_id: projectID,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          props.set_all_payments(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProjectPayments();
  }, []);

  useEffect(() => {
    setFilteredData(props.payments.payments);
  }, [props.payments.payments]);

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      axios
        .post(
          BACKEND_URLS.ADD_NEW_PAYMENT,
          {
            payment: {
              payment_type: values.paymentType,
              project_id: projectID,
              transaction_date: values.transactionDate,
              transaction_id: values.transactionID,
              bank_reference_number: values.bankReferenceNumber,
              invoice_number: values.invoiceNumber,
              total_amount: values.totalAmount,
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
            fetchProjectPayments();
            setAddModalShow(false);
            setValues({
              paymentID: '',
              paymentType: '',
              transactionDate: '',
              transactionID: '',
              bankReferenceNumber: '',
              invoiceNumber: '',
              totalAmount: '',
              selectedPayment: null,
            });
          }
        })
        .catch((err) => {
          toast.error(
            `Failed to add the new payment, please try again. ${err.response.data.message}`
          );
        });
    }
  };

  const selectEditPayment = (payment) => {
    setValues({
      paymentID: payment['P_ID'],
      paymentType: payment['P_Type'],
      transactionDate: payment['P_TransactionDateInFormat'],
      transactionID: payment['P_TransactionID'],
      bankReferenceNumber: payment['P_BankReferenceNumber'],
      invoiceNumber: payment['P_InvoiceNumber'],
      totalAmount: payment['P_TotalAmount'],
      selectedPayment: payment,
    });
    setEditModalShow(true);
  };

  const handleEditPayment = (e) => {
    e.preventDefault();
    axios
      .put(
        BACKEND_URLS.EDIT_A_PAYMENT,
        {
          payment: {
            payment_id: values.paymentID,
            project_id: projectID,
            payment_type: values.paymentType,
            transaction_date: values.transactionDate,
            transaction_id: values.transactionID,
            bank_reference_number: values.bankReferenceNumber,
            invoice_number: values.invoiceNumber,
            total_amount: values.totalAmount,
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
          toast.success(`Successfully edited the payment details.`, {
            autoClose: 6000,
          });
          fetchProjectPayments();
          setEditModalShow(false);
          setValues({
            paymentID: '',
            paymentType: '',
            transactionDate: '',
            transactionID: '',
            bankReferenceNumber: '',
            invoiceNumber: '',
            totalAmount: '',
            selectedPayment: null,
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to edit the payment details, please try again. ${err.response.data.message}`
        );
      });
  };

  const handleDeletePayment = (e) => {
    e.preventDefault();
    axios
      .delete(BACKEND_URLS.DELETE_A_PAYMENT, {
        params: {
          payment_id: values.paymentID,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success(`Successfully deleted the payment.`, {
            autoClose: 6000,
          });
          fetchProjectPayments();
          setEditModalShow(false);
          setValues({
            paymentID: '',
            paymentType: '',
            transactionDate: '',
            transactionID: '',
            bankReferenceNumber: '',
            invoiceNumber: '',
            totalAmount: '',
            selectedPayment: null,
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to delete the payment, please try again. ${err.response.data.message}`
        );
      });
  };

  useEffect(() => {
    if (values.selectedPayment && values.selectedPayment != '') {
      props.set_selected_payment(values.selectedPayment);
    } else {
      props.set_selected_payment(null);
    }
  }, [values.selectedPayment]);

  return (
    <Fragment>
      <div className="application">
        <div className="appTab">
          <AddModal
            addModalShow={addModalShow}
            setAddModalShow={setAddModalShow}
            title="Add Payment"
          >
            <form onSubmit={handleAddPayment}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Payment Type</span>
                      <select
                        onChange={handleChange('paymentType')}
                        value={values.paymentType}
                      >
                        <option>-- SELECT --</option>
                        <option value={'INFLOW'}>INFLOW</option>
                        <option value={'OUTFLOW'}>OUTFLOW</option>
                      </select>
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Transaction Date</span>
                      <input
                        type="date"
                        required
                        value={values.transactionDate}
                        onChange={handleChange('transactionDate')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Transaction ID</span>
                      <input
                        type="text"
                        value={values.transactionID}
                        onChange={handleChange('transactionID')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span>Bank Reference Number</span>
                      <input
                        type="text"
                        value={values.bankReferenceNumber}
                        onChange={handleChange('bankReferenceNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Invoice Number</span>
                      <input
                        type="text"
                        value={values.invoiceNumber}
                        onChange={handleChange('invoiceNumber')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Total Amount</span>
                      <input
                        type="text"
                        value={values.totalAmount}
                        onChange={handleChange('totalAmount')}
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
            title="Edit Payment"
          >
            <form onSubmit={handleEditPayment}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Payment Type</span>
                      <select
                        onChange={handleChange('paymentType')}
                        value={values.paymentType}
                      >
                        <option>-- SELECT --</option>
                        <option value={'INFLOW'}>INFLOW</option>
                        <option value={'OUTFLOW'}>OUTFLOW</option>
                      </select>
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Transaction Date</span>
                      <input
                        type="date"
                        required
                        value={values.transactionDate}
                        onChange={handleChange('transactionDate')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Transaction ID</span>
                      <input
                        type="text"
                        value={values.transactionID}
                        onChange={handleChange('transactionID')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span>Bank Reference Number</span>
                      <input
                        type="text"
                        value={values.bankReferenceNumber}
                        onChange={handleChange('bankReferenceNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Invoice Number</span>
                      <input
                        type="text"
                        value={values.invoiceNumber}
                        onChange={handleChange('invoiceNumber')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Total Amount</span>
                      <input
                        type="text"
                        value={values.totalAmount}
                        onChange={handleChange('totalAmount')}
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
              <button onClick={handleDeletePayment} className="redButton">
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
                  paymentID: '',
                  paymentType: '',
                  transactionDate: '',
                  transactionID: '',
                  bankReferenceNumber: '',
                  invoiceNumber: '',
                  totalAmount: '',
                  selectedPayment: null,
                });
              }}
            >
              <i className="fas fa-plus"></i> Add Payment
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
                      selectEditPayment(row.original);
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
  payments: state.payments,
});

const mapDispatchToProps = (dispatch) => ({
  set_all_payments: (payments) => dispatch(actions.set_all_payments(payments)),
  set_selected_payment: (payment) =>
    dispatch(actions.set_payment_details(payment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
