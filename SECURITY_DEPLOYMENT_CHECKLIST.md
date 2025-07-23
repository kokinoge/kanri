# 🛡️ セキュリティデプロイメントチェックリスト

## 🚨 **重要: 本番デプロイ前に必ず確認**

### **Phase 1: 基本セキュリティ設定 ✅**

#### **✅ データベースセキュリティ**
- [ ] **RLS有効化**: 全テーブルでRow Level Securityが有効
- [ ] **ポリシー設定**: 各テーブルに適切なアクセスポリシーが設定済み
- [ ] **PII保護**: Users/Accounts/Sessionsテーブルが完全保護
- [ ] **権限分離**: anon/authenticated/service_roleの適切な権限設定

#### **✅ 認証・認可システム**
- [ ] **NextAuth設定**: セキュアなセッション管理とJWT設定
- [ ] **パスワードポリシー**: 8文字以上、ハッシュ化（bcrypt）
- [ ] **セッション有効期限**: 24時間の適切な設定
- [ ] **役割ベースアクセス制御**: admin/manager/memberの階層制御

#### **✅ API セキュリティ**
- [ ] **認証ミドルウェア**: 全APIエンドポイントで認証チェック
- [ ] **権限チェック**: ロールベースのアクセス制御実装
- [ ] **レート制限**: 異常なアクセスの防止
- [ ] **監査ログ**: 全API操作の記録

---

### **Phase 2: 環境変数とシークレット管理 🔐**

#### **✅ 本番環境変数**
```bash
# ✅ 必須環境変数の確認
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co           # ✅ 設定済み
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...                       # ✅ 制限付きキー
SUPABASE_SERVICE_ROLE_KEY=eyJ...                           # ✅ サーバーのみ
DATABASE_URL=postgresql://postgres.xxx:pass@aws...        # ✅ 暗号化接続
NEXTAUTH_SECRET=32-char-random-string                      # ✅ 強力な秘密鍵
NEXTAUTH_URL=https://your-production-domain.com            # ✅ HTTPS強制
```

#### **✅ セキュリティ検証**
- [ ] **秘密鍵の強度**: 32文字以上のランダム文字列
- [ ] **HTTPS強制**: 全ての接続がHTTPS
- [ ] **環境分離**: 開発・本番環境の完全分離
- [ ] **秘密情報の非公開**: GitHubに秘密情報が含まれていない

---

### **Phase 3: Supabase セキュリティ設定 🔒**

#### **✅ プロジェクト設定**
- [ ] **anon key制限**: 読み取り専用権限のみ
- [ ] **CORS設定**: 本番ドメインのみ許可
- [ ] **SSL証明書**: 有効なHTTPS証明書
- [ ] **バックアップ設定**: 自動バックアップ有効

#### **✅ データベース設定**
```sql
-- ✅ 以下のクエリで確認
-- RLS状態の確認
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- ポリシー確認  
SELECT tablename, policyname, cmd, qual
FROM pg_policies 
WHERE schemaname = 'public';

-- anon権限確認
SELECT * FROM information_schema.role_table_grants 
WHERE grantee = 'anon';
```

---

### **Phase 4: ペネトレーションテスト実行 🔍**

#### **✅ 自動セキュリティテスト**
```bash
# セキュリティテスト実行
npx tsx security-penetration-test.ts

# 期待される結果:
# ✅ Anon Key User Access: BLOCKED
# ✅ Mass Data Extraction: BLOCKED  
# ✅ PII Field Access: BLOCKED
# ✅ Privilege Escalation: BLOCKED
# ✅ Session Manipulation: BLOCKED
# ✅ SQL Injection: BLOCKED
```

