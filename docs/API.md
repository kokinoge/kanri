# API仕様書

予算管理システムのAPI仕様を説明します。

## 📋 基本情報

- **ベースURL**: `http://localhost:3000/api`
- **認証方式**: NextAuth.js セッションベース認証
- **レスポンス形式**: JSON
- **HTTPメソッド**: GET, POST, PUT, DELETE

## 🔐 認証

すべてのAPIエンドポイントは認証が必要です。セッション情報が無効な場合、401エラーが返されます。

### 権限レベル
- **admin**: 全てのAPIへのアクセス
- **manager**: ユーザー管理以外のAPIへのアクセス
- **member**: 参照・作成APIへのアクセス（削除は制限あり）

## 📚 エンドポイント一覧

### 🏠 ダッシュボード

#### GET /api/dashboard/stats
ダッシュボード用の統計データを取得

**権限**: member以上

**クエリパラメータ**:
- `year` (optional): 年でフィルタ
- `month` (optional): 月でフィルタ

**レスポンス**:
```json
{
  "overview": {
    "totalClients": 10,
    "totalCampaigns": 25,
    "activeCampaigns": 15,
    "totalBudget": 10000000,
    "totalSpend": 8500000,
    "totalResults": 12000000,
    "efficiency": 1.41
  },
  "platformBreakdown": {
    "budget": [
      { "platform": "YouTube", "amount": 5000000 },
      { "platform": "Instagram", "amount": 3000000 }
    ],
    "results": [
      { "platform": "YouTube", "spend": 4500000, "result": 6000000 },
      { "platform": "Instagram", "spend": 2800000, "result": 4000000 }
    ]
  },
  "monthlyTrends": [
    {
      "year": 2024,
      "month": 11,
      "budget": 1000000,
      "spend": 950000,
      "result": 1200000
    }
  ],
  "clientPerformance": [
    {
      "id": "client-1",
      "name": "株式会社サンプル",
      "totalBudget": 2000000,
      "totalSpend": 1800000,
      "totalResult": 2500000,
      "efficiency": 1.39
    }
  ]
}
```

### 👥 クライアント管理

#### GET /api/clients
クライアント一覧を取得

**権限**: member以上

