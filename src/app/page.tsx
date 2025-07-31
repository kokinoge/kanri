import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          📊 Kanri
        </h1>
        <p className="text-gray-600 text-center mb-8">
          予算管理システム - 媒体分析ダッシュボード
        </p>
        
        <div className="space-y-4">
          <Link
            href="/media-analysis-direct"
            className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            📈 媒体分析 (CSV連携)
          </Link>
          
          <Link
            href="/media-analysis"
            className="block w-full bg-gray-600 text-white text-center py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            📊 媒体分析 (API連携)
          </Link>
          
          <Link
            href="/clients"
            className="block w-full bg-green-600 text-white text-center py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            🏢 クライアント管理
          </Link>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">🚀 推奨</h3>
          <p className="text-sm text-blue-800">
            「媒体分析 (CSV連携)」が最も安定して動作します。
            Google Sheetsへのデータ反映が即座に可能です。
          </p>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Version 2.0 - Vercel Optimized
          </p>
        </div>
      </div>
    </div>
  );
}