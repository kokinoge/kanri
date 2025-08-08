# Vercel CLI コマンド集

## 1. Vercel CLIのインストール
```bash
npm i -g vercel
```

## 2. ログイン
```bash
vercel login
```

## 3. 環境変数の確認
```bash
# すべての環境変数を表示
vercel env ls

# 特定の環境の変数を表示
vercel env ls production
```

## 4. 環境変数の削除と追加（推奨手順）

### 既存の変数を削除
```bash
vercel env rm DATABASE_URL production --yes
vercel env rm NEXTAUTH_URL production --yes
vercel env rm NEXTAUTH_SECRET production --yes
```

### 新しい変数を追加
```bash
# DATABASE_URL
echo "postgresql://postgres.xwsjoxnhtsylsdfzewcb:Kanri2025%21DB@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres" | vercel env add DATABASE_URL production

# NEXTAUTH_URL
echo "https://kanri-six.vercel.app" | vercel env add NEXTAUTH_URL production

# NEXTAUTH_SECRET (新規生成)
echo "$(openssl rand -base64 32)" | vercel env add NEXTAUTH_SECRET production
```

## 5. 再デプロイ
```bash
# 強制的に再デプロイ（キャッシュを使わない）
vercel --prod --force

# または特定のブランチから
vercel --prod --force --scope=your-team-name
```

## 6. ログの確認
```bash
# 最新のビルドログ
vercel logs

# Function のログ
vercel logs --type=functions

# エラーのみ
vercel logs --error
```

## 7. プロジェクト情報
```bash
# プロジェクトの詳細
vercel inspect

# デプロイメント一覧
vercel ls
```

## Chrome MCP での実行方法

Chrome MCPを使用する場合：

1. 上記のコマンドを1つずつ実行
2. または、作成したスクリプトを実行：
   ```bash
   chmod +x scripts/vercel-env-setup.sh
   ./scripts/vercel-env-setup.sh
   ```

## トラブルシューティング

### 環境変数が反映されない場合
```bash
# キャッシュをクリアして再デプロイ
vercel --prod --force --no-cache

# プロジェクトをリンク解除して再リンク
vercel unlink
vercel link
```

### 特定の環境変数の値を確認
```bash
vercel env pull .env.production.local
cat .env.production.local
```