**レスポンス**:
```json
[
  {
    "id": "client-1",
    "name": "株式会社サンプル",
    "manager": "田中太郎",
    "priority": 5,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST /api/clients
新しいクライアントを作成

**権限**: manager以上

**リクエストボディ**:
```json
{
  "name": "株式会社新規",
  "manager": "佐藤花子",
  "priority": 3
}
```

#### GET /api/clients/[id]
特定のクライアント詳細を取得

**権限**: member以上

#### PUT /api/clients/[id]
クライアント情報を更新

**権限**: manager以上

#### DELETE /api/clients/[id]
クライアントを削除

**権限**: manager以上

### 📅 案件管理

#### GET /api/campaigns
案件一覧を取得

**権限**: member以上

**レスポンス**:
```json
[
  {
    "id": "campaign-1",
    "name": "2024年新商品プロモーション",
    "clientId": "client-1",
    "startDate": "2024-01-01T00:00:00.000Z",
    "endDate": "2024-03-31T23:59:59.999Z",
    "totalBudget": 5000000,
    "client": {
      "id": "client-1",
      "name": "株式会社サンプル"
    }
  }
]
```

#### POST /api/campaigns
新しい案件を作成

**権限**: manager以上

**リクエストボディ**:
```json
{
  "name": "新案件",
  "clientId": "client-1",
  "startDate": "2024-04-01",
  "endDate": "2024-06-30",
  "totalBudget": 3000000
}
```

### 💰 予算管理

#### GET /api/budgets
予算一覧を取得

**権限**: member以上

**レスポンス**:
```json
[
  {
    "id": "budget-1",
    "campaignId": "campaign-1",
    "year": 2024,
    "month": 1,
    "platform": "YouTube",
    "operationType": "インフルエンサー",
    "revenueType": "認知",
    "amount": 1000000,
    "targetKpi": "CVR",
    "targetValue": 3.5,
    "campaign": {
      "id": "campaign-1",
      "name": "2024年新商品プロモーション",
      "client": {
        "id": "client-1",
        "name": "株式会社サンプル"
      }
    }
  }
]
```

#### POST /api/budgets
新しい予算を作成

**権限**: member以上

**リクエストボディ**:
```json
{
  "campaignId": "campaign-1",
  "yearMonth": "2024-01",
  "platform": "YouTube",
  "operationType": "インフルエンサー",
  "revenueType": "認知",
  "amount": "1000000",
  "targetKpi": "CVR",
  "targetValue": "3.5"
}
```

#### PUT /api/budgets/[id]
予算を更新

**権限**: member以上

#### DELETE /api/budgets/[id]
予算を削除

**権限**: manager以上

### 📈 実績管理

#### GET /api/results
実績一覧を取得

**権限**: member以上

**レスポンス**:
```json
[
  {
    "id": "result-1",
    "campaignId": "campaign-1",
    "year": 2024,
    "month": 1,
    "platform": "YouTube",
    "operationType": "インフルエンサー",
    "actualSpend": 950000,
    "actualResult": 1200000,
    "campaign": {
      "id": "campaign-1",
      "name": "2024年新商品プロモーション",
      "client": {
        "id": "client-1",
        "name": "株式会社サンプル"
      }
    }
  }
]
```

#### POST /api/results
新しい実績を作成

**権限**: member以上

**リクエストボディ**:
```json
{
  "campaignId": "campaign-1",
  "yearMonth": "2024-01",
  "platform": "YouTube",
  "operationType": "インフルエンサー",
  "actualSpend": "950000",
  "actualResult": "1200000"
}
```

### 👤 ユーザー管理

#### GET /api/users
ユーザー一覧を取得

**権限**: admin

**レスポンス**:
```json
[
  {
    "id": "user-1",
    "name": "管理者",
    "email": "admin@example.com",
    "role": "admin",
    "isActive": true,
    "department": "マーケティング部",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### PUT /api/users/[id]
ユーザー情報を更新

**権限**: admin（role変更時）、本人（プロフィール更新時）

**リクエストボディ**:
```json
{
  "name": "更新後の名前",
  "role": "manager",
  "isActive": false,
  "department": "営業部"
}
```

#### DELETE /api/users/[id]
ユーザーを削除

**権限**: admin

### 🏷️ マスターデータ

#### GET /api/masters
マスターデータを取得

**権限**: member以上

**クエリパラメータ**:
- `category`: カテゴリでフィルタ（platform, operation_type, revenue_type）

**レスポンス**:
```json
[
  {
    "id": "master-1",
    "category": "platform",
    "value": "YouTube"
  },
  {
    "id": "master-2",
    "category": "platform",
    "value": "Instagram"
  }
]
```

## 🔍 エラーレスポンス

### 認証エラー (401)
```json
{
  "error": "Unauthorized",
  "message": "認証が必要です"
}
```

### 権限不足エラー (403)
```json
{
  "error": "Forbidden",
  "message": "この操作を実行する権限がありません"
}
```

### 入力エラー (400)
```json
{
  "error": "Bad Request",
  "message": "必須フィールドが不足しています",
  "details": {
    "name": "名前は必須です",
    "amount": "金額は数値である必要があります"
  }
}
```

### リソース未発見エラー (404)
```json
{
  "error": "Not Found",
  "message": "指定されたリソースが見つかりません"
}
```

### サーバーエラー (500)
```json
{
  "error": "Internal Server Error",
  "message": "サーバー内部エラーが発生しました"
}
```

## 📝 使用例

### JavaScriptでのAPI呼び出し例

```javascript
// 認証付きでクライアント一覧を取得
const fetchClients = async () => {
  try {
    const response = await fetch('/api/clients', {
      method: 'GET',
      credentials: 'include', // セッションCookieを含める
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const clients = await response.json();
    return clients;
  } catch (error) {
    console.error('クライアント取得エラー:', error);
    throw error;
  }
};

// 新しい予算を作成
const createBudget = async (budgetData) => {
  try {
    const response = await fetch('/api/budgets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(budgetData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'エラーが発生しました');
    }
    
    const newBudget = await response.json();
    return newBudget;
  } catch (error) {
    console.error('予算作成エラー:', error);
    throw error;
  }
};
```

## 🎯 パフォーマンス最適化

### レスポンス時間の目標
- 単一レコード取得: < 100ms
- 一覧取得: < 500ms
- 作成・更新: < 300ms
- 統計データ: < 1000ms

### キャッシュ戦略
- SWRによるクライアントサイドキャッシュ
- Prismaのクエリ最適化
- データベースインデックスの活用

---

**Version**: 1.0.0  
**Last Updated**: 2024年12月 