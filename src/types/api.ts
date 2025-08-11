import { Prisma } from '@prisma/client'

// =====================
// Common API Response Types
// =====================
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  details?: string
  total?: number
  message?: string
}

// =====================
// Error Types
// =====================
export interface ApiError {
  error: string
  details?: string
}

// =====================
// Budget API Types
// =====================
export type BudgetWhereInput = Prisma.BudgetWhereInput

export interface BudgetQueryParams {
  year?: string
  month?: string
  campaignId?: string
}

export interface BudgetCreateRequest {
  campaignId: string
  year: number | string
  month: number | string
  platform: string
  operationType: string
  revenueType: string
  budgetAmount: number | string
  targetKpi: string
  targetValue: number | string
}

export interface BudgetUpdateRequest {
  id: string
  campaignId?: string
  year?: number | string
  month?: number | string
  platform?: string
  operationType?: string
  revenueType?: string
  budgetAmount?: number | string
  targetKpi?: string
  targetValue?: number | string
}

export type BudgetWithRelations = Prisma.BudgetGetPayload<{
  include: {
    campaign: {
      include: {
        client: true
      }
    }
  }
}>

export interface BudgetFormattedResponse extends Omit<BudgetWithRelations, 'budgetAmount' | 'targetValue'> {
  budgetAmount: number
  targetValue: number
  clientName: string
  campaignName: string
}

// =====================
// Campaign API Types  
// =====================
export type CampaignWhereInput = Prisma.CampaignWhereInput

export interface CampaignQueryParams {
  clientId?: string
  status?: string
  search?: string
}

export interface CampaignCreateRequest {
  clientId: string
  name: string
  purpose: string
  startDate: string
  endDate: string
  totalBudget: number | string
}

export type CampaignWithRelations = Prisma.CampaignGetPayload<{
  include: {
    client: true
    budgets: true
    results: true
  }
}>

export interface CampaignFormattedResponse extends Omit<CampaignWithRelations, 'totalBudget'> {
  status: string
  clientName: string
  totalBudgetAmount: number
  totalActualSpend: number
  totalBudget: number
}

// =====================
// Client API Types
// =====================
export type ClientWhereInput = Prisma.ClientWhereInput

export interface ClientQueryParams {
  search?: string
  priority?: string
}

export interface ClientCreateRequest {
  name: string
  manager: string
  priority?: number
}

// =====================
// Result API Types
// =====================
export type ResultWhereInput = Prisma.ResultWhereInput

export interface ResultQueryParams {
  year?: string
  month?: string
  campaignId?: string
  platform?: string
}

export interface ResultCreateRequest {
  campaignId: string
  year: number | string
  month: number | string
  platform: string
  operationType: string
  actualSpend: number | string
  actualResult: number | string
}

export interface ResultUpdateRequest {
  id: string
  actualSpend?: number | string
  actualResult?: number | string
}

export type ResultWithRelations = Prisma.ResultGetPayload<{
  include: {
    campaign: {
      include: {
        client: true
        budgets: {
          where: {
            year?: number
            month?: number
            platform?: string
          }
        }
      }
    }
  }
}>

export interface ResultFormattedResponse extends Omit<ResultWithRelations, 'actualSpend' | 'actualResult'> {
  actualSpend: number
  actualResult: number
  clientName: string
  campaignName: string
  budgetAmount: number
  targetValue: number
  spendAchievement: string | number
  resultAchievement: string | number
}

// =====================
// Master API Types
// =====================
export type MasterWhereInput = Prisma.MasterWhereInput

export interface MasterQueryParams {
  category?: string
}

export interface MasterCreateRequest {
  category: string
  value: string
  order?: number
}

export interface MasterUpdateRequest {
  id: string
  value?: string
  order?: number
}

export interface MasterItem {
  id: string
  value: string
  order: number
}

export type GroupedMasters = Record<string, MasterItem[]>