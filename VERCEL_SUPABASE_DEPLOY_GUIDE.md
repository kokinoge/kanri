# 🚀 Vercel + Supabase 詳細デプロイガイド

## 📋 **事前準備チェックリスト**

### ✅ **必要なアカウント**
- [ ] [Vercel アカウント](https://vercel.com/signup) 作成済み
- [ ] [Supabase アカウント](https://supabase.com/dashboard) 作成済み
- [ ] [GitHub アカウント](https://github.com) 作成済み（推奨）
- [ ] クレジットカード（無料枠を超えた場合）

### ✅ **ローカル環境**
- [ ] Node.js 18+ インストール済み
- [ ] Git インストール済み
- [ ] プロジェクトビルドが成功する

---

## 🗂️ **Step 1: GitHubリポジトリ準備**

### **1.1 GitHubリポジトリ作成**
```bash
# GitHub上で新しいリポジトリを作成
# リポジトリ名: kanri-budget-management
# Public/Private: Private推奨（セキュリティ考慮）
```

### **1.2 ローカルプロジェクトをGitHubにプッシュ**
```bash
cd /Users/kokinoge/kanri

# Git初期化（まだの場合）
git init

# .gitignoreファイルの確認・更新
echo "# セキュリティ重要ファイル
.env
.env.local
.env.production
.env.development
*.log
.vercel
.next
node_modules/
dist/
build/
.DS_Store
*.tsbuildinfo
security-test-report.json" >> .gitignore

# ファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit: 予算管理システム with enhanced security"

# GitHubリポジトリとの連携
git remote add origin https://github.com/YOUR_USERNAME/kanri-budget-management.git

# プッシュ
git push -u origin main
```

---

## 🏗️ **Step 2: Supabaseプロジェクト作成**

### **2.1 Supabase CLI インストール**
```bash
# Supabase CLI インストール
npm install -g @supabase/cli

# バージョン確認
supabase --version
```

### **2.2 Supabaseログインとプロジェクト作成**
```bash
# Supabaseにログイン
supabase login

# 新しいプロジェクトを作成
supabase projects create kanri-budget-mgmt --region ap-northeast-1

# プロジェクト一覧確認
supabase projects list
```

### **2.3 プロジェクト接続設定**
```bash
# ローカルプロジェクトをSupabaseプロジェクトに接続
supabase link --project-ref YOUR_PROJECT_REF

# 初期設定ファイル生成
supabase init
```

---

## 🔐 **Step 3: データベース移行とセキュリティ設定**

### **3.1 既存データベースのバックアップ**
```bash
# 現在のPrismaスキーマをバックアップ
cp prisma/schema.prisma prisma/schema.prisma.backup

# 現在のデータをエクスポート（必要に応じて）
npx prisma db pull
npx prisma db seed
```

### **3.2 Supabaseデータベースの初期化**
```bash
# Supabaseプロジェクトの詳細取得
supabase projects list

# データベース接続情報取得
echo "Database URL: $(supabase projects get-config database.url)"
```

### **3.3 Prismaスキーマ更新**
```bash
# DATABASE_URLを一時的にSupabaseに変更
export DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"

# マイグレーション実行
npx prisma migrate deploy

# Prismaクライアント再生成
npx prisma generate
```

### **3.4 RLSセキュリティポリシー適用**
```bash
# セキュリティマイグレーションを実行
psql "$DATABASE_URL" -f supabase-migration.sql

# または、Supabase Dashboard > SQL Editor でファイル内容を実行
```

---

## 🔑 **Step 4: 環境変数の設定**

### **4.1 Supabaseキーの取得**
```bash
# Supabase Dashboard から以下を取得:
# - Project URL
# - anon public key  
# - service_role secret key
```

### **4.2 ローカル環境変数設定**
```bash
# .env.local ファイルを作成
cat > .env.local << EOF
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# データベース接続
DATABASE_URL=postgresql://postgres.[REF]:[PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres

# NextAuth設定
NEXTAUTH_SECRET=ddf9Z1qFI8uK4RiiVwROniqgwMJHstxK4dllwXY/k1k=
NEXTAUTH_URL=http://localhost:3000

# 環境識別
NODE_ENV=development
EOF
```

### **4.3 ローカルテスト実行**
```bash
# 依存関係インストール
npm install

# ビルドテスト
npm run build

# 開発サーバー起動
npm run dev

# ブラウザで http://localhost:3000 にアクセスして動作確認
```

---

## 🚀 **Step 5: Vercelデプロイ**

### **5.1 Vercel CLI インストールとログイン**
```bash
# Vercel CLI インストール
npm install -g vercel

# Vercelにログイン
vercel login

# アカウント確認
vercel whoami
```

### **5.2 初回デプロイ設定**
```bash
# プロジェクトディレクトリでVercelデプロイ初期化
vercel

# 質問への回答:
# ? Set up and deploy "~/kanri"? [Y/n] y
# ? Which scope do you want to deploy to? [Your Account]
# ? Link to existing project? [y/N] n
# ? What's your project's name? kanri-budget-management
# ? In which directory is your code located? ./
```

### **5.3 本番環境変数設定**
```bash
# 本番用環境変数を一つずつ設定
vercel env add NEXT_PUBLIC_SUPABASE_URL
# 値を入力: https://YOUR_PROJECT_REF.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY  
# 値を入力: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

vercel env add SUPABASE_SERVICE_ROLE_KEY
# 値を入力: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

vercel env add DATABASE_URL
# 値を入力: postgresql://postgres.[REF]:[PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres

vercel env add NEXTAUTH_SECRET
# 値を入力: ddf9Z1qFI8uK4RiiVwROniqgwMJHstxK4dllwXY/k1k=

vercel env add NEXTAUTH_URL
# 値を入力: https://your-app-name.vercel.app

# 環境変数一覧確認
vercel env ls
```

### **5.4 本番デプロイ実行**
```bash
# 本番環境にデプロイ
vercel --prod

# デプロイ結果の確認
# ✅ Production: https://kanri-budget-management.vercel.app
```

---

## 🔍 **Step 6: セキュリティテストと検証**

### **6.1 自動セキュリティテスト**
```bash
# セキュリティペネトレーションテスト実行
export NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

npx tsx security-penetration-test.ts

# 期待される結果（全てPASSEDであること）:
# ✅ 🔴 Anon Key User Access: anon key properly blocked from users table
# ✅ 🟡 Mass Data Extraction - users: users table properly protected
# ✅ 🟠 PII Field Access - users: PII fields properly protected
# ✅ 🔴 Privilege Escalation - User Creation: User creation properly blocked
# ✅ 🔴 Session Token Access: Session tokens properly protected
```

### **6.2 本番環境での手動テスト**
```bash
# 本番URLでのセキュリティテスト
PROD_URL="https://kanri-budget-management.vercel.app"

# 1. 認証なしでのAPIアクセステスト
curl "$PROD_URL/api/users" 
# 期待: 401 Unauthorized

# 2. 不正なJWTでのアクセステスト  
curl -H "Authorization: Bearer invalid-token" "$PROD_URL/api/users"
# 期待: 401 Unauthorized

# 3. 正常なログインフローテスト
curl -X POST "$PROD_URL/api/auth/signin" \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"validpassword"}'
# 期待: 認証成功またはユーザー不存在エラー
```

---

## 📊 **Step 7: 本番環境の監視設定**

### **7.1 Vercel Analytics 設定**
```bash
# Vercel Analyticsを有効化
vercel analytics enable

# 設定確認
vercel analytics status
```

### **7.2 Supabase監視設定**
1. **Supabase Dashboard** にアクセス
2. **Settings > API** で使用量確認
3. **Authentication > Users** でユーザー登録状況確認
4. **Database > Logs** でクエリログ確認

### **7.3 アラート設定**
```sql
-- Supabase Dashboard > SQL Editor で実行
-- 異常アクセス検出View作成
CREATE OR REPLACE VIEW security_monitoring AS
SELECT 
  DATE_TRUNC('hour', created_at) as hour,
  COUNT(*) as total_requests,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(CASE WHEN result = 'error' THEN 1 END) as error_count
FROM audit_logs 
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY hour
ORDER BY hour DESC;
```

---

## 🆘 **Step 8: 緊急時対応設定**

### **8.1 緊急停止手順**
```bash
# 緊急時のアプリケーション停止
vercel --prod --force

# または、Vercel Dashboard でドメインを無効化
```

### **8.2 ロールバック手順**
```bash
# 前回のデプロイメントを確認
vercel deployments ls

# 特定のデプロイメントにロールバック
vercel promote [DEPLOYMENT_URL] --scope [TEAM_SCOPE]
```

### **8.3 データベースバックアップ**
```bash
# Supabaseデータベースのバックアップ
pg_dump "$DATABASE_URL" > backup_$(date +%Y%m%d_%H%M%S).sql

# バックアップの自動化（cron設定）
# 0 2 * * * cd /path/to/project && pg_dump "$DATABASE_URL" > backup_$(date +\%Y\%m\%d_\%H\%M\%S).sql
```

---

## ✅ **最終確認チェックリスト**

### **🚀 デプロイ成功確認**
- [ ] Vercel本番URLでアプリケーションが表示される
- [ ] ログイン・ログアウトが正常動作する
- [ ] データの作成・読取・更新・削除が正常動作する
- [ ] 権限制御が適切に機能している

### **🔒 セキュリティ確認**
- [ ] セキュリティペネトレーションテストがすべてPASS
- [ ] anon keyでの不正アクセスがブロックされる
- [ ] 認証なしでのAPIアクセスが拒否される
- [ ] RLSポリシーが適切に機能している

### **📈 パフォーマンス確認**
- [ ] ページ読み込み速度が3秒以内
- [ ] API応答時間が1秒以内
- [ ] 大量データ処理が30秒以内で完了

### **🔧 運用準備**
- [ ] 監視・アラート設定完了
- [ ] バックアップ体制確立
- [ ] 緊急時対応手順の確認
- [ ] ドキュメント整備完了

---

## 🎉 **デプロイ完了！**

**本番URL**: https://kanri-budget-management.vercel.app

### **📚 次のステップ**
1. **ユーザーテスト**: 実際のユーザーによる動作確認
2. **パフォーマンス監視**: アクセス状況と応答速度の確認
3. **定期セキュリティ監査**: 月次でのセキュリティテスト実行
4. **機能拡張**: ユーザーフィードバックに基づく改善

### **📞 サポート**
- **Vercel Support**: https://vercel.com/support
- **Supabase Support**: https://supabase.com/support
- **技術文書**: 本プロジェクトの`docs/`フォルダ内

**🛡️ セキュアで高性能な予算管理システムのデプロイが完了しました！** 