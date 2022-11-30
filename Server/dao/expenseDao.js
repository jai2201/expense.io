const pool = require('../db/index');
const { ExpenseQuery } = require('../queries');

module.exports.getAllExpenses = async () => {
  try {
    const result = await pool.query(ExpenseQuery.GET_ALL_EXPENSES);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllExpensesForAProject = async (project_id) => {
  try {
    const result = await pool.query(
      ExpenseQuery.GET_ALL_EXPENSES_FOR_A_PROJECT,
      [project_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getExpenseDetails = async (expense_id) => {
  try {
    const result = await pool.query(ExpenseQuery.GET_EXPENSE_DETAILS, [
      expense_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.addExpense = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(ExpenseQuery.ADD_NEW_EXPENSE, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.editExpenseDetails = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(ExpenseQuery.EDIT_A_EXPENSE, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getExpenseFromInvoiceNumber = async (invoice_number) => {
  try {
    const result = await pool.query(
      ExpenseQuery.GET_EXPENSE_FROM_INVOICE_NUMBER,
      [invoice_number]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteExpense = async (expense_id) => {
  try {
    const result = await pool.query(ExpenseQuery.DELETE_A_EXPENSE, [
      expense_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};
