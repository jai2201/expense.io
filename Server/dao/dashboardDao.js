const pool = require('../db/index');
const { DashboardQuery } = require('../queries');
const _ = require('underscore');

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

module.exports.getAllExpensesForAProject = async (project_id) => {
  try {
    const result = await pool.query(
      DashboardQuery.GET_ALL_EXPENSES_FOR_A_PROJECT,
      [project_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllRevenuesForASpecificWorkOrderNumber = async (
  project_work_order_number
) => {
  try {
    const result = await pool.query(
      DashboardQuery.GET_ALL_REVENUES_FOR_A_PROJECT,
      [project_work_order_number]
    );
    return result.rows;
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

module.exports.getAllPaymentsForAProject = async (project_details) => {
  try {
    const expenses_for_the_project = await this.getAllExpensesForAProject(
      project_details[0]['PR_ID']
    );
    const project_work_order_number = project_details[0]['PR_WorkOrderNumber'];
    const revenues_for_the_project =
      await this.getAllRevenuesForASpecificWorkOrderNumber(
        project_work_order_number
      );
    const list_of_expense_invoice_numbers = _.pluck(
      expenses_for_the_project,
      'E_InvoiceNumber'
    );
    const list_of_customer_invoice_numbers = _.pluck(
      revenues_for_the_project,
      'R_CustomerInvoiceNumber'
    );
    const list_of_invoice_numbers = list_of_expense_invoice_numbers.concat(
      list_of_customer_invoice_numbers
    );
    const result = await pool.query(
      DashboardQuery.GET_ALL_PAYMENTS_FOR_LIST_OF_INVOICE_NUMBERS,
      [list_of_invoice_numbers]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getTotalPaymentAmountForAProject = async (
  project_details,
  is_mapped
) => {
  try {
    const expenses_for_the_project = await this.getAllExpensesForAProject(
      project_details['PR_ID']
    );
    const project_work_order_number = project_details['PR_WorkOrderNumber'];
    const revenues_for_the_project =
      await this.getAllRevenuesForASpecificWorkOrderNumber(
        project_work_order_number
      );
    const list_of_expense_invoice_numbers = _.pluck(
      expenses_for_the_project,
      'E_InvoiceNumber'
    );
    const list_of_customer_invoice_numbers = _.pluck(
      revenues_for_the_project,
      'R_CustomerInvoiceNumber'
    );
    const list_of_invoice_numbers = list_of_expense_invoice_numbers.concat(
      list_of_customer_invoice_numbers
    );
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
          [list_of_invoice_numbers]
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
