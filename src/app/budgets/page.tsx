'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CSVManager from '@/components/csv/CSVManager';

interface Budget {
  id: string;
  name: string;
  clientId: string;
  departmentId: string;
  totalAmount: number;
  usedAmount: number;
  year: number;
  month: number;
  status: string;
  createdAt: string;
  client?: { name: string };
  department?: { name: string };
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [newBudget, setNewBudget] = useState({
    name: '',
    clientId: '',
    departmentId: '',
    totalAmount: 0,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // 予算データを取得
  const fetchBudgets = async () => {
    try {
      const response = await fetch('/api/simple-budgets');
      if (response.ok) {
        const data = await response.json();
        setBudgets(data);
      }
    } catch (error) {
      console.error('予算データの取得に失敗:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 予算を追加
  const addBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBudget.name.trim() || newBudget.totalAmount <= 0) return;

    setIsAdding(true);
    try {
      const response = await fetch('/api/simple-budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBudget),
      });

      if (response.ok) {
        setNewBudget({
          name: '',
          clientId: '',
          departmentId: '',
          totalAmount: 0,
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1
        });
        fetchBudgets();
      } else {
        alert('予算の追加に失敗しました');
      }
    } catch (error) {
      console.error('予算追加エラー:', error);
      alert('予算の追加に失敗しました');
    } finally {
      setIsAdding(false);
    }
  };

  // 予算を削除
  const deleteBudget = async (id: string) => {
    if (!confirm('この予算を削除しますか？')) return;

    try {
      const response = await fetch(`/api/simple-budgets/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchBudgets();
      } else {
        alert('予算の削除に失敗しました');
      }
    } catch (error) {
      console.error('予算削除エラー:', error);
      alert('予算の削除に失敗しました');
    }
  };

  // CSV インポート処理
  const handleCSVImport = async (data: any[]) => {
    const importData = data.map(row => ({
      name: row.name || row['予算名'] || '',
      clientId: row.clientId || row['クライアントID'] || '',
      departmentId: row.departmentId || row['部署ID'] || '',
      totalAmount: parseFloat(row.totalAmount || row['総額'] || 0),
      year: parseInt(row.year || row['年'] || new Date().getFullYear()),
      month: parseInt(row.month || row['月'] || new Date().getMonth() + 1)
    })).filter(budget => budget.name.trim() && budget.totalAmount > 0);

    for (const budget of importData) {
      try {
        await fetch('/api/simple-budgets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(budget),
        });
      } catch (error) {
        console.error(`予算 "${budget.name}" のインポートに失敗:`, error);
      }
    }

    // データを再取得
    fetchBudgets();
  };

  // CSV エクスポート処理
  const handleCSVExport = async () => {
    return budgets.map(budget => ({
      name: budget.name,
      clientName: budget.client?.name || '',
      departmentName: budget.department?.name || '',
      totalAmount: budget.totalAmount,
      usedAmount: budget.usedAmount,
      remainingAmount: budget.totalAmount - budget.usedAmount,
      year: budget.year,
      month: budget.month,
      status: budget.status,
      createdAt: budget.createdAt
    }));
  };

  // 予算使用率の計算
  const getUsagePercentage = (total: number, used: number) => {
    return total > 0 ? Math.round((used / total) * 100) : 0;
  };

  // ステータスの色を取得
  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return '#dc3545'; // 赤
    if (percentage >= 70) return '#fd7e14'; // オレンジ
    return '#28a745'; // 緑
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link 
          href="/" 
          style={{ color: '#666', textDecoration: 'none' }}
        >
          ← ホームに戻る
        </Link>
      </div>

      <h1>💰 予算管理</h1>
      
      {/* CSV インポート・エクスポート */}
      <CSVManager
        entityName="budgets"
        onImport={handleCSVImport}
        onExport={handleCSVExport}
        sampleData={{
          name: "Q1広告予算",
          clientId: "client-001",
          departmentId: "dept-001",
          totalAmount: 1000000,
          year: 2025,
          month: 1
        }}
      />
      
      {/* 新規予算追加フォーム */}
      <div style={{ 
        backgroundColor: '#f9f9f9', 
        padding: '1.5rem', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3>新規予算追加</h3>
        <form onSubmit={addBudget}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                予算名 *
              </label>
              <input
                type="text"
                value={newBudget.name}
                onChange={(e) => setNewBudget({...newBudget, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
                placeholder="例: Q1広告予算"
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                予算額 *
              </label>
              <input
                type="number"
                value={newBudget.totalAmount}
                onChange={(e) => setNewBudget({...newBudget, totalAmount: parseFloat(e.target.value) || 0})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
                placeholder="1000000"
                min="0"
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                年
              </label>
              <input
                type="number"
                value={newBudget.year}
                onChange={(e) => setNewBudget({...newBudget, year: parseInt(e.target.value) || new Date().getFullYear()})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
                min="2020"
                max="2030"
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                月
              </label>
              <select
                value={newBudget.month}
                onChange={(e) => setNewBudget({...newBudget, month: parseInt(e.target.value)})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              >
                {Array.from({length: 12}, (_, i) => (
                  <option key={i+1} value={i+1}>{i+1}月</option>
                ))}
              </select>
            </div>
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
            {isAdding ? '追加中...' : '予算を追加'}
          </button>
        </form>
      </div>

      {/* 予算一覧 */}
      <div>
        <h3>登録済み予算一覧</h3>
        {isLoading ? (
          <p>読み込み中...</p>
        ) : budgets.length === 0 ? (
          <p>まだ予算が登録されていません。</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>予算名</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>期間</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '2px solid #dee2e6' }}>総額</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '2px solid #dee2e6' }}>使用額</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '2px solid #dee2e6' }}>残額</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>使用率</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {budgets.map((budget) => {
                  const percentage = getUsagePercentage(budget.totalAmount, budget.usedAmount);
                  const remaining = budget.totalAmount - budget.usedAmount;
                  
                  return (
                    <tr key={budget.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '0.75rem' }}>
                        <strong>{budget.name}</strong>
                        {budget.client && (
                          <div style={{ fontSize: '0.8rem', color: '#666' }}>
                            {budget.client.name}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        {budget.year}年{budget.month}月
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        ¥{budget.totalAmount.toLocaleString()}
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        ¥{budget.usedAmount.toLocaleString()}
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        ¥{remaining.toLocaleString()}
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <div style={{ 
                          display: 'inline-block',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '12px',
                          backgroundColor: getStatusColor(percentage),
                          color: 'white',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          {percentage}%
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <button
                          onClick={() => deleteBudget(budget.id)}
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
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 