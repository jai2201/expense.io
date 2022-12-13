const { _200, _error } = require('../common/httpHelper');
const logger = require('../common/logger');
const {
  DashboardDao,
  ProjectDao,
  RevenueDao,
  ExpenseDao,
} = require('../dao/index');
const _ = require('underscore');

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
      data['totalInflowPayment'] = await DashboardDao.getTypeOfPayment(
        project_id,
        'INFLOW'
      );
      data['totalOutflowPayment'] = await DashboardDao.getTypeOfPayment(
        project_id,
        'OUTFLOW'
      );
      // const expenses_for_the_project =
      //   await ExpenseDao.getAllExpensesForAProject(
      //     listOfAllProjects[i]['PR_ID']
      //   );
      // const revenues_for_the_project =
      //   await RevenueDao.getAllRevenuesForASpecificWorkOrderNumber(
      //     listOfAllProjects[i]['PR_WorkOrderNumber']
      //   );
      // const list_of_expense_invoice_numbers = _.pluck(
      //   expenses_for_the_project,
      //   'E_InvoiceNumber'
      // );
      // const list_of_customer_invoice_numbers = _.pluck(
      //   revenues_for_the_project,
      //   'R_CustomerInvoiceNumber'
      // );
      // const list_of_invoice_numbers = list_of_expense_invoice_numbers.concat(
      //   list_of_customer_invoice_numbers
      // );
      // data['totalMappedPayment'] =
      //   await DashboardDao.getTotalPaymentAmountForAProject(
      //     listOfAllProjects[i]['PR_ID'],
      //     list_of_invoice_numbers,
      //     true
      //   );
      // data['totalUnmappedPayment'] =
      //   await DashboardDao.getTotalPaymentAmountForAProject(
      //     listOfAllProjects[i]['PR_ID'],
      //     null,
      //     false
      //   );
      result.push(data);
    }
    return _200(httpResponse, result);
  } catch (err) {
    console.log(err);
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
