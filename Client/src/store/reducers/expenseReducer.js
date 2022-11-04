import * as ACTION_TYPES from '../actions/actionTypes';

export const initialState = {
  expenses: [],
  selected_expense: null,
};

const ExpenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
      };
    case ACTION_TYPES.SET_EXPENSE_DETAILS:
      return {
        ...state,
        selected_expense: action.payload,
      };
    default:
      return state;
  }
};

export default ExpenseReducer;