#### **✅ 手動侵入テスト**
```bash
# 1. anon keyでのユーザー情報アクセス試行
curl -H "Authorization: Bearer $ANON_KEY" \
     -H "apikey: $ANON_KEY" \
     "$SUPABASE_URL/rest/v1/users?select=*"
# 期待: 403 Forbidden または空の結果

# 2. 大量データ取得試行
curl -H "Authorization: Bearer $ANON_KEY" \
     -H "apikey: $ANON_KEY" \
     "$SUPABASE_URL/rest/v1/users?limit=1000"
# 期待: 403 Forbidden または空の結果

# 3. 書き込み権限試行
curl -X POST \
     -H "Authorization: Bearer $ANON_KEY" \
     -H "apikey: $ANON_KEY" \
     -H "Content-Type: application/json" \
     -d '{"email":"hacker@evil.com","role":"admin"}' \
     "$SUPABASE_URL/rest/v1/users"
# 期待: 403 Forbidden
```

---

### **Phase 5: 本番デプロイ実行 🚀**

#### **✅ Vercel + Supabase デプロイ**

**1. Supabaseプロジェクト作成**
```bash
# Supabase CLI でプロジェクト作成
supabase login
supabase projects create kanri-budget-mgmt --region ap-northeast-1

# RLS マイグレーション実行
psql -h db.xxx.supabase.co -U postgres -d postgres -f supabase-migration.sql
```

**2. Vercelデプロイ**
```bash
# Vercel CLI でデプロイ
npm install -g vercel
vercel login
vercel

# 環境変数設定
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY  
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL

# 本番デプロイ
vercel --prod
```

#### **✅ 本番環境テスト**
- [ ] **認証フロー**: ログイン・ログアウトが正常動作
- [ ] **権限制御**: ロールごとのアクセス制限が機能
- [ ] **データ操作**: CRUD操作が適切に制限
- [ ] **エラーハンドリング**: セキュリティエラーが適切に処理

---

### **Phase 6: 本番監視設定 📊**

#### **✅ Supabase ダッシュボード監視**
- [ ] **Auth ログ**: 異常なログイン試行の監視
- [ ] **API 使用量**: 異常なアクセス数の検出
- [ ] **エラーログ**: 権限エラーの頻発監視
- [ ] **データベース使用量**: リソース使用量の監視

#### **✅ カスタム監視（オプション）**
```sql
-- 異常アクセス検出クエリ
CREATE OR REPLACE VIEW security_alerts AS
SELECT 
  DATE_TRUNC('hour', created_at) as hour,
  user_id,
  COUNT(*) as request_count,
  operation,
  result
FROM audit_logs 
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY hour, user_id, operation, result
HAVING COUNT(*) > 50  -- 1時間に50回以上のアクセス
ORDER BY request_count DESC;
```

---

### **Phase 7: 緊急対応準備 🆘**

#### **✅ インシデント対応計画**
- [ ] **セキュリティ侵害検出時の対応手順**
- [ ] **緊急時のサービス停止手順**
- [ ] **ログ保全とフォレンジック手順**
- [ ] **ユーザー通知と法的対応手順**

#### **✅ バックアップ・復旧計画**
- [ ] **自動バックアップ**: 日次データベースバックアップ
- [ ] **ポイントインタイム復旧**: Supabaseの自動復旧機能
- [ ] **災害復旧計画**: 完全なサービス復旧手順
- [ ] **復旧テスト**: 定期的な復旧テストの実施

---

## 🎯 **最終チェックリスト**

デプロイ前に以下を必ず確認してください：

### **🚨 Critical (必須)**
- [ ] RLS が全テーブルで有効
- [ ] anon key が読み取り専用に制限
- [ ] 本番用の強力なNEXTAUTH_SECRET設定
- [ ] HTTPS強制設定
- [ ] ペネトレーションテスト完全合格

### **⚠️ High (強く推奨)**
- [ ] API認証ミドルウェア実装
- [ ] レート制限設定
- [ ] 監査ログ記録
- [ ] エラーハンドリング強化
- [ ] セッション有効期限設定

### **📊 Medium (推奨)**
- [ ] 監視・アラート設定
- [ ] バックアップ設定
- [ ] インシデント対応計画
- [ ] 定期セキュリティ監査計画

---

## ✅ **セキュリティ承認**

全ての項目をチェックしたら、以下に記録してください：

**セキュリティ監査実施者**: ________________  
**実施日時**: ________________  
**承認者**: ________________  
**デプロイ承認日時**: ________________  

**🛡️ セキュリティが確保されました。デプロイを実行してください。** 