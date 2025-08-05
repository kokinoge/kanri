# Claude Code開発指示書

## 🎯 Claude Codeへの具体的な指示

### Phase 1: 基盤コンポーネント実装（最優先）

#### 指示1: レイアウトコンポーネントの作成

**Claude Codeへの指示:**
```
以下の要件でレイアウトコンポーネントを作成してください：

1. src/components/layout/Layout.tsx を作成
2. ヘッダー、サイドバー、メインコンテンツエリアを含む
3. 認証状態に応じた表示制御
4. レスポンシブデザイン対応
5. TypeScript strict mode対応

参考ファイル:
- .kiro/specs/budget-management-system/design.md
- .kiro/specs/budget-management-system/claude-code-requirements.md
- src/app/layout.tsx (現在のレイアウト設定)
- src/lib/auth.ts (認証設定)

要求する機能:
- ナビゲーションメニュー（クライアント、施策、予算、実績、レポート）
- ユーザー情報表示とログアウト機能
- 権限に応じたメニュー表示制御
- モバイル対応のハンバーガーメニュー
```

#### 指示2: 基本UIコンポーネントライブラリ

**Claude Codeへの指示:**
```
以下の基本UIコンポーネントを作成してください：

作成するファイル:
- src/components/ui/Button.tsx
- src/components/ui/Input.tsx
- src/components/ui/Select.tsx
- src/components/ui/Modal.tsx
- src/components/ui/Card.tsx
- src/components/ui/Badge.tsx
- src/components/ui/LoadingSpinner.tsx

要件:
- TypeScript完全対応
- 再利用可能な設計
- アクセシビリティ対応
- 統一されたデザインシステム
- Tailwind CSS使用

参考: .kiro/specs/budget-management-system/claude-code-requirements.md のデザインシステム部分
```

### Phase 2: 型定義システム

#### 指示3: 型定義の整備

**Claude Codeへの指示:**
```
以下の型定義ファイルを作成してください：

作成するファイル:
- src/types/index.ts (メインの型定義)
- src/types/api.ts (API関連の型)
- src/types/forms.ts (フォーム関連の型)

参考ファイル:
- prisma/schema.prisma (データベーススキーマ)
- src/app/api/clients/route.ts (既存API実装)
- .kiro/specs/budget-management-system/claude-code-requirements.md (型定義例)

要求する型:
- Client, Campaign, Budget, Result インターフェース
- Platform, OperationType, RevenueType enum
- ApiResponse, ApiError インターフェース
- フォーム用の型定義
```

### Phase 3: 認証システム完成

#### 指示4: 認証システムの実装

**Claude Codeへの指示:**
```
現在の認証システムを完成させてください：

修正するファイル:
- src/lib/auth.ts (データベース認証の実装)
- src/app/api/auth/register/route.ts (新規作成)
- src/app/auth/signin/page.tsx (新規作成)

参考ファイル:
- prisma/schema.prisma (Userモデル)
- src/types/next-auth.d.ts (型定義)

要求する機能:
- bcryptを使用したパスワードハッシュ化
- データベースからのユーザー認証
- 権限チェックミドルウェア
- ログイン画面の実装
- セッション管理の強化
```

### Phase 4: データ管理システム

#### 指示5: APIクライアントとカスタムフック

**Claude Codeへの指示:**
```
データ管理システムを実装してください：

作成するファイル:
- src/lib/api.ts (統一APIクライアント)
- src/hooks/useClients.ts
- src/hooks/useCampaigns.ts
- src/hooks/useBudgets.ts
- src/hooks/useResults.ts
- src/hooks/useAuth.ts

参考ファイル:
- src/app/api/clients/route.ts (既存API)
- src/app/api/campaigns/route.ts (既存API)
- src/app/api/budgets/route.ts (既存API)
- src/types/index.ts (型定義)

要求する機能:
- 型安全なAPI呼び出し
- エラーハンドリング
- ローディング状態管理
- キャッシュ機能
- CRUD操作の抽象化
```

### Phase 5: フォームシステム

#### 指示6: フォームコンポーネントとバリデーション

**Claude Codeへの指示:**
```
フォームシステムを実装してください：

作成するファイル:
- src/lib/validation.ts (Zodスキーマ)
- src/components/forms/ClientForm.tsx
- src/components/forms/CampaignForm.tsx
- src/components/forms/BudgetForm.tsx
- src/components/forms/ResultForm.tsx

必要な依存関係:
npm install zod react-hook-form @hookform/resolvers

参考ファイル:
- src/types/index.ts (型定義)
- src/components/ui/ (UIコンポーネント)
- src/hooks/ (カスタムフック)

要求する機能:
- React Hook Form統合
- Zodバリデーション
- エラーメッセージ表示
- 送信状態管理
- 型安全なフォーム処理
```

