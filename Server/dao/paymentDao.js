const pool = require('../db/index');
const { PaymentQuery } = require('../queries');

module.exports.getAllPayments = async () => {
  try {
    const result = await pool.query(PaymentQuery.GET_ALL_PAYMENTS);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllPaymentsForAProject = async (project_id) => {
  try {
    const result = await pool.query(
      PaymentQuery.GET_ALL_PAYMENTS_FOR_A_PROJECT,
      [project_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getPaymentDetails = async (payment_id) => {
  try {
    const result = await pool.query(PaymentQuery.GET_PAYMENT_DETAILS, [
      payment_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.addPayment = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(PaymentQuery.ADD_NEW_PAYMENT, values);
    return result.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports.editPaymentDetails = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(PaymentQuery.EDIT_A_PAYMENT, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.deletePayment = async (payment_id) => {
  try {
    const result = await pool.query(PaymentQuery.DELETE_A_PAYMENT, [
      payment_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};
