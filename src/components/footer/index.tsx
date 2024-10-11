import Link from 'next/link';
import React from 'react';
import { BsInstagram, BsLinkedin } from 'react-icons/bs';

import { siteConfig } from '@/config/site';
import { env } from '@/lib/env';

const footerLinks = [
  {
    title: 'Company',
    links: [{ name: 'About', href: '/shopall/about' }],
  },
  {
    title: 'Help Center',
    links: [
      { name: 'Instagram', href: siteConfig.site.links.instagram },
      { name: 'Twitter', href: siteConfig.site.links.linkedin },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/system/privacy' },
      { name: 'Terms & Conditions', href: '/system/terms' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-muted px-4 py-6">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h2 className="mb-6 text-sm font-semibold uppercase">
                {section.title}
              </h2>
              <ul className="font-medium">
                {section.links.map((link) => (
                  <li className="mb-4" key={link.name}>
                    <Link href={link.href} className="hover:underline">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="md:flex md:items-center md:justify-between">
          <span className="text-sm sm:text-center">
            © {new Date().getFullYear()}{' '}
            <Link href={env.FULL_URL}>{siteConfig.site.name}</Link>. Todos os
            direitos reservados
          </span>
          <div className="mt-4 flex space-x-5 sm:justify-center md:mt-0 rtl:space-x-reverse">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                aria-label={social.label}
              >
                <social.icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const socialLinks = [
  {
    name: 'Instagram',
    href: siteConfig.site.links.instagram,
    label: 'Instagram page',
    icon: BsInstagram,
  },
  {
    name: 'Linkedin',
    href: siteConfig.site.links.linkedin,
    label: 'Linkedin',
    icon: BsLinkedin,
  },
];

export default Footer;
