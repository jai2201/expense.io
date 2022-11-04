module.exports = Object.freeze({
  GET_ALL_PROJECTS: `SELECT to_char("PR_WorkOrderDate", 'YYYY-MM-DD') as "PR_WorkOrderDateInFormat", * FROM "Project" INNER JOIN "ProjectType" ON "ProjectType"."PRT_ID" = "Project"."PR_PRT_ID";`,
  GET_PROJECT_DETAILS: 'SELECT * FROM "Project" WHERE "PR_ID = $1;',
  ADD_NEW_PROJECT: `INSERT INTO "Project"("PR_Name", "PR_Code", "PR_Location", "PR_PRT_ID", "PR_ClientName", "PR_ConcernPersonName", "PR_ConcernPersonNumber", "PR_ConcernPersonEmail", "PR_WorkOrderNumber", "PR_WorkOrderValue", "PR_WorkOrderDate", "PR_WorkOrderValidityYear", "PR_WorkOrderValidityMonth", "PR_CreatedOn", "PR_CreatedBy", "PR_UpdatedBy", "PR_UpdatedOn") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW()::DATE, $14, $14, NOW()::DATE);`,
  EDIT_A_PROJECT: `UPDATE "Project" SET "PR_Name"=$2, "PR_Code" = $3, "PR_Location" = $4, "PR_PRT_ID" = $5, "PR_ClientName" = $6, "PR_ConcernPersonName"= $7, "PR_ConcernPersonNumber"= $8, "PR_ConcernPersonEmail"= $9, "PR_WorkOrderNumber"=$10, "PR_WorkOrderValue"=$11, "PR_WorkOrderDate"= $12, "PR_WorkOrderValidityYear"= $13, "PR_WorkOrderValidityMonth"= $14, "PR_UpdatedBy" = $15, "PR_UpdatedOn" = NOW()::DATE WHERE "PR_ID"=$1; `,
  DELETE_A_PROJECT: `DELETE FROM "Project" WHERE "PR_ID" = $1;`,
});
