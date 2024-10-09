'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';

import { cn } from '@/lib/utils';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Por favor, insira seu email')
    .email('Email inválido'),
  password: z.string().min(1, 'Por favor, insira sua senha'),
});

interface LoginFormData {
  email: string;
  password: string;
}

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const router = useRouter();

  const {
    mutateAsync: loginUser,
    isPending: isPendingLogin,
  }: UseMutationResult<any, Error, LoginFormData> = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        throw new Error('Erro ao fazer login: ' + result.error);
      }

      return result;
    },
    mutationKey: ['login'],
    onSuccess: () => {
      reset();
      toast.success('Login realizado com sucesso! Encaminhando...');
      router.push('/products');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginUser(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isPendingLogin}
              {...register('email')}
            />
            {errors.email && (
              <span className="text-sm text-destructive">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              placeholder="Sua senha"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isPendingLogin}
              {...register('password')}
            />
            {errors.password && (
              <span className="text-sm text-destructive">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button disabled={isPendingLogin} type="submit">
            {isPendingLogin && (
              <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
            )}
            entrar
          </Button>
        </div>
      </form>
    </div>
  );
}
