const express = require('express');
const { authValidator } = require('../common/authHelper');
const router = express.Router();
const routeNames = require('../constants/routeNames');
const { ExpenseService } = require('../services');

router.get(routeNames.GET_ALL_EXPENSES, [
  authValidator,
  ExpenseService.GET_allExpenses,
]);

router.get(routeNames.GET_EXPENSE_DETAILS, [
  authValidator,
  ExpenseService.GET_expenseDetails,
]);

router.post(routeNames.ADD_NEW_EXPENSE, [
  authValidator,
  ExpenseService.POST_addExpense,
]);

router.put(routeNames.EDIT_A_EXPENSE, [
  authValidator,
  ExpenseService.PUT_editExpense,
]);

router.delete(routeNames.DELETE_A_EXPENSE, [
  authValidator,
  ExpenseService.DELETE_deleteExpense,
]);

module.exports = router;
