import * as ACTION_TYPES from '../actions/actionTypes';

export const initialState = {
  employees: [],
  selected_employee: null,
};

const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
    case ACTION_TYPES.SET_EMPLOYEE_DETAILS:
      return {
        ...state,
        selected_employee: action.payload,
      };
    default:
      return state;
  }
};

export default EmployeeReducer;
