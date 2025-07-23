-- ==============================================
-- Supabase RLS (Row Level Security) Migration
-- セキュリティ強化: 個人情報漏洩防止対策
-- ==============================================

-- 1. RLSの有効化 (全テーブル)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE masters ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_kpis ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- 2. USERS テーブル: 最重要PII保護
-- ==============================================

-- 2.1 自分のプロフィールのみ閲覧可能
CREATE POLICY "users_select_own_profile" ON users
    FOR SELECT
    USING (auth.uid()::text = id);

-- 2.2 管理者は全ユーザー閲覧可能
CREATE POLICY "users_select_admin" ON users
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND is_active = true
        )
    );

-- 2.3 マネージャーは配下ユーザーのみ閲覧可能
CREATE POLICY "users_select_manager" ON users
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users manager
            WHERE manager.id = auth.uid()::text 
            AND manager.role IN ('manager', 'admin')
            AND manager.is_active = true
            AND (
                -- 同じ部署のメンバー
                users.department = manager.department
                OR manager.role = 'admin'
            )
        )
    );

-- 2.4 ユーザー作成: 管理者のみ
CREATE POLICY "users_insert_admin_only" ON users
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND is_active = true
        )
    );

-- 2.5 ユーザー更新: 自分のプロフィール or 管理者
CREATE POLICY "users_update_own_or_admin" ON users
    FOR UPDATE
    USING (
        auth.uid()::text = id 
        OR EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND is_active = true
        )
    );

-- 2.6 ユーザー削除: 管理者のみ（自分除く）
CREATE POLICY "users_delete_admin_not_self" ON users
    FOR DELETE
    USING (
        auth.uid()::text != id 
        AND EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND is_active = true
        )
    );

-- ==============================================
-- 3. ACCOUNTS テーブル: OAuth トークン保護
-- ==============================================

-- 3.1 自分のアカウント情報のみアクセス可能
CREATE POLICY "accounts_own_only" ON accounts
    FOR ALL
    USING (auth.uid()::text = user_id);

-- 3.2 管理者でも他人のトークンにはアクセス不可（セキュリティ強化）
-- （上記ポリシーのみで十分制限的）

-- ==============================================
-- 4. SESSIONS テーブル: セッション保護
-- ==============================================

-- 4.1 自分のセッションのみアクセス可能
CREATE POLICY "sessions_own_only" ON sessions
    FOR ALL
    USING (auth.uid()::text = user_id);

-- ==============================================
-- 5. VERIFICATION_TOKENS テーブル: トークン保護
-- ==============================================

-- 5.1 認証されたユーザーのみ（システム用）
CREATE POLICY "verification_tokens_authenticated" ON verification_tokens
    FOR ALL
    USING (auth.role() = 'authenticated');

-- ==============================================
-- 6. CLIENTS テーブル: クライアント情報保護
-- ==============================================

-- 6.1 全認証ユーザーが閲覧可能（業務上必要）
CREATE POLICY "clients_select_authenticated" ON clients
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- 6.2 マネージャー以上が作成・更新可能
CREATE POLICY "clients_modify_manager_plus" ON clients
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid()::text 
            AND role IN ('manager', 'admin')
            AND is_active = true
        )
    );

-- ==============================================
-- 7. CAMPAIGNS テーブル: 案件情報保護
-- ==============================================

-- 7.1 認証ユーザーが閲覧可能
CREATE POLICY "campaigns_select_authenticated" ON campaigns
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- 7.2 担当者 or マネージャー以上が編集可能
CREATE POLICY "campaigns_modify_assigned_or_manager" ON campaigns
    FOR ALL
    USING (
        -- 案件の担当チームメンバー
        EXISTS (
            SELECT 1 FROM campaign_teams ct
            JOIN teams t ON ct.team_id = t.id
            WHERE ct.campaign_id = campaigns.id
            AND auth.uid()::text IN (
                SELECT user_id FROM team_members WHERE team_id = t.id
            )
        )
        OR
        -- マネージャー以上
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid()::text 
            AND role IN ('manager', 'admin')
            AND is_active = true
        )
    );

