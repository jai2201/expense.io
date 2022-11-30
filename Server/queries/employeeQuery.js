module.exports = Object.freeze({
  GET_ALL_EMPLOYEES: `SELECT to_char("EM_DateOfJoining",'YYYY-MM-DD') as "EM_DateOfJoiningInFormat", to_char("EM_DateOfExit",'YYYY-MM-DD') as "EM_DateOfExitInFormat", * FROM "Employee" INNER JOIN "Project" ON "Employee"."EM_PR_ID" = "Project"."PR_ID";`,
  GET_ALL_EMPLOYEES_FOR_A_PROJECT: `SELECT to_char("EM_DateOfJoining",'YYYY-MM-DD') as "EM_DateOfJoiningInFormat", to_char("EM_DateOfExit",'YYYY-MM-DD') as "EM_DateOfExitInFormat", * FROM "Employee" INNER JOIN "Project" ON "Employee"."EM_PR_ID" = "Project"."PR_ID" where "EM_PR_ID" = $1;`,
  GET_EMPLOYEE_DETAILS: `SELECT to_char("EM_DateOfJoining",'YYYY-MM-DD') as "EM_DateOfJoiningInFormat", to_char("EM_DateOfExit",'YYYY-MM-DD') as "EM_DateOfExitInFormat", *  FROM "Employee" WHERE "EM_ID" = $1;`,
  ADD_NEW_EMPLOYEE: `INSERT INTO "Employee"("EM_PR_ID", "EM_Code", "EM_Name", "EM_Designation", "EM_Salary", "EM_DateOfJoining", "EM_DateOfExit", "EM_IsActive", "EM_CreatedBy", "EM_CreatedOn", "EM_UpdatedBy", "EM_UpdatedOn") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()::DATE, $9, NOW()::DATE);`,
  EDIT_A_EMPLOYEE: `UPDATE "Employee" SET "EM_PR_ID" = $2, "EM_Code"=$3, "EM_Name" = $4, "EM_Designation" = $5, "EM_Salary" = $6, "EM_DateOfJoining"= $7, "EM_DateOfExit"=$8, "EM_IsActive"=$9, "EM_UpdatedBy" = $10, "EM_UpdatedOn" = NOW()::DATE WHERE "EM_ID"=$1;`,
  DELETE_A_EMPLOYEE: `DELETE FROM "Employee" WHERE "EM_ID" = $1;`,
});
