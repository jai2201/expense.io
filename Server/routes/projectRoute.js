const express = require('express');
const router = express.Router();
const routeNames = require('../constants/routeNames');
const { authValidator } = require('../common/authHelper');
const { ProjectService } = require('../services');

router.get(routeNames.GET_ALL_PROJECTS, [
  authValidator,
  ProjectService.GET_allProjects,
]);

router.get(routeNames.GET_PROJECT_DETAILS, [
  authValidator,
  ProjectService.GET_projectDetails,
]);

router.post(routeNames.ADD_NEW_PROJECT, [
  authValidator,
  ProjectService.POST_addProject,
]);

router.put(routeNames.EDIT_A_PROJECT, [
  authValidator,
  ProjectService.PUT_editProjectDetails,
]);

router.delete(routeNames.DELETE_A_PROJECT, [
  authValidator,
  ProjectService.DELETE_deleteProject,
]);

module.exports = router;
