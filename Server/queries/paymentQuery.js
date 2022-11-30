module.exports = Object.freeze({
  GET_ALL_PAYMENTS: `SELECT to_char("P_TransactionDate", 'YYYY-MM-DD') as "P_TransactionDateInFormat", * FROM "Payment";`,
  GET_ALL_PAYMENTS_FOR_A_PROJECT: `SELECT to_char("P_TransactionDate", 'YYYY-MM-DD') as "P_TransactionDateInFormat", * FROM "Payment" where "P_PR_ID" = $1;`,
  GET_PAYMENT_DETAILS: 'SELECT * FROM "Payment" WHERE "P_ID = $1;',
  ADD_NEW_PAYMENT: `INSERT INTO "Payment"("P_Type", "P_TransactionDate", "P_TransactionID", "P_BankReferenceNumber", "P_InvoiceNumber", "P_TotalAmount", "P_IsMappedOrUnmapped", "P_PR_ID", "P_CreatedOn", "P_CreatedBy", "P_UpdatedBy", "P_UpdatedOn") VALUES($1, $2, $3, $4, $5, $6, $7, $8, NOW()::DATE, $9, $9, NOW()::DATE);`,
  EDIT_A_PAYMENT: `UPDATE "Payment" SET "P_Type"=$2, "P_TransactionDate" = $3, "P_TransactionID" = $4, "P_BankReferenceNumber" = $5, "P_InvoiceNumber" = $6, "P_TotalAmount"=$7, "P_IsMappedOrUnmapped" = $8, "P_PR_ID" = $9, "P_UpdatedBy"=$10, "P_UpdatedOn" = NOW()::DATE WHERE "P_ID"=$1; `,
  DELETE_A_PAYMENT: `DELETE FROM "Payment" WHERE "P_ID" = $1;`,
});
