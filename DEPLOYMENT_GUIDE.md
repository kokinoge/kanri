# 🚀 予算管理システム デプロイメントガイド

## ✅ **事前準備完了項目**

### 1. ビルド設定
- ✅ **Next.js本番ビルド**: エラーなしでビルド成功
- ✅ **TypeScript型チェック**: 全型エラー解決済み
- ✅ **環境変数設定**: 本番用・開発用両方準備完了
- ✅ **Docker設定**: Dockerfile・docker-compose.yml作成済み

### 2. セキュリティ設定
- ✅ **強力なNEXTAUTH_SECRET**: 32文字ランダム生成済み
- ✅ **データベース認証**: PostgreSQL接続設定完了
- ✅ **環境分離**: 開発・本番環境変数の分離

---

## 🎯 **推奨デプロイ方法（PostgreSQL対応・修正版）**

### 【方法1】Vercel + Vercel Postgres (最推奨)

#### **特徴**
- ✅ **完全統合**: アプリ・DB・デプロイが同一プラットフォーム
- ✅ **PostgreSQL**: 現行システムそのまま使用可能
- ✅ **高性能**: Next.js専用最適化
- ✅ **簡単設定**: 環境変数自動連携

#### **料金**
- **Hobby**: アプリ無料、DB $20/月
- **Pro**: $20/月、DB $20/月

#### **手順**
```bash
# 1. Vercelアカウント作成 & CLI インストール
npm install -g vercel

# 2. GitHubリポジトリ作成・プッシュ
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/username/kanri.git
git push -u origin main

# 3. Vercelプロジェクト作成
vercel

# 4. Vercel Postgres追加
vercel env add DATABASE_URL

# 5. マイグレーション実行
vercel env pull .env.local
npx prisma migrate deploy
```

---

### 【方法2】Vercel + Supabase (無料重視)

#### **特徴**
- ✅ **無料枠**: 両方とも無料プランあり
- ✅ **PostgreSQL**: 完全対応、移行不要
- ✅ **リアルタイム**: Supabaseの追加機能
- ✅ **認証統合**: Supabase Auth使用可能

#### **料金**
- **Vercel**: 無料（Hobby）
- **Supabase**: 無料（2プロジェクトまで）

#### **手順**
```bash
# 1. Supabaseプロジェクト作成
# https://supabase.com/dashboard

# 2. DATABASE_URL取得
# Project Settings > Database > Connection String

# 3. Vercelデプロイ
vercel

# 4. 環境変数設定
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
```

---

### 【方法3】Railway (オールインワン)

#### **特徴**
- ✅ **統合管理**: アプリ+DB一括管理
- ✅ **Git連携**: 自動デプロイ
- ✅ **PostgreSQL**: 内蔵対応
- ✅ **スケーリング**: 自動リソース調整

#### **料金**
- **無料**: $5クレジット/月
- **Hobby**: $5/月（使用量ベース）

#### **手順**
```bash
# 1. Railway CLI インストール
npm install -g @railway/cli

# 2. ログイン & プロジェクト作成
railway login
railway init

# 3. PostgreSQLサービス追加
railway add postgresql

# 4. 環境変数設定（自動）
railway variables

# 5. デプロイ
railway up
```

---

### 【方法3】Google Cloud Run (本格運用)

#### **現在の状況**
- ❌ **プロジェクト制限**: 新規プロジェクト作成不可
- ❌ **権限不足**: 既存プロジェクトでサービス有効化不可

#### **解決案**
1. **管理者権限の取得**: 組織管理者に権限付与依頼
2. **新しいGoogle アカウント**: 個人アカウントで新規プロジェクト作成
3. **他のクラウドプロバイダー**: AWS・Azureの利用

---

### 【方法4】Docker Compose (ローカル本番環境)

#### **特徴**
- ✅ **完全制御**: 全設定をカスタマイズ可能
- ✅ **オフライン対応**: インターネット不要
- ✅ **学習効果**: インフラ技術の習得

#### **手順**
```bash
# 1. 本番環境変数設定
cp .env.production .env

# 2. データベース初期化SQL作成
cat > init-db.sql << EOF
CREATE USER kanri WITH PASSWORD 'secure_password';
CREATE DATABASE kanri_db OWNER kanri;
GRANT ALL PRIVILEGES ON DATABASE kanri_db TO kanri;
EOF

# 3. Nginx設定
cat > nginx.conf << EOF
events {
    worker_connections 1024;
}
http {
    upstream app {
        server app:3000;
    }
    server {
        listen 80;
        server_name localhost;
        location / {
            proxy_pass http://app;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
        }
    }
}
EOF

# 4. ビルド & 起動
docker-compose up --build -d

# 5. データベースマイグレーション
docker-compose exec app npx prisma migrate deploy

# 6. 管理者ユーザー作成
docker-compose exec app npm run seed
```

