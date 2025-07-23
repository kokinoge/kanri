"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: string | number;
  onChange?: (value: string) => void;
  displayFormat?: 'currency' | 'number';
  allowDecimal?: boolean;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value = '', onChange, displayFormat = 'number', allowDecimal = false, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState('');
    const [isFocused, setIsFocused] = React.useState(false);

    // 数値を表示用フォーマットに変換
    const formatForDisplay = (numStr: string): string => {
      if (!numStr || numStr === '') return '';
      
      // 数値以外の文字を除去（小数点は許可する場合のみ残す）
      const cleanStr = allowDecimal 
        ? numStr.replace(/[^\d.-]/g, '')
        : numStr.replace(/[^\d-]/g, '');
      
      if (cleanStr === '' || cleanStr === '-') return cleanStr;
      
      const num = parseFloat(cleanStr);
      if (isNaN(num)) return '';
      
      if (displayFormat === 'currency') {
        return new Intl.NumberFormat('ja-JP', {
          style: 'currency',
          currency: 'JPY',
          minimumFractionDigits: 0,
        }).format(num);
      } else {
        return new Intl.NumberFormat('ja-JP').format(num);
      }
    };

    // 表示値から数値文字列に変換
    const parseFromDisplay = (displayStr: string): string => {
      if (!displayStr || displayStr === '') return '';
      
      // 通貨記号やカンマを除去
      const cleanStr = displayStr.replace(/[¥,]/g, '');
      
      // 数値として有効かチェック
      const num = parseFloat(cleanStr);
      if (isNaN(num)) return '';
      
      return cleanStr;
    };

    // 外部からの値の変更を監視
    React.useEffect(() => {
      if (isFocused) return; // フォーカス中は外部の値変更を無視
      
      const stringValue = String(value || '');
      if (stringValue !== parseFromDisplay(displayValue)) {
        setDisplayValue(formatForDisplay(stringValue));
      }
    }, [value, isFocused, displayValue, allowDecimal, displayFormat]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      // フォーカス時は生の数値を表示
      const rawValue = parseFromDisplay(displayValue);
      setDisplayValue(rawValue);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      // ブラー時はフォーマットされた値を表示
      const rawValue = parseFromDisplay(displayValue);
      const formattedValue = formatForDisplay(rawValue);
      setDisplayValue(formattedValue);
      
      // 親コンポーネントに生の値を通知
      onChange?.(rawValue);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setDisplayValue(inputValue);
      
      if (isFocused) {
        // フォーカス中は生の値をそのまま親に通知
        onChange?.(inputValue);
      }
    };

    return (
      <Input
        {...props}
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(className)}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";

export { NumberInput }; 