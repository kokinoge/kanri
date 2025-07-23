# データベース設計・移行ガイド

予算管理システムのデータベース構造とセットアップ方法について説明します。

## 🏗 データベース構造

### ER図概要
```
User (ユーザー)
├── Client (クライアント) [1:N]
│   └── Campaign (案件) [1:N]
│       ├── Budget (予算) [1:N]
│       └── Result (実績) [1:N]
└── Master (マスターデータ) [admin管理]
```

## 📋 テーブル設計

### User（ユーザー）
管理システムのユーザー情報を管理

| カラム名 | 型 | NULL | デフォルト | 説明 |
|----------|-----|------|-----------|------|
| id | String | NO | uuid() | ユーザーID |
| name | String | YES | NULL | ユーザー名 |
| email | String | NO | - | メールアドレス（ユニーク） |
| password | String | YES | NULL | パスワードハッシュ |
| role | Enum | NO | member | 権限（admin/manager/member） |
| department | String | YES | NULL | 部署名 |
| isActive | Boolean | NO | true | アクティブ状態 |
| createdAt | DateTime | NO | now() | 作成日時 |
| updatedAt | DateTime | NO | now() | 更新日時 |

**インデックス**:
- `email` (UNIQUE)
- `role`

### Client（クライアント）
マーケティング対象のクライアント企業情報

| カラム名 | 型 | NULL | デフォルト | 説明 |
|----------|-----|------|-----------|------|
| id | String | NO | uuid() | クライアントID |
| name | String | NO | - | クライアント名 |
| manager | String | YES | NULL | 担当者名 |
| priority | Int | NO | 1 | 優先度（1-10） |
| createdAt | DateTime | NO | now() | 作成日時 |
| updatedAt | DateTime | NO | now() | 更新日時 |

**インデックス**:
- `name`
- `priority`

### Campaign（案件）
マーケティング案件情報

| カラム名 | 型 | NULL | デフォルト | 説明 |
|----------|-----|------|-----------|------|
| id | String | NO | uuid() | 案件ID |
| name | String | NO | - | 案件名 |
| clientId | String | NO | - | クライアントID（外部キー） |
| startDate | DateTime | NO | - | 開始日 |
| endDate | DateTime | NO | - | 終了日 |
| totalBudget | Decimal | NO | 0 | 総予算 |
| createdAt | DateTime | NO | now() | 作成日時 |
| updatedAt | DateTime | NO | now() | 更新日時 |

**外部キー**:
- `clientId` → `Client.id` (CASCADE)

**インデックス**:
- `clientId`
- `startDate, endDate`

### Budget（予算）
月別・プラットフォーム別の予算情報

| カラム名 | 型 | NULL | デフォルト | 説明 |
|----------|-----|------|-----------|------|
| id | String | NO | uuid() | 予算ID |
| campaignId | String | NO | - | 案件ID（外部キー） |
| year | Int | NO | - | 年 |
| month | Int | NO | - | 月（1-12） |
| platform | String | NO | - | プラットフォーム |
| operationType | String | NO | - | 運用タイプ |
| revenueType | String | NO | - | 売上タイプ |
| amount | Decimal | NO | 0 | 予算金額 |
| targetKpi | String | YES | NULL | 目標KPI |
| targetValue | Decimal | YES | NULL | 目標値 |
| createdAt | DateTime | NO | now() | 作成日時 |
| updatedAt | DateTime | NO | now() | 更新日時 |

**外部キー**:
- `campaignId` → `Campaign.id` (CASCADE)

**ユニーク制約**:
- `(campaignId, year, month, platform, operationType)`

**インデックス**:
- `campaignId`
- `year, month`
- `platform`

### Result（実績）
月別・プラットフォーム別の実績情報

| カラム名 | 型 | NULL | デフォルト | 説明 |
|----------|-----|------|-----------|------|
| id | String | NO | uuid() | 実績ID |
| campaignId | String | NO | - | 案件ID（外部キー） |
| year | Int | NO | - | 年 |
| month | Int | NO | - | 月（1-12） |
| platform | String | NO | - | プラットフォーム |
| operationType | String | NO | - | 運用タイプ |
| actualSpend | Decimal | NO | 0 | 実際の支出 |
| actualResult | Decimal | NO | 0 | 実際の結果 |
| createdAt | DateTime | NO | now() | 作成日時 |
| updatedAt | DateTime | NO | now() | 更新日時 |

**外部キー**:
- `campaignId` → `Campaign.id` (CASCADE)

**ユニーク制約**:
- `(campaignId, year, month, platform, operationType)`

**インデックス**:
- `campaignId`
- `year, month`
- `platform`

### Master（マスターデータ）
システム全体で使用する選択肢データ

| カラム名 | 型 | NULL | デフォルト | 説明 |
|----------|-----|------|-----------|------|
| id | String | NO | uuid() | マスターID |
| category | String | NO | - | カテゴリ（platform/operation_type/revenue_type） |
| value | String | NO | - | 値 |
| order | Int | NO | 0 | 表示順序 |
| isActive | Boolean | NO | true | アクティブ状態 |
| createdAt | DateTime | NO | now() | 作成日時 |
| updatedAt | DateTime | NO | now() | 更新日時 |

**ユニーク制約**:
- `(category, value)`

**インデックス**:
- `category`
- `order`

## 🔧 セットアップ手順

### 1. PostgreSQLの設定

