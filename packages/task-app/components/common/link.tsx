import Link from 'next/link';
import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

function SideBarLink({
  href,
  children,
} : LinkProps) {
  return (
    <Link href={href} className='w-full'>
      {children}
    </Link>
  );
}

export default SideBarLink;
