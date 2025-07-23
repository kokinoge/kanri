export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          🎉 Test Page - Kanri System
        </h1>
        <div className="space-y-2 text-sm">
          <p><strong>ビルド時刻:</strong> {new Date().toLocaleString('ja-JP')}</p>
          <p><strong>環境:</strong> {process.env.NODE_ENV}</p>
          <p><strong>ステータス:</strong> ✅ 正常動作</p>
          <p><strong>認証:</strong> 不要</p>
        </div>
        <div className="mt-6 pt-4 border-t">
          <div className="text-center">
            <a 
              href="/login" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              ログインページへ
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 