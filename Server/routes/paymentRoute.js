const express = require('express');
const router = express.Router();
const routeNames = require('../constants/routeNames');
const { authValidator } = require('../common/authHelper');
const { PaymentService } = require('../services');

router.get(routeNames.GET_ALL_PAYMENTS, [
  authValidator,
  PaymentService.GET_allPayments,
]);

router.get(routeNames.GET_ALL_PAYMENTS_FOR_A_PROJECT, [
  authValidator,
  PaymentService.GET_getAllPaymentsForASpecificProject,
]);

router.get(routeNames.GET_PAYMENT_DETAILS, [
  authValidator,
  PaymentService.GET_paymentDetails,
]);

router.post(routeNames.ADD_NEW_PAYMENT, [
  authValidator,
  PaymentService.POST_addPayment,
]);

router.put(routeNames.EDIT_A_PAYMENT, [
  authValidator,
  PaymentService.PUT_editPaymentDetails,
]);

router.delete(routeNames.DELETE_A_PAYMENT, [
  authValidator,
  PaymentService.DELETE_deletePayment,
]);

module.exports = router;
