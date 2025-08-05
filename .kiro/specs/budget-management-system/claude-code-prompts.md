# Claude Code依頼用プロンプト集

## 🎯 Phase 1: レイアウトコンポーネント作成

### Claude Codeへの初回依頼文

```
マーケティング支援代理店向け予算管理システムのレイアウトコンポーネントを作成してください。

## 作成するファイル
- src/components/layout/Layout.tsx
- src/components/layout/Header.tsx  
- src/components/layout/Sidebar.tsx

## 要件
1. Next.js 15 + TypeScript + Tailwind CSS使用
2. 認証状態に応じた表示制御
3. レスポンシブデザイン対応
4. 以下のナビゲーションメニューを含む：
   - ダッシュボード
   - クライアント管理
   - 施策管理
   - 予算管理
   - 実績管理
   - レポート
   - 設定（管理者のみ）

## 参考にするファイル
以下のファイルを参考にして実装してください：

### 仕様書
- .kiro/specs/budget-management-system/claude-code-requirements.md（デザインシステム、コンポーネント設計）
- .kiro/specs/budget-management-system/design.md（アーキテクチャ、UI設計）

### 既存実装
- src/lib/auth.ts（認証システム、権限管理）
- src/types/next-auth.d.ts（認証関連の型定義）
- src/app/layout.tsx（現在のレイアウト設定）

### 設定ファイル
- prisma/schema.prisma（Userモデルの構造）

## 実装のポイント
- UserRole enum（ADMIN, MANAGER, MEMBER）に応じたメニュー表示制御
- hasPermission関数を使用した権限チェック
- モバイル対応のハンバーガーメニュー
- ユーザー情報表示とログアウト機能
```

## 📁 参考ファイルの具体的な説明

### 既存API Routes（該当するAPI Routes）
現在実装済みのAPIエンドポイント：

```
src/app/api/clients/route.ts
- GET /api/clients（クライアント一覧取得、検索・フィルタ対応）
- POST /api/clients（新規クライアント作成）
- バリデーション、エラーハンドリング実装済み

src/app/api/campaigns/route.ts  
- GET /api/campaigns（施策一覧取得、クライアント別フィルタ対応）
- POST /api/campaigns（新規施策作成）
- 日付検証、関連データチェック実装済み

src/app/api/budgets/route.ts
- GET /api/budgets（予算一覧取得、複数フィルタ対応）
- POST /api/budgets（予算設定、重複チェック）
- 集計データ、プラットフォーム別サマリー機能

src/app/api/masters/route.ts
- GET /api/masters（マスタデータ取得）
- POST /api/masters（マスタデータ作成）
- プラットフォーム、運用タイプ、報酬体系の定義
```

### 既存の型定義ファイル
現在存在する型定義：

```
src/types/next-auth.d.ts
- NextAuth Session拡張（id, email, name, role, department）
- NextAuth User拡張（認証用ユーザー情報）
- JWT拡張（role, department）
```

## 🎯 Phase 2: 型定義システム作成

### Claude Codeへの依頼文

```
予算管理システムの型定義システムを作成してください。

## 作成するファイル
- src/types/index.ts（メインの型定義）
- src/types/api.ts（API関連の型）

## 参考にするファイル

### データベーススキーマ
- prisma/schema.prisma（User, Client, Campaign, Budget, Result, Masterモデル）

### 既存API実装
- src/app/api/clients/route.ts（クライアントAPIの実装例）
- src/app/api/campaigns/route.ts（施策APIの実装例）
- src/app/api/budgets/route.ts（予算APIの実装例）
- src/app/api/masters/route.ts（マスタデータAPIの実装例）

### 既存型定義
- src/types/next-auth.d.ts（認証関連の型定義）

### 仕様書
- .kiro/specs/budget-management-system/claude-code-requirements.md（型定義の詳細例）

## 要求する型定義
1. ビジネスエンティティ（Client, Campaign, Budget, Result）
2. Enum型（Platform, OperationType, RevenueType）
3. API レスポンス型（ApiResponse<T>, ApiError）
4. フォーム用型（CreateClient, UpdateClient等）
5. フィルタ・検索用型

既存APIの実装を参考に、実際に使用されているデータ構造に合わせて型定義を作成してください。
```

