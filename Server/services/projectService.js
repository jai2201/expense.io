const { _200, _error } = require('../common/httpHelper');
const logger = require('../common/logger');
const { ProjectDao } = require('../dao/index');

module.exports.GET_allProjects = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const result = await ProjectDao.getAllProjects();
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Failed to fetch all projects | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_projectDetails = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const project_id = httpRequest.query.project_id;
    const result = await ProjectDao.getProjectDetails(project_id);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.POST_addProject = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [
      httpRequest.body.project.project_name,
      httpRequest.body.project.project_code,
      httpRequest.body.project.project_location,
      httpRequest.body.project.project_type_id,
      httpRequest.body.project.client_name,
      httpRequest.body.project.concern_person_name,
      httpRequest.body.project.concern_person_number,
      httpRequest.body.project.concern_person_email,
      httpRequest.body.project.work_order_number,
      httpRequest.body.project.work_order_value,
      httpRequest.body.project.work_order_date,
      httpRequest.body.project.work_order_validity_year,
      httpRequest.body.project.work_order_validity_month,
      user_id,
    ];
    const params = {
      values: values,
    };
    const result = await ProjectDao.addProject(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.PUT_editProjectDetails = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [
      httpRequest.body.project.project_id,
      httpRequest.body.project.project_name,
      httpRequest.body.project.project_code,
      httpRequest.body.project.project_location,
      httpRequest.body.project.project_type_id,
      httpRequest.body.project.client_name,
      httpRequest.body.project.concern_person_name,
      httpRequest.body.project.concern_person_number,
      httpRequest.body.project.concern_person_email,
      httpRequest.body.project.work_order_number,
      httpRequest.body.project.work_order_value,
      httpRequest.body.project.work_order_date,
      httpRequest.body.project.work_order_validity_year,
      httpRequest.body.project.work_order_validity_month,
      user_id,
    ];
    const params = {
      values: values,
    };
    const result = await ProjectDao.editProjectDetails(params);
    return _200(httpResponse, result);
  } catch (err) {
    console.log(err);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.DELETE_deleteProject = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const project_id = httpRequest.query.project_id;
    const result = await ProjectDao.deleteProject(project_id);
    logger.info(
      `DELETE : Deleted Project successfully | user_id: ${user_id} | project_id: ${project_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `DELETE: Failed to delete project | user_id: ${user_id} | project_id: ${httpRequest.query.project_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_getListOfAllExpensesAndRevenuesMonthWiseForAProject = async (
  httpRequest,
  httpResponse
) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  const project_id = httpRequest.query.project_id;
  try {
    const project = await ProjectDao.getProjectDetails(project_id);
    const mapOfListExpensesMonthWise = [];
    for (let i = 1; i < 13; i++) {
      const keyPair = {};
      const listOfExpensesForAMonth =
        await ProjectDao.getExpensesForAMonthOfAProject(i, project_id);
      const revenuesAmountForAMonth =
        await ProjectDao.getRevenueSumForAMonthOfAProject(
          i,
          project[0]['PR_WorkOrderNumber']
        );
      keyPair['expenses'] = listOfExpensesForAMonth;
      keyPair['revenueAmount'] = revenuesAmountForAMonth;
      mapOfListExpensesMonthWise.push([i, keyPair]);
    }
    return _200(httpResponse, mapOfListExpensesMonthWise);
  } catch (err) {
    logger.error(
      `GET: Failed to get all expenses of a month for a project | user_id: ${user_id} | project_id: ${httpRequest.query.project_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};
