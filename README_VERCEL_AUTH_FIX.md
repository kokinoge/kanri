# 🚨 Vercel認証保護解除手順

## 問題
本番環境で「データを読み込み中...」が永続的に続く問題の根本原因は、**Vercel認証保護が有効**になっているためです。

すべてのAPIエンドポイントが401エラーを返し、Vercel SSOログインページにリダイレクトされています。

## 解決方法

### 方法1: Vercel Dashboard で認証保護を無効化（推奨）

1. **Vercel Dashboard にアクセス**
   - https://vercel.com/dashboard にログイン
   - プロジェクト「cursor-rose-zeta」を選択

2. **Settings → Security** に移動

3. **Deployment Protection** を確認
   - 「Authentication Required」がONになっている場合は **OFF** に変更
   - 「Password Protection」もOFFに設定

4. **保存して再デプロイ**

### 方法2: Vercel CLI で確認・変更

```bash
# プロジェクト状況確認
vercel projects ls

# プロジェクト詳細確認
vercel project ls cursor-rose-zeta

# セキュリティ設定確認
vercel project ls --json | jq '.[] | select(.name=="cursor-rose-zeta") | .passwordProtection'
```

### 方法3: vercel.json で設定（最終手段）

```json
{
  "functions": {
    "app/api/**/*.js": {
      "maxDuration": 10
    }
  },
  "security": {
    "deploymentProtection": {
      "enabled": false
    }
  }
}
```

## 動作確認

以下のコマンドで認証保護が解除されたことを確認：

```bash
# セッションAPI確認
curl -s "https://cursor-rose-zeta.vercel.app/api/auth/session" | jq .

# クライアントAPI確認  
curl -s "https://cursor-rose-zeta.vercel.app/api/clients" | jq .
```

✅ **期待される結果**: JSONレスポンスが返される（HTML認証ページではない）

## 注意事項

- 認証保護を無効化すると、一時的にアプリケーションが公開アクセス可能になります
- アプリケーション内のカスタム認証（NextAuth）は引き続き動作します
- セキュリティが必要な場合は、アプリケーション内認証の強化を検討してください 