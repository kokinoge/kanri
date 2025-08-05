# デプロイ手順

## 1. 前提条件

- Node.js 18.x 以上
- PostgreSQL データベース（Supabase、Neon、Railway など）
- Vercel アカウント（または他のホスティングプラットフォーム）
- Git リポジトリ（GitHub、GitLab など）

## 2. データベースのセットアップ

### 2.1 PostgreSQL データベースの作成

推奨サービス：
- [Supabase](https://supabase.com/) - 無料枠あり、簡単セットアップ
- [Neon](https://neon.tech/) - サーバーレス PostgreSQL
- [Railway](https://railway.app/) - 簡単なデプロイ

### 2.2 データベース接続文字列の取得

データベースプロバイダーから接続文字列を取得します：
```
postgresql://[ユーザー名]:[パスワード]@[ホスト]:[ポート]/[データベース名]?schema=public
```

## 3. 環境変数の設定

### 3.1 ローカルでの準備

1. `.env.production` ファイルを作成（`.env.production.example` を参考に）：

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://your-app-name.vercel.app"
NEXTAUTH_SECRET="your-generated-secret"
```

2. NEXTAUTH_SECRET の生成：
```bash
openssl rand -base64 32
```

### 3.2 データベースマイグレーション

本番データベースにスキーマを適用：

```bash
# 本番環境のDATABASE_URLを設定
export DATABASE_URL="your-production-database-url"

# マイグレーションを実行
npx prisma migrate deploy

# 初期データが必要な場合
npx prisma db seed
```

## 4. Vercel へのデプロイ

### 4.1 Vercel CLI を使用する方法

1. Vercel CLI をインストール：
```bash
npm i -g vercel
```

2. デプロイ：
```bash
vercel
```

3. 環境変数を設定：
```bash
vercel env add DATABASE_URL
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
```

### 4.2 GitHub 経由でのデプロイ（推奨）

1. GitHub にリポジトリをプッシュ

2. [Vercel Dashboard](https://vercel.com/dashboard) にアクセス

3. "Import Project" をクリック

4. GitHub リポジトリを選択

5. 環境変数を設定：
   - `DATABASE_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`

6. "Deploy" をクリック

## 5. デプロイ後の設定

### 5.1 データベース接続の確認

```bash
# 本番環境でPrismaスキーマを確認
npx prisma db pull
```

### 5.2 ドメインの設定

1. Vercel Dashboard でカスタムドメインを追加
2. DNS 設定を更新
3. `NEXTAUTH_URL` を新しいドメインに更新

### 5.3 監視とログ

- Vercel Dashboard でログを確認
- エラー監視ツールの設定（Sentry など）

## 6. トラブルシューティング

### よくある問題

1. **データベース接続エラー**
   - DATABASE_URL が正しいか確認
   - SSL 設定が必要な場合は `?sslmode=require` を追加

2. **認証エラー**
   - NEXTAUTH_URL が正しいか確認
   - NEXTAUTH_SECRET が設定されているか確認

3. **ビルドエラー**
   - `npm run build` でローカルでビルドを確認
   - 依存関係が package.json に含まれているか確認

### デバッグコマンド

```bash
# ローカルでプロダクションビルドをテスト
npm run build
npm run start

# 環境変数の確認
vercel env ls
```

## 7. セキュリティチェックリスト

- [ ] すべての環境変数が設定されている
- [ ] NEXTAUTH_SECRET は安全なランダム文字列
- [ ] データベース接続は SSL を使用
- [ ] 不要なデバッグログは削除
- [ ] 機密情報はコードに含まれていない

## 8. パフォーマンス最適化

- 画像の最適化（next/image を使用）
- 不要な依存関係の削除
- キャッシュヘッダーの設定
- CDN の活用（Vercel は自動で設定）