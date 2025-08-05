# Kanri - 予算管理システム

マーケティング支援代理店向けの予算管理システムです。クライアント、キャンペーン、予算、実績を一元管理できます。

## 機能

- 🔐 **認証・権限管理** - NextAuth.jsによる安全な認証システム
- 👥 **クライアント管理** - クライアント情報の登録・管理
- 📊 **キャンペーン管理** - マーケティングキャンペーンの作成・追跡
- 💰 **予算管理** - 月次予算の設定と執行状況の監視
- 📈 **実績レポート** - 実際の支出と成果の記録
- 📊 **データ可視化** - Chart.jsによるグラフ表示
- 📄 **レポートエクスポート** - Excel、CSV、PDF形式でのエクスポート
- 🔔 **リアルタイム通知** - 重要なイベントの通知
- 🌓 **ダークモード** - 目に優しいダークモード対応

## 技術スタック

- **フレームワーク**: Next.js 15.3.5 (App Router)
- **言語**: TypeScript
- **データベース**: PostgreSQL + Prisma ORM
- **認証**: NextAuth.js
- **スタイリング**: Tailwind CSS
- **グラフ**: Chart.js
- **エクスポート**: ExcelJS, json2csv, PDFKit

## セットアップ

### 前提条件

- Node.js 18.x 以上
- PostgreSQL データベース
- npm または yarn

### インストール

1. リポジトリをクローン：
```bash
git clone https://github.com/yourusername/kanri.git
cd kanri
```

2. 依存関係をインストール：
```bash
npm install
```

3. 環境変数を設定：
```bash
cp .env.example .env.local
```

`.env.local` を編集して必要な値を設定：
```env
DATABASE_URL="postgresql://user:password@localhost:5432/kanri"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

4. データベースをセットアップ：
```bash
npx prisma migrate dev
npx prisma db seed
```

5. 開発サーバーを起動：
```bash
npm run dev
```

http://localhost:3000 でアプリケーションにアクセスできます。

## 使用方法

### ログイン

初期ユーザー：
- メール: admin@example.com
- パスワード: admin123

### 主な画面

1. **ダッシュボード** - 全体の概要を表示
2. **クライアント管理** - クライアントの登録・編集
3. **キャンペーン管理** - キャンペーンの作成・管理
4. **予算管理** - 月次予算の設定
5. **実績管理** - 実績データの入力
6. **レポート** - 各種レポートの生成・ダウンロード
7. **ユーザー管理** - システムユーザーの管理（管理者のみ）

## デプロイ

詳細なデプロイ手順は [DEPLOYMENT.md](./DEPLOYMENT.md) を参照してください。

### クイックデプロイ（Vercel）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/kanri)

## 開発

### コマンド

```bash
# 開発サーバー
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー
npm run start

# 型チェック
npm run type-check

# Prismaスタジオ（データベース管理UI）
npx prisma studio
```

### プロジェクト構造

```
kanri/
├── src/
│   ├── app/           # Next.js App Router
│   ├── components/    # Reactコンポーネント
│   ├── lib/          # ユーティリティ関数
│   ├── contexts/     # React Context
│   └── types/        # TypeScript型定義
├── prisma/           # Prismaスキーマとマイグレーション
├── public/           # 静的ファイル
└── tests/           # テストファイル
```

## ライセンス

MIT License

## サポート

問題や質問がある場合は、[Issues](https://github.com/yourusername/kanri/issues) で報告してください。
