const { _200, _error } = require('../common/httpHelper');
const logger = require('../common/logger');
const { PartnerDao } = require('../dao/index');

module.exports.GET_allPartners = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const result = await PartnerDao.getAllPartners();
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Failed to fetch all partners | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.GET_partnerDetails = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const partner_id = httpRequest.query.partner_id;
    const result = await PartnerDao.getPartnerDetails(partner_id);
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `GET: Failed to fetch partner details | user_id: ${user_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.POST_addPartner = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [
      httpRequest.body.partner.partner_type_id,
      httpRequest.body.partner.name,
      httpRequest.body.partner.code,
      httpRequest.body.partner.city,
      httpRequest.body.partner.state,
      httpRequest.body.partner.gst_number,
      httpRequest.body.partner.concern_person_name,
      httpRequest.body.partner.concern_person_number,
      httpRequest.body.partner.concern_person_email,
      httpRequest.body.partner.work_order_number,
      httpRequest.body.partner.work_order_value,
      httpRequest.body.partner.work_order_date,
      httpRequest.body.partner.work_order_validity_year,
      httpRequest.body.partner.work_order_validity_month,
      httpRequest.body.partner.payment_terms,
      httpRequest.body.partner.work_order_is_active,
      httpRequest.body.partner.work_order_description,
      httpRequest.body.partner.project_id,
      user_id,
    ];
    const params = {
      values: values,
    };
    const result = await PartnerDao.addPartner(params);
    return _200(httpResponse, result);
  } catch (err) {
    console.log(err);
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.PUT_editPartnerDetails = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const values = [
      httpRequest.body.partner.partner_id,
      httpRequest.body.partner.partner_type_id,
      httpRequest.body.partner.name,
      httpRequest.body.partner.code,
      httpRequest.body.partner.city,
      httpRequest.body.partner.state,
      httpRequest.body.partner.gst_number,
      httpRequest.body.partner.concern_person_name,
      httpRequest.body.partner.concern_person_number,
      httpRequest.body.partner.concern_person_email,
      httpRequest.body.partner.work_order_number,
      httpRequest.body.partner.work_order_value,
      httpRequest.body.partner.work_order_date,
      httpRequest.body.partner.work_order_validity_year,
      httpRequest.body.partner.work_order_validity_month,
      httpRequest.body.partner.payment_terms,
      httpRequest.body.partner.work_order_is_active,
      httpRequest.body.partner.work_order_description,
      httpRequest.body.partner.project_id,
      user_id,
    ];
    const params = {
      values: values,
    };
    const result = await PartnerDao.editPartnerDetails(params);
    return _200(httpResponse, result);
  } catch (err) {
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};

module.exports.DELETE_deletePartner = async (httpRequest, httpResponse) => {
  const { decoded } = httpRequest.headers;
  const user_id = decoded.UserID;
  try {
    const partner_id = httpRequest.query.partner_id;
    const result = await PartnerDao.deletePartner(partner_id);
    logger.info(
      `DELETE : Deleted Partner successfully| user_id: ${user_id} | partner_id: ${partner_id}`
    );
    return _200(httpResponse, result);
  } catch (err) {
    logger.error(
      `DLETE: Failed to delete partner | user_id: ${user_id} | partner_id: ${httpRequest.query.partner_id} | ${err}`
    );
    return _error(httpResponse, {
      type: 'generic',
      message: err.message,
    });
  }
};
