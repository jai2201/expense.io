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

INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('OBB-100	Opening Bank Statement Balance', 'OBB-100') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('CCC-100	Collection from Customer', 'CCC-100') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('CTC-110	Cash Transfer Control', 'CTC-110') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('BTC-110	Bank Transfer Control', 'BTC-110') ON CONFLICT DO NOTHING;
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('CIO-120	Income from Others (FD / EMD / Retention/ IT Refund)', 'CIO-120') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('CIP-130	Investment from Promoters', 'CIP-130') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('ESW-200	Salaries / Wages', 'ESW-200') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('EIR-210	Imprest / Reimbursement', 'EIR-210') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('EME-220	Misc Expense', 'EME-220') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('EBP-230	Business Promotion', 'EBP-230') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('EPA-240	Employee Project Advance', 'EPA-240') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('EWM-250	Employee Welfare / Meal', 'EWM-250') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('LLT-300	Long Term Loan', 'LLT-300') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('LVL-310	Vehicle Loan', 'LVL-310') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('LPL-320	Property Loan', 'LPL-320') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('LIP-330	Interest Paid', 'LIP-330') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('LBC-340	Bank Charges', 'LBC-340') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('LCC-350	Credit Card Payment', 'LCC-350') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('ESI-400	Employees State Insurance (ESI)', 'ESI-400') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('EPO-410	Employees Provident Fund (PF)', 'EPO-410') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('GST-420	Goods and Services Tax (GST)', 'GST-420') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('TDS-430	Tax Deducted at Source (TDS)', 'TDS-430') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('LWF-440	Labour Welfare Fund (LWF)', 'LWF-440') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('PPP-500	Partner Payment', 'PPF-500') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('PBP-510	Borrow Payment', 'PBP-510') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('PPF-520	Professional Fees', 'PPF-520') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('PSI-530	Annual Subscription / Insurance', 'PSI-530') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('PCE-550	Computer Equipment', 'PCE-550') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('POE-560	Office Equipment', 'POE-560') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('PPM-570	Plant & Machinery', 'PPM-570') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('PCS-580	Courier Services', 'PCS-580') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('PPS-590	Printing & Stationary', 'PPS-590') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('PFP-600	Fuel / Petro Card Payment', 'PFP-600') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('PRM-610	Repair & Maintenance', 'PRM-610') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('RRT-620	Registration Charges / Road Tax', 'RRT-620') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('PTE-630	Tools & Equipment', 'PTE-630') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('RRP-700	Return to Promoters', 'RRP-700') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('RGR-800	Office / Guest House Rent', 'RGR-800') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('RGM-810	Office / Guest House Maintenance', 'RGM-810') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('REB-820	Office / Guest House Electricity Bill', 'REB-820') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('RIP-830	Internet Service Provider', 'RIP-830') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('RMT-840	Mobile / Telephone', 'RMT-840') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('RPM-850	Plant & Machinery Rental', 'RPM-850') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('OTF-900	Online Proceesing / Tender  Fees', 'OTF-900') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('EMD-910	Earnest Money Deposit', 'EMD-910') ON CONFLICT DO NOTHING; 
INSERT INTO "ExpenseCode"("EC_Name", "EC_Code") VALUES('EFD-920	Earnest Fixed Deposit', 'EFD-920') ON CONFLICT DO NOTHING; 

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
	"E_BasicValue" VARCHAR (100),
	"E_CGST" VARCHAR (100),
	"E_SGST" VARCHAR (100),
	"E_IGST" VARCHAR (100),
	"E_TotalTax" VARCHAR (100),
	"E_CostCenter" VARCHAR (100),
	"E_CreatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"E_CreatedOn" DATE NOT NULL,
	"E_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"E_UpdatedOn" DATE NOT NULL
)

CREATE TABLE "Employee"(
	"EM_ID" BIGSERIAL PRIMARY KEY,
	"EM_Code" VARCHAR(100) NOT NULL,
	"EM_Name" VARCHAR(100) NOT NULL,
	"EM_Designation" VARCHAR(100) NOT NULL,
	"EM_Salary" BIGSERIAL NOT NULL,
	"EM_DateOfJoining" DATE,
	"EM_DateOfExit" DATE
)

create table "EmployeeProjectMapping"(
	"EM_P_ID" BIGSERIAL PRIMARY KEY,
	"EM_ID" BIGSERIAL REFERENCES "Employee" ("EM_ID") ON DELETE CASCADE,
	"PR_ID" BIGSERIAL REFERENCES "Project" ("PR_ID") ON DELETE CASCADE
)

create table "Invoice"(
	"I_ID" BIGSERIAL PRIMARY KEY,
	"I_CustomerInvoiceNumber" VARCHAR(100),
	"I_ProjectWorkOrderNumber" VARCHAR (100),
	"I_ClientInvoiceDate" DATE,
	"I_ClientInvoiceNumber" VARCHAR (100),
	"I_BasicValue" VARCHAR (100),
	"I_CGST" VARCHAR (100),
	"I_SGST" VARCHAR (100),
	"I_IGST" VARCHAR (100),
	"I_TotalTax" VARCHAR (100),
	"I_CreatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"I_CreatedOn" DATE NOT NULL,
	"I_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"I_UpdatedOn" DATE NOT NULL
)

select * from "Expense"

CREATE TABLE "Payment"(
	"P_ID" bigserial primary key,
	"P_Type" varchar (50),
	"P_TransactionDate" date,
	"P_TransactionID" varchar (200),
	"P_BankReferenceNumber" varchar (200),
	"P_InvoiceNumber" varchar(200),
	"P_CreatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"P_CreatedOn" DATE NOT NULL,
	"P_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"P_UpdatedOn" DATE NOT NULL
)

create table "Revenue"(
	"R_ID" BIGSERIAL primary key,
	"R_CustomerInvoiceNumber" varchar (100),
	"R_ProjectWorkOrderNumber" varchar(100),
	"R_ClientInvoiceDate" date,
	"R_ClientInvoiceNumber" varchar(100),
	"R_BasicValue" Varchar (100),
	"R_CGST" varchar (100),
	"R_SGST" varchar (100),
	"R_IGST" VARCHAR (100),
	"R_TotalTax" VARCHAR (100),
	"R_CreatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"R_CreatedOn" DATE NOT NULL,
	"R_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"R_UpdatedOn" DATE NOT NULL
)

