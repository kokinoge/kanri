# マーケ支援代理店向け予算管理システム 構築要件書

## 1. プロジェクト概要

### 1.1 目的
SNSマーケティング支援代理店における月次予算管理の効率化とデータの可視化

### 1.2 対象ユーザー
- 利用者数：50人以下のマーケター
- 同時利用者数：10人程度

### 1.3 基本方針
- シンプルで使いやすいインターフェース
- 月次での予算・実績管理
- リアルタイムでの進捗把握

## 2. 技術要件

### 2.1 技術スタック
- **フロントエンド・バックエンド**: Next.js 15以上（App Router）
- **ORM**: Prisma
- **データベース**: PostgreSQL
- **認証**: NextAuth
- **グラフ表示**: Chart.js
- **デプロイ**: Vercel（推奨）

### 2.2 システム要件
- データ永続保持（全履歴データの保持）
- レスポンシブデザイン対応
- 50人同時アクセス対応

## 3. 機能要件

### 3.1 認証・ユーザー管理機能
- 社員アカウント作成・管理
- ログイン・ログアウト
- 権限管理（Admin/Manager/Member）
- プロフィール管理

### 3.2 クライアント管理機能
- クライアント登録・編集・一覧表示
- 企業名、担当者、優先度管理

### 3.3 予算管理機能
- 月次予算設定・編集・複製
- 階層構造：クライアント → 施策 → 媒体・運用タイプ
- 予算vs実績の進捗管理

### 3.4 実績管理機能
- 月次実績入力・更新
- 支出・成果実績の記録

### 3.5 レポート・分析機能
- ダッシュボード（全体概要）
- 月次レポート
- クライアント別レポート
- 媒体別分析
- グラフ・表形式での表示

### 3.6 検索・フィルタ機能
- 期間による絞り込み
- クライアント別絞り込み
- 媒体別絞り込み

### 3.7 マスタ管理機能
- 媒体設定
- 運用タイプ設定
- 報酬体系設定

## 4. データ構造

### 4.1 階層構造
```
クライアント
└── 施策（キャンペーン）
    ├── 媒体別予算（X, Instagram, YouTube, TikTok, Threads）
    └── 運用タイプ別予算（マイクロIF, メガIF, 広告運用, コンテンツ制作）
```

### 4.2 マスタデータ
- **媒体**: X（Twitter）、Instagram、YouTube、TikTok、Threads
- **運用タイプ**: マイクロインフルエンサー、メガインフルエンサー、広告運用、コンテンツ制作
- **報酬体系**: 成果報酬、投稿固定費、imp保証、広告予算％、月額固定

## 5. データベース設計（Prisma Schema）

```prisma
// ユーザー管理
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String
  role          String    @default("member")
  department    String?
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  @@unique([identifier, token])
}

// ビジネスデータ
model Client {
  id          String @id @default(cuid())
  name        String
  manager     String
  priority    Int
  createdAt   DateTime @default(now())
  campaigns   Campaign[]
}

model Campaign {
  id          String @id @default(cuid())
  clientId    String
  name        String
  purpose     String
  startDate   DateTime
  endDate     DateTime
  totalBudget Decimal
  client      Client @relation(fields: [clientId], references: [id])
  budgets     Budget[]
  results     Result[]
}

model Budget {
  id           String @id @default(cuid())
  campaignId   String
  year         Int
  month        Int
  platform     String
  operationType String
  revenueType  String
  budgetAmount Decimal
  targetKpi    String
  targetValue  Decimal
  campaign     Campaign @relation(fields: [campaignId], references: [id])
}

model Result {
  id           String @id @default(cuid())
  campaignId   String
  year         Int
  month        Int
  platform     String
  operationType String
  actualSpend  Decimal
  actualResult Decimal
  campaign     Campaign @relation(fields: [campaignId], references: [id])
}

model Master {
  id       String @id @default(cuid())
  category String
  value    String
  order    Int
}
```

## 6. API設計

### 6.1 認証API
```
POST   /api/auth/register         // 新規ユーザー登録
POST   /api/auth/signin           // ログイン
POST   /api/auth/signout          // ログアウト
```

