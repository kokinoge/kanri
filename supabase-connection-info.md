# 🔗 Supabase 接続情報

## 📋 **以下の情報をSupabase Dashboardから取得してください**

### **1. プロジェクト基本情報**
```bash
# Project Settings > General
PROJECT_REF="your-project-ref"          # 例: abcdefghijklmnop
PROJECT_NAME="kanri-budget-management"
REGION="ap-northeast-1"                 # 東京リージョン
```

### **2. API設定（Settings > API）**
```bash
# URL
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"

# Keys
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### **3. データベース接続（Settings > Database）**
```bash
# Connection string
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"

# 直接接続の場合
DB_HOST="aws-0-ap-northeast-1.pooler.supabase.com"
DB_PORT="6543"
DB_NAME="postgres"
DB_USER="postgres.[PROJECT_REF]"
DB_PASSWORD="your-database-password"
```

## 🎯 **次のステップ**

上記の情報を取得したら、以下のコマンドでプロジェクトをリンクしてください：

```bash
# プロジェクトリンク
supabase link --project-ref YOUR_PROJECT_REF

# 環境変数ファイル作成
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
DATABASE_URL=postgresql://postgres.YOUR_PROJECT_REF:YOUR_PASSWORD@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres
NEXTAUTH_SECRET=ddf9Z1qFI8uK4RiiVwROniqgwMJHstxK4dllwXY/k1k=
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
EOF
```

## ⚠️ **重要な注意事項**

1. **サービスロールキー**: 絶対に公開しないでください
2. **データベースパスワード**: 安全に保管してください
3. **anon key**: フロントエンドで使用されるため、適切に制限されていることを確認

---

**�� 準備ができたらお知らせください！** 