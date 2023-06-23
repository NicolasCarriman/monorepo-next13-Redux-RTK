import React, { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface TaskProps {
  children: React.ReactNode;
}

export const TaskContainer: React.FC<TaskProps> = ({ children }) => {
  return (
    <div className='flex flex-col'>
      {children}
    </div>
  );
};

interface TaskPriorityProps extends HTMLAttributes<HTMLDivElement> {
  priority: 'high' |  'low' | 'none' | 'medium'
}

export const TaskPriority: React.FC<TaskPriorityProps> = ({ priority, ...rest }) => {
  let fontColor;

  switch(priority) {
    case 'high':
      fontColor = '#b90000';
      break;
    case 'low':
      fontColor = '#0bb900';
      break;
    case 'medium':
      fontColor = '#ff7600';
      break;
    case 'none':
      fontColor = '#000000';
      break;
    default:
      fontColor = '#000000';
      break;
  }

  const taskPriorityClass = `text-[${fontColor}] mr-2 flex justify-center align-center`;
  return (
    <p
      className={taskPriorityClass}
      {...rest}
    >
      {priority}
    </p>
  );
};

interface TaskStatusProps {
  status: string;
}

export const TaskStatus: React.FC<TaskStatusProps> = ({ status }) => {
  let statusColor: string;
  let fontColor: string;
  let title: string;

  switch(status) {
    case 'done':
      statusColor = 'bg-green-100';
      fontColor = 'text-[#0bb900]';
      title= 'Done';
      break;
    case 'inProgress':
      statusColor = 'bg-orange-100';
      fontColor = 'text-[#ff7600]';
      title= 'In progress';
      break;
    case 'stuck':
      statusColor = 'bg-red-100';
      fontColor = 'text-[#b90000]';
      title= 'Stuck';
      break;
    default: 
      statusColor = 'green-100';
      fontColor = 'text-[#b90000]';
      title = 'Done';
      break;
  }

  const statusClass = 'flex items-center justify-center w-[12vw] font-medium ' +
                      `h-12 ${fontColor} ${statusColor} rounded-lg`;

  return (
    <div
      className={statusClass}
    >
      {title}
    </div>
  );
};


interface TaskTagsProps {
  children: React.ReactNode;
  variant?: 'small' | 'medium';
}

export const TaskTags: React.FC<TaskTagsProps> = ({ children, variant = 'medium' }) => {

  return (
    <div
      className={twMerge(`
      flex 
      justify-center 
      items-center 
      text-white 
      bg-blue-200 
      rounded-lg
      gap-2
      `, variant === 'medium' ? 'max-w-min font-medium p-6 h-8' : 'whitespace-nowrap max-w-max font-light p-3 rounded-xl h-4'
      )}
    >
      {children}
    </div>
  );
};
