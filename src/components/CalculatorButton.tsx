'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CalculatorButtonProps {
  value: string;
  onClick: () => void;
  variant?: 'number' | 'operator' | 'function' | 'equals' | 'clear';
  className?: string;
  disabled?: boolean;
  size?: 'default' | 'wide';
}

export function CalculatorButton({
  value,
  onClick,
  variant = 'number',
  className,
  disabled = false,
  size = 'default',
}: CalculatorButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'number':
        return 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600 active:scale-95';
      case 'operator':
        return 'bg-orange-500 hover:bg-orange-400 text-white border-orange-400 active:scale-95';
      case 'function':
        return 'bg-slate-600 hover:bg-slate-500 text-white border-slate-500 active:scale-95';
      case 'equals':
        return 'bg-orange-500 hover:bg-orange-400 text-white border-orange-400 active:scale-95';
      case 'clear':
        return 'bg-red-600 hover:bg-red-500 text-white border-red-500 active:scale-95';
      default:
        return 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600 active:scale-95';
    }
  };

  const getSizeStyles = () => {
    return size === 'wide' 
      ? 'col-span-2 h-16 text-lg font-semibold' 
      : 'h-16 text-lg font-semibold';
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'transition-all duration-150 ease-in-out rounded-lg border-2',
        'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800',
        'shadow-lg hover:shadow-xl',
        getVariantStyles(),
        getSizeStyles(),
        className
      )}
      variant="ghost"
    >
      {value}
    </Button>
  );
}