const express = require('express');
const router = express.Router();
const routeNames = require('../constants/routeNames');
const { authValidator } = require('../common/authHelper');
const { RevenueService } = require('../services');

router.get(routeNames.GET_ALL_REVENUES, [
  authValidator,
  RevenueService.GET_allRevenues,
]);

router.get(routeNames.GET_ALL_REVENUES_FOR_A_SPECIFIC_PROJECT, [
  authValidator,
  RevenueService.GET_getAllRevenuesForASpecifcProject,
]);

router.get(routeNames.GET_REVENUE_DETAILS, [
  authValidator,
  RevenueService.GET_revenueDetails,
]);

router.post(routeNames.ADD_NEW_REVENUE, [
  authValidator,
  RevenueService.POST_addRevenue,
]);

router.put(routeNames.EDIT_A_REVENUE, [
  authValidator,
  RevenueService.PUT_editRevenueDetails,
]);

router.delete(routeNames.DELETE_A_REVENUE, [
  authValidator,
  RevenueService.DELETE_deleteRevenue,
]);

module.exports = router;
