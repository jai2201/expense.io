import * as ACTION_TYPES from '../actions/actionTypes';

export const initialState = {
  payments: [],
  selected_payment: null,
};

const PaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_PAYMENTS:
      return {
        ...state,
        payments: action.payload,
      };
    case ACTION_TYPES.SET_PAYMENT_DETAILS:
      return {
        ...state,
        selected_payment: action.payload,
      };
    default:
      return state;
  }
};

export default PaymentReducer;
