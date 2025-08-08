#!/bin/bash

# Vercel CLI を使った環境変数設定スクリプト

echo "=== Vercel 環境変数設定スクリプト ==="
echo ""
echo "このスクリプトを実行する前に："
echo "1. vercel login でログイン済みであること"
echo "2. プロジェクトディレクトリで実行すること"
echo ""
echo "続行しますか？ (y/n)"
read -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

# 既存の環境変数を削除
echo "既存の環境変数を削除中..."
vercel env rm DATABASE_URL production --yes 2>/dev/null
vercel env rm NEXTAUTH_URL production --yes 2>/dev/null
vercel env rm NEXTAUTH_SECRET production --yes 2>/dev/null

# 新しい環境変数を設定
echo ""
echo "新しい環境変数を設定中..."

# DATABASE_URL
echo "postgresql://postgres.xwsjoxnhtsylsdfzewcb:Kanri2025%21DB@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres" | vercel env add DATABASE_URL production

# NEXTAUTH_URL  
echo "https://kanri-six.vercel.app" | vercel env add NEXTAUTH_URL production

# NEXTAUTH_SECRET (存在しない場合は生成)
if [ -z "$NEXTAUTH_SECRET_VALUE" ]; then
    NEXTAUTH_SECRET_VALUE=$(openssl rand -base64 32)
    echo "生成されたNEXTAUTH_SECRET: $NEXTAUTH_SECRET_VALUE"
fi
echo "$NEXTAUTH_SECRET_VALUE" | vercel env add NEXTAUTH_SECRET production

echo ""
echo "環境変数の設定が完了しました！"
echo ""
echo "次のコマンドで確認できます："
echo "vercel env ls"
echo ""
echo "再デプロイするには："
echo "vercel --prod --force"