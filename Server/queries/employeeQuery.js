module.exports = Object.freeze({
  GET_ALL_EMPLOYEES: `SELECT to_char("EM_DateOfJoining",'YYYY-MM-DD') as "EM_DateOfJoiningInFormat", to_char("EM_DateOfExit",'YYYY-MM-DD') as "EM_DateOfExitInFormat", * FROM "Employee";`,
  GET_EMPLOYEE_DETAILS: `SELECT to_char("EM_DateOfJoining",'YYYY-MM-DD') as "EM_DateOfJoiningInFormat", to_char("EM_DateOfExit",'YYYY-MM-DD') as "EM_DateOfExitInFormat", *  FROM "Employee" WHERE "EM_ID" = $1;`,
  ADD_NEW_EMPLOYEE: `INSERT INTO "Employee"("EM_Code", "EM_Name", "EM_Designation", "EM_Salary", "EM_DateOfJoining", "EM_DateOfExit", "EM_CreatedBy", "EM_CreatedOn", "EM_UpdatedBy", "EM_UpdatedOn") VALUES($1, $2, $3, $4, $5, $6, $7, NOW()::DATE, $7, NOW()::DATE);`,
  EDIT_A_EMPLOYEE: `UPDATE "Employee" SET "EM_Code"=$2, "EM_Name" = $3, "EM_Designation" = $4, "EM_Salary" = $5, "EM_DateOfJoining"= $6, "EM_DateOfExit"=$7, "EM_UpdatedBy" = $8, "EM_UpdatedOn" = NOW()::DATE WHERE "EM_ID"=$1;`,
  DELETE_A_EMPLOYEE: `DELETE FROM "Employee" WHERE "EM_ID" = $1;`,
});
