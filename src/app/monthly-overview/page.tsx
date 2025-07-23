"use client";

import React, { useState, useMemo } from "react";
import useSWR from "swr";
import ProtectedLayout from "@/components/ProtectedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, ChevronDown, ChevronRight, DollarSign, TrendingUp,
  Users, Building, Target, Filter
} from "lucide-react";
import { ImportExportActions } from '@/components/ImportExportActions';

interface MonthlyOverviewData {
  clients: Array<{
    id: string;
    name: string;
    manager?: { name: string };
    department?: string;
    priority: string;
    monthlyBudget: number;
    monthlySpend: number;
    campaigns: Array<{
      id: string;
      name: string;
      purpose?: string;
      totalBudget: number;
      startDate: string;
      endDate: string;
      teams: Array<{
        id: string;
        name: string;
        isLead: boolean;
      }>;
    }>;
  }>;
  summary: {
    totalClients: number;
    totalBudget: number;
    totalSpend: number;
    averageUtilization: number;
  };
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function MonthlyOverview() {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [expandedClients, setExpandedClients] = useState<Set<string>>(new Set());
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());

  const { data: monthlyData, error, isLoading, mutate } = useSWR<MonthlyOverviewData>(
    `/api/monthly-overview?month=${selectedMonth}`,
    fetcher
  );

  const { data: teams } = useSWR("/api/teams", fetcher);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization < 80) return "text-yellow-600";
    if (utilization > 110) return "text-red-600";
    return "text-green-600";
  };

  const getUtilizationBadge = (utilization: number) => {
    if (utilization < 80) return "outline";
    if (utilization > 110) return "destructive";
    return "default";
  };

  const toggleClientExpansion = (clientId: string) => {
    const newExpanded = new Set(expandedClients);
    if (newExpanded.has(clientId)) {
      newExpanded.delete(clientId);
    } else {
      newExpanded.add(clientId);
    }
    setExpandedClients(newExpanded);
  };

  const toggleClientSelection = (clientId: string) => {
    const newSelected = new Set(selectedClients);
    if (newSelected.has(clientId)) {
      newSelected.delete(clientId);
    } else {
      newSelected.add(clientId);
    }
    setSelectedClients(newSelected);
  };

  if (error) {
    return (
      <ProtectedLayout>
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-red-500">データの取得に失敗しました。</p>
          </CardContent>
        </Card>
      </ProtectedLayout>
    );
  }

  if (isLoading) {
    return (
      <ProtectedLayout>
        <Card>
          <CardContent className="text-center py-8">
            <p>読み込み中...</p>
          </CardContent>
        </Card>
      </ProtectedLayout>
    );
  }

  const clients = monthlyData?.clients || [];
  const summary = monthlyData?.summary || {
    totalClients: 0,
    totalBudget: 0,
    totalSpend: 0,
    averageUtilization: 0
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">月次概要</h1>
            <p className="text-muted-foreground">
              月別のクライアント・案件・チーム配分を管理します
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <ImportExportActions
              exportEndpoint="/api/monthly-overview"
              importEndpoint="/api/import-export/monthly-overview"
              dataType="月次データ"
              filePrefix="monthly-overview"
              filters={{
                month: selectedMonth
              }}
              onImportComplete={() => {
                mutate();
              }}
            />
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <Input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-40"
              />
            </div>
          </div>
        </div>

        {/* サマリーカード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">クライアント数</p>
                  <p className="text-2xl font-bold">{summary.totalClients}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">総予算</p>
                  <p className="text-2xl font-bold">{formatCurrency(summary.totalBudget)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">総消化</p>
                  <p className="text-2xl font-bold">{formatCurrency(summary.totalSpend)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">平均消化率</p>
                  <p className={`text-2xl font-bold ${getUtilizationColor(summary.averageUtilization)}`}>
                    {summary.averageUtilization.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* クライアント一覧 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>クライアント別月次状況</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clients.map((client) => {
                const utilization = client.monthlyBudget > 0 ? 
                  (client.monthlySpend / client.monthlyBudget) * 100 : 0;
                const isExpanded = expandedClients.has(client.id);
                const isSelected = selectedClients.has(client.id);
                
                return (
                  <div
                    key={client.id}
                    className={`border rounded-lg p-4 ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleClientSelection(client.id)}
                          className="rounded"
                        />
                        <div>
                          <h3 className="font-semibold">{client.name}</h3>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline">{client.department || '未設定'}</Badge>
                            <Badge variant="secondary">{client.campaigns.length}案件</Badge>
                            <Badge variant={getUtilizationBadge(utilization)}>
                              {utilization < 80 ? '低消化' : utilization > 110 ? '超過' : '正常'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-600">予算/消化</div>
                          <div className="font-semibold">
                            {formatCurrency(client.monthlyBudget)} / {formatCurrency(client.monthlySpend)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">消化率</div>
                          <div className={`font-bold ${getUtilizationColor(utilization)}`}>
                            {utilization.toFixed(1)}%
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleClientExpansion(client.id)}
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="space-y-3">
                          <div className="text-sm">
                            <span className="font-medium">担当者:</span> {client.manager?.name || '未設定'}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">優先度:</span> {client.priority}
                          </div>
                          <div className="space-y-2">
                            <div className="font-medium text-sm">案件一覧</div>
                            {client.campaigns.map((campaign) => (
                              <div key={campaign.id} className="bg-gray-50 rounded p-3">
                                <div className="font-medium">{campaign.name}</div>
                                <div className="text-sm text-gray-600 mt-1">{campaign.purpose}</div>
                                <div className="flex justify-between items-center mt-2">
                                  <div className="font-medium">{formatCurrency(campaign.totalBudget)}</div>
                                  <div className="text-sm text-gray-500">
                                    {new Date(campaign.startDate).toLocaleDateString('ja-JP')} - 
                                    {new Date(campaign.endDate).toLocaleDateString('ja-JP')}
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {campaign.teams.map((team) => (
                                    <Badge
                                      key={team.id}
                                      variant={team.isLead ? "default" : "secondary"}
                                      className="text-xs"
                                    >
                                      {team.name} {team.isLead && '(主担当)'}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {clients.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">条件に一致するクライアントが見つかりません</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
}