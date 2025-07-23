'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AnalyticsData {
  totalBudgets: number;
  totalUsed: number;
  totalRemaining: number;
  usagePercentage: number;
  budgetsByMonth: any[];
  topBudgets: any[];
  departmentSummary: any[];
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('2025');

  // 分析データを取得
  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics?period=${selectedPeriod}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('分析データの取得に失敗:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 使用率の色を取得
  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return '#dc3545'; // 赤
    if (percentage >= 70) return '#fd7e14'; // オレンジ
    if (percentage >= 50) return '#ffc107'; // 黄色
    return '#28a745'; // 緑
  };

  // 使用率のステータステキスト
  const getUsageStatus = (percentage: number) => {
    if (percentage >= 90) return '要注意';
    if (percentage >= 70) return '注意';
    if (percentage >= 50) return '良好';
    return '余裕';
  };

  useEffect(() => {
    fetchAnalytics();
  }, [selectedPeriod]);

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link 
          href="/" 
          style={{ color: '#666', textDecoration: 'none' }}
        >
          ← ホームに戻る
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>📊 分析・レポート</h1>
        
        <div>
          <label style={{ marginRight: '0.5rem' }}>期間選択:</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          >
            <option value="2025">2025年</option>
            <option value="2024">2024年</option>
            <option value="all">全期間</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <p>分析データを読み込み中...</p>
      ) : analytics ? (
        <div>
          {/* サマリーカード */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem', 
            marginBottom: '3rem' 
          }}>
            <div style={{
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>💰 総予算</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0', color: '#0070f3' }}>
                ¥{analytics.totalBudgets.toLocaleString()}
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>📈 使用済み</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0', color: '#fd7e14' }}>
                ¥{analytics.totalUsed.toLocaleString()}
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>💡 残り予算</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0', color: '#28a745' }}>
                ¥{analytics.totalRemaining.toLocaleString()}
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>📊 使用率</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0', color: getUsageColor(analytics.usagePercentage) }}>
                  {analytics.usagePercentage}%
                </p>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  backgroundColor: getUsageColor(analytics.usagePercentage),
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {getUsageStatus(analytics.usagePercentage)}
                </span>
              </div>
            </div>
          </div>

          {/* 月別予算推移 */}
          <div style={{
            backgroundColor: '#fff',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0',
            marginBottom: '2rem'
          }}>
            <h3>📈 月別予算推移</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>月</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '2px solid #dee2e6' }}>予算</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right', borderBottom: '2px solid #dee2e6' }}>使用額</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>使用率</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.budgetsByMonth.map((item, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '0.75rem' }}>{item.month}月</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        ¥{item.budget.toLocaleString()}
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        ¥{item.used.toLocaleString()}
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <div style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '12px',
                          backgroundColor: getUsageColor(item.percentage),
                          color: 'white',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          {item.percentage}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* トップ予算 */}
          <div style={{
            backgroundColor: '#fff',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0',
            marginBottom: '2rem'
          }}>
            <h3>🏆 予算使用額トップ5</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {analytics.topBudgets.map((budget, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: index === 0 ? '#fff3cd' : '#f8f9fa',
                  borderRadius: '4px',
                  border: index === 0 ? '1px solid #ffeaa7' : '1px solid #dee2e6'
                }}>
                  <div>
                    <strong>{budget.name}</strong>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      {budget.year}年{budget.month}月
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                      ¥{budget.usedAmount.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      / ¥{budget.totalAmount.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* アクションボタン */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link
              href="/budgets"
              style={{
                backgroundColor: '#0070f3',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              💰 予算管理
            </Link>
            
            <Link
              href="/settings"
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              ⚙️ 設定管理
            </Link>
          </div>
        </div>
      ) : (
        <p>分析データの読み込みに失敗しました。</p>
      )}
    </div>
  );
} 