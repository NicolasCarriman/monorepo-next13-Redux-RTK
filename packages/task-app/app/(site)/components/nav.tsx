'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import trex from '../../../public/dino1.png';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Burger from '@app/components/common/burger';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/product', label: 'Producto' },
  { href: '/about', label: 'Acerca de' },
  { href: '/contact', label: 'Contacto' },
];

const HeaderNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

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
              {
                links.map((link) => (
                  <div key={link.href}>
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative text-gray-600 hover:text-gray-900"
                    >
                      {link.href === path && (
                        <motion.span
                          layoutId="underline"
                          className="absolute left-0 top-full block h-[1px] w-full bg-black"
                        />
                      )}
                      {link.label}
                    </Link>
                  </div>
                ))
              }
            </div>
          </div>
            <Burger onClick={toggleMenu} isOpen={isOpen}/>
        </div>
        {isOpen && (
          <div className="sm:hidden mt-4">
            {
              links.map((link) => (
                <div key={link.href}>
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative text-gray-600 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </div>
              ))
            }
          </div>
        )}
      </nav>
    </header >
  );
};

export default HeaderNav;
