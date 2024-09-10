import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader, SendHorizonal } from 'lucide-react';
import { z } from 'zod';

import CepInput from './cep-input';

const cepFormSchema = z.object({
  cep: z
    .string()
    .min(9, 'CEP deve ter 8 números')
    .regex(/^\d{5}-\d{3}$/, 'Formato de CEP inválido'),
});

type CepFormData = z.infer<typeof cepFormSchema>;

const CepInputForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CepFormData>({
    resolver: zodResolver(cepFormSchema),
  });

  const submitCep = async (data: CepFormData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('CEP enviado com sucesso:', data);
        resolve(data);
      }, 2000);
    });
  };

  const { mutateAsync: sendCEP, isPending: isPendingCEPVerify } = useMutation({
    mutationFn: submitCep,
    mutationKey: ['cep'],
    onSuccess: () => {
      console.log('CEP');
    },
    onError: (error: Error) => {
      console.error('Erro ao enviar o CEP:', error.message);
    },
  });

  const onSubmit = async (data: CepFormData) => {
    try {
      await sendCEP(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex gap-5">
        <div className="w-full max-w-[15vw]">
          <CepInput
            {...register('cep', {
              required: 'O CEP é obrigatório',
            })}
          />
        </div>
        <Button type="submit" size={'icon'} disabled={isPendingCEPVerify}>
          {isPendingCEPVerify ? (
            <Loader className="animate-spin" />
          ) : (
            <SendHorizonal />
          )}
        </Button>
      </div>
      {errors.cep && (
        <p className="text-sm text-destructive">{errors.cep.message}</p>
      )}
    </form>
  );
};

export default CepInputForm;
