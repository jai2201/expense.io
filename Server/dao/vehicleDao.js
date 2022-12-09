const pool = require('../db/index');
const { VehicleQuery } = require('../queries');

module.exports.getAllVehicles = async () => {
  try {
    const result = await pool.query(VehicleQuery.GET_ALL_VEHICLES);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getVehicleDetails = async (vehicle_id) => {
  try {
    const result = await pool.query(VehicleQuery.GET_VEHICLE_DETAILS, [
      vehicle_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.addVehicle = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(VehicleQuery.ADD_NEW_VEHICLE, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.editVehicleDetails = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(VehicleQuery.EDIT_A_VEHICLE, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteVehicle = async (vehicle_id) => {
  try {
    const result = await pool.query(VehicleQuery.DELETE_A_VEHICLE, [
      vehicle_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};
