module.exports = Object.freeze({
  GET_ALL_VEHICLES: `SELECT to_char("V_DateOfPurchase",'YYYY-MM-DD') as "V_DateOfPurchaseInFormat", * FROM "Vehicle";`,
  GET_VEHICLE_DETAILS: `SELECT to_char("V_DateOfPurchase",'YYYY-MM-DD') as "V_DateOfPurchaseInFormat", *  FROM "Vehicle" WHERE "V_ID" = $1;`,
  ADD_NEW_VEHICLE: `INSERT INTO "Vehicle"("V_Manufacturer", "V_TypeOfAsset", "V_AssetNumber", "V_RegistrationNumber", "V_DateOfPurchase", "V_SupplierName", "V_ChassisNumber", "V_EngineNumber", "V_ModelNumber", "V_BasicValue", "V_GST", "V_TCS", "V_TotalValue", "V_CreatedOn", "V_CreatedBy", "V_UpdatedOn", "V_UpdatedBy") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW()::DATE, $14, NOW()::DATE, $14);`,
  EDIT_A_VEHICLE: `UPDATE "Vehicle" SET "V_Manufacturer" = $2, "V_TypeOfAsset"=$3, "V_AssetNumber" = $4, "V_RegistrationNumber" = $5, "V_DateOfPurchase" = $6, "V_SupplierName"= $7, "V_ChassisNumber"= $8, "V_EngineNumber"=$9, "V_ModelNumber"=$10, "V_BasicValue" = $11, "V_GST" = $12, "V_TCS"= $13, "V_TotalValue" = $14, "V_UpdatedOn" = NOW()::DATE, "V_UpdatedBy" = $15 WHERE "V_ID"=$1;`,
  DELETE_A_VEHICLE: `DELETE FROM "Vehicle" WHERE "V_ID" = $1;`,
});
