import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/components/logo';
import { buttonVariants } from '@/components/ui/button';
import { UserRegisterForm } from '@/templates/auth/register/user-register-form';

import { cn } from '@/lib/utils';

const page = () => {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/login.jpeg"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/login.jpeg"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div
          className="relative hidden h-full flex-col bg-muted p-10 dark:border-r md:flex"
          style={{
            backgroundImage: `url('/login.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div style={{ filter: 'drop-shadow(3px 3px 3px black)' }}>
            <Logo type="nome-slogan" size={223} themeMode="dark" />
          </div>
        </div>
        <div className="py-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Crie sua conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Insira seus dados para completar o cadastro
              </p>
            </div>
            <UserRegisterForm />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Já tem uma conta?
                </span>
              </div>
            </div>
            <Link
              href="/entrar"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'right-4 top-4 md:right-8 md:top-8',
              )}
            >
              Entrar
            </Link>
            <p className="px-8 text-center text-sm text-muted-foreground">
              Clicando em cadastrar, você aceita os{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termos de serviço
              </Link>{' '}
              e{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Politicas de privacidade
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
