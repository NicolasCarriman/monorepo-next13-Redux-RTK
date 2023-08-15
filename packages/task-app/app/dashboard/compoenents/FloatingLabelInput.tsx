import React, { useState, useEffect } from 'react';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    children?: React.ReactNode;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ placeholder, children, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(!!rest.value);
  }, [rest.value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    if (rest.onChange) {
      rest.onChange(e);
    }
  };

  return (
    <div className='relative w-full'>
      <input 
        {...rest} 
        placeholder="" 
        className='block w-full px-2 py-3 text-xl bg-gray-100 border-none outline-none focus:border-blue-500 transition duration-200' // Ajuste del padding aquí
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleInputChange}
      />
      <span className={`absolute left-2 bottom-2 text-xl transition-transform duration-300 transform pointer-events-none ${isFocused || hasValue ? 'move-up text-gray-700' : 'text-gray-400'}`}>{placeholder}</span> {/* Ajuste de la posición bottom aquí */}
      {children}

      <style jsx>{`
        .move-up {
          transform: translateY(-2.25rem) scale(1);
          color: #3182ce; // Color de foco
        }
      `}</style>
    </div>
  );
}

export default FloatingLabelInput;





