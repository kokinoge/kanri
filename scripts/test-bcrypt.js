const bcrypt = require('bcryptjs');

// Supabaseに保存されているハッシュ
const storedHash = '$2b$10$18620P.rJqkfxJxq4i.zHO1NDhqixz89rKGH89vnB2pa5ZiS1MB.a';
const testPassword = 'admin123';

console.log('=== bcrypt/bcryptjs 互換性テスト ===\n');
console.log('保存されたハッシュ:', storedHash);
console.log('テストパスワード:', testPassword);
console.log('\n--- テスト結果 ---');

// bcryptjsでパスワードを検証
bcrypt.compare(testPassword, storedHash, (err, result) => {
  if (err) {
    console.error('エラー:', err);
  } else {
    console.log('bcryptjs.compare結果:', result);
  }
});

// 新しいハッシュを生成して比較
bcrypt.hash(testPassword, 10, (err, newHash) => {
  if (err) {
    console.error('ハッシュ生成エラー:', err);
  } else {
    console.log('\n新しく生成したハッシュ:', newHash);
    console.log('ハッシュプレフィックス (stored):', storedHash.substring(0, 4));
    console.log('ハッシュプレフィックス (new):', newHash.substring(0, 4));
  }
});