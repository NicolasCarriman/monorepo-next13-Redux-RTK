'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import trex from '../../../public/dino1.png';

const HeaderNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="border border-gray-400 rounded-2xl m-2">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between w-[60%]">
            <div className="mr-2">
              <Image
                src={trex}
                alt={'t-rex'}
                width={'40'}
                height={'40'}
              />
            </div>
            <div className="hidden sm:flex flex-row gap-6">
              <a href="#" className="font-medium ml-4 border border-white hover:border-b-1 hover:border-b-black transition-all-ease duration-75">Inicio</a>
              <a href="#" className="font-medium ml-4 border border-white hover:border-b-1 hover:border-b-black transition-all-ease duration-75">Producto</a>
              <a href="#" className="font-medium border border-white hover:border-b-1 hover:border-b-black transition-all-ease duration-75">Acerca de</a>
              <a href="#" className="font-medium border border-white hover:border-b-1 hover:border-b-black transition-all-ease duration-75">Contacto</a>
            </div>
          </div>
          <div className="sm:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-white focus:outline-none focus:text-white"
              onClick={toggleMenu}
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
        </div>
        {isOpen && (
          <div className="sm:hidden mt-4">
            <a href="#" className="block text-gray-300 hover:text-white py-2">Inicio</a>
            <a href="#" className="block text-gray-300 hover:text-white py-2">Servicios</a>
            <a href="#" className="block text-gray-300 hover:text-white py-2">Acerca de</a>
            <a href="#" className="block text-gray-300 hover:text-white py-2">Contacto</a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default HeaderNav;
