const pool = require('../db/index');
const { RevenueQuery } = require('../queries');

module.exports.getAllRevenues = async () => {
  try {
    const result = await pool.query(RevenueQuery.GET_ALL_REVENUES);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getRevenueDetails = async (revenue_id) => {
  try {
    const result = await pool.query(RevenueQuery.GET_REVENUE_DETAILS, [
      revenue_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.addRevenue = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(RevenueQuery.ADD_NEW_REVENUE, values);
    return result.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports.editRevenueDetails = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(RevenueQuery.EDIT_A_REVENUE, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getRevenueFromInvoiceNumber = async (invoice_number) => {
  try {
    console.log(invoice_number);
    const result = await pool.query(
      RevenueQuery.GET_REVENUE_FROM_CUSTOMER_INVOICE_NUMBER,
      [invoice_number]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteRevenue = async (revenue_id) => {
  try {
    const result = await pool.query(RevenueQuery.DELETE_A_REVENUE, [
      revenue_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};
