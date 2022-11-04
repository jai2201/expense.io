import * as ACTION_TYPES from '../actions/actionTypes';

export const initialState = {
  revenues: [],
  selected_revenue: null,
};

const RevenueReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_REVENUES:
      return {
        ...state,
        revenues: action.payload,
      };
    case ACTION_TYPES.SET_REVENUE_DETAILS:
      return {
        ...state,
        selected_revenue: action.payload,
      };
    default:
      return state;
  }
};

export default RevenueReducer;
