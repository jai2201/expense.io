const { _200, _error } = require('../common/httpHelper');
const logger = require('../common/logger');
const { DashboardDao, ProjectDao, RevenueDao } = require('../dao/index');

module.exports.GET_getDashboardDetails = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const listOfAllProjects = await ProjectDao.getAllProjects();
    const result = [];
    for (let i = 0; i < listOfAllProjects.length; i++) {
      const data = {};
      const project_id = listOfAllProjects[i]['PR_ID'];
      data['projectDetails'] = listOfAllProjects[i];
      data['totalExpense'] =
        await DashboardDao.getTotalExpenseAmountForAProject(project_id);
      data['totalRevenue'] =
        await DashboardDao.getTotalAmountOfRevenueForASpecificWorkOrderNumber(
          listOfAllProjects[i]['PR_WorkOrderNumber']
        );
      data['totalMappedPayment'] =
        await DashboardDao.getTotalPaymentAmountForAProject(
          listOfAllProjects[i],
          true
        );
      data['totalUnmappedPayment'] =
        await DashboardDao.getTotalPaymentAmountForAProject(
          listOfAllProjects[i],
          false
        );
      result.push(data);
    }
    console.log(result);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_getAllExpensesForAMonth = async (
  httpRequest,
  httpResponse
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  const month = httpRequest.query.month;
  try {
    const result = await DashboardDao.getExpensesForAMonth(month);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Failed to fetch all expense for the month : ${month} | user_id: ${user_id} | ${err}`
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
    const result = await DashboardDao.getAllExpensesForAProject(project_id);
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

module.exports.GET_getAllRevenuesForASpecifcProject = async (
  httpRequest,
  httpResponse
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  const project_id = httpRequest.query.project_id;
  try {
    const project_details = await ProjectDao.getProjectDetails(project_id);
    const project_work_order_number = project_details[0]['PR_WorkOrderNumber'];
    const result = await DashboardDao.getAllRevenuesForASpecificWorkOrderNumber(
      project_work_order_number
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Failed to fetch all revenues for the project : ${project_id} | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_getAllPaymentsForASpecificProject = async (
  httpRequest,
  httpResponse
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  const project_id = httpRequest.query.project_id;
  try {
    const project_details = await ProjectDao.getProjectDetails(project_id);
    const list_of_payments_for_invoice_numbers_of_a_project =
      await DashboardDao.getAllPaymentsForAProject(project_details);
    return _200(
      httpResponse,
      list_of_payments_for_invoice_numbers_of_a_project
    );
  } catch (err) {
    logger.error(
      `GET: Failed to fetch all revenues for the project : ${project_id} | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};
