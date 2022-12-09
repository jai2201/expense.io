const { _200, _error } = require('../common/httpHelper');
const logger = require('../common/logger');
const { VehicleDao } = require('../dao/index');

module.exports.GET_allVehicles = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const result = await VehicleDao.getAllVehicles();
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_vehicleDetails = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const vehicle_id = httpRequest.query.vehicle_id;
    const result = await VehicleDao.getVehicleDetails(vehicle_id);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Failed to fetch vehicle details | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.POST_addVehicle = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [
      httpRequest.body.vehicle.manufacturer,
      httpRequest.body.vehicle.type_of_asset,
      httpRequest.body.vehicle.asset_number,
      httpRequest.body.vehicle.registration_number,
      httpRequest.body.vehicle.date_of_purchase,
      httpRequest.body.vehicle.supplier_name,
      httpRequest.body.vehicle.chassis_number,
      httpRequest.body.vehicle.engine_number,
      httpRequest.body.vehicle.model_number,
      httpRequest.body.vehicle.basic_value,
      httpRequest.body.vehicle.gst,
      httpRequest.body.vehicle.tcs,
      httpRequest.body.vehicle.total_value,
      user_id,
    ];
    const params = {
      values: values,
    };
    const result = await VehicleDao.addVehicle(params);
    return _200(httpResponse, result);
  } catch (err) {
    console.log(err);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.PUT_editVehicle = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [
      httpRequest.body.vehicle.vehicle_id,
      httpRequest.body.vehicle.manufacturer,
      httpRequest.body.vehicle.type_of_asset,
      httpRequest.body.vehicle.asset_number,
      httpRequest.body.vehicle.registration_number,
      httpRequest.body.vehicle.date_of_purchase,
      httpRequest.body.vehicle.supplier_name,
      httpRequest.body.vehicle.chassis_number,
      httpRequest.body.vehicle.engine_number,
      httpRequest.body.vehicle.model_number,
      httpRequest.body.vehicle.basic_value,
      httpRequest.body.vehicle.gst,
      httpRequest.body.vehicle.tcs,
      httpRequest.body.vehicle.total_value,
      user_id,
    ];
    const params = {
      values: values,
    };
    const result = await VehicleDao.editVehicleDetails(params);
    return _200(httpResponse, result);
  } catch (err) {
    console.log(err);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.DELETE_deleteVehicle = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const vehicle_id = httpRequest.query.vehicle_id;
    const result = await VehicleDao.deleteVehicle(vehicle_id);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `DELETE: Failed to delete vehicle | vehicle_id: ${httpRequest.query.vehicle_id} | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};
