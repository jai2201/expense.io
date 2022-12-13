module.exports = Object.freeze({
  GET_ALL_EXPENSES_FOR_A_MONTH: `SELECT * from "Expense" where EXTRACT(MONTH FROM "E_ExpenseDate") = $1;`,
  GET_ALL_PAYMENTS_FOR_LIST_OF_INVOICE_NUMBERS: `SELECT * FROM "Payment" where "P_InvoiceNumber" = ANY($1)`,
  GET_EXPENSE_AMOUNT_FOR_A_PROJECT: `SELECT SUM("E_BasicValue") from "Expense" where "E_PR_ID" = $1;`,
  GET_TOTAL_REVENUE_AMOUNT_FOR_A_PROJECT: `SELECT SUM("R_BasicValue") from "Revenue" where "R_ProjectWorkOrderNumber" = $1;`,
  GET_TOTAL_PAYMENT_FOR_LIST_OF_INVOICE_NUMBERS: `SELECT SUM("P_TotalAmount") FROM "Payment" where "P_InvoiceNumber" = ANY($1);`,
  GET_TOTAL_MAPPED_PAYMENT_AMOUNT_FOR_LIST_OF_INVOICE_NUMBERS: `SELECT SUM("P_TotalAmount") FROM "Payment" where "P_InvoiceNumber" = ANY($1) AND "P_IsMappedOrUnmapped" = true;`,
  GET_TOTAL_UNMAPPED_PAYMENT_AMOUNT_FOR_LIST_OF_INVOICE_NUMBERS: `SELECT SUM("P_TotalAmount") FROM "Payment" where "P_PR_ID" = $1 AND "P_IsMappedOrUnmapped" = false;`,
  GET_TYPE_OF_PAYMENT_FOR_A_PROJECT: `SELECT SUM("P_TotalAmount") FROM "Payment" where "P_PR_ID" = $1 AND "P_Type" = $2;`,
});
