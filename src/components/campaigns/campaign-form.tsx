"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Target, DollarSign, CheckCircle } from 'lucide-react';

interface CampaignFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export function CampaignForm({ onSubmit, onCancel, initialData }: CampaignFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    purpose: initialData?.purpose || '',
    clientId: initialData?.clientId || '',
    totalBudget: initialData?.totalBudget || '',
    startYear: initialData?.startYear || new Date().getFullYear(),
    startMonth: initialData?.startMonth || new Date().getMonth() + 1,
    endYear: initialData?.endYear || '',
    endMonth: initialData?.endMonth || '',
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const months = [
    { value: 1, label: '1月' },
    { value: 2, label: '2月' },
    { value: 3, label: '3月' },
    { value: 4, label: '4月' },
    { value: 5, label: '5月' },
    { value: 6, label: '6月' },
    { value: 7, label: '7月' },
    { value: 8, label: '8月' },
    { value: 9, label: '9月' },
    { value: 10, label: '10月' },
    { value: 11, label: '11月' },
    { value: 12, label: '12月' },
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (step < 3) {
        handleNext();
      } else {
        handleSubmit();
      }
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStepIcon = (stepNumber: number) => {
    if (stepNumber < step) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (stepNumber === step) {
      switch(stepNumber) {
        case 1: return <Target className="w-5 h-5 text-blue-500" />;
        case 2: return <Calendar className="w-5 h-5 text-blue-500" />;
        case 3: return <DollarSign className="w-5 h-5 text-blue-500" />;
        default: return <Target className="w-5 h-5 text-blue-500" />;
      }
    }
    return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((stepNumber, index) => (
        <div key={stepNumber} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            stepNumber <= step ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
            {getStepIcon(stepNumber)}
          </div>
          {index < 2 && (
            <div className={`w-16 h-1 mx-2 ${
              stepNumber < step ? 'bg-green-500' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">案件作成</CardTitle>
          <Badge variant="secondary">ステップ {step}/3</Badge>
        </CardHeader>
        <CardContent>
          {renderStepIndicator()}
          {step === 1 && (
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name" className="text-lg">案件名</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="例: 2023年の新規顧客獲得案件"
                />
              </div>
              <div>
                <Label htmlFor="purpose" className="text-lg">案件の目的</Label>
                <Textarea
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => updateFormData('purpose', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="例: 2023年の新規顧客獲得を目指す"
                />
              </div>
              <div>
                <Label htmlFor="clientId" className="text-lg">クライアントID</Label>
                <Input
                  id="clientId"
                  value={formData.clientId}
                  onChange={(e) => updateFormData('clientId', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="例: 1234567890"
                />
              </div>
              <Button onClick={handleNext} className="w-full">次へ</Button>
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-4">
              <div>
                <Label htmlFor="totalBudget" className="text-lg">総予算</Label>
                <Input
                  id="totalBudget"
                  type="number"
                  value={formData.totalBudget}
                  onChange={(e) => updateFormData('totalBudget', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="例: 1000000"
                />
              </div>
              <div>
                <Label htmlFor="startYear" className="text-lg">開始年</Label>
                <select
                  id="startYear"
                  value={formData.startYear}
                  onChange={(e) => updateFormData('startYear', e.target.value)}
                  onKeyDown={handleKeyDown}
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="startMonth" className="text-lg">開始月</Label>
                <select
                  id="startMonth"
                  value={formData.startMonth}
                  onChange={(e) => updateFormData('startMonth', e.target.value)}
                  onKeyDown={handleKeyDown}
                >
                  {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="endYear" className="text-lg">終了年</Label>
                <select
                  id="endYear"
                  value={formData.endYear}
                  onChange={(e) => updateFormData('endYear', e.target.value)}
                  onKeyDown={handleKeyDown}
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="endMonth" className="text-lg">終了月</Label>
                <select
                  id="endMonth"
                  value={formData.endMonth}
                  onChange={(e) => updateFormData('endMonth', e.target.value)}
                  onKeyDown={handleKeyDown}
                >
                  {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                  ))}
                </select>
              </div>
              <Button onClick={handlePrevious} className="w-full">前へ</Button>
              <Button onClick={handleNext} className="w-full">次へ</Button>
            </div>
          )}
          {step === 3 && (
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name" className="text-lg">案件名</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="例: 2023年の新規顧客獲得案件"
                />
              </div>
              <div>
                <Label htmlFor="purpose" className="text-lg">案件の目的</Label>
                <Textarea
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => updateFormData('purpose', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="例: 2023年の新規顧客獲得を目指す"
                />
              </div>
              <div>
                <Label htmlFor="clientId" className="text-lg">クライアントID</Label>
                <Input
                  id="clientId"
                  value={formData.clientId}
                  onChange={(e) => updateFormData('clientId', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="例: 1234567890"
                />
              </div>
              <Button onClick={handlePrevious} className="w-full">前へ</Button>
              <Button onClick={handleSubmit} className="w-full">案件を作成</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 