### 6.2 ユーザー管理API
```
GET    /api/users                 // ユーザー一覧（管理者のみ）
POST   /api/users                 // ユーザー作成（管理者のみ）
PUT    /api/users/[id]            // ユーザー情報更新
PUT    /api/users/[id]/password   // パスワード変更
PUT    /api/users/[id]/status     // アカウント有効/無効切り替え
DELETE /api/users/[id]            // ユーザー削除（管理者のみ）
GET    /api/profile               // 自分のプロフィール取得
PUT    /api/profile               // 自分のプロフィール更新
```

### 6.3 ビジネスデータAPI
```
// クライアント管理
GET    /api/clients              // クライアント一覧
POST   /api/clients              // クライアント作成
PUT    /api/clients/[id]         // クライアント更新
DELETE /api/clients/[id]         // クライアント削除

// 施策管理
GET    /api/campaigns            // 施策一覧（フィルタ対応）
POST   /api/campaigns            // 施策作成
PUT    /api/campaigns/[id]       // 施策更新
DELETE /api/campaigns/[id]       // 施策削除

// 予算管理
GET    /api/budgets              // 予算一覧（フィルタ対応）
POST   /api/budgets              // 予算設定
PUT    /api/budgets/[id]         // 予算更新
DELETE /api/budgets/[id]         // 予算削除

// 実績管理
GET    /api/results              // 実績一覧（フィルタ対応）
POST   /api/results              // 実績入力
PUT    /api/results/[id]         // 実績更新

// レポート
GET    /api/reports/dashboard    // ダッシュボード用データ
GET    /api/reports/monthly      // 月次レポートデータ
GET    /api/reports/client/[id]  // クライアント別レポート
GET    /api/reports/platform     // 媒体別分析データ

// マスタ管理
GET    /api/masters              // マスタデータ一覧
POST   /api/masters              // マスタデータ作成
PUT    /api/masters/[id]         // マスタデータ更新
```

## 7. 画面設計

### 7.1 ページ構成
```
/app
├── page.tsx                    // ダッシュボード
├── auth/
│   ├── signin/page.tsx          // ログインページ
│   ├── register/page.tsx        // 新規登録ページ（管理者のみ）
│   └── forgot-password/page.tsx // パスワードリセット
├── clients/
│   ├── page.tsx               // クライアント一覧
│   ├── [id]/page.tsx          // クライアント詳細
│   └── new/page.tsx           // 新規クライアント登録
├── campaigns/
│   ├── page.tsx               // 施策一覧
│   ├── [id]/page.tsx          // 施策詳細
│   └── new/page.tsx           // 新規施策作成
├── budgets/
│   ├── page.tsx               // 予算管理
│   └── [id]/edit/page.tsx     // 予算編集
├── results/
│   ├── page.tsx               // 実績管理
│   └── input/page.tsx         // 実績入力
├── reports/
│   ├── page.tsx               // レポート一覧
│   ├── monthly/page.tsx       // 月次レポート
│   └── platform/page.tsx     // 媒体別分析
├── users/
│   ├── page.tsx                 // ユーザー管理（管理者のみ）
│   ├── [id]/page.tsx           // ユーザー詳細
│   └── new/page.tsx            // 新規ユーザー作成
├── profile/
│   └── page.tsx                 // プロフィール設定
└── settings/
    └── masters/page.tsx       // マスタ管理
```

### 7.2 コンポーネント設計
```
/components
├── Layout/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Layout.tsx
│   ├── AuthGuard.tsx           // 認証ガード
│   └── UserMenu.tsx            // ユーザーメニュー
├── UI/
│   ├── DataTable.tsx          // 検索・フィルタ機能付きテーブル
│   ├── Chart.tsx              // Chart.js ラッパー
│   ├── Modal.tsx
│   └── FormElements.tsx
├── Auth/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   ├── PasswordChangeForm.tsx
│   └── ProfileForm.tsx
├── Users/
│   ├── UserList.tsx
│   ├── UserForm.tsx
│   └── UserStatusToggle.tsx
├── Forms/
│   ├── ClientForm.tsx
│   ├── CampaignForm.tsx
│   ├── BudgetForm.tsx
│   └── ResultForm.tsx
└── Reports/
    ├── DashboardCards.tsx
    ├── BudgetVsResultChart.tsx
    └── PlatformAnalysisChart.tsx
```

