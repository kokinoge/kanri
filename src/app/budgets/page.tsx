"use client"

import { useState, useEffect } from 'react'

interface Budget {
  id: string
  campaignId: string
  year: number
  month: number
  platform: string
  operationType: string
  revenueType: string
  budgetAmount: number
  targetKpi: string
  targetValue: number
  createdAt: string
  updatedAt: string
}

interface Campaign {
  id: string
  name: string
  clientId: string
}

interface MasterData {
  platforms: Array<{ id: string; name: string; order: number }>
  operationTypes: Array<{ id: string; name: string; order: number }>
  revenueTypes: Array<{ id: string; name: string; order: number }>
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [masterData, setMasterData] = useState<MasterData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // フィルタ状態
  const [selectedCampaign, setSelectedCampaign] = useState('')
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedPlatform, setSelectedPlatform] = useState('')
  
  // モーダル状態
  const [showCreateModal, setShowCreateModal] = useState(false)
  
  // フォームデータ
  const [formData, setFormData] = useState({
    campaignId: '',
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    platform: '',
    operationType: '',
    revenueType: '',
    budgetAmount: 0,
    targetKpi: '',
    targetValue: 0
  })

  useEffect(() => {
    fetchCampaigns()
    fetchMasterData()
    fetchBudgets()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns')
      const result = await response.json()
      if (result.success) {
        setCampaigns(result.data)
      }
    } catch (err) {
      console.error('キャンペーン取得エラー:', err)
    }
  }

  const fetchMasterData = async () => {
    try {
      const response = await fetch('/api/masters')
      const result = await response.json()
      if (result.success) {
        setMasterData(result.data)
      }
    } catch (err) {
      console.error('マスタデータ取得エラー:', err)
    }
  }

  const fetchBudgets = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCampaign) params.append('campaignId', selectedCampaign)
      if (selectedYear) params.append('year', selectedYear.toString())
      if (selectedMonth) params.append('month', selectedMonth.toString())
      if (selectedPlatform) params.append('platform', selectedPlatform)

      const response = await fetch(`/api/budgets?${params.toString()}`)
      const result = await response.json()

      if (result.success) {
        setBudgets(result.data)
      } else {
        setError(result.error || '予算の取得に失敗しました')
      }
    } catch (err) {
      setError('予算の取得に失敗しました')
      console.error('予算取得エラー:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        await fetchBudgets()
        setShowCreateModal(false)
        setFormData({
          campaignId: '',
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          platform: '',
          operationType: '',
          revenueType: '',
          budgetAmount: 0,
          targetKpi: '',
          targetValue: 0
        })
      } else {
        setError(result.error || '予算の作成に失敗しました')
      }
    } catch (err) {
      setError('予算の作成に失敗しました')
      console.error('予算作成エラー:', err)
    }
  }

  const resetForm = () => {
    setShowCreateModal(false)
    setFormData({
      campaignId: '',
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      platform: '',
      operationType: '',
      revenueType: '',
      budgetAmount: 0,
      targetKpi: '',
      targetValue: 0
    })
    setError('')
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount)
  }

  const getMasterName = (category: keyof MasterData, id: string) => {
    if (!masterData) return id
    const item = masterData[category].find(item => item.id === id)
    return item ? item.name : id
  }

  const getCampaignName = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId)
    return campaign ? campaign.name : '不明な施策'
  }

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budgetAmount, 0)

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* ヘッダー */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '0.5rem',
        padding: '2rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1f2937'
          }}>
            💰 予算管理
          </h1>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            + 新規予算設定
          </button>
        </div>

        {/* サマリー */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            backgroundColor: '#dbeafe',
            padding: '1rem',
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '0.875rem', color: '#1e40af', marginBottom: '0.5rem' }}>
              総予算額
            </p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e40af' }}>
              {formatCurrency(totalBudget)}
            </p>
          </div>
          <div style={{
            backgroundColor: '#dcfce7',
            padding: '1rem',
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '0.875rem', color: '#166534', marginBottom: '0.5rem' }}>
              予算項目数
            </p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#166534' }}>
              {budgets.length}件
            </p>
          </div>
        </div>

        {/* フィルタ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '0.875rem'
            }}
          >
            <option value="">全施策</option>
            {campaigns.map(campaign => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            style={{
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '0.875rem'
            }}
          >
            {[2023, 2024, 2025].map(year => (
              <option key={year} value={year}>{year}年</option>
            ))}
          </select>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            style={{
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '0.875rem'
            }}
          >
            {Array.from({length: 12}, (_, i) => i + 1).map(month => (
              <option key={month} value={month}>{month}月</option>
            ))}
          </select>

          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '0.875rem'
            }}
          >
            <option value="">全媒体</option>
            {masterData?.platforms.map(platform => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>

          <button
            onClick={fetchBudgets}
            style={{
              backgroundColor: '#6b7280',
              color: 'white',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            検索
          </button>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}
      </div>

      {/* 予算一覧 */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '0.5rem',
        padding: '2rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>読み込み中...</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #e5e7eb'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                    期間
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                    施策
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                    媒体
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                    運用タイプ
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                    報酬体系
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>
                    予算額
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                    目標KPI
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                {budgets.map((budget) => (
                  <tr key={budget.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem' }}>
                      {budget.year}年{budget.month}月
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                      {getCampaignName(budget.campaignId)}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem'
                      }}>
                        {getMasterName('platforms', budget.platform)}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem'
                      }}>
                        {getMasterName('operationTypes', budget.operationType)}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        backgroundColor: '#fef3c7',
                        color: '#92400e',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem'
                      }}>
                        {getMasterName('revenueTypes', budget.revenueType)}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                      {formatCurrency(budget.budgetAmount)}
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                      {budget.targetKpi}: {budget.targetValue.toLocaleString()}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        style={{
                          backgroundColor: '#10b981',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.25rem',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        編集
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {budgets.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                予算データが見つかりません
              </div>
            )}
          </div>
        )}
      </div>

      {/* 作成モーダル */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            padding: '2rem',
            width: '100%',
            maxWidth: '600px',
            margin: '1rem',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}>
              新規予算設定
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    施策 *
                  </label>
                  <select
                    value={formData.campaignId}
                    onChange={(e) => setFormData({ ...formData, campaignId: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.25rem'
                    }}
                  >
                    <option value="">施策を選択</option>
                    {campaigns.map(campaign => (
                      <option key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    年月 *
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.25rem'
                      }}
                    >
                      {[2023, 2024, 2025].map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <select
                      value={formData.month}
                      onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) })}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.25rem'
                      }}
                    >
                      {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{month}月</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    媒体 *
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.25rem'
                    }}
                  >
                    <option value="">媒体を選択</option>
                    {masterData?.platforms.map(platform => (
                      <option key={platform.id} value={platform.id}>
                        {platform.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    運用タイプ *
                  </label>
                  <select
                    value={formData.operationType}
                    onChange={(e) => setFormData({ ...formData, operationType: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.25rem'
                    }}
                  >
                    <option value="">運用タイプを選択</option>
                    {masterData?.operationTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem'
                }}>
                  報酬体系 *
                </label>
                <select
                  value={formData.revenueType}
                  onChange={(e) => setFormData({ ...formData, revenueType: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.25rem'
                  }}
                >
                  <option value="">報酬体系を選択</option>
                  {masterData?.revenueTypes.map(revenue => (
                    <option key={revenue.id} value={revenue.id}>
                      {revenue.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    予算額 (円) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.budgetAmount}
                    onChange={(e) => setFormData({ ...formData, budgetAmount: parseInt(e.target.value) || 0 })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.25rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    目標KPI
                  </label>
                  <input
                    type="text"
                    value={formData.targetKpi}
                    onChange={(e) => setFormData({ ...formData, targetKpi: e.target.value })}
                    placeholder="例: リーチ数"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.25rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}>
                    目標値
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.targetValue}
                    onChange={(e) => setFormData({ ...formData, targetValue: parseInt(e.target.value) || 0 })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.25rem'
                    }}
                  />
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end'
              }}>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    backgroundColor: '#6b7280',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.25rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.25rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  作成
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}