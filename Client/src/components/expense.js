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

const RenderOptionsForExpenseCodes = () => {
  return (
    <>
      <option value={null}>--SELECT--</option>
      {CONSTANTS.EXPENSE_CODES?.map((each_expense_code) => {
        return (
          <option key={each_expense_code} value={each_expense_code}>
            {each_expense_code}
          </option>
        );
      })}
    </>
  );
};

const RenderOptionsForExpenseIntervals = () => {
  return (
    <>
      <option value={null}>--SELECT--</option>
      {CONSTANTS.EXPENSE_INTERVAL_TYPES?.map((each_interval_type) => {
        return (
          <option key={each_interval_type} value={each_interval_type}>
            {each_interval_type}
          </option>
        );
      })}
    </>
  );
};

function Expense(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [values, setValues] = useState({
    expenseID: '',
    expenseProjectID: '',
    expenseProject: '',
    expenseType: '',
    expenseCode: '',
    expenseCodeID: '',
    expensePartnerID: '',
    expensePartner: '',
    expenseInterval: '',
    expenseStartDate: '',
    expenseEndDate: '',
    expenseDate: '',
    expenseInvoiceNumber: '',
    expenseInvoiceDate: '',
    expenseCostCenter: '',
    expenseBasicValue: '',
    expenseCGST: '',
    expenseSGST: '',
    expenseIGST: '',
    expenseTotalTax: '',
    selectedExpense: null,
  });

  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: 'Expense Type',
        accessor: 'E_Type',
        filterable: true,
      },
      {
        Header: 'Expense Code',
        accessor: 'EC_Name',
        filterable: true,
      },
      {
        Header: 'Interval of Expense',
        accessor: 'E_IntervalOfExpense',
        filterable: true,
      },
      {
        Header: 'Expense Start Date',
        accessor: 'E_StartDateInFormat',
        filterable: true,
      },
      {
        Header: 'Expense End Date',
        accessor: 'E_EndDateInFormat',
        filterable: true,
      },
      {
        Header: 'Expense Date',
        accessor: 'E_ExpenseDateInFormat',
        filterable: true,
      },
      {
        Header: 'Expense Partner Name',
        accessor: 'PA_Name',
        filterable: true,
      },
      {
        Header: 'Expense Invoice Number',
        accessor: 'E_InvoiceNumber',
        filterable: true,
      },
      {
        Header: 'Expense Invoice Date',
        accessor: 'E_InvoiceDateInFormat',
        filterable: true,
      },
      {
        Header: 'Expense Cost Center',
        accessor: 'E_CostCenter',
        filterable: true,
      },
      {
        Header: 'Expense Basic Value',
        accessor: 'E_BasicValue',
        filterable: true,
      },
      {
        Header: 'Expense CGST',
        accessor: 'E_CGST',
        filterable: true,
      },
      {
        Header: 'Expense SGST',
        accessor: 'E_SGST',
        filterable: true,
      },
      {
        Header: 'Expense IGST',
        accessor: 'E_IGST',
        filterable: true,
      },
      {
        Header: 'Expense Total Tax',
        accessor: 'E_TotalTax',
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

  const fetchAllExpenses = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_EXPENSES, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          props.set_all_expenses(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAllProjects = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_PROJECTS, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          props.set_all_projects(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAllPartners = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_PARTNERS, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          props.set_all_partners(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllProjects();
    fetchAllPartners();
    fetchAllExpenses();
  }, []);

  useEffect(() => {
    setFilteredData(props.expenses.expenses);
  }, [props.expenses.expenses]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      axios
        .post(
          BACKEND_URLS.ADD_NEW_EXPENSE,
          {
            expense: {
              project_id: values.expenseProjectID,
              expense_code_id:
                CONSTANTS.EXPENSE_CODES_MAPPING[values.expenseCode],
              type: values.expenseType,
              interval_of_expense: values.expenseInterval,
              start_date: values.expenseStartDate,
              end_date: values.expenseEndDate,
              expense_date: values.expenseDate,
              partner_id: values.expensePartnerID,
              invoice_number: values.expenseInvoiceNumber,
              invoice_date: values.expenseInvoiceDate,
              cost_center: values.expenseCostCenter,
              basic_value: values.expenseBasicValue,
              cgst: values.expenseCGST,
              sgst: values.expenseSGST,
              igst: values.expenseIGST,
              total_tax: values.expenseTotalTax,
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
            fetchAllExpenses();
            setAddModalShow(false);
            setValues({
              expenseID: '',
              expenseProjectID: '',
              expenseProject: '',
              expenseType: '',
              expenseCode: '',
              expenseCodeID: '',
              expensePartnerID: '',
              expensePartner: '',
              expenseInterval: '',
              expenseStartDate: '',
              expenseEndDate: '',
              expenseDate: '',
              expenseInvoiceNumber: '',
              expenseInvoiceDate: '',
              expenseCostCenter: '',
              expenseBasicValue: '',
              expenseCGST: '',
              expenseSGST: '',
              expenseIGST: '',
              expenseTotalTax: '',
              selectedExpense: null,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            `Failed to add the new expense, please try again. ${err.response.data.message}`
          );
        });
    }
  };

  const selectEditExpense = (expense) => {
    setValues({
      expenseID: expense['E_ID'],
      expenseProjectID: expense['E_PR_ID'],
      expenseProject: expense['PR_Name'],
      expenseType: expense['E_Type'],
      expenseCode: expense['EC_Name'],
      expenseCodeID: expense['E_EC_ID'],
      expensePartnerID: expense['E_PA_ID'],
      expensePartner: expense['PA_Name'],
      expenseInterval: expense['E_IntervalOfExpense'],
      expenseStartDate: expense['E_StartDateInFormat'],
      expenseEndDate: expense['E_EndDateInFormat'],
      expenseDate: expense['E_ExpenseDateInFormat'],
      expenseInvoiceNumber: expense['E_InvoiceNumber'],
      expenseInvoiceDate: expense['E_InvoiceDateInFormat'],
      expenseCostCenter: expense['E_CostCenter'],
      expenseBasicValue: expense['E_BasicValue'],
      expenseCGST: expense['E_CGST'],
      expenseSGST: expense['E_SGST'],
      expenseIGST: expense['E_IGST'],
      expenseTotalTax: expense['E_TotalTax'],
      selectedExpense: expense,
    });
    setEditModalShow(true);
  };

  const handleEditExpense = (e) => {
    e.preventDefault();
    axios
      .put(
        BACKEND_URLS.EDIT_A_EXPENSE,
        {
          expense: {
            expense_id: values.expenseID,
            project_id: values.expenseProjectID,
            expense_code_id:
              CONSTANTS.EXPENSE_CODES_MAPPING[values.expenseCode],
            type: values.expenseType,
            interval_of_expense: values.expenseInterval,
            start_date: values.expenseStartDate,
            end_date: values.expenseEndDate,
            expense_date: values.expenseDate,
            partner_id: values.expensePartnerID,
            invoice_number: values.expenseInvoiceNumber,
            invoice_date: values.expenseInvoiceDate,
            cost_center: values.expenseCostCenter,
            basic_value: values.expenseBasicValue,
            cgst: values.expenseCGST,
            sgst: values.expenseSGST,
            igst: values.expenseIGST,
            total_tax: values.expenseTotalTax,
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
          toast.success(`Successfully edited the expense details.`, {
            autoClose: 6000,
          });
          fetchAllExpenses();
          setEditModalShow(false);
          setValues({
            expenseID: '',
            expenseProjectID: '',
            expenseProject: '',
            expenseType: '',
            expenseCode: '',
            expenseCodeID: '',
            expensePartnerID: '',
            expensePartner: '',
            expenseInterval: '',
            expenseStartDate: '',
            expenseEndDate: '',
            expenseDate: '',
            expenseInvoiceNumber: '',
            expenseInvoiceDate: '',
            expenseCostCenter: '',
            expenseBasicValue: '',
            expenseCGST: '',
            expenseSGST: '',
            expenseIGST: '',
            expenseTotalTax: '',
            selectedExpense: null,
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to edit the expense details, please try again. ${err.response.data.message}`
        );
      });
  };

  const handleDeleteExpense = (e) => {
    e.preventDefault();
    axios
      .delete(BACKEND_URLS.DELETE_A_EXPENSE, {
        params: {
          expense_id: values.expenseID,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success(`Successfully deleted the expense.`, {
            autoClose: 6000,
          });
          fetchAllExpenses();
          setEditModalShow(false);
          setValues({
            expenseID: '',
            expenseProjectID: '',
            expenseProject: '',
            expenseType: '',
            expenseCode: '',
            expenseCodeID: '',
            expensePartnerID: '',
            expensePartner: '',
            expenseInterval: '',
            expenseStartDate: '',
            expenseEndDate: '',
            expenseDate: '',
            expenseInvoiceNumber: '',
            expenseInvoiceDate: '',
            expenseCostCenter: '',
            expenseBasicValue: '',
            expenseCGST: '',
            expenseSGST: '',
            expenseIGST: '',
            expenseTotalTax: '',
            selectedExpense: null,
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to delete the expense, please try again. ${err.response.data.message}`
        );
      });
  };

  useEffect(() => {
    if (values.selectedExpense && values.selectedExpense != '') {
      props.set_selected_expense(values.selectedExpense);
    } else {
      props.set_selected_expense(null);
    }
  }, [values.selectedExpense]);

  return (
    <Fragment>
      <div className="application">
        <div className="appTab">
          <AddModal
            addModalShow={addModalShow}
            setAddModalShow={setAddModalShow}
            title="Add Expense"
          >
            <form onSubmit={handleAddExpense}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Expense Type</span>
                      <input
                        type="text"
                        value={values.expenseType}
                        onChange={handleChange('expenseType')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Expense Code</span>
                      <select
                        onChange={handleChange('expenseCode')}
                        value={values.expenseCode}
                      >
                        <RenderOptionsForExpenseCodes />
                      </select>
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Expense Interval</span>
                      <select
                        onChange={handleChange('expenseInterval')}
                        value={values.expenseInterval}
                      >
                        <RenderOptionsForExpenseIntervals />
                      </select>
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project</span>
                      <select
                        onChange={handleChange('expenseProjectID')}
                        value={values.expenseProjectID}
                      >
                        <option value={null}>--SELECT--</option>
                        {props.projects.projects?.map((each_project) => {
                          return (
                            <option
                              key={each_project['PR_ID']}
                              value={each_project['PR_ID']}
                            >
                              {each_project['PR_Name']}
                            </option>
                          );
                        })}
                      </select>
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Partner</span>
                      <select
                        onChange={handleChange('expensePartnerID')}
                        value={values.expensePartnerID}
                      >
                        <option>--SELECT--</option>
                        {props.partners.partners?.map((each_partner) => {
                          return (
                            <option
                              key={each_partner['PA_ID']}
                              value={each_partner['PA_ID']}
                            >
                              {each_partner['PA_Name']}
                            </option>
                          );
                        })}
                      </select>
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Expense Date</span>
                      <input
                        type="date"
                        required
                        value={values.expenseDate}
                        onChange={handleChange('expenseDate')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  {values.expenseInterval === 'RECURRING' ? (
                    <tr>
                      <td>
                        <span>Start Date</span>
                        <input
                          type="date"
                          required
                          value={values.expenseStartDate}
                          onChange={handleChange('expenseStartDate')}
                        />
                        <br />
                        <br />
                      </td>
                      <td>
                        <span>End Date</span>
                        <input
                          type="date"
                          value={values.expenseEndDate}
                          onChange={handleChange('expenseEndDate')}
                        />
                        <br />
                        <br />
                      </td>
                    </tr>
                  ) : null}
                  <tr>
                    <td>
                      <span>Invoice Number</span>
                      <input
                        type="text"
                        value={values.expenseInvoiceNumber}
                        onChange={handleChange('expenseInvoiceNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Invoice Date</span>
                      <input
                        type="date"
                        required
                        value={values.expenseInvoiceDate}
                        onChange={handleChange('expenseInvoiceDate')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Cost Centre</span>
                      <input
                        type="month"
                        required
                        value={values.expenseCostCenter}
                        onChange={handleChange('expenseCostCenter')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Basic Value</span>
                      <input
                        type="text"
                        required
                        value={values.expenseBasicValue}
                        onChange={handleChange('expenseBasicValue')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>CGST</span>
                      <input
                        type="text"
                        required
                        value={values.expenseCGST}
                        onChange={handleChange('expenseCGST')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>SGST</span>
                      <input
                        type="text"
                        required
                        value={values.expenseSGST}
                        onChange={handleChange('expenseSGST')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>IGST</span>
                      <br></br>
                      <input
                        type="text"
                        required
                        value={values.expenseIGST}
                        onChange={handleChange('expenseIGST')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Total Tax</span>
                      <input
                        type="text"
                        required
                        value={values.expenseTotalTax}
                        onChange={handleChange('expenseTotalTax')}
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
            title="Edit User"
          >
            <form onSubmit={handleEditExpense}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Expense Type</span>
                      <input
                        type="text"
                        value={values.expenseType}
                        onChange={handleChange('expenseType')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Expense Code</span>
                      <select
                        onChange={handleChange('expenseCode')}
                        value={values.expenseCode}
                      >
                        <RenderOptionsForExpenseCodes />
                      </select>
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Expense Interval</span>
                      <select
                        onChange={handleChange('expenseInterval')}
                        value={values.expenseInterval}
                      >
                        <RenderOptionsForExpenseIntervals />
                      </select>
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project</span>
                      <select
                        onChange={handleChange('expenseProjectID')}
                        value={values.expenseProjectID}
                      >
                        <option value={null}>--SELECT--</option>
                        {props.projects.projects?.map((each_project) => {
                          return (
                            <option
                              key={each_project['PR_ID']}
                              value={each_project['PR_ID']}
                            >
                              {each_project['PR_Name']}
                            </option>
                          );
                        })}
                      </select>
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Partner</span>
                      <select
                        onChange={handleChange('expensePartnerID')}
                        value={values.expensePartnerID}
                      >
                        <option>--SELECT--</option>
                        {props.partners.partners?.map((each_partner) => {
                          return (
                            <option
                              key={each_partner['PA_ID']}
                              value={each_partner['PA_ID']}
                            >
                              {each_partner['PA_Name']}
                            </option>
                          );
                        })}
                      </select>
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Expense Date</span>
                      <input
                        type="date"
                        required
                        value={values.expenseDate}
                        onChange={handleChange('expenseDate')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  {values.expenseInterval === 'RECURRING' ? (
                    <tr>
                      <td>
                        <span>Start Date</span>
                        <input
                          type="date"
                          required
                          value={values.expenseStartDate}
                          onChange={handleChange('expenseStartDate')}
                        />
                        <br />
                        <br />
                      </td>
                      <td>
                        <span>End Date</span>
                        <input
                          type="date"
                          value={values.expenseEndDate}
                          onChange={handleChange('expenseEndDate')}
                        />
                        <br />
                        <br />
                      </td>
                    </tr>
                  ) : null}
                  <tr>
                    <td>
                      <span>Invoice Number</span>
                      <input
                        type="text"
                        value={values.expenseInvoiceNumber}
                        onChange={handleChange('expenseInvoiceNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Invoice Date</span>
                      <input
                        type="date"
                        required
                        value={values.expenseInvoiceDate}
                        onChange={handleChange('expenseInvoiceDate')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Cost Centre</span>
                      <input
                        type="month"
                        required
                        value={values.expenseCostCenter}
                        onChange={handleChange('expenseCostCenter')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Basic Value</span>
                      <input
                        type="text"
                        required
                        value={values.expenseBasicValue}
                        onChange={handleChange('expenseBasicValue')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>CGST</span>
                      <input
                        type="text"
                        required
                        value={values.expenseCGST}
                        onChange={handleChange('expenseCGST')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>SGST</span>
                      <input
                        type="text"
                        required
                        value={values.expenseSGST}
                        onChange={handleChange('expenseSGST')}
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>IGST</span>
                      <br></br>
                      <input
                        type="text"
                        required
                        value={values.expenseIGST}
                        onChange={handleChange('expenseIGST')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Total Tax</span>
                      <input
                        type="text"
                        required
                        value={values.expenseTotalTax}
                        onChange={handleChange('expenseTotalTax')}
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
              <button
                type="button"
                className="redButton"
                onClick={handleDeleteExpense}
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
                  expenseID: '',
                  expenseProjectID: '',
                  expenseProject: '',
                  expenseType: '',
                  expenseCode: '',
                  expenseCodeID: '',
                  expensePartnerID: '',
                  expensePartner: '',
                  expenseInterval: '',
                  expenseStartDate: '',
                  expenseEndDate: '',
                  expenseDate: '',
                  expenseInvoiceNumber: '',
                  expenseInvoiceDate: '',
                  expenseCostCenter: '',
                  expenseBasicValue: '',
                  expenseCGST: '',
                  expenseSGST: '',
                  expenseIGST: '',
                  expenseTotalTax: '',
                  selectedExpense: null,
                });
              }}
            >
              <i className="fas fa-plus"></i> Add Expense
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
                      selectEditExpense(row.original);
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
  expenses: state.expenses,
  projects: state.projects,
  partners: state.partners,
});

const mapDispatchToProps = (dispatch) => ({
  set_all_expenses: (expenses) => dispatch(actions.set_all_expenses(expenses)),
  set_all_partners: (partners) => dispatch(actions.set_all_partners(partners)),
  set_all_projects: (projects) => dispatch(actions.set_all_projects(projects)),
  set_selected_expense: (expense) =>
    dispatch(actions.set_expense_details(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
