// ミドルウェアの動作をローカルでテスト
console.log('=== ミドルウェア設定テスト ===\n');

const publicPaths = [
  '/auth/signin',
  '/api/auth',
  '/api/public',
  '/public-debug',
  '/debug',
];

const testPaths = [
  '/public-debug',
  '/debug',
  '/debug.html',
  '/api/public/debug',
  '/api/test',
  '/env-test',
  '/',
  '/dashboard',
];

console.log('公開パス設定:');
publicPaths.forEach(path => console.log(`  - ${path}`));
console.log('\nテスト結果:');

testPaths.forEach(testPath => {
  const isPublic = publicPaths.some(path => testPath.startsWith(path));
  console.log(`${testPath} => ${isPublic ? '✅ 公開（認証不要）' : '🔒 要認証'}`);
});

console.log('\n=== 環境変数チェック ===');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL || 'NOT SET');
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');