const jwt = require('jsonwebtoken');
const { _error } = require('./httpHelper');
const { UserDao } = require('../dao/index');
const bcrypt = require('bcryptjs');
const logger = require('./logger');

module.exports.generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports.generateToken = async (userID) => {
  const token = jwt.sign(
    { UserID: userID },
    'KulLDrD3XqXBDYo65DCkCOe5JKDsiyFiPDzGk6SuVp7Bh3f1rc6qtz0Iiu0XYhs',
    {
      algorithm: 'HS256',
      expiresIn: '2d',
    }
  );
  return token;
};

module.exports.validatePassword = async (
  enteredPassword,
  passwordToValidateWith
) => {
  const IsValidPassword = await bcrypt.compare(
    enteredPassword,
    passwordToValidateWith
  );
  return IsValidPassword;
};

module.exports.authValidator = async (httpRequest, httpResponse, next) => {
  if (httpRequest.headers && httpRequest.headers.token) {
    const decoded = jwt.verify(
      httpRequest.headers.token,
      'KulLDrD3XqXBDYo65DCkCOe5JKDsiyFiPDzGk6SuVp7Bh3f1rc6qtz0Iiu0XYhs'
    );
    httpRequest.headers['decoded'] = decoded;
    const userDetails = await UserDao.getUserDetails(decoded.UserID);
    if (userDetails.length > 0) {
      // logger.success('POST: User validated successfully');
      return next();
    } else {
      // logger.error('POST: User validation failed.');
      return _error(httpResponse, {
        type: 'generic',
        message: 'User not Found',
      });
    }
  } else {
    // logger.error('POST: User validation failed. (JWT Token is expired)');
    return _error(httpResponse, {
      type: 'validation',
      message: 'Token is required',
    });
  }
};
