import React from 'react';

interface BurgerProps {
  //eslint-disable-next-line
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isOpen: boolean;
}

function Burger({
  onClick,
    isOpen,
} : BurgerProps) {
  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="text-black hover:text-blue-200 focus:outline-none focus:text-black"
        onClick={onClick}
      >
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          {isOpen ? (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z"
            />
          ) : (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16ZM4 11H20V13H4V11Z"
            />
          )}
        </svg>
      </button>
    </div>
  );
}

export default Burger;
