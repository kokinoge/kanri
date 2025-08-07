'use client';

import { useState, useEffect } from 'react';

export default function PublicDebugPage() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ページ読み込み時に環境チェック
    checkEnvironment();
  }, []);

  const checkEnvironment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/public/debug');
      const data = await response.json();
      setResult({
        type: 'environment',
        data
      });
    } catch (error: any) {
      setResult({
        type: 'error',
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const testAuthentication = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/public/debug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      setResult({
        type: 'authentication',
        data
      });
    } catch (error: any) {
      setResult({
        type: 'error',
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const testNextAuth = async () => {
    setLoading(true);
    try {
      const csrfResponse = await fetch('/api/auth/csrf');
      const { csrfToken } = await csrfResponse.json();
      
      const response = await fetch('/api/auth/callback/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email,
          password,
          csrfToken,
          json: 'true'
        }),
      });
      
      const data = await response.json();
      setResult({
        type: 'nextauth',
        status: response.status,
        ok: response.ok,
        data
      });
    } catch (error: any) {
      setResult({
        type: 'error',
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">認証デバッグツール</h1>
        
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={checkEnvironment}
              disabled={loading}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              環境変数チェック
            </button>
            <button
              onClick={testAuthentication}
              disabled={loading}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              認証テスト
            </button>
            <button
              onClick={testNextAuth}
              disabled={loading}
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              NextAuth ログインテスト
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {result.type === 'environment' && '環境情報'}
              {result.type === 'authentication' && '認証テスト結果'}
              {result.type === 'nextauth' && 'NextAuth テスト結果'}
              {result.type === 'error' && 'エラー'}
            </h2>
            
            {result.type === 'authentication' && result.data?.authentication?.valid && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                認証成功！
              </div>
            )}
            
            {result.type === 'authentication' && result.data?.authentication && !result.data.authentication.valid && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                認証失敗
              </div>
            )}
            
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(result.type === 'error' ? result : result.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}