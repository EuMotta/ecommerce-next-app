'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';

interface LogoTypes {
  normal: { light: string; dark: string };
  nome: { light: string; dark: string };
  imagem: { light: string; dark: string };
  alinhado: { light: string; dark: string };
  'nome-slogan': { light: string; dark: string };
}

const LOGO_TYPES: LogoTypes = {
  normal: {
    light: '/shopall-normal.svg',
    dark: '/shopall-normal-dark.svg',
  },
  nome: {
    light: '/shopall-nome.svg',
    dark: '/shopall-nome-dark.svg',
  },
  'nome-slogan': {
    light: '/shopall-nome-slogan.svg',
    dark: '/shopall-nome-slogan-dark.svg',
  },
  imagem: {
    light: '/shopall-imagem.svg',
    dark: '/shopall-imagem-dark.svg',
  },
  alinhado: {
    light: '/shopall-alinhado.svg',
    dark: '/shopall-alinhado-dark.svg',
  },
};

interface LogoProps {
  type?: keyof LogoTypes;
  size?: number;
  themeMode?: 'light' | 'dark';
}

const Logo = ({ type = 'normal', size = 100, themeMode }: LogoProps) => {
  const { theme: currentTheme } = useTheme();
  const theme = themeMode || currentTheme;

  const logoType = LOGO_TYPES[type] ? type : 'normal';
  const logoSrc = LOGO_TYPES[logoType][theme === 'dark' ? 'dark' : 'light'];

  return (
    <Image
      src={logoSrc}
      alt={`${logoType} logo`}
      width={size}
      height={size}
      priority
      className="object-contain"
    />
  );
};

export default Logo;