---

## 🔧 **詳細設定**

### 環境変数 (全プラットフォーム共通)

#### **必須設定**
```env
# データベース (各プラットフォーム固有)
DATABASE_URL="postgresql://user:pass@host:5432/db"

# 認証 (固定値・安全)
NEXTAUTH_SECRET="ddf9Z1qFI8uK4RiiVwROniqgwMJHstxK4dllwXY/k1k="
NEXTAUTH_URL="https://your-domain.com"

# 本番フラグ
NODE_ENV="production"
```

#### **オプション設定**
```env
# アプリケーション
APP_NAME="予算管理システム"
LOG_LEVEL="info"

# セキュリティ
ALLOW_REGISTRATIONS="false"
ENABLE_ADMIN_TOOLS="true"

# パフォーマンス
DATABASE_CONNECTION_LIMIT="20"
```

### SSL証明書 (独自ドメイン利用時)

#### **Let's Encrypt (無料)**
```bash
# Certbot インストール
sudo apt install certbot

# 証明書取得
sudo certbot certonly --standalone -d your-domain.com

# 自動更新設定
sudo crontab -e
# 追加: 0 12 * * * /usr/bin/certbot renew --quiet
```

### データベース最適化

#### **インデックス追加**
```sql
-- パフォーマンス向上のための推奨インデックス
CREATE INDEX CONCURRENTLY idx_budget_campaign_date ON budgets(campaign_id, year, month);
CREATE INDEX CONCURRENTLY idx_result_campaign_date ON results(campaign_id, year, month);
CREATE INDEX CONCURRENTLY idx_client_active ON clients(is_active) WHERE is_active = true;

-- 統計情報更新
ANALYZE;
```

#### **接続プール設定**
```env
# Prisma接続設定
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=20&pool_timeout=60"
```

---

## 🚨 **トラブルシューティング**

### よくある問題と解決策

#### **1. ビルドエラー**
```bash
# キャッシュクリア
rm -rf .next node_modules
npm install
npm run build
```

#### **2. データベース接続エラー**
```bash
# 接続テスト
npx prisma db pull

# マイグレーション再実行
npx prisma migrate reset
npx prisma migrate deploy
```

#### **3. 認証エラー**
```bash
# シークレット再生成
openssl rand -base64 32

# セッションクリア
# ブラウザのキャッシュ・Cookieを削除
```

#### **4. メモリ不足**
```bash
# Node.js メモリ制限増加
NODE_OPTIONS="--max-old-space-size=2048" npm start
```

---

## 📊 **監視・運用**

### ヘルスチェック

#### **アプリケーション監視**
```bash
# ヘルスチェックエンドポイント
curl https://your-app.com/api/health

# ログ確認
# Vercel: Vercel Dashboard → Functions → Logs
# Railway: Railway Dashboard → Deployments → Logs
# Docker: docker-compose logs -f app
```

#### **データベース監視**
```sql
-- 接続数確認
SELECT count(*) FROM pg_stat_activity;

-- 実行中クエリ確認
SELECT query, state, query_start FROM pg_stat_activity WHERE state = 'active';

-- データベースサイズ確認
SELECT pg_size_pretty(pg_database_size('kanri_db'));
```

### バックアップ

#### **自動バックアップスクリプト**
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_URL="your-database-url"

# ローカルバックアップ
mkdir -p $BACKUP_DIR
pg_dump $DB_URL > $BACKUP_DIR/kanri_backup_$DATE.sql

# 古いバックアップ削除（7日以上前）
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete

echo "Backup completed: $DATE"
```

#### **復旧手順**
```bash
# データベース復旧
dropdb kanri_db
createdb kanri_db
psql kanri_db < backup_file.sql

# アプリケーション再起動
# Vercel: 自動的に再起動
# Railway: railway up
# Docker: docker-compose restart app
```

---

## 🎯 **推奨開始手順**

### 【初心者向け】Vercel + PlanetScale
1. GitHubにコードプッシュ
2. Vercelでリポジトリ連携
3. PlanetScaleでDB作成
4. 環境変数設定
5. 自動デプロイ完了

### 【中級者向け】Railway
1. Railway CLIセットアップ
2. プロジェクト作成・DB追加
3. 環境変数設定
4. デプロイ実行

### 【上級者向け】Docker本番環境
1. 本記事の Docker Compose設定
2. Nginx + SSL設定
3. 監視・バックアップ設定
4. 運用開始

---

**🎉 お疲れ様でした！予算管理システムのデプロイ準備が完了しました！**

どのデプロイ方法を選択されますか？お手伝いします！ 