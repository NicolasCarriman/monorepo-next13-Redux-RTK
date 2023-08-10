import React, { MouseEventHandler } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'small' | 'medium' | 'large';
  leftIcon?: React.ReactNode;
  label?: string; // Propiedad nueva
  children?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: 'default' | 'hover' | 'filter' | 'iconButton' | 'animated';
  disabled?: boolean;
  
}

function ButtonComponent({
  disabled = false,
  onClick,
  size,
  leftIcon,
  label,
  children,
  rightIcon,
  variant = 'default',
  ...rest
}: Props) {
  let width: string;

  switch (size) {
    case 'small':
      width = 'w-min';
      break;
    case 'medium':
      width = 'w-24';
      break;
    case 'large':
      width = 'w-22';
      break;
    default:
      width = 'w-32';
      break;
  }

  const variantStyle = {
    default: `task-button bg-transparent ${width} rounded-lg text-gray-700 ` +
      'font-light flex flex-row justify-center items-center hover:text-white hover:bg-blue-200',
    hover: `task-button bg-[#dfdfff] shadow-out ${width} rounded-lg text-blue-200 font-light flex flex-row ` +
      'justify-center items-center transition-all ease-out duration-200 hover:text-white hover:font-medium hover:shadow-hover',
    filter: `task-button text-gray-500 bg-transparent ${width} rounded-lg ` +
      'font-medium hover:text-blue-100 flex flex-row justify-center items-center shadow-sm shadow-gray-500/40',
    iconButton: 'flex justify-left w-[100%] m-w-max items-center h-[4vh] p-7 rounded-lg text-blue-200 font-light hover:text-white hover:bg-blue-200 disabled:bg-transparent disabled:text-gray-500',
    animated: `${width} text-blue-200 transition-all duration-500 hover:rotate-180`
  };

  return (
    <button
    className={variantStyle[variant]}
    onClick={onClick}
    disabled={disabled}
    {...rest}
  >
    {leftIcon && <span className="mr-2">{leftIcon}</span>}
    {label ? (
      <p className={`font-medium h-[6vh] p-4 justify-center items-center flex`}>
        {label}
      </p>
    ) : (
      children
    )}
    {rightIcon && <span className="ml-2">{rightIcon}</span>}
  </button>
  );
}

export default ButtonComponent;
