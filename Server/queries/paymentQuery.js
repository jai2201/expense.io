module.exports = Object.freeze({
  GET_ALL_PAYMENTS: `SELECT to_char("P_TransactionDate", 'YYYY-MM-DD') as "P_TransactionDateInFormat", * FROM "Payment";`,
  GET_PAYMENT_DETAILS: 'SELECT * FROM "Payment" WHERE "P_ID = $1;',
  ADD_NEW_PAYMENT: `INSERT INTO "Payment"("P_Type", "P_TransactionDate", "P_TransactionID", "P_BankReferenceNumber", "P_InvoiceNumber", "P_CreatedOn", "P_CreatedBy", "P_UpdatedBy", "P_UpdatedOn") VALUES($1, $2, $3, $4, $5, NOW()::DATE, $6, $6, NOW()::DATE);`,
  EDIT_A_PAYMENT: `UPDATE "Payment" SET "P_Type"=$2, "P_TransactionDate" = $3, "P_TransactionID" = $4, "P_BankReferenceNumber" = $5, "P_InvoiceNumber" = $6, "P_UpdatedBy"=$7, "P_UpdatedOn" = NOW()::DATE WHERE "P_ID"=$1; `,
  DELETE_A_PAYMENT: `DELETE FROM "Payment" WHERE "P_ID" = $1;`,
});
