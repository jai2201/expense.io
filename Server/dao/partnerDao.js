const pool = require('../db/index');
const { PartnerQuery } = require('../queries');

module.exports.getAllPartners = async () => {
  try {
    const result = await pool.query(PartnerQuery.GET_ALL_PARTNERS);
    return result.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports.getPartnerDetails = async (partner_id) => {
  try {
    const result = await pool.query(PartnerQuery.GET_PARTNER_DETAILS, [
      partner_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.addPartner = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(PartnerQuery.ADD_NEW_PARTNER, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.editPartnerDetails = async (params) => {
  try {
    const values = params.values;
    const result = await pool.query(PartnerQuery.EDIT_A_PARTNER, values);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports.deletePartner = async (partner_id) => {
  try {
    const result = await pool.query(PartnerQuery.DELETE_A_PARTNER, [
      partner_id,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};
