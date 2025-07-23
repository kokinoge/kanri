'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CSVManager from '@/components/csv/CSVManager';

interface Department {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [newDept, setNewDept] = useState({ name: '', description: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // 部署データを取得
  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/departments');
      if (response.ok) {
        const data = await response.json();
        setDepartments(data);
      }
    } catch (error) {
      console.error('部署データの取得に失敗:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 部署を追加
  const addDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDept.name.trim()) return;

    setIsAdding(true);
    try {
      const response = await fetch('/api/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDept),
      });

      if (response.ok) {
        setNewDept({ name: '', description: '' });
        fetchDepartments();
      } else {
        alert('部署の追加に失敗しました');
      }
    } catch (error) {
      console.error('部署追加エラー:', error);
      alert('部署の追加に失敗しました');
    } finally {
      setIsAdding(false);
    }
  };

  // 部署を削除
  const deleteDepartment = async (id: string) => {
    if (!confirm('この部署を削除しますか？')) return;

    try {
      const response = await fetch(`/api/departments/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchDepartments();
      } else {
        alert('部署の削除に失敗しました');
      }
    } catch (error) {
      console.error('部署削除エラー:', error);
      alert('部署の削除に失敗しました');
    }
  };

  // CSV インポート処理
  const handleCSVImport = async (data: any[]) => {
    const importData = data.map(row => ({
      name: row.name || row['部署名'] || '',
      description: row.description || row['説明'] || ''
    })).filter(dept => dept.name.trim());

    for (const dept of importData) {
      try {
        await fetch('/api/departments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dept),
        });
      } catch (error) {
        console.error(`部署 "${dept.name}" のインポートに失敗:`, error);
      }
    }

    // データを再取得
    fetchDepartments();
  };

  // CSV エクスポート処理
  const handleCSVExport = async () => {
    return departments.map(dept => ({
      name: dept.name,
      description: dept.description || '',
      createdAt: dept.createdAt
    }));
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link 
          href="/settings" 
          style={{ color: '#666', textDecoration: 'none' }}
        >
          ← 設定管理に戻る
        </Link>
      </div>

      <h1>🏢 部署管理</h1>
      
      {/* CSV インポート・エクスポート */}
      <CSVManager
        entityName="departments"
        onImport={handleCSVImport}
        onExport={handleCSVExport}
        sampleData={{ name: "営業部", description: "営業活動を担当する部署" }}
      />
      
      {/* 新規部署追加フォーム */}
      <div style={{ 
        backgroundColor: '#f9f9f9', 
        padding: '1.5rem', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3>新規部署追加</h3>
        <form onSubmit={addDepartment}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              部署名 *
            </label>
            <input
              type="text"
              value={newDept.name}
              onChange={(e) => setNewDept({...newDept, name: e.target.value})}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="例: 営業部"
              required
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              説明
            </label>
            <textarea
              value={newDept.description}
              onChange={(e) => setNewDept({...newDept, description: e.target.value})}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                minHeight: '60px'
              }}
              placeholder="部署の説明（任意）"
            />
          </div>
          
          <button
            type="submit"
            disabled={isAdding}
            style={{
              backgroundColor: '#0070f3',
              color: 'white',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '4px',
              cursor: isAdding ? 'not-allowed' : 'pointer',
              fontSize: '1rem'
            }}
          >
            {isAdding ? '追加中...' : '部署を追加'}
          </button>
        </form>
      </div>

      {/* 部署一覧 */}
      <div>
        <h3>登録済み部署一覧</h3>
        {isLoading ? (
          <p>読み込み中...</p>
        ) : departments.length === 0 ? (
          <p>まだ部署が登録されていません。</p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {departments.map((dept) => (
              <div
                key={dept.id}
                style={{
                  border: '1px solid #ddd',
                  padding: '1rem',
                  borderRadius: '8px',
                  backgroundColor: 'white'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>{dept.name}</h4>
                    {dept.description && (
                      <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>
                        {dept.description}
                      </p>
                    )}
                    <small style={{ color: '#888' }}>
                      作成日: {new Date(dept.createdAt).toLocaleDateString('ja-JP')}
                    </small>
                  </div>
                  <button
                    onClick={() => deleteDepartment(dept.id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 