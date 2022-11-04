module.exports = Object.freeze({
  GET_ALL_USERS:
    'SELECT * FROM "User" INNER JOIN "UserType" ON "UserType"."UT_ID" = "User"."U_UT_ID" ORDER BY "User"."U_CreatedOn" DESC;',
  GET_USER_DETAILS:
    'SELECT * FROM "User" INNER JOIN "UserType" ON "UserType"."UT_ID" = "User"."U_UT_ID" WHERE "U_ID" = $1;',
  GET_USER_DETAILS_FOR_EMAIL: 'SELECT * FROM "User" WHERE "U_Email" = $1',
  ADD_NEW_USER: `INSERT INTO "User"("U_FirstName", "U_LastName", "U_Email", "U_Password", "U_UT_ID", "U_CreatedOn", "U_CreatedBy", "U_UpdatedOn", "U_UpdatedBy", "U_IsActive") VALUES($1, $2, $3, $4, $5, NOW()::DATE, $6, NOW()::DATE ,$6, $7);`,
  EDIT_A_USER_WITH_NEW_PASSWORD: `UPDATE "User" SET "U_FirstName" = $2 , "U_LastName" = $3 , "U_Email" = $4, "U_UT_ID" = $5, "U_UpdatedOn" = NOW()::DATE, "U_UpdatedBy" = $6, "U_IsActive" = $7, "U_Password" = $8 WHERE "User"."U_ID" = $1;`,
  EDIT_A_USER: `UPDATE "User" SET "U_FirstName" = $2 , "U_LastName" = $3 , "U_Email" = $4, "U_UT_ID" = $5, "U_UpdatedOn" = NOW()::DATE, "U_UpdatedBy" = $6, "U_IsActive" = $7 WHERE "User"."U_ID" = $1;`,
  DELETE_A_USER: `DELETE FROM "User" WHERE "U_ID" = $1;`,
});
