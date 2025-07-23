/*
  段階的な組織構成変更マイグレーション
  既存データを保持しながら新しい構造に移行
*/

-- Step 1: 新しいマスターテーブルを作成
CREATE TABLE "business_divisions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_divisions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "sales_departments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_departments_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "division_teams" (
    "id" TEXT NOT NULL,
    "business_division_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "division_teams_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "budget_types" (
    "id" TEXT NOT NULL,
    "business_division_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budget_types_pkey" PRIMARY KEY ("id")
);

-- Step 2: マスターデータを投入
INSERT INTO "business_divisions" ("id", "name", "code", "order", "created_at", "updated_at") VALUES
('bd_1', 'SNSメディア事業部', 'sns_media', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('bd_2', 'インフルエンサー事業部', 'influencer', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('bd_3', '広告事業部', 'advertising', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO "sales_departments" ("id", "name", "code", "order", "created_at", "updated_at") VALUES
('sd_1', '国内営業', 'domestic', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('sd_2', '海外営業', 'overseas', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('sd_3', '代理店営業', 'agency', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO "division_teams" ("id", "business_division_id", "name", "code", "order", "created_at", "updated_at") VALUES
('dt_1', 'bd_1', 'X', 'x', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dt_2', 'bd_1', 'TikTok', 'tiktok', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dt_3', 'bd_1', 'YouTube', 'youtube', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dt_4', 'bd_1', 'Instagram', 'instagram', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dt_5', 'bd_1', 'Threads', 'threads', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dt_6', 'bd_2', 'X', 'x', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dt_7', 'bd_2', 'TikTok', 'tiktok', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dt_8', 'bd_2', 'YouTube', 'youtube', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('dt_9', 'bd_2', 'Instagram', 'instagram', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO "budget_types" ("id", "business_division_id", "name", "code", "order", "created_at", "updated_at") VALUES
('bt_1', 'bd_1', '投稿予算', 'post', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('bt_2', 'bd_1', '再生数/imp予算', 'impression', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('bt_3', 'bd_1', '代行予算', 'agency', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('bt_4', 'bd_2', '投稿予算', 'post', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('bt_5', 'bd_2', 'キャスティング予算', 'casting', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('bt_6', 'bd_3', '広告予算運用', 'advertising', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Step 3: 新しいカラムを一時的にNULL許可で追加
ALTER TABLE "clients" ADD COLUMN "business_division" TEXT;
ALTER TABLE "clients" ADD COLUMN "new_priority" TEXT DEFAULT 'C';

-- Step 4: 既存データをマッピング
UPDATE "clients" SET 
    "business_division" = CASE 
        WHEN "department" IN ('マーケティング部', '事業開発部', '制作部') THEN 'SNSメディア事業部'
        WHEN "department" IN ('営業部', '企画部') THEN 'インフルエンサー事業部'
        WHEN "department" = '広告運用部' THEN '広告事業部'
        ELSE 'SNSメディア事業部'
    END,
    "new_priority" = CASE 
        WHEN "priority" = 0 THEN 'D'
        WHEN "priority" = 1 THEN 'C'
        WHEN "priority" = 2 THEN 'B'
        WHEN "priority" = 3 THEN 'A'
        WHEN "priority" >= 4 THEN 'S'
        ELSE 'C'
    END;

-- Step 5: sales_departmentのNULL値を更新
UPDATE "clients" SET "sales_department" = '国内営業' WHERE "sales_department" IS NULL;

-- Step 6: budgetsテーブルの変更
ALTER TABLE "budgets" ADD COLUMN "budget_type" TEXT;
UPDATE "budgets" SET "budget_type" = CASE
    WHEN "revenue_type" = '成果報酬' THEN '投稿予算'
    WHEN "revenue_type" = '投稿固定費' THEN '投稿予算'
    WHEN "revenue_type" = 'imp保証' THEN '再生数/imp予算'
    WHEN "revenue_type" = '広告予算%' THEN '広告予算運用'
    WHEN "revenue_type" = '月額固定' THEN '代行予算'
    ELSE '投稿予算'
END;

-- Step 7: resultsテーブルの変更
ALTER TABLE "results" ADD COLUMN "budget_type" TEXT;
UPDATE "results" SET "budget_type" = '投稿予算';

-- Step 8: 古いインデックスを削除
DROP INDEX IF EXISTS "budgets_campaign_id_year_month_platform_operation_type_reve_key";

-- Step 9: 古いカラムを削除し、新しいカラムをNOT NULLに変更
ALTER TABLE "clients" DROP COLUMN "department";
ALTER TABLE "clients" DROP COLUMN "priority";
ALTER TABLE "clients" RENAME COLUMN "new_priority" TO "priority";
ALTER TABLE "clients" ALTER COLUMN "business_division" SET NOT NULL;
ALTER TABLE "clients" ALTER COLUMN "sales_department" SET NOT NULL;

ALTER TABLE "budgets" DROP COLUMN "revenue_type";
ALTER TABLE "budgets" ALTER COLUMN "budget_type" SET NOT NULL;

ALTER TABLE "results" ALTER COLUMN "budget_type" SET NOT NULL;

-- Step 10: 制約とインデックスを追加
CREATE UNIQUE INDEX "business_divisions_name_key" ON "business_divisions"("name");
CREATE UNIQUE INDEX "business_divisions_code_key" ON "business_divisions"("code");
CREATE UNIQUE INDEX "sales_departments_name_key" ON "sales_departments"("name");
CREATE UNIQUE INDEX "sales_departments_code_key" ON "sales_departments"("code");
CREATE UNIQUE INDEX "division_teams_business_division_id_code_key" ON "division_teams"("business_division_id", "code");
CREATE UNIQUE INDEX "budget_types_business_division_id_code_key" ON "budget_types"("business_division_id", "code");
CREATE UNIQUE INDEX "budgets_campaign_id_year_month_platform_operation_type_budg_key" ON "budgets"("campaign_id", "year", "month", "platform", "operation_type", "budget_type");
