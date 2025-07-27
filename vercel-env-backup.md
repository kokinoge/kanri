# Vercel Environment Variables Backup
## 作成日時: 2025-01-25

### 現在の環境変数一覧
```
NEXTAUTH_URL                       Encrypted           Production          1d ago
NODE_ENV                           Encrypted           Production          1d ago  
DATABASE_URL                       Encrypted           Production          2d ago
NEXTAUTH_SECRET                    Encrypted           Production          2d ago
NEXT_PUBLIC_SUPABASE_ANON_KEY      Encrypted           Production          2d ago
NEXT_PUBLIC_SUPABASE_URL           Encrypted           Production          2d ago
```

### 復元方法
削除した場合は以下のコマンドで再設定：
```bash
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_URL production  
vercel env add NODE_ENV production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
```

### 問題発生時の確認コマンド
```bash
vercel env ls
vercel inspect <deployment-url> --logs
``` 