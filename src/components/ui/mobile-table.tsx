import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, MoreVertical } from "lucide-react";

interface MobileTableProps {
  data: any[];
  columns: Array<{
    key: string;
    label: string;
    render?: (item: any) => React.ReactNode;
    className?: string;
  }>;
  onRowClick?: (item: any) => void;
  className?: string;
}

// カード形式のテーブル（モバイル向け）
function MobileTable({ data, columns, onRowClick, className }: MobileTableProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <div className="text-lg font-medium">データがありません</div>
        <div className="text-sm mt-1">条件を変更して再度検索してください</div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {data.map((item, index) => (
        <div
          key={item.id || index}
          className={cn(
            "bg-white rounded-lg border border-gray-200 p-4 shadow-sm",
            onRowClick && "cursor-pointer active:bg-gray-50 touch-manipulation"
          )}
          onClick={() => onRowClick?.(item)}
        >
          <div className="space-y-2">
            {columns.map((column, colIndex) => (
              <div key={column.key} className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {column.label}
                  </div>
                  <div className={cn("text-sm font-medium text-gray-900 mt-1", column.className)}>
                    {column.render ? column.render(item) : item[column.key]}
                  </div>
                </div>
                {colIndex === 0 && onRowClick && (
                  <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// 横スクロール対応のテーブル（デスクトップ向け）
function ResponsiveTable({ 
  data, 
  columns, 
  onRowClick, 
  className 
}: MobileTableProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <div className="text-lg font-medium">データがありません</div>
        <div className="text-sm mt-1">条件を変更して再度検索してください</div>
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            {onRowClick && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr
              key={item.id || index}
              className={cn(
                "hover:bg-gray-50",
                onRowClick && "cursor-pointer"
              )}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                    column.className
                  )}
                >
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
              {onRowClick && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <ChevronRight className="h-4 w-4" />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 統計情報表示コンポーネント
function MobileStats({ 
  stats, 
  className 
}: {
  stats: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    color?: string;
  }>;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {stat.label}
              </div>
              <div className={cn(
                "text-lg font-bold mt-1",
                stat.color || "text-gray-900"
              )}>
                {stat.value}
              </div>
            </div>
            {stat.icon && (
              <div className="flex-shrink-0 ml-2">
                {stat.icon}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// フィルター表示コンポーネント
function MobileFilters({ 
  filters, 
  onFilterChange, 
  className 
}: {
  filters: Array<{
    key: string;
    label: string;
    value: string;
    options: Array<{ value: string; label: string }>;
  }>;
  onFilterChange: (key: string, value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {filters.map((filter) => (
        <div key={filter.key} className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
          <label className="text-sm font-medium text-gray-700 block mb-2">
            {filter.label}
          </label>
          <select
            value={filter.value}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export { MobileTable, ResponsiveTable, MobileStats, MobileFilters }; 