const { _200, _error } = require('../common/httpHelper');
const logger = require('../common/logger');
const { RevenueDao, ExpenseDao } = require('../dao/index');

module.exports.GET_allRevenues = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const result = await RevenueDao.getAllRevenues();
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Failed to fetch all revenues | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_getAllRevenuesForASpecifcProject = async (
  httpRequest,
  httpResponse
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  const project_work_order_number = httpRequest.query.project_work_order_number;
  try {
    const result = await RevenueDao.getAllRevenuesForASpecificWorkOrderNumber(
      project_work_order_number
    );
    return _200(httpResponse, result);
  } catch (err) {
    console.log(err);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_revenueDetails = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const revenue_id = httpRequest.query.revenue_id;
    const result = await RevenueDao.getRevenueDetails(revenue_id);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Failed to fetch revenue details | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.POST_addRevenue = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [
      httpRequest.body.revenue.customer_invoice_number,
      httpRequest.body.revenue.project_work_order_number,
      httpRequest.body.revenue.client_invoice_date,
      httpRequest.body.revenue.client_invoice_number,
      httpRequest.body.revenue.basic_value,
      httpRequest.body.revenue.cgst,
      httpRequest.body.revenue.sgst,
      httpRequest.body.revenue.igst,
      httpRequest.body.revenue.total_tax,
      user_id,
    ];

    const params = {
      values: values,
    };
    const result = await RevenueDao.addRevenue(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.PUT_editRevenueDetails = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [
      httpRequest.body.revenue.revenue_id,
      httpRequest.body.revenue.customer_invoice_number,
      httpRequest.body.revenue.project_work_order_number,
      httpRequest.body.revenue.client_invoice_date,
      httpRequest.body.revenue.client_invoice_number,
      httpRequest.body.revenue.basic_value,
      httpRequest.body.revenue.cgst,
      httpRequest.body.revenue.sgst,
      httpRequest.body.revenue.igst,
      httpRequest.body.revenue.total_tax,
      user_id,
    ];
    const params = {
      values: values,
    };
    const result = await RevenueDao.editRevenueDetails(params);
    return _200(httpResponse, result);
  } catch (err) {
    console.log(err);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.DELETE_deleteRevenue = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  const revenue_id = httpRequest.query.revenue_id;
  try {
    const result = await RevenueDao.deleteRevenue(revenue_id);
    logger.info(
      `DELETE : Deleted Revenue successfully | user_id: ${user_id} | revenue_id: ${revenue_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `DLETE: Failed to delete revenue | user_id: ${user_id} | revenue_id: ${httpRequest.query.revenue_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};
