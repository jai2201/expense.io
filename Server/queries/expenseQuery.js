module.exports = Object.freeze({
  GET_ALL_EXPENSES: `SELECT to_char("E_StartDate", 'YYYY-MM-DD') as "E_StartDateInFormat", to_char("E_EndDate", 'YYYY-MM-DD') as "E_EndDateInFormat", to_char("E_ExpenseDate", 'YYYY-MM-DD') as "E_ExpenseDateInFormat", to_char("E_InvoiceDate", 'YYYY-MM-DD') as "E_InvoiceDateInFormat", * FROM "Expense" INNER JOIN "ExpenseCode" ON "ExpenseCode"."EC_ID" = "Expense"."E_EC_ID" INNER JOIN "Project" ON "Project"."PR_ID" = "Expense"."E_PR_ID" INNER JOIN "Partner" ON "Partner"."PA_ID" = "Expense"."E_PA_ID";`,
  GET_EXPENSE_DETAILS: `SELECT to_char("E_StartDate", 'YYYY-MM-DD') as "E_StartDateInFormat", to_char("E_EndDate", 'YYYY-MM-DD') as "E_EndDateInFormat", to_char("E_ExpenseDate", 'YYYY-MM-DD') as "E_ExpenseDateInFormat", to_char("E_InvoiceDate", 'YYYY-MM-DD') as "E_InvoiceDateInFormat", * FROM "Expense" WHERE "E_ID" = $1;`,
  ADD_NEW_EXPENSE: `INSERT INTO "Expense"("E_PR_ID", "E_Type", "E_EC_ID", "E_IntervalOfExpense", "E_StartDate", "E_EndDate", "E_ExpenseDate", "E_PA_ID", "E_InvoiceNumber", "E_InvoiceDate", "E_CostCenter", "E_BasicValue", "E_CGST", "E_SGST", "E_IGST", "E_TotalTax", "E_CreatedBy", "E_CreatedOn", "E_UpdatedBy", "E_UpdatedOn") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12, $13, $14, $15, $16, $17, NOW()::DATE, $17, NOW()::DATE);`,
  EDIT_A_EXPENSE: `UPDATE "Expense" SET "E_PR_ID"=$2, "E_Type" = $3, "E_EC_ID" = $4, "E_IntervalOfExpense" = $5, "E_StartDate"= $6, "E_EndDate"=$7, "E_ExpenseDate"= $8,  "E_PA_ID"=$9,"E_InvoiceNumber" = $10, "E_InvoiceDate"=$11, "E_CostCenter"=$12, "E_BasicValue"=$13, "E_CGST"=$14, "E_SGST"=$15, "E_IGST"=$16, "E_TotalTax"=$17, "E_UpdatedBy" = $18, "E_UpdatedOn" = NOW()::DATE WHERE "E_ID"=$1;`,
  GET_EXPENSE_FROM_INVOICE_NUMBER: `SELECT * FROM "Expense" where "E_InvoiceNumber" = $1;`,
  DELETE_A_EXPENSE: `DELETE FROM "Expense" WHERE "E_ID" = $1;`,
});