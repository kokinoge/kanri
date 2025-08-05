# Claude Code開発用要件定義書

## 🎯 開発目標
マーケティング支援代理店向け予算管理システムをClaude Codeで効率的に開発するための要件定義

## 📋 必須実装要素（優先度順）

### 1. 基盤コンポーネント（最優先）

#### 1.1 レイアウトシステム
```typescript
// src/components/layout/Layout.tsx
interface LayoutProps {
  children: React.ReactNode
}

// 必要な機能:
// - ヘッダー（ナビゲーション、ユーザーメニュー）
// - サイドバー（メニュー項目）
// - メインコンテンツエリア
// - 認証ガード
```

#### 1.2 認証システムの完成
```typescript
// src/lib/auth.ts の拡張
// - 実際のデータベース認証
// - パスワードハッシュ化
// - セッション管理
// - 権限チェックミドルウェア
```

#### 1.3 型定義システム
```typescript
// src/types/index.ts
export interface Client {
  id: string
  name: string
  manager: string
  priority: number
  createdAt: string
  updatedAt: string
}

export interface Campaign {
  id: string
  clientId: string
  name: string
  purpose: string
  startDate: string
  endDate: string
  totalBudget: number
  createdAt: string
  updatedAt: string
}

export interface Budget {
  id: string
  campaignId: string
  year: number
  month: number
  platform: Platform
  operationType: OperationType
  revenueType: RevenueType
  budgetAmount: number
  targetKpi: string
  targetValue: number
  createdAt: string
  updatedAt: string
}

export interface Result {
  id: string
  campaignId: string
  year: number
  month: number
  platform: Platform
  operationType: OperationType
  actualSpend: number
  actualResult: number
  createdAt: string
  updatedAt: string
}

// Enum型定義
export enum Platform {
  X = 'x',
  INSTAGRAM = 'instagram',
  YOUTUBE = 'youtube',
  TIKTOK = 'tiktok',
  THREADS = 'threads'
}

export enum OperationType {
  MICRO_INFLUENCER = 'micro_influencer',
  MEGA_INFLUENCER = 'mega_influencer',
  AD_OPERATION = 'ad_operation',
  CONTENT_CREATION = 'content_creation'
}

export enum RevenueType {
  PERFORMANCE = 'performance',
  FIXED_POST = 'fixed_post',
  IMP_GUARANTEE = 'imp_guarantee',
  AD_BUDGET_PERCENT = 'ad_budget_percent',
  MONTHLY_FIXED = 'monthly_fixed'
}

// API レスポンス型
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  total?: number
  summary?: any
}

export interface ApiError {
  success: false
  error: string
  details?: any
}
```

### 2. UIコンポーネントライブラリ

#### 2.1 基本UIコンポーネント
```typescript
// src/components/ui/
// - Button.tsx
// - Input.tsx
// - Select.tsx
// - Modal.tsx
// - Table.tsx
// - Card.tsx
// - Badge.tsx
// - LoadingSpinner.tsx
```

#### 2.2 データ表示コンポーネント
```typescript
// src/components/data/
// - DataTable.tsx (検索・フィルタ・ソート機能付き)
// - PaginationControls.tsx
// - FilterPanel.tsx
// - SearchBox.tsx
```

#### 2.3 チャート・グラフコンポーネント
```typescript
// src/components/charts/
// - LineChart.tsx
// - BarChart.tsx
// - PieChart.tsx
// - DashboardCard.tsx
// - ProgressBar.tsx
```

### 3. フォームシステム

#### 3.1 フォームコンポーネント
```typescript
// src/components/forms/
// - ClientForm.tsx
// - CampaignForm.tsx
// - BudgetForm.tsx
// - ResultForm.tsx
// - UserForm.tsx
```

#### 3.2 バリデーション
```typescript
// src/lib/validation.ts
// - Zod スキーマ定義
// - フォームバリデーション関数
// - エラーメッセージ管理
```

### 4. データ管理システム

#### 4.1 API クライアント
```typescript
// src/lib/api.ts
// - 統一されたAPI呼び出し関数
// - エラーハンドリング
// - 型安全なレスポンス処理
```

