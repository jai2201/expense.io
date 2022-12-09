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

const RenderOptionsForVehicleTypes = () => {
  return (
    <>
      <option value={null}>--SELECT--</option>
      <option value={'REVIEWER'}>REVIEWER</option>
      <option value={'APPROVER'}>APPROVER</option>
      <option value={'INITIATOR'}>INITIATOR</option>
    </>
  );
};

function Vehicle(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [values, setValues] = useState({
    vehicleId: '',
    manufacturer: '',
    typeOfAsset: '',
    assetNumber: '',
    registrationNumber: '',
    dateOfPurchase: '',
    supplierName: '',
    chassisNumber: '',
    engineNumber: '',
    modelNumber: '',
    basicValue: '',
    gst: '',
    tcs: '',
    totalValue: '',
  });

  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [vehicles, setAllVehicles] = useState([]);
  const columns = useMemo(
    () => [
      {
        Header: 'Manufacturer',
        accessor: 'V_Manufacturer',
        filterable: true,
      },
      {
        Header: 'Type of Asset',
        accessor: 'V_TypeOfAsset',
        filterable: true,
      },
      {
        Header: 'Asset Number',
        accessor: 'V_AssetNumber',
        filterable: true,
      },
      {
        Header: 'Registration Number',
        accessor: 'V_RegistrationNumber',
        filterable: true,
      },
      {
        Header: 'Date of Purchase',
        accessor: 'V_DateOfPurchaseInFormat',
        filterable: true,
      },
      {
        Header: 'Supplier name',
        accessor: 'V_SupplierName',
        filterable: true,
      },
      {
        Header: 'Chassis Number',
        accessor: 'V_ChassisNumber',
        filterable: true,
      },
      {
        Header: 'Engine Number',
        accessor: 'V_EngineNumber',
        filterable: true,
      },
      {
        Header: 'Basic Value',
        accessor: 'V_BasicValue',
        filterable: true,
      },
      {
        Header: 'GST',
        accessor: 'V_GST',
        filterable: true,
      },
      {
        Header: 'TCS',
        accessor: 'V_TCS',
        filterable: true,
      },
      {
        Header: 'Total Value',
        accessor: 'V_TotalValue',
        filterable: true,
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

  const fetchAllVehicles = () => {
    axios
      .get(BACKEND_URLS.GET_ALL_VEHICLES, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data);
          setAllVehicles(res.data.data);
          setFilteredData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllVehicles();
  }, []);

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      axios
        .post(
          BACKEND_URLS.ADD_NEW_VEHICLE,
          {
            vehicle: {
              manufacturer: values.manufacturer,
              type_of_asset: values.typeOfAsset,
              asset_number: values.assetNumber,
              registration_number: values.registrationNumber,
              date_of_purchase: values.dateOfPurchase,
              supplier_name: values.supplierName,
              chassis_number: values.chassisNumber,
              engine_number: values.engineNumber,
              model_number: values.modelNumber,
              basic_value: values.basicValue,
              gst: values.gst,
              tcs: values.tcs,
              total_value: values.totalValue,
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
            fetchAllVehicles();
            setAddModalShow(false);
            setValues({
              vehicleId: '',
              manufacturer: '',
              typeOfAsset: '',
              assetNumber: '',
              registrationNumber: '',
              dateOfPurchase: '',
              supplierName: '',
              chassisNumber: '',
              engineNumber: '',
              modelNumber: '',
              basicValue: '',
              gst: '',
              tcs: '',
              totalValue: '',
            });
          }
        })
        .catch((err) => {
          toast.error(
            `Failed to add new vehicle. ${err.response.data.message}`
          );
        });
    }
  };

  const selectEditVehicle = (vehicle) => {
    setValues({
      vehicleId: vehicle['V_ID'],
      manufacturer: vehicle['V_Manufacturer'],
      typeOfAsset: vehicle['V_TypeOfAsset'],
      assetNumber: vehicle['V_AssetNumber'],
      registrationNumber: vehicle['V_RegistrationNumber'],
      dateOfPurchase: vehicle['V_DateOfPurchaseInFormat'],
      supplierName: vehicle['V_SupplierName'],
      chassisNumber: vehicle['V_ChassisNumber'],
      engineNumber: vehicle['V_EngineNumber'],
      modelNumber: vehicle['V_ModelNumber'],
      basicValue: vehicle['V_BasicValue'],
      gst: vehicle['V_GST'],
      tcs: vehicle['V_TCS'],
      totalValue: vehicle['V_TotalValue'],
      selectedVehicle: vehicle,
    });
    setEditModalShow(true);
  };

  const handleEditVehicle = (e) => {
    e.preventDefault();
    axios
      .put(
        BACKEND_URLS.EDIT_A_VEHICLE,
        {
          vehicle: {
            vehicle_id: values.vehicleId,
            manufacturer: values.manufacturer,
            type_of_asset: values.typeOfAsset,
            asset_number: values.assetNumber,
            registration_number: values.registrationNumber,
            date_of_purchase: values.dateOfPurchase,
            supplier_name: values.supplierName,
            chassis_number: values.chassisNumber,
            engine_number: values.engineNumber,
            model_number: values.modelNumber,
            basic_value: values.basicValue,
            gst: values.gst,
            tcs: values.tcs,
            total_value: values.totalValue,
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
          fetchAllVehicles();
          setEditModalShow(false);
          setValues({
            vehicleId: '',
            manufacturer: '',
            typeOfAsset: '',
            assetNumber: '',
            registrationNumber: '',
            dateOfPurchase: '',
            supplierName: '',
            chassisNumber: '',
            engineNumber: '',
            modelNumber: '',
            basicValue: '',
            gst: '',
            tcs: '',
            totalValue: '',
          });
        }
      })
      .catch((err) => {});
  };

  const handleDeleteVehicle = (e) => {
    e.preventDefault();
    axios
      .delete(BACKEND_URLS.DELETE_A_VEHICLE, {
        params: {
          vehicle_id: values.vehicleId,
        },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          fetchAllVehicles();
          setEditModalShow(false);
          setValues({
            vehicleId: '',
            manufacturer: '',
            typeOfAsset: '',
            assetNumber: '',
            registrationNumber: '',
            dateOfPurchase: '',
            supplierName: '',
            chassisNumber: '',
            engineNumber: '',
            modelNumber: '',
            basicValue: '',
            gst: '',
            tcs: '',
            totalValue: '',
          });
        }
      })
      .catch((err) => {});
  };

  return (
    <Fragment>
      <div className="application">
        <div className="appTab">
          <AddModal
            addModalShow={addModalShow}
            setAddModalShow={setAddModalShow}
            title="Add Vehicle"
          >
            <form onSubmit={handleAddVehicle}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Manufacturer</span>
                      <input
                        type="text"
                        value={values.manufacturer}
                        onChange={handleChange('manufacturer')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Type Of Asset</span>
                      <input
                        type="text"
                        value={values.typeOfAsset}
                        onChange={handleChange('typeOfAsset')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Asset Number</span>
                      <input
                        type="text"
                        value={values.assetNumber}
                        onChange={handleChange('assetNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Registraion Number</span>
                      <input
                        type="text"
                        value={values.registrationNumber}
                        onChange={handleChange('registrationNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Date of Purchase</span>
                      <input
                        type="date"
                        value={values.dateOfPurchase}
                        onChange={handleChange('dateOfPurchase')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Supplier Name</span>
                      <input
                        type="text"
                        value={values.supplierName}
                        onChange={handleChange('supplierName')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Enginer Number</span>
                      <input
                        type="text"
                        value={values.engineNumber}
                        onChange={handleChange('engineNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Chassis Number</span>
                      <input
                        type="text"
                        value={values.chassisNumber}
                        onChange={handleChange('chassisNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Model Number</span>
                      <input
                        type="text"
                        value={values.modelNumber}
                        onChange={handleChange('modelNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
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
                      <span>GST</span>
                      <input
                        type="text"
                        value={values.gst}
                        onChange={handleChange('gst')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>TCS</span>
                      <input
                        type="text"
                        value={values.tcs}
                        onChange={handleChange('tcs')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Total Value</span>
                      <input
                        type="text"
                        value={values.totalValue}
                        onChange={handleChange('totalValue')}
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
            title="Edit Vehicle"
          >
            <form onSubmit={handleEditVehicle}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Manufacturer</span>
                      <input
                        type="text"
                        value={values.manufacturer}
                        onChange={handleChange('manufacturer')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Type Of Asset</span>
                      <input
                        type="text"
                        value={values.typeOfAsset}
                        onChange={handleChange('typeOfAsset')}
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Asset Number</span>
                      <input
                        type="text"
                        value={values.assetNumber}
                        onChange={handleChange('assetNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Registraion Number</span>
                      <input
                        type="text"
                        value={values.registrationNumber}
                        onChange={handleChange('registrationNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Date of Purchase</span>
                      <input
                        type="date"
                        value={values.dateOfPurchase}
                        onChange={handleChange('dateOfPurchase')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Supplier Name</span>
                      <input
                        type="text"
                        value={values.supplierName}
                        onChange={handleChange('supplierName')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Enginer Number</span>
                      <input
                        type="text"
                        value={values.engineNumber}
                        onChange={handleChange('engineNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Chassis Number</span>
                      <input
                        type="text"
                        value={values.chassisNumber}
                        onChange={handleChange('chassisNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>Model Number</span>
                      <input
                        type="text"
                        value={values.modelNumber}
                        onChange={handleChange('modelNumber')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
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
                      <span>GST</span>
                      <input
                        type="text"
                        value={values.gst}
                        onChange={handleChange('gst')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                    <td>
                      <span>TCS</span>
                      <input
                        type="text"
                        value={values.tcs}
                        onChange={handleChange('tcs')}
                        required
                      />
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Total Value</span>
                      <input
                        type="text"
                        value={values.totalValue}
                        onChange={handleChange('totalValue')}
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
              <button onClick={handleDeleteVehicle} className="redButton">
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
                  vehicleId: '',
                  manufacturer: '',
                  typeOfAsset: '',
                  assetNumber: '',
                  registrationNumber: '',
                  dateOfPurchase: '',
                  supplierName: '',
                  chassisNumber: '',
                  engineNumber: '',
                  modelNumber: '',
                  basicValue: '',
                  gst: '',
                  tcs: '',
                  totalValue: '',
                });
              }}
            >
              <i className="fas fa-plus"></i> Add Vehicle
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
                      selectEditVehicle(row.original);
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Vehicle);
