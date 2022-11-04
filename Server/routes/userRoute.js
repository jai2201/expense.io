const express = require('express');
const router = express.Router();
const routeNames = require('../constants/routeNames');
const { authValidator } = require('../common/authHelper');
const { UserService } = require('../services');

router.get(routeNames.GET_ALL_USERS, [authValidator, UserService.GET_allUsers]);

router.get(routeNames.GET_USER_DETAILS, [
  authValidator,
  UserService.GET_userDetails,
]);

router.post(routeNames.ADD_NEW_USER, [authValidator, UserService.POST_addUser]);

router.put(routeNames.EDIT_A_USER, [
  authValidator,
  UserService.EDIT_userDetails,
]);

router.delete(routeNames.DELETE_A_USER, [
  authValidator,
  UserService.DELETE_deleteUser,
]);
module.exports = router;
