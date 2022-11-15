const { _200, _error } = require('../common/httpHelper');
const logger = require('../common/logger');
const { PaymentDao, ExpenseDao, RevenueDao } = require('../dao/index');

module.exports.GET_allPayments = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const result = await PaymentDao.getAllPayments();
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Failed to fetch all payments | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_paymentDetails = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const payment_id = httpRequest.query.payment_id;
    const result = await PaymentDao.getPaymentDetails(payment_id);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Failed to fetch payment details | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.POST_addPayment = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    let is_mapped = false;
    if (httpRequest.body.payment.payment_type == 'INFLOW') {
      const revenue = await RevenueDao.getRevenueFromInvoiceNumber(
        httpRequest.body.payment.invoice_number
      );
      if (revenue[0]) {
        is_mapped = true;
      }
    } else {
      const expense = await ExpenseDao.getExpenseFromInvoiceNumber(
        httpRequest.body.payment.invoice_number
      );
      if (expense[0]) {
        is_mapped = true;
      }
    }
    const values = [
      httpRequest.body.payment.payment_type,
      httpRequest.body.payment.transaction_date,
      httpRequest.body.payment.transaction_id,
      httpRequest.body.payment.bank_reference_number,
      httpRequest.body.payment.invoice_number,
      httpRequest.body.payment.total_amount,
      is_mapped,
      user_id,
    ];

    const params = {
      values: values,
    };
    const result = await PaymentDao.addPayment(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.PUT_editPaymentDetails = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    let is_mapped = false;
    if (httpRequest.body.payment.payment_type == 'INFLOW') {
      const revenue = await RevenueDao.getRevenueFromInvoiceNumber(
        httpRequest.body.payment.invoice_number
      );
      if (revenue[0]) {
        is_mapped = true;
      }
    } else {
      const expense = await ExpenseDao.getExpenseFromInvoiceNumber(
        httpRequest.body.payment.invoice_number
      );
      if (expense[0]) {
        is_mapped = true;
      }
    }
    const values = [
      httpRequest.body.payment.payment_id,
      httpRequest.body.payment.payment_type,
      httpRequest.body.payment.transaction_date,
      httpRequest.body.payment.transaction_id,
      httpRequest.body.payment.bank_reference_number,
      httpRequest.body.payment.invoice_number,
      httpRequest.body.payment.total_amount,
      is_mapped,
      user_id,
    ];

    const params = {
      values: values,
    };
    const result = await PaymentDao.editPaymentDetails(params);
    return _200(httpResponse, result);
  } catch (err) {
    console.log(err);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.DELETE_deletePayment = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  const payment_id = httpRequest.query.payment_id;
  try {
    const result = await PaymentDao.deletePayment(payment_id);
    logger.info(
      `DELETE : Deleted Payment successfully | user_id: ${user_id} | payment_id: ${payment_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `DLETE: Failed to delete payment | user_id: ${user_id} | payment_id: ${httpRequest.query.payment_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};
