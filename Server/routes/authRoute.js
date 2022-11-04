const express = require('express');
const router = express.Router();
const routeNames = require('../constants/routeNames');
const { AuthService } = require('../services');

router.post(routeNames.LOGIN, [AuthService.POST_loginUser]);

module.exports = router;
