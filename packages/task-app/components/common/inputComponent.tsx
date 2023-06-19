import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const InputComponent: React.FC<InputProps> = (props) => {
  return (
    <div className='flex flex-row bg-white rounded-lg shadow-sm p-2 gap-2'>
      {
        props.icon &&
        <span className='flex justify-center items-center'>
          {props.icon}
        </span>
      }
      <input className="w-26 bg-transparent outline-none" {...props} />
    </div>
  );
};
