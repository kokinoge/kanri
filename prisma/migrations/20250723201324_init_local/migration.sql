/*
  Warnings:

  - You are about to drop the `budget_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `business_divisions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `division_teams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sales_departments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "budgets_campaign_id_year_month_platform_operation_type_budg_key";

-- DropTable
DROP TABLE "budget_types";

-- DropTable
DROP TABLE "business_divisions";

-- DropTable
DROP TABLE "division_teams";

-- DropTable
DROP TABLE "sales_departments";
