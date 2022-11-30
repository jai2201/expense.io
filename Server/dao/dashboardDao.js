const pool = require('../db/index');
const { DashboardQuery } = require('../queries');

module.exports.getExpensesForAMonth = async (month) => {
  try {
    const result = await pool.query(
      DashboardQuery.GET_ALL_EXPENSES_FOR_A_MONTH,
      [month]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getTotalExpenseAmountForAProject = async (project_id) => {
  try {
    const result = await pool.query(
      DashboardQuery.GET_EXPENSE_AMOUNT_FOR_A_PROJECT,
      [project_id]
    );
    if (result.rows[0]['sum']) {
      return result.rows[0]['sum'];
    } else {
      return 0;
    }
  } catch (err) {
    throw err;
  }
};

module.exports.getTotalAmountOfRevenueForASpecificWorkOrderNumber = async (
  project_work_order_number
) => {
  try {
    const result = await pool.query(
      DashboardQuery.GET_TOTAL_REVENUE_AMOUNT_FOR_A_PROJECT,
      [project_work_order_number]
    );
    if (result.rows[0]['sum']) {
      return result.rows[0]['sum'];
    } else {
      return 0;
    }
  } catch (err) {
    throw err;
  }
};

module.exports.getTotalPaymentAmountForAProject = async (
  project_id,
  list_of_invoice_numbers,
  is_mapped
) => {
  try {
    let result;
    if (is_mapped !== null) {
      if (is_mapped) {
        result = await pool.query(
          DashboardQuery.GET_TOTAL_MAPPED_PAYMENT_AMOUNT_FOR_LIST_OF_INVOICE_NUMBERS,
          [list_of_invoice_numbers]
        );
      } else {
        result = await pool.query(
          DashboardQuery.GET_TOTAL_UNMAPPED_PAYMENT_AMOUNT_FOR_LIST_OF_INVOICE_NUMBERS,
          [project_id]
        );
      }
    } else {
      result = await pool.query(
        DashboardQuery.GET_TOTAL_PAYMENT_FOR_LIST_OF_INVOICE_NUMBERS,
        [list_of_invoice_numbers]
      );
    }
    if (result.rows[0]['sum']) {
      return result.rows[0]['sum'];
    } else {
      return 0;
    }
  } catch (err) {
    throw err;
  }
};
