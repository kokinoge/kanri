const fs = require('fs');
const path = require('path');

// マイグレーションSQLを読み込む
const migrationSQL = fs.readFileSync(
  path.join(__dirname, '../prisma/migrations/20250805013244_init/migration.sql'),
  'utf8'
);

// パブリックスキーマを削除して再作成するSQL
const resetSQL = `
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
`;

// 全体のSQL
const fullSQL = resetSQL + '\n' + migrationSQL;

console.log('=== Supabase セットアップ手順 ===\n');
console.log('1. Supabaseダッシュボードを開く');
console.log('2. 左メニューから「SQL Editor」をクリック');
console.log('3. 「New query」ボタンをクリック');
console.log('4. 以下のSQLをコピーして貼り付け：\n');
console.log('--- SQLここから ---');
console.log(fullSQL);
console.log('--- SQLここまで ---\n');
console.log('5. 「Run」ボタンをクリックして実行');
console.log('6. 成功したら https://kanri-six.vercel.app にアクセスして確認');