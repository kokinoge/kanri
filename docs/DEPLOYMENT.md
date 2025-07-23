# 本番環境デプロイメントガイド

予算管理システムを本番環境にデプロイするための手順とベストプラクティスを説明します。

## 🚀 デプロイ前チェックリスト

### ✅ セキュリティ
- [ ] 本番用の強力なパスワード設定
- [ ] NEXTAUTH_SECRETの生成（32文字以上）
- [ ] データベース接続の暗号化
- [ ] HTTPSの設定
- [ ] 不要なデバッグ情報の削除

### ✅ パフォーマンス
- [ ] 本番ビルドの最適化確認
- [ ] データベースインデックスの設定
- [ ] 静的ファイルの最適化
- [ ] CDNの設定（オプション）

### ✅ 監視・ログ
- [ ] アプリケーションログの設定
- [ ] エラー監視の設定
- [ ] パフォーマンス監視
- [ ] バックアップ設定

## 🌐 デプロイオプション

### 1. Vercel (推奨)

#### 特徴
- Next.jsに最適化
- 自動スケーリング
- 継続的デプロイ
- エッジ機能サポート

#### 手順
```bash
# Vercel CLIインストール
npm install -g vercel

# プロジェクトディレクトリで実行
vercel

# 環境変数設定
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL

# 本番デプロイ
vercel --prod
```

#### 環境変数設定（Vercel Dashboard）
```
DATABASE_URL=postgresql://user:pass@host:5432/db
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-app.vercel.app
NODE_ENV=production
```

### 2. AWS (EC2 + RDS)

#### アーキテクチャ
```
Internet Gateway
    ↓
Application Load Balancer (HTTPS)
    ↓
EC2 Instance (Next.js App)
    ↓
RDS PostgreSQL (プライベートサブネット)
```

#### EC2セットアップ
```bash
# EC2インスタンス（Ubuntu 22.04）にSSH接続
ssh -i your-key.pem ubuntu@your-ec2-ip

# 必要なソフトウェアインストール
sudo apt update
sudo apt install nodejs npm postgresql-client nginx

# Node.js 18+のインストール
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# プロジェクトクローン
git clone your-repository
cd kanri

# 依存関係インストール
npm install

# 本番ビルド
npm run build

# PM2でプロセス管理
npm install -g pm2
pm2 start npm --name "kanri" -- start
pm2 startup
pm2 save
```

#### Nginx設定
```nginx
# /etc/nginx/sites-available/kanri
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/private.key;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Docker + Container Service

#### Dockerfile
```dockerfile
# Multi-stage build
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
```

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://kanri:password@db:5432/kanri_db
      - NEXTAUTH_SECRET=your-secret-key
      - NEXTAUTH_URL=https://your-domain.com
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=kanri_db
      - POSTGRES_USER=kanri
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

## 🗄️ データベース設定

### PostgreSQL本番設定

#### パフォーマンス最適化
```sql
-- postgresql.conf の推奨設定
shared_buffers = '256MB'
effective_cache_size = '1GB'
maintenance_work_mem = '64MB'
checkpoint_completion_target = 0.9
wal_buffers = '16MB'
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200
```

#### 接続設定
```sql
-- 最大接続数
max_connections = 100

-- タイムアウト設定
statement_timeout = '300s'
idle_in_transaction_session_timeout = '60s'
```

### マイグレーション実行
```bash
# 本番データベースでのマイグレーション
DATABASE_URL="your-production-db-url" npx prisma migrate deploy

# 初期データ投入
DATABASE_URL="your-production-db-url" npx prisma db seed
```

## 🔒 セキュリティ設定

### 環境変数
```bash
# 強力なシークレット生成
openssl rand -base64 32

# 本番環境変数例
DATABASE_URL="postgresql://user:secure_password@host:5432/db?sslmode=require"
NEXTAUTH_SECRET="generated-32-char-secret"
NEXTAUTH_URL="https://your-domain.com"
NODE_ENV="production"
```

### SSL/TLS証明書
```bash
# Let's Encrypt（無料SSL）
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### ファイアウォール設定
```bash
# UFW設定例
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 📊 監視・ログ設定

### アプリケーション監視
```javascript
// next.config.js に追加
module.exports = {
  // エラー監視
  onError: (err, errorInfo) => {
    // Sentry, DataDog等に送信
    console.error('Application error:', err);
  },
  
  // パフォーマンス監視
  onPerformanceEntry: (metric) => {
    // メトリクス収集
    console.log('Performance metric:', metric);
  }
};
```

### ログ設定
```bash
# PM2ログローテーション
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### システム監視
```bash
# システムリソース監視
sudo apt install htop iotop nethogs

# ログ監視
sudo journalctl -u nginx -f
sudo tail -f /var/log/postgresql/postgresql-*.log
```

## 💾 バックアップ戦略

### 自動バックアップスクリプト
```bash
#!/bin/bash
# /home/ubuntu/backup.sh

DB_URL="your-production-db-url"
BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +%Y%m%d_%H%M%S)
S3_BUCKET="your-backup-bucket"

# ローカルバックアップ
mkdir -p $BACKUP_DIR
pg_dump $DB_URL > $BACKUP_DIR/kanri_backup_$DATE.sql

# S3にアップロード（オプション）
aws s3 cp $BACKUP_DIR/kanri_backup_$DATE.sql s3://$S3_BUCKET/

# 古いローカルバックアップを削除
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete

echo "Backup completed: $DATE"
```

### Cronジョブ設定
```bash
# 毎日午前2時にバックアップ実行
crontab -e
0 2 * * * /home/ubuntu/backup.sh >> /var/log/backup.log 2>&1
```

## 🚨 トラブルシューティング

### よくある問題と解決策

#### メモリ不足
```bash
# Node.jsメモリ制限増加
NODE_OPTIONS="--max-old-space-size=2048" npm start
```

#### データベース接続エラー
```bash
# 接続プール設定確認
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=20"
```

#### SSL証明書エラー
```bash
# 証明書更新
sudo certbot renew --dry-run
```

## 📈 パフォーマンス最適化

### Next.js設定
```javascript
// next.config.js
module.exports = {
  // 静的ファイル最適化
  images: {
    domains: ['your-cdn-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // gzip圧縮
  compress: true,
  
  // Bundle分析
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};
```

### データベース最適化
```sql
-- インデックス追加
CREATE INDEX CONCURRENTLY idx_budget_performance ON budget(campaign_id, year, month);
CREATE INDEX CONCURRENTLY idx_result_performance ON result(campaign_id, year, month);

-- 統計情報更新
ANALYZE;
```

## 🔄 CI/CD設定

### GitHub Actions例
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build application
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

**Version**: 1.0.0  
**Last Updated**: 2024年12月 