## 🎯 Phase 3: 認証システム完成

### Claude Codeへの依頼文

```
認証システムを完成させてください。

## 修正・作成するファイル
- src/lib/auth.ts（データベース認証の実装）
- src/app/auth/signin/page.tsx（ログイン画面）
- src/app/api/auth/register/route.ts（ユーザー登録API）

## 参考にするファイル

### 現在の認証実装
- src/lib/auth.ts（現在は開発用簡易認証のみ）
- src/types/next-auth.d.ts（認証関連型定義）

### データベース設定
- prisma/schema.prisma（Userモデル、Account、Session）
- src/lib/prisma.ts（Prismaクライアント設定）

### 仕様書
- .kiro/specs/budget-management-system/design.md（認証システム設計）
- .kiro/specs/budget-management-system/claude-code-requirements.md（認証要件）

## 実装要件
1. bcryptを使用したパスワードハッシュ化
2. データベースからのユーザー認証
3. 権限チェックミドルウェア
4. セッション管理の強化
5. ログイン画面のUI実装

現在の簡易認証（admin@company.com / admin123）を、実際のデータベース認証に置き換えてください。
```

## 🎯 Phase 4: APIクライアント作成

### Claude Codeへの依頼文

```
統一されたAPIクライアントとカスタムフックを作成してください。

## 作成するファイル
- src/lib/api.ts（統一APIクライアント）
- src/hooks/useClients.ts
- src/hooks/useCampaigns.ts  
- src/hooks/useBudgets.ts
- src/hooks/useAuth.ts

## 参考にするファイル

### 既存API実装
- src/app/api/clients/route.ts（クライアントAPI仕様）
- src/app/api/campaigns/route.ts（施策API仕様）
- src/app/api/budgets/route.ts（予算API仕様）
- src/app/api/masters/route.ts（マスタデータAPI仕様）

### 型定義
- src/types/index.ts（ビジネスエンティティ型）
- src/types/api.ts（API関連型）

### 認証設定
- src/lib/auth.ts（認証システム）

## 実装要件
1. 型安全なAPI呼び出し
2. 統一されたエラーハンドリング
3. ローディング状態管理
4. CRUD操作の抽象化
5. React Query / SWR風のキャッシュ機能

既存APIの実装を参考に、実際のエンドポイント仕様に合わせてクライアントを作成してください。
```

## 📝 依頼時の注意点

### 1. 必ず指定すべき参考ファイル
```
毎回必須:
- .kiro/specs/budget-management-system/claude-code-requirements.md
- prisma/schema.prisma

Phase別追加:
- Phase 1: src/lib/auth.ts, src/app/layout.tsx
- Phase 2: src/app/api/*/route.ts（全API）
- Phase 3: src/types/next-auth.d.ts, src/lib/prisma.ts
- Phase 4: src/types/index.ts, 既存API Routes
```

### 2. 具体的なファイル名の伝え方
```
「既存API Routes」= 以下の4つのファイル:
- src/app/api/clients/route.ts
- src/app/api/campaigns/route.ts  
- src/app/api/budgets/route.ts
- src/app/api/masters/route.ts

「既存の型定義ファイル」= 現在は以下のみ:
- src/types/next-auth.d.ts
```

### 3. 成功のポイント
- 仕様書を最初に読ませる
- 既存実装を参考として明示
- 具体的なファイル名を列挙
- 実装要件を明確に記載
- 段階的に進める（Phase順守）

この形式でClaude Codeに依頼することで、一貫性のある高品質な実装が期待できます。