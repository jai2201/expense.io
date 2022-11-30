const pool = require('../db/index');
const { EmployeeQuery } = require('../queries');

module.exports.getAllEmployees = async () => {
  try {
    const result = await pool.query(EmployeeQuery.GET_ALL_EMPLOYEES);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllEmployeesForAProject = async (project_id) => {
  try {
    const result = await pool.query(
      EmployeeQuery.GET_ALL_EMPLOYEES_FOR_A_PROJECT,
      [project_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getEmployeeDetails = async (employee_id) => {
  try {
    const result = await pool.query(EmployeeQuery.GET_EMPLOYEE_DETAILS, [
      employee_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.addEmployee = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(EmployeeQuery.ADD_NEW_EMPLOYEE, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.editEmployeeDetails = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(EmployeeQuery.EDIT_A_EMPLOYEE, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteEmployee = async (employee_id) => {
  try {
    const result = await pool.query(EmployeeQuery.DELETE_A_EMPLOYEE, [
      employee_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};
