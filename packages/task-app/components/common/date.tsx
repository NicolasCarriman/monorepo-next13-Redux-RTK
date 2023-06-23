import React from 'react';
import { twMerge } from 'tailwind-merge';

interface DateComponentProps {
  date: string
  variant?: 'small' | 'medium'
}
function DateComponent({ date, variant = 'small' }: DateComponentProps) {

  const today = new Date(date);
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
  const result = today.toLocaleString('default', options);

  return (
    <p className={twMerge(`
      relative 
      flex 
      justify-center 
      align-center 
      font-medium 
      min-w-[4rem] 
      text-base
    `, variant === 'medium' && 'text-2xl')}>
      {result}
    </p>
  );
}

export default DateComponent;
