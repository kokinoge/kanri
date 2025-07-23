import * as React from "react";
import { cn } from "@/lib/utils";

interface MobileCardProps extends React.ComponentProps<"div"> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  isClickable?: boolean;
  onTap?: () => void;
}

function MobileCard({ 
  className, 
  title, 
  subtitle, 
  action, 
  isClickable = false, 
  onTap, 
  children, 
  ...props 
}: MobileCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-3",
        isClickable && "active:bg-gray-50 touch-manipulation cursor-pointer",
        className
      )}
      onClick={isClickable ? onTap : undefined}
      {...props}
    >
      {/* ヘッダー */}
      {(title || subtitle || action) && (
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {title && (
              <h3 className="text-base font-semibold text-gray-900 truncate">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 truncate mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {action && (
            <div className="flex-shrink-0 ml-3">
              {action}
            </div>
          )}
        </div>
      )}
      
      {/* コンテンツ */}
      {children}
    </div>
  );
}

function MobileCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("space-y-2", className)}
      {...props}
    />
  );
}

function MobileCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center justify-between pt-3 border-t border-gray-100", className)}
      {...props}
    />
  );
}

// 統計情報表示用のコンポーネント
function MobileStatCard({ 
  label, 
  value, 
  icon, 
  trend, 
  className, 
  ...props 
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
} & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200 p-4",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className={cn(
              "text-sm mt-1",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              {trend.value}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

// リスト表示用のコンポーネント
function MobileListCard({ 
  items, 
  onItemTap, 
  className, 
  ...props 
}: {
  items: Array<{
    id: string;
    title: string;
    subtitle?: string;
    value?: string;
    badge?: React.ReactNode;
  }>;
  onItemTap?: (id: string) => void;
} & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-100",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 active:bg-gray-50 touch-manipulation cursor-pointer"
          onClick={() => onItemTap?.(item.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.title}
              </p>
              {item.subtitle && (
                <p className="text-sm text-gray-500 truncate mt-1">
                  {item.subtitle}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {item.value && (
                <span className="text-sm font-medium text-gray-900">
                  {item.value}
                </span>
              )}
              {item.badge}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { MobileCard, MobileCardContent, MobileCardFooter, MobileStatCard, MobileListCard }; 