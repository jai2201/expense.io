const express = require('express');
const { authValidator } = require('../common/authHelper');
const router = express.Router();
const routeNames = require('../constants/routeNames');
const { EmployeeService } = require('../services');

router.get(routeNames.GET_ALL_EMPLOYEES, [
  authValidator,
  EmployeeService.GET_allEmployees,
]);

router.get(routeNames.GET_EMPLOYEE_DETAILS, [
  authValidator,
  EmployeeService.GET_employeeDetails,
]);

router.post(routeNames.ADD_NEW_EMPLOYEE, [
  authValidator,
  EmployeeService.POST_addEmployee,
]);

router.put(routeNames.EDIT_A_EMPLOYEE, [
  authValidator,
  EmployeeService.PUT_editEmployee,
]);

router.delete(routeNames.DELETE_A_EMPLOYEE, [
  authValidator,
  EmployeeService.DELETE_deleteEmployee,
]);

module.exports = router;