#### 4.2 状態管理
```typescript
// src/hooks/
// - useClients.ts
// - useCampaigns.ts
// - useBudgets.ts
// - useResults.ts
// - useAuth.ts
```

### 5. ページコンポーネント

#### 5.1 認証ページ
```typescript
// src/app/auth/signin/page.tsx
// - ログインフォーム
// - エラーハンドリング
// - リダイレクト処理
```

#### 5.2 ダッシュボード
```typescript
// src/app/page.tsx
// - 全体概要表示
// - 進行中施策一覧
// - 予算執行率
// - グラフ・チャート表示
```

#### 5.3 管理画面
```typescript
// src/app/clients/page.tsx - クライアント一覧・管理
// src/app/campaigns/page.tsx - 施策一覧・管理
// src/app/budgets/page.tsx - 予算設定・管理
// src/app/results/page.tsx - 実績入力・管理
// src/app/reports/ - 各種レポート画面
```

## 🔧 開発環境設定

### 必要な依存関係
```json
{
  "dependencies": {
    "@next-auth/prisma-adapter": "^1.0.7",
    "@prisma/client": "^6.13.0",
    "bcryptjs": "^3.0.2",
    "chart.js": "^4.5.0",
    "next": "15.3.5",
    "next-auth": "^4.24.11",
    "react": "^19.0.0",
    "react-chartjs-2": "^5.3.0",
    "react-dom": "^19.0.0",
    "zod": "^3.22.4",
    "react-hook-form": "^7.48.2",
    "@hookform/resolvers": "^3.3.2"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "jest": "^29.3.1",
    "jest-environment-jsdom": "^29.3.1"
  }
}
```

### 環境変数設定
```env
# .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/kanri_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

## 📝 開発手順（Claude Code用）

### Phase 1: 基盤構築（1-2日）
1. レイアウトコンポーネント実装
2. 型定義システム構築
3. 認証システム完成
4. 基本UIコンポーネント作成

### Phase 2: データ管理（2-3日）
1. API クライアント実装
2. カスタムフック作成
3. フォームシステム構築
4. バリデーション実装

### Phase 3: 画面実装（3-4日）
1. ダッシュボード実装
2. クライアント管理画面
3. 施策管理画面
4. 予算・実績管理画面

### Phase 4: 機能拡張（2-3日）
1. レポート機能
2. チャート・グラフ機能
3. 検索・フィルタ機能
4. エクスポート機能

### Phase 5: 最適化・テスト（1-2日）
1. パフォーマンス最適化
2. エラーハンドリング強化
3. テスト実装
4. デプロイ準備

## 🎨 デザインシステム

### カラーパレット
```css
:root {
  --primary: #3b82f6;
  --primary-dark: #2563eb;
  --secondary: #64748b;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --background: #f8fafc;
  --surface: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --border: #e2e8f0;
}
```

### レスポンシブブレークポイント
```css
/* Tailwind CSS準拠 */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## 🚀 Claude Code開発のポイント

### 1. コンポーネント設計原則
- 単一責任の原則
- 再利用可能性
- 型安全性
- テスタビリティ

### 2. ファイル命名規則
```
- コンポーネント: PascalCase (UserForm.tsx)
- フック: camelCase (useClients.ts)
- ユーティリティ: camelCase (formatCurrency.ts)
- 型定義: PascalCase (Client.ts)
```

### 3. コード品質基準
- TypeScript strict mode
- ESLint + Prettier
- 適切なコメント
- エラーハンドリング

### 4. パフォーマンス考慮事項
- React.memo の適切な使用
- useMemo, useCallback の活用
- 画像最適化
- バンドルサイズ最適化

## 📚 参考資料

### 技術ドキュメント
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Chart.js Documentation](https://www.chartjs.org/docs)

### デザインリファレンス
- [Tailwind UI Components](https://tailwindui.com)
- [Headless UI](https://headlessui.com)
- [React Hook Form](https://react-hook-form.com)

この要件定義書に基づいて、Claude Codeで効率的な開発を進めることができます。