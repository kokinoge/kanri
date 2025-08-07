-- 管理者ユーザーを作成
-- パスワード: admin123 (bcryptハッシュ済み)
INSERT INTO "public"."User" (
  "id",
  "name",
  "email",
  "password",
  "role",
  "department",
  "isActive",
  "createdAt",
  "updatedAt"
) VALUES (
  'admin-user-001',
  '管理者',
  'admin@example.com',
  '$2b$10$18620P.rJqkfxJxq4i.zHO1NDhqixz89rKGH89vnB2pa5ZiS1MB.a',
  'admin',
  'システム管理部',
  true,
  NOW(),
  NOW()
);