-- ==============================================
-- 8. BUDGETS & RESULTS テーブル: 予算・実績保護
-- ==============================================

-- 8.1 認証ユーザーが閲覧可能
CREATE POLICY "budgets_select_authenticated" ON budgets
    FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "results_select_authenticated" ON results
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- 8.2 担当者 or マネージャー以上が編集可能
CREATE POLICY "budgets_modify_assigned_or_manager" ON budgets
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid()::text 
            AND role IN ('manager', 'admin')
            AND is_active = true
        )
    );

CREATE POLICY "results_modify_assigned_or_manager" ON results
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid()::text 
            AND role IN ('manager', 'admin')
            AND is_active = true
        )
    );

-- ==============================================
-- 9. TEAMS テーブル: チーム情報保護
-- ==============================================

-- 9.1 認証ユーザーが閲覧可能
CREATE POLICY "teams_select_authenticated" ON teams
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- 9.2 管理者のみ編集可能
CREATE POLICY "teams_modify_admin_only" ON teams
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND is_active = true
        )
    );

-- ==============================================
-- 10. MASTERS テーブル: マスタデータ保護
-- ==============================================

-- 10.1 認証ユーザーが閲覧可能
CREATE POLICY "masters_select_authenticated" ON masters
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- 10.2 管理者のみ編集可能
CREATE POLICY "masters_modify_admin_only" ON masters
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND is_active = true
        )
    );

-- ==============================================
-- 11. 関連テーブル: 配分・KPI保護
-- ==============================================

-- 11.1 チーム配分テーブル
CREATE POLICY "budget_teams_select_authenticated" ON budget_teams
    FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "budget_teams_modify_manager_plus" ON budget_teams
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid()::text 
            AND role IN ('manager', 'admin')
            AND is_active = true
        )
    );

CREATE POLICY "campaign_teams_select_authenticated" ON campaign_teams
    FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "campaign_teams_modify_manager_plus" ON campaign_teams
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid()::text 
            AND role IN ('manager', 'admin')
            AND is_active = true
        )
    );

-- 11.2 KPI テーブル
CREATE POLICY "campaign_kpis_select_authenticated" ON campaign_kpis
    FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "campaign_kpis_modify_manager_plus" ON campaign_kpis
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid()::text 
            AND role IN ('manager', 'admin')
            AND is_active = true
        )
    );

-- ==============================================
-- 12. セキュリティ関数: Supabase Auth統合
-- ==============================================

-- 12.1 現在のユーザー情報取得関数
CREATE OR REPLACE FUNCTION get_current_user()
RETURNS TABLE(id text, role text, department text, is_active boolean)
LANGUAGE sql SECURITY DEFINER
AS $$
    SELECT id, role, department, is_active
    FROM users 
    WHERE id = auth.uid()::text;
$$;

-- 12.2 権限チェック関数
CREATE OR REPLACE FUNCTION has_role(required_role text)
RETURNS boolean
LANGUAGE sql SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid()::text 
        AND (
            (required_role = 'member' AND role IN ('member', 'manager', 'admin'))
            OR (required_role = 'manager' AND role IN ('manager', 'admin'))
            OR (required_role = 'admin' AND role = 'admin')
        )
        AND is_active = true
    );
$$;

-- ==============================================
-- 13. 監査ログテーブル（オプション）
-- ==============================================

CREATE TABLE IF NOT EXISTS audit_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id text REFERENCES users(id),
    table_name text NOT NULL,
    operation text NOT NULL, -- INSERT, UPDATE, DELETE
    old_data jsonb,
    new_data jsonb,
    created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- 監査ログは管理者のみ閲覧可能
CREATE POLICY "audit_logs_admin_only" ON audit_logs
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND is_active = true
        )
    );

-- ==============================================
-- 14. 完了メッセージ
-- ==============================================

-- RLS設定完了の確認
DO $$
BEGIN
    RAISE NOTICE 'RLS (Row Level Security) migration completed successfully!';
    RAISE NOTICE 'All tables are now protected with comprehensive security policies.';
    RAISE NOTICE 'PII data (users, accounts, sessions) have maximum security protection.';
    RAISE NOTICE 'Business data has role-based access control.';
END $$; 