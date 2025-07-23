/*
  Campaignの開始日・終了日を年月形式に変更し、2025年以降のみに制限
  既存データは適切に変換してから移行
*/

-- 1. 新しいカラムを追加
ALTER TABLE "campaigns" ADD COLUMN "start_year" INTEGER;
ALTER TABLE "campaigns" ADD COLUMN "start_month" INTEGER;
ALTER TABLE "campaigns" ADD COLUMN "end_year" INTEGER;
ALTER TABLE "campaigns" ADD COLUMN "end_month" INTEGER;

-- 2. 既存データを新形式に変換（2025年以降のみ残す）
UPDATE "campaigns" SET 
    "start_year" = EXTRACT(YEAR FROM "start_date"),
    "start_month" = EXTRACT(MONTH FROM "start_date"),
    "end_year" = EXTRACT(YEAR FROM "end_date"), 
    "end_month" = EXTRACT(MONTH FROM "end_date")
WHERE EXTRACT(YEAR FROM "start_date") >= 2025;

-- 3. 2025年未満のキャンペーンを2025年1月からに更新
UPDATE "campaigns" SET 
    "start_year" = 2025,
    "start_month" = 1,
    "end_year" = 2025,
    "end_month" = 12
WHERE EXTRACT(YEAR FROM "start_date") < 2025;

-- 4. 開始年月を必須にし、終了年月は任意のままにする
ALTER TABLE "campaigns" ALTER COLUMN "start_year" SET NOT NULL;
ALTER TABLE "campaigns" ALTER COLUMN "start_month" SET NOT NULL;

-- 5. 月の値を1-12の範囲に制限
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_start_month_check" 
    CHECK ("start_month" >= 1 AND "start_month" <= 12);
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_end_month_check" 
    CHECK ("end_month" IS NULL OR ("end_month" >= 1 AND "end_month" <= 12));

-- 6. 2025年以降の制限を追加
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_start_year_check" 
    CHECK ("start_year" >= 2025);
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_end_year_check" 
    CHECK ("end_year" IS NULL OR "end_year" >= 2025);

-- 7. 古いカラムを削除
ALTER TABLE "campaigns" DROP COLUMN "start_date";
ALTER TABLE "campaigns" DROP COLUMN "end_date";