## 8. サイトマップ

```
トップ（ダッシュボード）
├── 認証
│   ├── ログイン
│   └── 新規登録（管理者のみ）
├── クライアント管理
│   ├── クライアント一覧
│   ├── クライアント詳細
│   │   ├── 基本情報
│   │   ├── 月次予算管理
│   │   ├── 実績管理
│   │   └── 施策管理
│   └── 新規クライアント登録
├── 予算管理
│   ├── 全体予算概要
│   ├── 月次予算設定
│   └── 予算vs実績分析
├── 実績管理
│   ├── 実績入力
│   └── 成果分析
├── レポート
│   ├── 月次レポート
│   ├── クライアント別レポート
│   └── 媒体別分析
├── ユーザー管理（管理者のみ）
│   ├── ユーザー一覧
│   ├── ユーザー詳細
│   └── 新規ユーザー作成
├── プロフィール
│   ├── プロフィール設定
│   └── パスワード変更
└── 設定
    └── マスタ管理
        ├── 媒体設定
        ├── 運用タイプ設定
        └── 報酬体系設定
```

## 9. 権限管理

### 9.1 ユーザーロール
- **Admin**: 全権限（ユーザー管理、全データアクセス）
- **Manager**: データ編集権限（ユーザー管理除く）
- **Member**: データ閲覧のみ

### 9.2 権限設計
```typescript
export enum UserRole {
  ADMIN = "admin",     // 全権限
  MANAGER = "manager", // データ編集可能
  MEMBER = "member"    // データ閲覧のみ
}

export function hasPermission(userRole: string, action: string) {
  const permissions = {
    [UserRole.ADMIN]: ["read", "write", "delete", "manage_users"],
    [UserRole.MANAGER]: ["read", "write"],
    [UserRole.MEMBER]: ["read"]
  }
  
  return permissions[userRole]?.includes(action) || false
}
```

## 10. 開発手順

### 10.1 フェーズ1: 基盤構築
1. Next.js 15プロジェクト作成
2. Prisma + PostgreSQL設定
3. NextAuth設定
4. 基本レイアウト・認証フロー実装

### 10.2 フェーズ2: ユーザー管理
1. ユーザー登録・ログイン機能
2. 権限管理システム
3. プロフィール管理

### 10.3 フェーズ3: コアビジネス機能
1. クライアント管理機能
2. 施策管理機能
3. 予算設定機能
4. 実績入力機能

### 10.4 フェーズ4: レポート・分析
1. ダッシュボード
2. 各種レポート画面
3. Chart.js統合
4. 検索・フィルタ機能

### 10.5 フェーズ5: 最終調整
1. UI/UX調整
2. パフォーマンス最適化
3. テスト・デバッグ
4. デプロイ・本番環境設定

## 11. 初期設定

### 11.1 管理者アカウント作成
```typescript
const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 12)
  
  await prisma.user.create({
    data: {
      email: "admin@company.com",
      name: "システム管理者",
      password: hashedPassword,
      role: "admin",
      department: "システム部",
    }
  })
}
```

### 11.2 マスタデータ投入
- 媒体マスタ
- 運用タイプマスタ
- 報酬体系マスタ

## 12. 運用・保守

### 12.1 データバックアップ
- PostgreSQLの標準バックアップ機能を使用
- 定期的な自動バックアップ設定

### 12.2 監視・ログ
- 基本的なエラーログ記録
- ユーザーアクセスログ

### 12.3 セキュリティ
- パスワードハッシュ化（bcrypt）
- JWTトークンによるセッション管理
- HTTPS通信の強制

## 13. 今後の拡張可能性

- Excel/CSVインポート・エクスポート機能
- 外部API連携（SNS成果データ自動取得）
- より詳細な権限管理
- 通知機能（Slack、メール連携）
- モバイルアプリ対応

---

**作成日**: 2025年7月12日  
**バージョン**: 1.0  
**作成者**: システム開発チーム