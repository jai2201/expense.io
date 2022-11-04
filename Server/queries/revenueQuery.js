module.exports = Object.freeze({
  GET_ALL_REVENUES: `SELECT to_char("R_ClientInvoiceDate", 'YYYY-MM-DD') as "R_ClientInvoiceDateInFormat", * FROM "Revenue";`,
  GET_REVENUE_DETAILS: 'SELECT * FROM "Revenue" WHERE "R_ID = $1;',
  ADD_NEW_REVENUE: `INSERT INTO "Revenue"("R_CustomerInvoiceNumber", "R_ProjectWorkOrderNumber", "R_ClientInvoiceDate", "R_ClientInvoiceNumber", "R_BasicValue", "R_CGST", "R_SGST", "R_IGST", "R_TotalTax", "R_CreatedOn", "R_CreatedBy", "R_UpdatedOn", "R_UpdatedBy") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()::DATE, $10, NOW()::DATE, $10);`,
  EDIT_A_REVENUE: `UPDATE "Revenue" SET "R_CustomerInvoiceNumber"=$2, "R_ProjectWorkOrderNumber" = $3, "R_ClientInvoiceDate" = $4, "R_ClientInvoiceNumber" = $5, "R_BasicValue" = $6, "R_CGST"=$7, "R_SGST" =$8, "R_IGST"=$9, "R_TotalTax"=$10, "R_UpdatedBy" = $11, "R_UpdatedOn" = NOW()::DATE WHERE "R_ID"=$1; `,
  DELETE_A_REVENUE: `DELETE FROM "Revenue" WHERE "P_ID" = $1;`,
});