### Phase 6: 画面実装

#### 指示7: メイン画面の実装

**Claude Codeへの指示:**
```
メイン画面を実装してください：

修正・作成するファイル:
- src/app/page.tsx (ダッシュボード)
- src/app/clients/page.tsx (クライアント管理)
- src/app/campaigns/page.tsx (施策管理)
- src/app/budgets/page.tsx (予算管理)
- src/app/results/page.tsx (実績管理)

参考ファイル:
- src/components/layout/Layout.tsx
- src/components/forms/ (フォームコンポーネント)
- src/hooks/ (カスタムフック)
- .kiro/specs/budget-management-system/requirements.md (要件)

要求する機能:
- データ一覧表示
- 検索・フィルタ機能
- CRUD操作
- ページネーション
- レスポンシブデザイン
```

## 📁 ファイル分類

### ✅ **必要なファイル（そのまま使用）**

#### 設定ファイル
```
package.json - 依存関係管理
tsconfig.json - TypeScript設定
next.config.js - Next.js設定
prisma/schema.prisma - データベーススキーマ
.env.local - 環境変数
```

#### 既存実装（活用可能）
```
src/lib/prisma.ts - Prismaクライアント設定
src/types/next-auth.d.ts - NextAuth型定義
src/app/api/clients/route.ts - クライアントAPI
src/app/api/campaigns/route.ts - 施策API
src/app/api/budgets/route.ts - 予算API
```

#### 仕様書
```
.kiro/specs/budget-management-system/requirements.md
.kiro/specs/budget-management-system/design.md
.kiro/specs/budget-management-system/claude-code-requirements.md
```

### ⚠️ **修正が必要なファイル**

```
src/lib/auth.ts - 認証システムの完成が必要
src/app/layout.tsx - Layoutコンポーネント参照を修正
src/app/page.tsx - ダッシュボード実装が必要
```

### ❌ **不要なファイル（削除推奨）**

#### 環境ファイル（重複）
```
.env.check2
.env.downloaded
.env.local.backup
.env.production.check
.env.production.local
.env.production.real
.env.production.temp
.env.production.vercel
.env.vercel
```

#### 開発用ファイル
```
.DS_Store
tsconfig.tsbuildinfo
docs/budget_management_specs.md (仕様書は.kiroに移行済み)
```

#### 未実装ページ（後で実装）
```
src/app/analytics/page.tsx
src/app/client-analysis/page.tsx
src/app/data-tables/page.tsx
src/app/department-performance/page.tsx
src/app/integrated-management/page.tsx
src/app/media-analysis/page.tsx
src/app/monthly-overview/page.tsx
src/app/settings/departments/
```

### 🆕 **新規作成が必要なファイル**

#### 最優先（Phase 1-2）
```
src/components/layout/Layout.tsx
src/components/layout/Header.tsx
src/components/layout/Sidebar.tsx
src/components/ui/Button.tsx
src/components/ui/Input.tsx
src/components/ui/Select.tsx
src/components/ui/Modal.tsx
src/types/index.ts
```

#### 中優先（Phase 3-4）
```
src/lib/api.ts
src/hooks/useClients.ts
src/hooks/useCampaigns.ts
src/hooks/useBudgets.ts
src/app/auth/signin/page.tsx
src/app/api/auth/register/route.ts
```

#### 低優先（Phase 5-6）
```
src/lib/validation.ts
src/components/forms/ClientForm.tsx
src/components/forms/CampaignForm.tsx
src/components/charts/LineChart.tsx
src/components/data/DataTable.tsx
```

## 🚀 Claude Code実行手順

### 1. 事前準備
```bash
# 必要な依存関係を追加
npm install zod react-hook-form @hookform/resolvers @types/bcryptjs

# 不要なファイルを削除
rm .env.check2 .env.downloaded .env.local.backup .env.production.* .env.vercel
rm -rf docs/
```

### 2. Phase別実行
各Phaseごとに上記の指示をClaude Codeに与えて、段階的に実装を進めてください。

### 3. 参考ファイルの指定
Claude Codeには必ず以下のファイルを参考として指定してください：
- `.kiro/specs/budget-management-system/claude-code-requirements.md`
- `prisma/schema.prisma`
- 既存のAPI Routes
- 型定義ファイル

この手順に従って開発を進めることで、効率的で一貫性のあるシステムが構築できます。