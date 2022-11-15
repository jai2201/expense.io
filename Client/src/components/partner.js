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

const RenderOptionsForPartnerTypes = () => {
  return (
    <>
      <option value={null}>--SELECT--</option>
      {CONSTANTS.PARTNER_TYPES?.map((each_partner_type) => {
        return (
          <option value={each_partner_type} key={each_partner_type}>
            {each_partner_type}
          </option>
        );
      })}
    </>
  );
};

const RenderOptionsForStates = () => {
  return (
    <>
      <option value={null}>--SELECT--</option>
      {CONSTANTS.STATES?.map((each_state) => {
        return (
          <option key={each_state} value={each_state}>
            {each_state}
          </option>
        );
      })}
    </>
  );
};

function Partner(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [values, setValues] = useState({
    partnerID: '',
    partnerType: '',
    partnerTypeID: '',
    partnerName: '',
    partnerCode: '',
    partnerCity: '',
    partnerState: '',
    partnerGSTNumber: '',
    partnerConcernPersonName: '',
    partnerConcernPersonNumber: '',
    partnerConcernPersonEmail: '',
    partnerWorkOrderNumber: '',
    partnerWorkOrderValue: '',
    partnerWorkOrderDate: '',
    partnerWorkOrderValidityYear: '',
    partnerWorkOrderValidityMonth: '',
    partnerPaymentTerms: '',
    partnerWorkOrderIsActive: '',
    partnerWorkOrderDescription: '',
    partnerProjectID: '',
    partnerProject: '',
    selectedPartner: null,
  });

  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: 'Partner Name',
        accessor: 'PA_Name',
        filterable: true,
      },
      {
        Header: 'Partner Type',
        accessor: 'PAT_Name',
        filterable: true,
      },
      {
        Header: 'Partner Code',
        accessor: 'PA_Code',
        filterable: true,
      },
      {
        Header: 'Partner City',
        accessor: 'PA_City',
        filterable: true,
      },
      {
        Header: 'Partner State',
        accessor: 'PA_State',
        filterable: true,
      },
      {
        Header: 'Partner GST Number',
        accessor: 'PA_GST_Number',
        filterable: true,
      },
      {
        Header: 'Partner Concern Person Name',
        accessor: 'PA_ConcernPersonName',
        filterable: true,
      },
      {
        Header: 'Partner Concern Person Number',
        accessor: 'PA_ConcernPersonNumber',
        filterable: true,
      },
      {
        Header: 'Partner Concern Person Email',
        accessor: 'PA_ConcernPersonEmail',
        filterable: true,
      },
      {
        Header: 'Partner Work Order Number',
        accessor: 'PA_WorkOrderNumber',
        filterable: true,
      },
      {
        Header: 'Partner Work Order Value',
        accessor: 'PA_WorkOrderValue',
        filterable: true,
      },
      {
        Header: 'Partner Work Order Date',
        accessor: 'PA_WorkOrderDateInFormat',
        filterable: true,
      },
      {
        Header: 'Partner Payment Terms',
        accessor: 'PA_PaymentTerms',
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
    fetchAllPartners();
    fetchAllProjects();
  }, []);

  useEffect(() => {
    setFilteredData(props.partners.partners);
  }, [props.partners.partners]);

  const handleAddPartner = (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      axios
        .post(
          BACKEND_URLS.ADD_NEW_PARTNER,
          {
            partner: {
              partner_type_id:
                CONSTANTS.PARTNER_TYPE_MAPPING[values.partnerType],
              name: values.partnerName,
              code: values.partnerCode,
              city: values.partnerCity,
              state: values.partnerState,
              gst_number: values.partnerGSTNumber,
              concern_person_name: values.partnerConcernPersonName,
              concern_person_number: values.partnerConcernPersonNumber,
              concern_person_email: values.partnerConcernPersonEmail,
              work_order_number: values.partnerWorkOrderNumber,
              work_order_value: values.partnerWorkOrderValue,
              work_order_date: values.partnerWorkOrderDate,
              work_order_validity_year: values.partnerWorkOrderValidityYear,
              work_order_validity_month: values.partnerWorkOrderValidityMonth,
              payment_terms: values.partnerPaymentTerms,
              work_order_is_active: values.partnerWorkOrderIsActive,
              work_order_description: values.partnerWorkOrderDescription,
              project_id: values.partnerProjectID,
              project: values.partnerProject,
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
            fetchAllPartners();
            setAddModalShow(false);
            setValues({
              partnerID: '',
              partnerType: '',
              partnerTypeID: '',
              partnerName: '',
              partnerCode: '',
              partnerCity: '',
              partnerState: '',
              partnerGSTNumber: '',
              partnerConcernPersonName: '',
              partnerConcernPersonNumber: '',
              partnerConcernPersonEmail: '',
              partnerWorkOrderNumber: '',
              partnerWorkOrderValue: '',
              partnerWorkOrderDate: '',
              partnerWorkOrderValidityYear: '',
              partnerWorkOrderValidityMonth: '',
              partnerPaymentTerms: '',
              partnerWorkOrderIsActive: '',
              partnerWorkOrderDescription: '',
              partnerProjectID: '',
              partnerProject: '',
              selectedPartner: null,
            });
          }
        })
        .catch((err) => {
          toast.error(
            `Failed to add the new partner, please try again. ${err.response.data.message}`
          );
        });
    }
  };

  const selectEditPartner = (partner) => {
    setValues({
      partnerID: partner['PA_ID'],
      partnerType: partner['PAT_Name'],
      partnerTypeID: partner['PAT_ID'],
      partnerName: partner['PA_Name'],
      partnerCode: partner['PA_Code'],
      partnerCity: partner['PA_City'],
      partnerState: partner['PA_State'],
      partnerGSTNumber: partner['PA_GST_Number'],
      partnerConcernPersonName: partner['PA_ConcernPersonName'],
      partnerConcernPersonNumber: partner['PA_ConcernPersonNumber'],
      partnerConcernPersonEmail: partner['PA_ConcernPersonEmail'],
      partnerWorkOrderNumber: partner['PA_WorkOrderNumber'],
      partnerWorkOrderValue: partner['PA_WorkOrderValue'],
      partnerWorkOrderDate: partner['PA_WorkOrderDateInFormat'],
      partnerWorkOrderValidityYear: partner['PA_WorkOrderValidityYear'],
      partnerWorkOrderValidityMonth: partner['PA_WorkOrderValidityMonth'],
      partnerPaymentTerms: partner['PA_PaymentTerms'],
      partnerWorkOrderIsActive: partner['PA_WorkOrderIsActive'],
      partnerWorkOrderDescription: partner['PA_WorkOrderDescription'],
      partnerProjectID: partner['PA_PR_ID'],
      partnerProject: partner['PA_Name'],
      selectedPartner: partner,
    });
    setEditModalShow(true);
  };

  const handleEditPartner = (e) => {
    e.preventDefault();
    axios
      .put(
        BACKEND_URLS.EDIT_A_PARTNER,
        {
          partner: {
            partner_id: values.partnerID,
            partner_type_id: CONSTANTS.PARTNER_TYPE_MAPPING[values.partnerType],
            name: values.partnerName,
            code: values.partnerCode,
            city: values.partnerCity,
            state: values.partnerState,
            gst_number: values.partnerGSTNumber,
            concern_person_name: values.partnerConcernPersonName,
            concern_person_number: values.partnerConcernPersonNumber,
            concern_person_email: values.partnerConcernPersonEmail,
            work_order_number: values.partnerWorkOrderNumber,
            work_order_value: values.partnerWorkOrderValue,
            work_order_date: values.partnerWorkOrderDate,
            work_order_validity_year: values.partnerWorkOrderValidityYear,
            work_order_validity_month: values.partnerWorkOrderValidityMonth,
            payment_terms: values.partnerPaymentTerms,
            work_order_is_active: values.partnerWorkOrderIsActive,
            work_order_description: values.partnerWorkOrderDescription,
            project_id: values.partnerProjectID,
            project: values.partnerProject,
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
          toast.success(`Successfully edited the partner details.`, {
            autoClose: 6000,
          });
          fetchAllPartners();
          setEditModalShow(false);
          setValues({
            partnerID: '',
            partnerType: '',
            partnerTypeID: '',
            partnerName: '',
            partnerCode: '',
            partnerCity: '',
            partnerState: '',
            partnerGSTNumber: '',
            partnerConcernPersonName: '',
            partnerConcernPersonNumber: '',
            partnerConcernPersonEmail: '',
            partnerWorkOrderNumber: '',
            partnerWorkOrderValue: '',
            partnerWorkOrderDate: '',
            partnerWorkOrderValidityYear: '',
            partnerWorkOrderValidityMonth: '',
            partnerPaymentTerms: '',
            partnerWorkOrderIsActive: '',
            partnerWorkOrderDescription: '',
            partnerProjectID: '',
            partnerProject: '',
            selectedPartner: null,
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to edit the partner details, please try again. ${err.response.data.message}`
        );
      });
  };

  const handleDeletePartner = (e) => {
    e.preventDefault();
    axios
      .delete(BACKEND_URLS.DELETE_A_PARTNER, {
        params: {
          partner_id: values.partnerID,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success(`Successfully deleted the partner.`, {
            autoClose: 6000,
          });
          fetchAllPartners();
          setEditModalShow(false);
          setValues({
            partnerID: '',
            partnerType: '',
            partnerTypeID: '',
            partnerName: '',
            partnerCode: '',
            partnerCity: '',
            partnerState: '',
            partnerGSTNumber: '',
            partnerConcernPersonName: '',
            partnerConcernPersonNumber: '',
            partnerConcernPersonEmail: '',
            partnerWorkOrderNumber: '',
            partnerWorkOrderValue: '',
            partnerWorkOrderDate: '',
            partnerWorkOrderValidityYear: '',
            partnerWorkOrderValidityMonth: '',
            partnerPaymentTerms: '',
            partnerWorkOrderIsActive: '',
            partnerWorkOrderDescription: '',
            partnerProjectID: '',
            partnerProject: '',
            selectedPartner: null,
          });
        }
      })
      .catch((err) => {
        toast.error(
          `Failed to delete the partner, please try again. ${err.response.data.message}`
        );
      });
  };

  useEffect(() => {
    if (values.selectedPartner && values.selectedPartner != '') {
      props.set_selected_partner(values.selectedPartner);
    } else {
      props.set_selected_partner(null);
    }
  }, [values.selectedPartner]);

  return (
    <Fragment>
      <div className="application">
        <div className="appTab">
          <AddModal
            addModalShow={addModalShow}
            setAddModalShow={setAddModalShow}
            title="Add Partner"
          >
            <form onSubmit={handleAddPartner}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Partner Name</span>
                      <input
                        type="text"
                        value={values.partnerName}
                        onChange={handleChange('partnerName')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner Code</span>
                      <input
                        type="text"
                        value={values.partnerCode}
                        onChange={handleChange('partnerCode')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner City</span>
                      <input
                        type="text"
                        value={values.partnerCity}
                        onChange={handleChange('partnerCity')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Partner State</span>
                      <select
                        onChange={handleChange('partnerState')}
                        value={values.partnerState}
                      >
                        <RenderOptionsForStates />
                      </select>
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project</span>
                      <select
                        onChange={handleChange('partnerProjectID')}
                        value={values.partnerProjectID}
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

                    <td>
                      <span>Partner Type</span>
                      <select
                        onChange={handleChange('partnerType')}
                        value={values.partnerType}
                      >
                        <RenderOptionsForPartnerTypes />
                      </select>
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Partner GST Number</span>
                      <input
                        type="text"
                        value={values.partnerGSTNumber}
                        onChange={handleChange('partnerGSTNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner Concern Person Name</span>
                      <input
                        type="text"
                        value={values.partnerConcernPersonName}
                        onChange={handleChange('partnerConcernPersonName')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner Concern Person Email</span>
                      <input
                        type="text"
                        value={values.partnerConcernPersonEmail}
                        onChange={handleChange('partnerConcernPersonEmail')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Partner Concern Person Number</span>
                      <input
                        type="text"
                        value={values.partnerConcernPersonNumber}
                        onChange={handleChange('partnerConcernPersonNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner Work Order Number</span>
                      <input
                        type="text"
                        value={values.partnerWorkOrderNumber}
                        onChange={handleChange('partnerWorkOrderNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner Work Order Value</span>
                      <input
                        type="text"
                        value={values.partnerWorkOrderValue}
                        onChange={handleChange('partnerWorkOrderValue')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Partner Work Order Date</span>
                      <input
                        type="date"
                        required
                        value={values.partnerWorkOrderDate}
                        onChange={handleChange('partnerWorkOrderDate')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner Work Order Validity in years</span>
                      <input
                        type="number"
                        value={values.partnerWorkOrderValidityYear}
                        onChange={handleChange('partnerWorkOrderValidityYear')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner Work Order Validity in months</span>
                      <input
                        type="number"
                        min={1}
                        max={12}
                        value={values.partnerWorkOrderValidityMonth}
                        onChange={handleChange('partnerWorkOrderValidityMonth')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Partner Payment Terms</span>
                      <input
                        type="text"
                        value={values.partnerPaymentTerms}
                        onChange={handleChange('partnerPaymentTerms')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner Work Order Is Active</span>
                      <select
                        onChange={handleChange('partnerWorkOrderIsActive')}
                        value={values.partnerWorkOrderIsActive}
                      >
                        <option value={null}>--SELECT--</option>
                        <option value={'true'}>Yes</option>
                        <option value={'false'}>No</option>
                      </select>
                      <br />
                      <br />
                    </td>

                    <td>
                      <span>Partner Work Order Description</span>
                      <input
                        type="text"
                        value={values.partnerWorkOrderDescription}
                        onChange={handleChange('partnerWorkOrderDescription')}
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
            title="Edit Partner"
          >
            <form onSubmit={handleEditPartner}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Partner Name</span>
                      <input
                        type="text"
                        value={values.partnerName}
                        onChange={handleChange('partnerName')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner Code</span>
                      <input
                        type="text"
                        value={values.partnerCode}
                        onChange={handleChange('partnerCode')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner City</span>
                      <input
                        type="text"
                        value={values.partnerCity}
                        onChange={handleChange('partnerCity')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Partner State</span>
                      <select
                        onChange={handleChange('partnerState')}
                        value={values.partnerState}
                      >
                        <RenderOptionsForStates />
                      </select>
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Project</span>
                      <select
                        onChange={handleChange('partnerProjectID')}
                        value={values.partnerProjectID}
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

                    <td>
                      <span>Partner Type</span>
                      <select
                        onChange={handleChange('partnerType')}
                        value={values.partnerType}
                      >
                        <RenderOptionsForPartnerTypes />
                      </select>
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Partner GST Number</span>
                      <input
                        type="text"
                        value={values.partnerGSTNumber}
                        onChange={handleChange('partnerGSTNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner Concern Person Name</span>
                      <input
                        type="text"
                        value={values.partnerConcernPersonName}
                        onChange={handleChange('partnerConcernPersonName')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner Concern Person Email</span>
                      <input
                        type="text"
                        value={values.partnerConcernPersonEmail}
                        onChange={handleChange('partnerConcernPersonEmail')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Partner Concern Person Number</span>
                      <input
                        type="text"
                        value={values.partnerConcernPersonNumber}
                        onChange={handleChange('partnerConcernPersonNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner Work Order Number</span>
                      <input
                        type="text"
                        value={values.partnerWorkOrderNumber}
                        onChange={handleChange('partnerWorkOrderNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner Work Order Value</span>
                      <input
                        type="text"
                        value={values.partnerWorkOrderValue}
                        onChange={handleChange('partnerWorkOrderValue')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Partner Work Order Date</span>
                      <input
                        type="date"
                        required
                        value={values.partnerWorkOrderDate}
                        onChange={handleChange('partnerWorkOrderDate')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner Work Order Validity in years</span>
                      <input
                        type="number"
                        value={values.partnerWorkOrderValidityYear}
                        onChange={handleChange('partnerWorkOrderValidityYear')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner Work Order Validity in months</span>
                      <input
                        type="number"
                        min={1}
                        max={12}
                        value={values.partnerWorkOrderValidityMonth}
                        onChange={handleChange('partnerWorkOrderValidityMonth')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Partner Payment Terms</span>
                      <input
                        type="text"
                        value={values.partnerPaymentTerms}
                        onChange={handleChange('partnerPaymentTerms')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Partner Work Order Is Active</span>
                      <select
                        onChange={handleChange('partnerWorkOrderIsActive')}
                        value={values.partnerWorkOrderIsActive}
                      >
                        <option value={null}>--SELECT--</option>
                        <option value={'true'}>Yes</option>
                        <option value={'false'}>No</option>
                      </select>
                      <br />
                      <br />
                    </td>

                    <td>
                      <span>Partner Work Order Description</span>
                      <input
                        type="text"
                        value={values.partnerWorkOrderDescription}
                        onChange={handleChange('partnerWorkOrderDescription')}
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
              <button onClick={handleDeletePartner} className="redButton">
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
                  partnerID: '',
                  partnerType: '',
                  partnerTypeID: '',
                  partnerName: '',
                  partnerCode: '',
                  partnerCity: '',
                  partnerState: '',
                  partnerGSTNumber: '',
                  partnerConcernPersonName: '',
                  partnerConcernPersonNumber: '',
                  partnerConcernPersonEmail: '',
                  partnerWorkOrderNumber: '',
                  partnerWorkOrderValue: '',
                  partnerWorkOrderDate: '',
                  partnerWorkOrderValidityYear: '',
                  partnerWorkOrderValidityMonth: '',
                  partnerPaymentTerms: '',
                  partnerWorkOrderIsActive: '',
                  partnerWorkOrderDescription: '',
                  partnerProjectID: '',
                  partnerProject: '',
                  selectedPartner: null,
                });
              }}
            >
              <i className="fas fa-plus"></i> Add Partner
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
                      selectEditPartner(row.original);
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
  partners: state.partners,
  projects: state.projects,
});

const mapDispatchToProps = (dispatch) => ({
  set_all_partners: (partners) => dispatch(actions.set_all_partners(partners)),
  set_all_projects: (projects) => dispatch(actions.set_all_projects(projects)),
  set_selected_partner: (partner) =>
    dispatch(actions.set_partner_details(partner)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Partner);