#### macOS (Homebrew)
```bash
# PostgreSQLのインストール
brew install postgresql

# サービス開始
brew services start postgresql

# データベース作成
createdb kanri_db
```

#### Ubuntu/Debian
```bash
# PostgreSQLのインストール
sudo apt update
sudo apt install postgresql postgresql-contrib

# PostgreSQLユーザーに切り替え
sudo -u postgres psql

# データベースとユーザー作成
CREATE DATABASE kanri_db;
CREATE USER kanri_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE kanri_db TO kanri_user;
\q
```

### 2. 環境変数の設定
`.env`ファイルを作成：

```env
# データベース接続文字列
DATABASE_URL="postgresql://kanri_user:your_password@localhost:5432/kanri_db"

# NextAuth設定
NEXTAUTH_SECRET="your-long-random-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Prismaマイグレーション

```bash
# Prismaクライアント生成
npx prisma generate

# 初回マイグレーション実行
npx prisma migrate dev --name init

# データベーススキーマの確認
npx prisma studio
```

### 4. 初期データの投入

```bash
# シードスクリプト実行（存在する場合）
npx prisma db seed
```

## 📊 データサンプル

### 初期マスターデータ

#### プラットフォーム（platform）
```sql
INSERT INTO "Master" (id, category, value, "order") VALUES
  ('platform-1', 'platform', 'YouTube', 1),
  ('platform-2', 'platform', 'Instagram', 2),
  ('platform-3', 'platform', 'TikTok', 3),
  ('platform-4', 'platform', 'Twitter', 4),
  ('platform-5', 'platform', 'Facebook', 5);
```

#### 運用タイプ（operation_type）
```sql
INSERT INTO "Master" (id, category, value, "order") VALUES
  ('operation-1', 'operation_type', 'インフルエンサー', 1),
  ('operation-2', 'operation_type', 'SNS広告', 2),
  ('operation-3', 'operation_type', 'アフィリエイト', 3),
  ('operation-4', 'operation_type', 'コンテンツマーケティング', 4);
```

#### 売上タイプ（revenue_type）
```sql
INSERT INTO "Master" (id, category, value, "order") VALUES
  ('revenue-1', 'revenue_type', '認知', 1),
  ('revenue-2', 'revenue_type', '獲得', 2),
  ('revenue-3', 'revenue_type', '育成', 3),
  ('revenue-4', 'revenue_type', 'ブランディング', 4);
```

### サンプルユーザー

```sql
-- 管理者ユーザー
INSERT INTO "User" (id, name, email, role, department, "isActive") VALUES
  ('admin-1', '管理者', 'admin@example.com', 'admin', 'マーケティング部', true);

-- マネージャー
INSERT INTO "User" (id, name, email, role, department, "isActive") VALUES
  ('manager-1', '田中太郎', 'tanaka@example.com', 'manager', 'マーケティング部', true);

-- メンバー
INSERT INTO "User" (id, name, email, role, department, "isActive") VALUES
  ('member-1', '佐藤花子', 'sato@example.com', 'member', '営業部', true);
```

## 🔄 バックアップ・復旧

### 定期バックアップスクリプト

```bash
#!/bin/bash
# backup.sh

# 設定
DB_NAME="kanri_db"
DB_USER="kanri_user"
BACKUP_DIR="/path/to/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# バックアップディレクトリ作成
mkdir -p $BACKUP_DIR

# ダンプ実行
pg_dump -h localhost -U $DB_USER -d $DB_NAME > $BACKUP_DIR/kanri_backup_$DATE.sql

# 古いバックアップ削除（30日以上前）
find $BACKUP_DIR -name "kanri_backup_*.sql" -mtime +30 -delete

echo "バックアップ完了: kanri_backup_$DATE.sql"
```

### 復旧手順

```bash
# データベース削除・再作成
dropdb kanri_db
createdb kanri_db

# バックアップから復旧
psql -h localhost -U kanri_user -d kanri_db < backup_file.sql
```

## ⚡ パフォーマンス最適化

### 推奨インデックス

```sql
-- 複合インデックス
CREATE INDEX idx_budget_campaign_date ON "Budget" (campaign_id, year, month);
CREATE INDEX idx_result_campaign_date ON "Result" (campaign_id, year, month);

-- 部分インデックス
CREATE INDEX idx_active_users ON "User" (role) WHERE "isActive" = true;
CREATE INDEX idx_active_campaigns ON "Campaign" (client_id) WHERE "endDate" >= NOW();
```

### クエリ最適化のヒント

1. **統計データ取得の最適化**
   - 集約クエリではINDEXを活用
   - 不要なJOINは避ける
   - LIMITを適切に設定

2. **一覧表示の最適化**
   - ページネーション実装
   - 必要なカラムのみ取得
   - Prismaのselectを活用

3. **リアルタイム更新**
   - SWRのmutateでキャッシュ更新
   - Optimistic Updateの実装

## 🚨 トラブルシューティング

### よくある問題と解決策

#### マイグレーションエラー
```bash
# マイグレーション状態確認
npx prisma migrate status

# 失敗したマイグレーションのリセット
npx prisma migrate reset
```

#### 接続エラー
```bash
# PostgreSQL起動確認
pg_isready -h localhost -p 5432

# 接続テスト
psql -h localhost -U kanri_user -d kanri_db -c "SELECT 1;"
```

#### パフォーマンス問題
```sql
-- 遅いクエリの特定
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;
```

---

**Version**: 1.0.0  
**Last Updated**: 2024年12月 