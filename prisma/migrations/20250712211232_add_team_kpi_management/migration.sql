/*
  Warnings:

  - You are about to drop the column `agency` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `sales_channel` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `sales_department` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "agency",
DROP COLUMN "sales_channel",
DROP COLUMN "sales_department";

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_teams" (
    "id" TEXT NOT NULL,
    "campaign_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "role" TEXT,
    "isLead" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "campaign_teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_teams" (
    "id" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "allocation" DECIMAL(5,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "budget_teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_kpis" (
    "id" TEXT NOT NULL,
    "campaign_id" TEXT NOT NULL,
    "kpiType" TEXT NOT NULL,
    "targetValue" DECIMAL(15,2) NOT NULL,
    "actualValue" DECIMAL(15,2),
    "unit" TEXT NOT NULL,
    "description" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_kpis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teams_name_key" ON "teams"("name");

-- CreateIndex
CREATE UNIQUE INDEX "campaign_teams_campaign_id_team_id_key" ON "campaign_teams"("campaign_id", "team_id");

-- CreateIndex
CREATE UNIQUE INDEX "budget_teams_budget_id_team_id_key" ON "budget_teams"("budget_id", "team_id");

-- AddForeignKey
ALTER TABLE "campaign_teams" ADD CONSTRAINT "campaign_teams_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_teams" ADD CONSTRAINT "campaign_teams_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_teams" ADD CONSTRAINT "budget_teams_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_teams" ADD CONSTRAINT "budget_teams_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_kpis" ADD CONSTRAINT "campaign_kpis_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;
