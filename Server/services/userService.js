const { _200, _error } = require('../common/httpHelper');
const { generateHashedPassword } = require('../common/authHelper');
const logger = require('../common/logger');
const { UserDao } = require('../dao/index');

module.exports.GET_allUsers = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const result = await UserDao.getAllUsers();
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Failed to fetch all users | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_userDetails = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const result = await UserDao.getUserDetails(user_id);
    logger.success('GET: User details fetched successfully.');
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(`GET: User details | user_id: ${user_id} | ${err}`);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.POST_addUser = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const hashedPassword = await generateHashedPassword(
      httpRequest.body.user.password
    );
    const values = [
      httpRequest.body.user.first_name,
      httpRequest.body.user.last_name,
      httpRequest.body.user.email,
      hashedPassword,
      httpRequest.body.user.user_type_id,
      user_id,
      httpRequest.body.user.is_active,
    ];
    const params = {
      values: values,
    };
    const result = await UserDao.addUser(params);
    // logger.info(`POST: Add new User | by user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.EDIT_userDetails = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    let values;
    if (
      httpRequest.body.user.password &&
      httpRequest.body.user.password != ''
    ) {
      const hashedPassword = await generateHashedPassword(
        httpRequest.body.user.password
      );
      values = [
        httpRequest.body.user.user_id,
        httpRequest.body.user.first_name,
        httpRequest.body.user.last_name,
        httpRequest.body.user.email,
        httpRequest.body.user.user_type_id,
        user_id,
        httpRequest.body.user.is_active,
        hashedPassword,
      ];
    } else {
      values = [
        httpRequest.body.user.user_id,
        httpRequest.body.user.first_name,
        httpRequest.body.user.last_name,
        httpRequest.body.user.email,
        httpRequest.body.user.user_type_id,
        user_id,
        httpRequest.body.user.is_active,
      ];
    }
    const params = {
      values: values,
    };
    const result = await UserDao.editUserDetails(params);
    logger.info(`PUT: Edit user details | by user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.DELETE_deleteUser = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const user_id_to_be_deleted = httpRequest.query.user_id;
    const result = await UserDao.deleteUser(user_id_to_be_deleted);
    logger.info(`PUT: Edit user details | by user_id: ${user_id}`);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};
