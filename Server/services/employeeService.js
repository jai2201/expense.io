const { _200, _error } = require('../common/httpHelper');
const logger = require('../common/logger');
const { EmployeeDao } = require('../dao/index');

module.exports.GET_allEmployees = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const result = await EmployeeDao.getAllEmployees();
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_employeeDetails = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const employee_id = httpRequest.query.employee_id;
    const result = await EmployeeDao.getEmployeeDetails(employee_id);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Failed to fetch employee details | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.POST_addEmployee = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    let values = [];
    if (
      httpRequest.body.employee.employee_date_of_exit !== '' &&
      httpRequest.body.employee.employee_date_of_exit
    ) {
      values = [
        httpRequest.body.employee.project_id,
        httpRequest.body.employee.employee_code,
        httpRequest.body.employee.employee_name,
        httpRequest.body.employee.employee_designation,
        httpRequest.body.employee.employee_salary,
        httpRequest.body.employee.employee_date_of_joining,
        httpRequest.body.employee.employee_date_of_exit,
        httpRequest.body.employee.is_active,
        user_id,
      ];
    } else {
      values = [
        httpRequest.body.employee.project_id,
        httpRequest.body.employee.employee_code,
        httpRequest.body.employee.employee_name,
        httpRequest.body.employee.employee_designation,
        httpRequest.body.employee.employee_salary,
        httpRequest.body.employee.employee_date_of_joining,
        null,
        httpRequest.body.employee.is_active,
        user_id,
      ];
    }
    const params = {
      values: values,
    };
    const result = await EmployeeDao.addEmployee(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.PUT_editEmployee = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    let values = [];
    if (
      httpRequest.body.employee.employee_date_of_exit !== '' &&
      httpRequest.body.employee.employee_date_of_exit
    ) {
      values = [
        httpRequest.body.employee.employee_id,
        httpRequest.body.employee.project_id,
        httpRequest.body.employee.employee_code,
        httpRequest.body.employee.employee_name,
        httpRequest.body.employee.employee_designation,
        httpRequest.body.employee.employee_salary,
        httpRequest.body.employee.employee_date_of_joining,
        httpRequest.body.employee.employee_date_of_exit,
        httpRequest.body.employee.is_active,
        user_id,
      ];
    } else {
      values = [
        httpRequest.body.employee.employee_id,
        httpRequest.body.employee.project_id,
        httpRequest.body.employee.employee_code,
        httpRequest.body.employee.employee_name,
        httpRequest.body.employee.employee_designation,
        httpRequest.body.employee.employee_salary,
        httpRequest.body.employee.employee_date_of_joining,
        null,
        httpRequest.body.employee.is_active,
        user_id,
      ];
    }
    const params = {
      values: values,
    };
    const result = await EmployeeDao.editEmployeeDetails(params);
    return _200(httpResponse, result);
  } catch (err) {
    console.log(err);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.DELETE_deleteEmployee = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const employee_id = httpRequest.query.employee_id;
    const result = await EmployeeDao.deleteEmployee(employee_id);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `DELETE: Failed to delete employee | employee_id: ${httpRequest.query.employee_id} | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};
