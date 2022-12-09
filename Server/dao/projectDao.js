const pool = require('../db/index');
const { ProjectQuery, DashboardQuery } = require('../queries');

module.exports.getAllProjects = async () => {
  try {
    const result = await pool.query(ProjectQuery.GET_ALL_PROJECTS);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getProjectDetails = async (project_id) => {
  try {
    const result = await pool.query(ProjectQuery.GET_PROJECT_DETAILS, [
      project_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.addProject = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(ProjectQuery.ADD_NEW_PROJECT, values);
    return result.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports.editProjectDetails = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(ProjectQuery.EDIT_A_PROJECT, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteProject = async (project_id) => {
  try {
    const result = await pool.query(ProjectQuery.DELETE_A_PROJECT, [
      project_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getExpensesForAMonthOfAProject = async (month, project_id) => {
  try {
    const result = await pool.query(
      ProjectQuery.GET_ALL_EXPENSES_FOR_A_MONTH_OF_A_PROJECT,
      [month, project_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getRevenueSumForAMonthOfAProject = async (
  month,
  project_work_order_number
) => {
  try {
    const result = await pool.query(
      ProjectQuery.GET_ALL_REVENUES_SUM_FOR_A_MONTH_OF_A_PROJECT,
      [project_work_order_number, month]
    );
    if (result.rows[0]['sum']) {
      return result.rows[0]['sum'];
    } else {
      return 0;
    }
  } catch (err) {
    throw err;
  }
};
