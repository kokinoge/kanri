# DATABASE_URL フォーマットガイド

## エラーの原因
「invalid port number in database URL」というエラーは、DATABASE_URLの形式が正しくないことを示しています。

## Supabase の正しい DATABASE_URL フォーマット

### 1. Transaction Pooler（推奨）
```
postgresql://postgres.[プロジェクトID]:[パスワード]@aws-0-[リージョン].pooler.supabase.com:6543/postgres
```

### 2. Session Pooler
```
postgresql://postgres.[プロジェクトID]:[パスワード]@aws-0-[リージョン].pooler.supabase.com:5432/postgres
```

### 3. Direct Connection（非推奨）
```
postgresql://postgres.[プロジェクトID]:[パスワード]@db.[プロジェクトID].supabase.co:5432/postgres
```

## パスワードの特殊文字エスケープ

パスワードに以下の文字が含まれる場合、URLエンコードが必要です：

- `@` → `%40`
- `:` → `%3A`
- `/` → `%2F`
- `?` → `%3F`
- `#` → `%23`
- `!` → `%21`
- `$` → `%24`
- `&` → `%26`
- `'` → `%27`
- `(` → `%28`
- `)` → `%29`
- `*` → `%2A`
- `+` → `%2B`
- `,` → `%2C`
- `;` → `%3B`
- `=` → `%3D`
- `%` → `%25`
- ` ` → `%20`

## 例：パスワードのエスケープ

元のパスワード: `Kanri2025!DB`
エスケープ後: `Kanri2025%21DB`

## Vercelでの設定手順

1. Supabaseダッシュボードで接続文字列を確認
   - Settings → Database
   - Connection Pooling セクション
   - Transaction Pooler の接続文字列をコピー

2. パスワードをURLエンコード
   - `!` を `%21` に置換

3. Vercelで環境変数を設定
   ```
   DATABASE_URL=postgresql://postgres.xwsjoxnhtsylsdfzewcb:Kanri2025%21DB@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres
   ```

## トラブルシューティング

### 接続テスト用SQL
```sql
SELECT current_database(), current_user, version();
```

### Prismaでの接続確認
```bash
npx prisma db pull
```

### 一般的なエラーと解決策

1. **invalid port number**
   - ポート番号が正しく設定されているか確認（通常は5432または6543）
   - URLに余分なスペースや改行が含まれていないか確認

2. **password authentication failed**
   - パスワードの特殊文字が正しくエスケープされているか確認
   - Supabaseでパスワードをリセットして再試行

3. **connection refused**
   - IPアドレス制限がある場合、VercelのIPを許可リストに追加
   - Connection Poolingが有効になっているか確認