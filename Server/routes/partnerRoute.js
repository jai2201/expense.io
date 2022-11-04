const express = require('express');
const router = express.Router();
const routeNames = require('../constants/routeNames');
const { authValidator } = require('../common/authHelper');
const { PartnerService } = require('../services');

router.get(routeNames.GET_ALL_PARTNERS, [
  authValidator,
  PartnerService.GET_allPartners,
]);

router.get(routeNames.GET_PARTNER_DETAILS, [
  authValidator,
  PartnerService.GET_partnerDetails,
]);

router.post(routeNames.ADD_NEW_PARTNER, [
  authValidator,
  PartnerService.POST_addPartner,
]);

router.put(routeNames.EDIT_A_PARTNER, [
  authValidator,
  PartnerService.PUT_editPartnerDetails,
]);

router.delete(routeNames.DELETE_A_PARTNER, [
  authValidator,
  PartnerService.DELETE_deletePartner,
]);

module.exports = router;
