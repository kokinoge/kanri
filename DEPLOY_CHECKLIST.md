# デプロイチェックリスト

## ✅ 完了した準備作業

### 1. ビルドの確認
- [x] `npm run build` が成功することを確認
- [x] すべての依存関係がインストールされている
- [x] TypeScriptのエラーがない

### 2. データベース
- [x] Prismaスキーマが最新
- [x] マイグレーションファイルが作成済み（`prisma/migrations/`）
- [x] シードデータが準備済み（`prisma/seed.js`）

### 3. ドキュメント
- [x] README.md が更新済み
- [x] DEPLOYMENT.md が作成済み
- [x] .env.production.example が作成済み

## 🚀 デプロイ手順

### 1. GitHub へのプッシュ
```bash
git add .
git commit -m "Initial commit: Budget management system ready for deployment"
git push origin main
```

### 2. 本番データベースの準備

#### Option A: Supabase を使用する場合
1. https://supabase.com でアカウント作成
2. 新しいプロジェクトを作成
3. Settings → Database から接続文字列を取得
4. 接続文字列の例：
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

#### Option B: Neon を使用する場合
1. https://neon.tech でアカウント作成
2. 新しいプロジェクトを作成
3. Connection Details から接続文字列を取得

### 3. Vercel でのデプロイ

1. https://vercel.com にアクセス
2. "Import Git Repository" をクリック
3. GitHubリポジトリを選択
4. 環境変数を設定：

| 変数名 | 値 |
|--------|-----|
| DATABASE_URL | `postgresql://...` (上記で取得した接続文字列) |
| NEXTAUTH_URL | `https://[your-project].vercel.app` |
| NEXTAUTH_SECRET | `openssl rand -base64 32` で生成した値 |

5. "Deploy" をクリック

### 4. デプロイ後の設定

#### 4.1 データベースマイグレーション
```bash
# ローカルから本番DBに接続してマイグレーション
DATABASE_URL="your-production-database-url" npx prisma migrate deploy
```

#### 4.2 初期データの投入（オプション）
```bash
# 本番環境にシードデータを投入
DATABASE_URL="your-production-database-url" npx prisma db seed
```

#### 4.3 動作確認
- [ ] ログインページが表示される
- [ ] 初期ユーザーでログインできる（admin@example.com / admin123）
- [ ] 各ページが正しく表示される
- [ ] データの作成・更新・削除ができる

## ⚠️ 注意事項

1. **セキュリティ**
   - NEXTAUTH_SECRET は必ず強力なランダム文字列を使用
   - 初期パスワードは本番環境で必ず変更する
   - データベース接続はSSLを有効にする

2. **パフォーマンス**
   - 本番環境では `NODE_ENV=production` が自動設定される
   - Vercelは自動的にキャッシュとCDNを設定

3. **監視**
   - Vercel Dashboardでログを確認
   - エラーが発生した場合は Functions タブで詳細を確認

## 🔧 トラブルシューティング

### よくある問題

1. **"relation does not exist" エラー**
   - マイグレーションが実行されていない
   - 解決: `npx prisma migrate deploy` を実行

2. **認証エラー**
   - NEXTAUTH_URL が正しくない
   - 解決: Vercelの実際のURLと一致させる

3. **データベース接続エラー**
   - DATABASE_URL が正しくない
   - 解決: SSL設定を確認（`?sslmode=require` を追加）

## 📞 サポート

問題が解決しない場合：
1. Vercel のログを確認
2. `vercel logs` コマンドでリアルタイムログを確認
3. GitHub Issues で報告