import { combineReducers } from 'redux';

import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from './reducers/authReducer';
import UserReducer from './reducers/userReducer';
import PartnerReducer from './reducers/partnerReducer';
import ProjectReducer from './reducers/projectReducer';
import EmployeeReducer from './reducers/employeeReducer';
import ExpenseReducer from './reducers/expenseReducer';
import PaymentReducer from './reducers/paymentReducer';
import RevenueReducer from './reducers/revenueReducer';

const reducer = combineReducers({
  auth: AuthReducer,
  users: UserReducer,
  expenses: ExpenseReducer,
  partners: PartnerReducer,
  projects: ProjectReducer,
  employees: EmployeeReducer,
  payments: PaymentReducer,
  revenues: RevenueReducer,
});

const store = configureStore({
  reducer,
});

export default store;
