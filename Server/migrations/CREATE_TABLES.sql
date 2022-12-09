CREATE TABLE "UserType"(
	"UT_ID" SERIAL PRIMARY KEY,
	"UT_Name" VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO "UserType"("UT_Name") VALUES('REVIEWER') ON CONFLICT DO NOTHING;
INSERT INTO "UserType"("UT_Name") VALUES('APPROVER') ON CONFLICT DO NOTHING;
INSERT INTO "UserType"("UT_Name") VALUES('INITIATOR') ON CONFLICT DO NOTHING;

CREATE TABLE "User"(
	"U_ID" BIGSERIAL PRIMARY KEY,
	"U_FirstName" VARCHAR(30) NOT NULL,
	"U_LastName" VARCHAR(30) NOT NULL,
	"U_Email" VARCHAR(50) UNIQUE NOT NULL,
	"U_Password" VARCHAR(100),
	"U_UT_ID" SERIAL REFERENCES "UserType" ("UT_ID") ON DELETE CASCADE,
	"U_CreatedOn" DATE NOT NULL,
	"U_CreatedBy" BIGSERIAL,
	"U_UpdatedOn" DATE NOT NULL,
	"U_UpdatedBy" BIGSERIAL,
	"U_IsActive" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "ProjectType"(
	"PRT_ID" BIGSERIAL PRIMARY KEY,
	"PRT_Name" VARCHAR(50) UNIQUE NOT NULL
)

INSERT INTO "ProjectType"("PRT_Name") VALUES('Railway') ON CONFLICT DO NOTHING;
INSERT INTO "ProjectType"("PRT_Name") VALUES('Earth work') ON CONFLICT DO NOTHING;
INSERT INTO "ProjectType"("PRT_Name") VALUES('Building') ON CONFLICT DO NOTHING;
INSERT INTO "ProjectType"("PRT_Name") VALUES('Road') ON CONFLICT DO NOTHING;
INSERT INTO "ProjectType"("PRT_Name") VALUES('Pipeline') ON CONFLICT DO NOTHING;

CREATE TABLE "Project"(
	"PR_ID" BIGSERIAL PRIMARY KEY,
	"PR_Name" VARCHAR(100) NOT NULL,
	"PR_Code" VARCHAR(100) NOT NULL,
	"PR_Location" VARCHAR(500) NOT NULL,
	"PR_PRT_ID" BIGSERIAL REFERENCES "ProjectType" ("PRT_ID") ON DELETE CASCADE,
	"PR_ClientName" VARCHAR(100) NOT NULL,
	"PR_ConcernPersonName" VARCHAR(100),
	"PR_ConcernPersonNumber" VARCHAR(100),
	"PR_ConcernPersonEmail" VARCHAR(100),
	"PR_WorkOrderNumber" VARCHAR(200),
	"PR_WorkOrderValue" VARCHAR(100),
	"PR_WorkOrderDate" DATE,
	"PR_WorkOrderValidityYear" VARCHAR(10),
	"PR_WorkOrderValidityMonth" VARCHAR(2),
	"PR_ExecutionStartDate" DATE,
	"PR_CreatedOn" DATE NOT NULL,
	"PR_CreatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"PR_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"PR_UpdatedOn" DATE NOT NULL
)

CREATE TABLE "PartnerType"(
	"PAT_ID" BIGSERIAL PRIMARY KEY,
	"PAT_Name" VARCHAR(50) UNIQUE NOT NULL
)

INSERT INTO "PartnerType"("PAT_Name") VALUES('PROPRIETOR') ON CONFLICT DO NOTHING;
INSERT INTO "PartnerType"("PAT_Name") VALUES('PRIVATE_LIMITED') ON CONFLICT DO NOTHING;

CREATE TABLE "Partner"(
	"PA_ID" BIGSERIAL PRIMARY KEY,
	"PA_PAT_ID" BIGSERIAL REFERENCES "PartnerType" ("PAT_ID") ON DELETE CASCADE,
	"PA_PR_ID" BIGSERIAL REFERENCES "Project" ("PR_ID") ON DELETE CASCADE,
	"PA_Name" VARCHAR(100) NOT NULL,
	"PA_Code" VARCHAR(100) NOT NULL,
	"PA_City" VARCHAR(100),
	"PA_State" VARCHAR(25) NOT NULL,
	"PA_GST_Number" VARCHAR(100) NOT NULL,
	"PA_ConcernPersonName" VARCHAR(100),
	"PA_ConcernPersonNumber" VARCHAR(100),
	"PA_ConcernPersonEmail" VARCHAR(100),
	"PA_WorkOrderNumber" VARCHAR(200),
	"PA_WorkOrderValue" VARCHAR(100),
	"PA_WorkOrderDate" DATE,
	"PA_WorkOrderValidityYear" VARCHAR(10),
	"PA_WorkOrderValidityMonth" VARCHAR(2),
	"PA_WorkOrderIsActive" BOOLEAN DEFAULT FALSE,
	"PA_WorkOrderDescription" VARCHAR(1000),
	"PA_PaymentTerms" VARCHAR(500),
	"PA_UpdatedOn" DATE NOT NULL,
	"PA_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"PA_CreatedOn" DATE NOT NULL,
	"PA_CreatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL
)

CREATE TABLE "ExpenseCode"(
	"EC_ID" BIGSERIAL PRIMARY KEY,
	"EC_Name" VARCHAR(200) UNIQUE NOT NULL,
	"EC_Code" VARCHAR(50) UNIQUE NOT NULL
)

INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('EME-220	Misc Expense/Income', 'EME-220', 'Miscellaneous Expenses') ON CONFLICT DO NOTHING;
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('PSI-530	Annual Subscription / Insurance', 'PSI-530', 'Insurance Expenses') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('PPP-500	Partner Payment W/O TDS', 'PPP-500', 'Project Expenses') ON CONFLICT DO NOTHING;
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('OTF-900	Online Processing / Tender Fee', 'OTF-900', 'Project Expenses') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('RPM-850	Plant & Machinery Rental', 'RPM-850', 'Project Expenses') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('PBP-510	Borrow Payment', 'PBP-510', 'Project Expenses') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('RGM-810	Office / Guest House Maintenance', 'RGM-810', 'Rent-Guest House') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('PWT-500	Partner Payment With TDS', 'PWT-500', 'Project Expenses') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('RGR-800	Office / Guest House Rent', 'RGR-800', 'Rent-Guest House') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('PRM-610	Repair & Maintenance', 'PRM-610', 'Repair & Maintenance') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('ESO-200	Salaries / Wages (Off Roll)', 'ESO-200', 'Site & Staff Expenses') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('EWM-250	Employee Welfare / Meal', 'EPA-240', 'Site & Staff Expenses') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('EBP-230	Business Promotion', 'EBP-230', 'Business Promotion') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('REB-820	Office / Guest House Electricity Bill', 'REB-820', 'Electricity Expenses') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('LVL-310	Vehicle Loan', 'LVL-310', 'Finance Cost') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('RIP-830	Internet Service Provider', 'RIP-830', 'Miscellaneous Expenses') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('PPS-590	Printing & Stationary', 'PPS-590', 'Printing & Stationery Expenses') ON CONFLICT DO NOTHING;
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('PCS-580	Courier Services', 'PCS-580', 'Printing & Stationery Expenses') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('GST-420	Goods and Services Tax (GST)', 'GST-420', 'Rates, Taxes & Fees') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('RRT-620	Registration Charges / Road Tax', 'RRT-620', 'Rates, Taxes & Fees') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('TDS-430	Tax Deducted at Source (TDS)', 'TDS-430', 'Rates, Taxes & Fees') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('EPA-240	Employee Project Advance', 'EPA-240', 'Site & Staff Expenses') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('EIR-210	Imprest / Reimbursement', 'EIR-210', 'Site & Staff Expenses') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('ESW-200	Salaries / Wages (On Roll)', 'ESW-200', 'Site & Staff Expenses') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('RMT-840	Mobile / Telephone', 'RMT-840', 'Telephone & Mobile Expenses') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code", "EC_Category") VALUES('PFP-600	Fuel / Petro Card Payment', 'PFP-600', 'Diesel Expenses') ON CONFLICT DO NOTHING;

CREATE TABLE "Expense"(
	"E_ID" BIGSERIAL PRIMARY KEY,
	"E_PR_ID" BIGSERIAL REFERENCES "Project" ("PR_ID") ON DELETE CASCADE,
	"E_Type" VARCHAR(200) NOT NULL,
	"E_PA_ID" BIGSERIAL REFERENCES "Partner" ("PA_ID") ON DELETE CASCADE,
	"E_EC_ID" BIGSERIAL REFERENCES "ExpenseCode" ("EC_ID") ON DELETE CASCADE,
	"E_IntervalOfExpense" VARCHAR(10) NOT NULL,
	"E_StartDate" DATE,
	"E_EndDate" DATE,
	"E_ExpenseDate" DATE,
	"E_InvoiceNumber" VARCHAR(500),
	"E_InvoiceDate" DATE,
	"E_BasicValue" bigint,
	"E_CGST" bigint,
	"E_SGST" bigint,
	"E_IGST" bigint,
	"E_TotalTax" bigint,
	"E_CostCenter" VARCHAR (100),
	"E_Remarks" varchar(200),
	"E_CreatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"E_CreatedOn" DATE NOT NULL,
	"E_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"E_UpdatedOn" DATE NOT NULL
)

CREATE TABLE "Employee"(
	"EM_ID" BIGSERIAL PRIMARY KEY,
	"EM_Code" VARCHAR(100) NOT NULL,
	"EM_PR_ID" BIGSERIAL REFERENCES "Project" ("PR_ID") ON DELETE CASCADE,
	"EM_Name" VARCHAR(100) NOT NULL,
	"EM_Designation" VARCHAR(100) NOT NULL,
	"EM_Salary" BIGSERIAL NOT NULL,
	"EM_DateOfJoining" DATE,
	"EM_DateOfExit" DATE,
	"EM_IsActive" BOOLEAN
)

create table "Revenue"(
	"R_ID" BIGSERIAL PRIMARY KEY,
	"R_CustomerInvoiceNumber" VARCHAR(100),
	"R_ProjectWorkOrderNumber" VARCHAR (100),
	"R_ClientInvoiceDate" DATE,
	"R_ClientInvoiceNumber" VARCHAR (100),
	"R_BasicValue" bigint,
	"R_CGST" bigint,
	"R_SGST" bigint,
	"R_IGST" bigint,
	"R_TotalTax" bigint,
	"R_CreatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"R_CreatedOn" DATE NOT NULL,
	"R_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"R_UpdatedOn" DATE NOT NULL
)

select * from "Expense"

CREATE TABLE "Payment"(
	"P_ID" bigserial primary key,
	"P_Type" varchar (50),
	"P_PR_ID" bigint REFERENCES "Project" ("PR_ID") NOT NULL,
	"P_TransactionDate" date,
	"P_TransactionID" varchar (200),
	"P_TotalAmount" bigint,
	"P_BankReferenceNumber" varchar (200),
	"P_InvoiceNumber" varchar(200),
	"P_CreatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"P_CreatedOn" DATE NOT NULL,
	"P_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"P_UpdatedOn" DATE NOT NULL
)
