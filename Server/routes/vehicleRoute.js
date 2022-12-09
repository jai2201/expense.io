const express = require('express');
const { authValidator } = require('../common/authHelper');
const router = express.Router();
const routeNames = require('../constants/routeNames');
const { VehicleService } = require('../services');

router.get(routeNames.GET_ALL_VEHICLES, [
  authValidator,
  VehicleService.GET_allVehicles,
]);

router.get(routeNames.GET_VEHICLE_DETAILS, [
  authValidator,
  VehicleService.GET_vehicleDetails,
]);

router.post(routeNames.ADD_NEW_VEHICLE, [
  authValidator,
  VehicleService.POST_addVehicle,
]);

router.put(routeNames.EDIT_A_VEHICLE, [
  authValidator,
  VehicleService.PUT_editVehicle,
]);

router.delete(routeNames.DELETE_A_VEHICLE, [
  authValidator,
  VehicleService.DELETE_deleteVehicle,
]);

module.exports = router;
