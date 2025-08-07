# DATABASE_URL クイックフィックスガイド

## エラー: "invalid port number in database URL"

### 原因
パスワード内の特殊文字 `!` がURLエンコードされていない

### 解決方法

1. **Supabaseダッシュボードで接続文字列を取得**
   - Settings → Database → Connection string
   - "Transaction" タブを選択（推奨）

2. **パスワードを修正**
   ```
   元: Kanri2025!DB
   修正後: Kanri2025%21DB
   ```

3. **完全な接続文字列**
   ```
   postgresql://postgres.xwsjoxnhtsylsdfzewcb:Kanri2025%21DB@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres
   ```

4. **Vercelで設定**
   - Settings → Environment Variables
   - DATABASE_URL を上記の値で更新
   - Save → Redeploy

## 確認方法

デプロイ後、以下のURLにアクセス：
- https://kanri-six.vercel.app/api/db-test
- https://kanri-six.vercel.app/public-debug

正常な応答が返れば成功です。