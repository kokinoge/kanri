import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">🎉 Kanri App</h1>
      <p className="text-xl mb-8">Vercel + Supabase デプロイ成功！</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <Link 
          href="/api" 
          className="p-4 border border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <div className="text-blue-600 font-semibold">API Status Check</div>
        </Link>
        
        <Link 
          href="/settings" 
          className="p-4 border border-green-500 rounded-lg hover:bg-green-50 transition-colors"
        >
          <div className="text-green-600 font-semibold">⚙️ 設定管理</div>
        </Link>
        
        <Link 
          href="/budgets" 
          className="p-4 border border-purple-500 rounded-lg hover:bg-purple-50 transition-colors"
        >
          <div className="text-purple-600 font-semibold">💰 予算管理</div>
        </Link>
        
        <Link 
          href="/analytics" 
          className="p-4 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
        >
          <div className="text-orange-600 font-semibold">📊 分析・レポート</div>
        </Link>
      </div>
    </div>
  );
} 