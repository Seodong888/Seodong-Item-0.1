import React from 'react';
import { SafetyGrade } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface SafetyBadgeProps {
  grade: SafetyGrade;
  className?: string;
}

export default function SafetyBadge({ grade, className }: SafetyBadgeProps) {
  const config = {
    S: {
      label: 'S급 (1대 본주)',
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500'
    },
    A: {
      label: 'A급 (재판매)',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      dot: 'bg-blue-500'
    },
    B: {
      label: 'B급 (정보 불충분)',
      color: 'bg-gray-100 text-gray-600 border-gray-200',
      dot: 'bg-gray-400'
    }
  }[grade];

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
      config.color,
      className
    )}>
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)}></span>
      {config.label}
    </span>
  );
}
