'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Home, LineChart, Package } from 'lucide-react';

const NavLink = () => {
  const pathname = usePathname();
  const links = [
    {
      href: '/dashboard',
      icon: <Home className="h-4 w-4" />,
      label: 'Dashboard',
      badge: null,
    },

    {
      href: '/products',
      icon: <Package className="h-4 w-4" />,
      label: 'Products',
      badge: null,
    },

    {
      href: '/analytics',
      icon: <LineChart className="h-4 w-4" />,
      label: 'Analytics',
      badge: null,
    },
  ];
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {links.map(({ href, icon, label, badge }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive
                ? 'bg-muted text-primary'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            {icon}
            {label}
            {badge}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLink;
