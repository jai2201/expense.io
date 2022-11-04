import * as ACTION_TYPES from './actionTypes';

export const login_success = () => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
  };
};

export const login_failure = () => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE,
  };
};

export const logout = () => {
  return {
    type: ACTION_TYPES.LOGOUT,
  };
};

export const set_db_user = (db_user) => {
  return {
    type: ACTION_TYPES.SET_LOGGEDIN_USER,
    payload: db_user,
  };
};

export const remove_db_user = () => {
  return {
    type: ACTION_TYPES.REMOVE_LOGGEDIN_USER,
  };
};

export const set_all_users = (users) => {
  return {
    type: ACTION_TYPES.SET_ALL_USERS,
    payload: users,
  };
};

export const set_all_partners = (partners) => {
  return {
    type: ACTION_TYPES.SET_ALL_PARTNERS,
    payload: partners,
  };
};

export const set_all_projects = (projects) => {
  return {
    type: ACTION_TYPES.SET_ALL_PROJECTS,
    payload: projects,
  };
};

export const set_all_expenses = (expenses) => {
  return {
    type: ACTION_TYPES.SET_ALL_EXPENSES,
    payload: expenses,
  };
};

export const set_all_employees = (employees) => {
  return {
    type: ACTION_TYPES.SET_ALL_EMPLOYEES,
    payload: employees,
  };
};

export const set_all_payments = (payments) => {
  return {
    type: ACTION_TYPES.SET_ALL_PAYMENTS,
    payload: payments,
  };
};

export const set_all_revenues = (revenues) => {
  return {
    type: ACTION_TYPES.SET_ALL_REVENUES,
    payload: revenues,
  };
};

export const set_user_details = (user) => {
  return {
    type: ACTION_TYPES.SET_USER_DETAILS,
    payload: user,
  };
};

export const set_partner_details = (partner) => {
  return {
    type: ACTION_TYPES.SET_PARTNER_DETAILS,
    payload: partner,
  };
};

export const set_project_details = (project) => {
  return {
    type: ACTION_TYPES.SET_PROJECT_DETAILS,
    payload: project,
  };
};

export const set_expense_details = (expense) => {
  return {
    type: ACTION_TYPES.SET_EXPENSE_DETAILS,
    payload: expense,
  };
};

export const set_employee_details = (employee) => {
  return {
    type: ACTION_TYPES.SET_EMPLOYEE_DETAILS,
    payload: employee,
  };
};

export const set_payment_details = (payment) => {
  return {
    type: ACTION_TYPES.SET_PAYMENT_DETAILS,
    payload: payment,
  };
};

export const set_revenue_details = (revenue) => {
  return {
    type: ACTION_TYPES.SET_REVENUE_DETAILS,
    payload: revenue,
  };
};
