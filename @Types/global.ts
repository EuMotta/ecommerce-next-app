import { ReactNode } from 'react';

export type ChildrenProps = {
  children: ReactNode;
};
export type ClassNames = {
  className?: string;
};
export type NavLink = {
  href: string;
  label: string;
};

export type NavbarProps = {
  navLinks: NavLink[];
};
