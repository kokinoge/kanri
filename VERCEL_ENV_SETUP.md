# Vercel 環境変数設定ガイド（完全版）

## 現在の問題
1. NEXTAUTH_URL が間違っている（kanri-six ではなく kanri になっている）
2. DATABASE_URL のパースエラーが続いている

## 設定手順（詳細）

### 1. Vercelにログイン
https://vercel.com

### 2. プロジェクトページへ
- ダッシュボードから `kanri` をクリック

### 3. 環境変数ページへ
- 上部メニューの **Settings** をクリック
- 左メニューの **Environment Variables** をクリック

### 4. 既存の環境変数を削除して再作成

#### DATABASE_URL
1. 既存のDATABASE_URLの横の「...」→「Delete」
2. 「Add New」をクリック
3. 以下を入力：
   - Key: `DATABASE_URL`
   - Value: 
   ```
   postgresql://postgres.xwsjoxnhtsylsdfzewcb:Kanri2025%21DB@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres
   ```
   - Environment: Production, Preview, Development すべてにチェック
4. 「Save」をクリック

#### NEXTAUTH_URL  
1. 既存のNEXTAUTH_URLの横の「...」→「Delete」
2. 「Add New」をクリック
3. 以下を入力：
   - Key: `NEXTAUTH_URL`
   - Value: `https://kanri-six.vercel.app`
   - Environment: Production, Preview, Development すべてにチェック
4. 「Save」をクリック

#### NEXTAUTH_SECRET
1. まだ設定していない場合は「Add New」
2. 以下を入力：
   - Key: `NEXTAUTH_SECRET`
   - Value: ランダムな32文字以上の文字列
   - 生成コマンド: `openssl rand -base64 32`
   - Environment: Production, Preview, Development すべてにチェック
3. 「Save」をクリック

### 5. 再デプロイ（重要）
1. 上部に表示される通知の「Redeploy」をクリック
2. または「Deployments」タブ → 最新のデプロイ → 「...」→「Redeploy」
3. 「Use existing Build Cache」のチェックを**外す**
4. 「Redeploy」をクリック

### 6. デプロイ完了を待つ
- 通常2-3分かかります
- Deploymentsタブで進行状況を確認

### 7. 確認
デプロイ完了後：
1. https://kanri-six.vercel.app/api/env-check
2. https://kanri-six.vercel.app/api/public/debug

## トラブルシューティング

### 環境変数が反映されない場合
1. Vercel CLIでキャッシュをクリア
2. プロジェクトを一度削除して再インポート
3. 新しいデプロイメントを作成

### DATABASE_URLのエラーが続く場合
Supabaseで新しいパスワードを設定（特殊文字なし）：
1. Supabase → Settings → Database
2. Reset database password
3. 英数字のみのパスワードに設定（例: KanriDB2025Admin）
4. 新しい接続文字列をVercelに設定