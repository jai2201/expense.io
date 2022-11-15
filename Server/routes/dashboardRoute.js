const express = require('express');
const { authValidator } = require('../common/authHelper');
const router = express.Router();
const routeNames = require('../constants/routeNames');
const { DashboardService } = require('../services');

router.get(routeNames.GET_DASHBOARD_DETAILS, [
  authValidator,
  DashboardService.GET_getDashboardDetails,
]);

router.get(routeNames.GET_ALL_EXPENSES_FOR_A_MONTH, [
  authValidator,
  DashboardService.GET_getAllExpensesForAMonth,
]);

router.get(routeNames.GET_ALL_EXPENSES_FOR_A_PROJECT, [
  authValidator,
  DashboardService.GET_getAllExpensesForASpecificProject,
]);

router.get(routeNames.GET_ALL_REVENUES_FOR_A_SPECIFIC_PROJECT, [
  authValidator,
  DashboardService.GET_getAllRevenuesForASpecifcProject,
]);

router.get(routeNames.GET_ALL_PAYMENTS_FOR_A_PROJECT, [
  authValidator,
  DashboardService.GET_getAllPaymentsForASpecificProject,
]);

module.exports = router;
