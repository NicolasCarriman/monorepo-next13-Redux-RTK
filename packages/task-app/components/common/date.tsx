import React from 'react';

interface DateComponentProps {
  date: string
}
function DateComponent({ date }: DateComponentProps) {

  const today = new Date(date);
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
  const result = today.toLocaleString('default', options);

  return (
    <p className='relative flex justify-center align-center font-medium min-w-[4rem]'>
      {result}
    </p>
  );
}

export default DateComponent;
