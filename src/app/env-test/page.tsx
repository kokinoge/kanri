export default function EnvTestPage() {
  // サーバーサイドで環境変数を確認
  const envInfo = {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET',
    DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT SET',
    VERCEL: process.env.VERCEL || 'NOT SET',
    VERCEL_ENV: process.env.VERCEL_ENV || 'NOT SET',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">環境変数テスト（サーバーサイド）</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">環境変数の状態</h2>
          <div className="space-y-2">
            {Object.entries(envInfo).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b">
                <span className="font-mono text-sm">{key}:</span>
                <span className={`font-mono text-sm ${value === 'NOT SET' ? 'text-red-600' : 'text-green-600'}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">次のステップ:</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>上記で「NOT SET」となっている環境変数をVercelで設定してください</li>
            <li>特に重要なのは:
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>NEXTAUTH_URL: https://kanri-six.vercel.app</li>
                <li>NEXTAUTH_SECRET: ランダムな文字列（openssl rand -base64 32で生成）</li>
                <li>DATABASE_URL: Supabaseの接続文字列</li>
              </ul>
            </li>
            <li>設定後、Vercelで再デプロイしてください</li>
          </ol>
        </div>
      </div>
    </div>
  );
}