-- ユーザーが存在するか確認
SELECT id, email, name, role, "isActive" FROM "public"."User" WHERE email = 'admin@example.com';

-- すべてのユーザーを確認
SELECT id, email, name, role, "isActive" FROM "public"."User";