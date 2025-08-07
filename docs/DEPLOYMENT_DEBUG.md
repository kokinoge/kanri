# デプロイメントデバッグガイド

## 現在の問題
認証なしでアクセスすべきページ（/public-debug）がログインページにリダイレクトされる。

## 問題の原因（可能性）

### 1. ミドルウェアの設定問題
- `withAuth`の仕様により、公開パスの設定が期待通りに動作しない
- Next.js 15.x での挙動の変更

### 2. 環境変数の未設定
以下の環境変数がVercelで正しく設定されていない可能性：
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `DATABASE_URL`

### 3. ビルドキャッシュの問題
Vercelのビルドキャッシュが古い設定を保持している可能性。

## デバッグ手順

### ステップ1: 環境変数の確認
1. https://kanri-six.vercel.app/api/test にアクセス
2. 環境変数の設定状況を確認
3. 「NOT SET」となっている項目をメモ

### ステップ2: Vercelでの環境変数設定
1. Vercelダッシュボードにログイン
2. プロジェクト設定 > Environment Variables
3. 以下を設定：
   ```
   NEXTAUTH_URL = https://kanri-six.vercel.app
   NEXTAUTH_SECRET = [openssl rand -base64 32 で生成した値]
   DATABASE_URL = [SupabaseのConnection string]
   ```

### ステップ3: キャッシュクリアと再デプロイ
1. Vercelダッシュボードで Settings > Functions
2. 「Purge Cache」をクリック
3. Deployments タブから最新のデプロイを選択
4. 「Redeploy」をクリック（"Use existing Build Cache"のチェックを外す）

### ステップ4: 動作確認
1. https://kanri-six.vercel.app/public-debug にアクセス
2. リダイレクトされずにページが表示されることを確認

## 代替手段

もし上記で解決しない場合：

### オプション1: ミドルウェアを一時的に無効化
```bash
# src/middleware.ts を src/middleware.ts.disabled にリネーム
mv src/middleware.ts src/middleware.ts.disabled
```

### オプション2: 最小限のミドルウェアを使用
```bash
# バックアップから復元
cp src/middleware.backup.ts src/middleware.ts
```

### オプション3: 環境変数の直接確認
Supabaseで以下のSQLを実行してユーザーの存在を確認：
```sql
SELECT id, email, name, role, "isActive" 
FROM "public"."User" 
WHERE email = 'admin@example.com';
```

## トラブルシューティング

### エラー: "Module not found: Can't resolve 'next-auth/jwt'"
```bash
npm install next-auth@latest
```

### エラー: ビルドエラー
```bash
# キャッシュをクリアして再ビルド
rm -rf .next
npm run build
```

### Vercelでのログ確認
1. Vercelダッシュボード > Functions タブ
2. 該当するFunctionのログを確認
3. エラーメッセージを特定