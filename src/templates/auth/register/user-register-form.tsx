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
import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { getMaxDate } from '@/utils/max-age';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const loginFormSchema = z
  .object({
    username: z.string().min(5, 'Por favor, insira seu usuario'),
    name: z.string().min(2, 'Por favor, insira seu nome'),
    last_name: z.string().min(2, 'Por favor, insira seu sobrenome'),
    email: z.string().email('Por favor, insira um email válido'),
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número'),
    confirmPassword: z.string(),
    birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

interface LoginFormData {
  username: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  birth_date: Date;
  confirmPassword: string;
}

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
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
    mutateAsync: sendFormData,
    isPending: isPendingSendForm,
  }: UseMutationResult<AxiosResponse, Error, LoginFormData> = useMutation({
    mutationFn: async (data: LoginFormData) => {
      try {
        const result = await axios.post('/api/auth/signup', data);
        return result;
      } catch (error: any) {
        throw new Error(
          'Falha ao cadastrar: ' + error.response?.data || error.message,
        );
      }
    },
    mutationKey: ['register'],
    onSuccess: async (response: AxiosResponse, data: LoginFormData) => {
      reset();
      toast(response.data || 'Cadastro realizado com sucesso!');

      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast.error('Erro ao fazer login: ' + result.error);
      } else {
        toast.success('Login realizado com sucesso! Encaminhando');
        router.push('/dashboard');
      }
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await sendFormData(data);
    } catch (error: any) {
      toast(error.message);
    }
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <div className="flex gap-5">
            <div className="grid gap-1">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Seu nome"
                type="text"
                autoCorrect="off"
                disabled={isPendingSendForm}
                {...register('name')}
              />
              {errors.name && (
                <span className="text-sm text-destructive">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                placeholder="Seu nome"
                type="text"
                autoCorrect="off"
                disabled={isPendingSendForm}
                {...register('username')}
              />
              {errors.username && (
                <span className="text-sm text-destructive">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className="grid gap-1">
              <Label htmlFor="last_name">Sobrenome</Label>
              <Input
                id="last_name"
                placeholder="Seu sobrenome"
                type="text"
                autoCorrect="off"
                disabled={isPendingSendForm}
                {...register('last_name')}
              />
              {errors.last_name && (
                <span className="text-sm text-destructive">
                  {errors.last_name.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid gap-1">
            <Label htmlFor="birth_date">Data de nascimento</Label>
            <Input
              id="birth_date"
              type="date"
              {...register('birth_date')}
              className="mb-2 rounded border p-2"
              max={getMaxDate()}
            />
            {errors.birth_date && (
              <span className="text-sm text-destructive">
                {errors.birth_date.message}
              </span>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isPendingSendForm}
              {...register('email')}
            />
            {errors.email && (
              <span className="text-sm text-destructive">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex gap-5">
            <div className="grid gap-1">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                placeholder="Sua senha"
                type="password"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isPendingSendForm}
                {...register('password')}
              />
              {errors.password && (
                <span className="text-sm text-destructive">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="grid gap-1">
              <Label htmlFor="confirmPassword">Repetir senha</Label>
              <Input
                id="confirmPassword"
                placeholder="Repita sua senha"
                type="password"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isPendingSendForm}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <span className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <Button disabled={isPendingSendForm}>
            {isPendingSendForm && (
              <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
            )}
            Criar conta
          </Button>
        </div>
      </form>
    </div>
  );
}
