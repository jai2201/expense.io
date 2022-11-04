const pool = require('../db/index');
const { UserQuery } = require('../queries');

module.exports.getAllUsers = async () => {
  try {
    const result = await pool.query(UserQuery.GET_ALL_USERS);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getUserDetails = async (user_id) => {
  try {
    const result = await pool.query(UserQuery.GET_USER_DETAILS, [user_id]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.getUserDetailsForEmail = async (params) => {
  try {
    const email = params.email;
    const result = await pool.query(UserQuery.GET_USER_DETAILS_FOR_EMAIL, [
      email,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.addUser = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(UserQuery.ADD_NEW_USER, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.editUserDetails = async (params) => {
  try {
    const values = params.values;
    let result;
    if (values.length === 8) {
      result = await pool.query(
        UserQuery.EDIT_A_USER_WITH_NEW_PASSWORD,
        values
      );
    } else {
      result = await pool.query(UserQuery.EDIT_A_USER, values);
    }
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteUser = async (user_id) => {
  try {
    const result = await pool.query(UserQuery.DELETE_A_USER, [user_id]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};
