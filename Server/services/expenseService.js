const { _200, _error } = require('../common/httpHelper');
const logger = require('../common/logger');
const { ExpenseDao } = require('../dao/index');

module.exports.GET_allExpenses = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const result = await ExpenseDao.getAllExpenses();
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Failed to fetch all expenses | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_getAllExpensesForASpecificProject = async (
  httpRequest,
  httpResponse
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  const project_id = httpRequest.query.project_id;
  try {
    const result = await ExpenseDao.getAllExpensesForAProject(project_id);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Failed to fetch all expense for the project : ${project_id} | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_expenseDetails = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const expense_id = httpRequest.query.expense_id;
    const result = await ExpenseDao.getExpenseDetails(expense_id);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Failed to fetch expense details | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.POST_addExpense = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    let values = [];
    if (httpRequest.body.expense.start_date == '') {
      values = [
        httpRequest.body.expense.project_id,
        httpRequest.body.expense.type,
        httpRequest.body.expense.expense_code_id,
        httpRequest.body.expense.interval_of_expense,
        null,
        null,
        httpRequest.body.expense.expense_date,
        httpRequest.body.expense.partner_id,
        httpRequest.body.expense.invoice_number,
        httpRequest.body.expense.invoice_date,
        httpRequest.body.expense.cost_center,
        httpRequest.body.expense.basic_value,
        httpRequest.body.expense.cgst,
        httpRequest.body.expense.sgst,
        httpRequest.body.expense.igst,
        httpRequest.body.expense.total_tax,
        user_id,
      ];
    } else if (
      httpRequest.body.expense.start_date !== '' &&
      httpRequest.body.expense.end_date == ''
    ) {
      values = [
        httpRequest.body.expense.project_id,
        httpRequest.body.expense.type,
        httpRequest.body.expense.expense_code_id,
        httpRequest.body.expense.interval_of_expense,
        httpRequest.body.expense.start_date,
        null,
        httpRequest.body.expense.expense_date,
        httpRequest.body.expense.partner_id,
        httpRequest.body.expense.invoice_number,
        httpRequest.body.expense.invoice_date,
        httpRequest.body.expense.cost_center,
        httpRequest.body.expense.basic_value,
        httpRequest.body.expense.cgst,
        httpRequest.body.expense.sgst,
        httpRequest.body.expense.igst,
        httpRequest.body.expense.total_tax,
        user_id,
      ];
    } else {
      values = [
        httpRequest.body.expense.project_id,
        httpRequest.body.expense.type,
        httpRequest.body.expense.expense_code_id,
        httpRequest.body.expense.interval_of_expense,
        httpRequest.body.expense.start_date,
        httpRequest.body.expense.end_date,
        httpRequest.body.expense.expense_date,
        httpRequest.body.expense.partner_id,
        httpRequest.body.expense.invoice_number,
        httpRequest.body.expense.invoice_date,
        httpRequest.body.expense.cost_center,
        httpRequest.body.expense.basic_value,
        httpRequest.body.expense.cgst,
        httpRequest.body.expense.sgst,
        httpRequest.body.expense.igst,
        httpRequest.body.expense.total_tax,
        user_id,
      ];
    }
    const params = {
      values: values,
    };
    const result = await ExpenseDao.addExpense(params);
    return _200(httpResponse, result);
  } catch (err) {
    console.log(err);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.PUT_editExpense = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    let values = [];
    if (httpRequest.body.expense.start_date == '') {
      values = [
        httpRequest.body.expense.expense_id,
        httpRequest.body.expense.project_id,
        httpRequest.body.expense.type,
        httpRequest.body.expense.expense_code_id,
        httpRequest.body.expense.interval_of_expense,
        null,
        null,
        httpRequest.body.expense.expense_date,
        httpRequest.body.expense.partner_id,
        httpRequest.body.expense.invoice_number,
        httpRequest.body.expense.invoice_date,
        httpRequest.body.expense.cost_center,
        httpRequest.body.expense.basic_value,
        httpRequest.body.expense.cgst,
        httpRequest.body.expense.sgst,
        httpRequest.body.expense.igst,
        httpRequest.body.expense.total_tax,
        user_id,
      ];
    } else if (
      httpRequest.body.expense.start_date !== '' &&
      httpRequest.body.expense.end_date == ''
    ) {
      values = [
        httpRequest.body.expense.expense_id,
        httpRequest.body.expense.project_id,
        httpRequest.body.expense.type,
        httpRequest.body.expense.expense_code_id,
        httpRequest.body.expense.interval_of_expense,
        httpRequest.body.expense.start_date,
        null,
        httpRequest.body.expense.expense_date,
        httpRequest.body.expense.partner_id,
        httpRequest.body.expense.invoice_number,
        httpRequest.body.expense.invoice_date,
        httpRequest.body.expense.cost_center,
        httpRequest.body.expense.basic_value,
        httpRequest.body.expense.cgst,
        httpRequest.body.expense.sgst,
        httpRequest.body.expense.igst,
        httpRequest.body.expense.total_tax,
        user_id,
      ];
    } else {
      values = [
        httpRequest.body.expense.expense_id,
        httpRequest.body.expense.project_id,
        httpRequest.body.expense.type,
        httpRequest.body.expense.expense_code_id,
        httpRequest.body.expense.interval_of_expense,
        httpRequest.body.expense.start_date,
        httpRequest.body.expense.end_date,
        httpRequest.body.expense.expense_date,
        httpRequest.body.expense.partner_id,
        httpRequest.body.expense.invoice_number,
        httpRequest.body.expense.invoice_date,
        httpRequest.body.expense.cost_center,
        httpRequest.body.expense.basic_value,
        httpRequest.body.expense.cgst,
        httpRequest.body.expense.sgst,
        httpRequest.body.expense.igst,
        httpRequest.body.expense.total_tax,
        user_id,
      ];
    }
    const params = {
      values: values,
    };
    const result = await ExpenseDao.editExpenseDetails(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.DELETE_deleteExpense = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const expense_id = httpRequest.query.expense_id;
    const result = await ExpenseDao.deleteExpense(expense_id);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `DELETE: Failed to delete expense | expense_id: ${httpRequest.query.expense_id} | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};
