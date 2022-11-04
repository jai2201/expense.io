const AuthRouter = require('./authRoute');
const UserRouter = require('./userRoute');
const EmployeeRouter = require('./employeeRoute');
const ExpenseRouter = require('./expenseRoute');
const PartnerRouter = require('./partnerRoute');
const ProjectRouter = require('./projectRoute');
const PaymentRoute = require('./paymentRoute');
const RevenueRoute = require('./revenueRoute');

const init = (app) => {
  app.use('/api', AuthRouter);
  app.use('/api', UserRouter);
  app.use('/api', ExpenseRouter);
  app.use('/api', PartnerRouter);
  app.use('/api', ProjectRouter);
  app.use('/api', EmployeeRouter);
  app.use('/api', PaymentRoute);
  app.use('/api', RevenueRoute);
};

module.exports = init;
