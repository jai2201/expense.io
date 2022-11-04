import * as ACTION_TYPES from '../actions/actionTypes';

export const initialState = {
  partners: [],
  selected_partner: null,
};

const PartnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_PARTNERS:
      return {
        ...state,
        partners: action.payload,
      };
    case ACTION_TYPES.SET_PARTNER_DETAILS:
      return {
        ...state,
        selected_partner: action.payload,
      };
    default:
      return state;
  }
};

export default PartnerReducer;
