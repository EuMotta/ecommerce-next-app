'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import { Loading } from '@/components/loading';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

import { FeedbackType, feedbackTypes } from '..';

import { ScreenshotButton } from '../print-button';

const feedbackSchema = z.object({
  comment: z.string().min(1, 'O comentário é obrigatório.'),
  screenshot: z.string().nullable(),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      comment: '',
      screenshot: null,
    },
  });

  const {
    mutateAsync: sendFeedBack,
    isPending: isPendingSendFeedback,
    error,
  } = useMutation({
    mutationFn: async ({ comment, screenshot }: FeedbackFormData) => {
      try {
        const result = await axios.post('/feedbacks', {
          comment,
          screenshot,
        });
        return result;
      } catch (error: any) {
        throw new Error('Falha ao enviar feedback: ' + error.message);
      }
    },
    mutationKey: ['feedback'],
    onSuccess: (response: any) => {
      if (!response) {
        throw new Error('Erro ao enviar o feedback');
      }
      console.log('Feedback enviado com sucesso:', response);
    },
    onError: (error: any) => {
      console.error('Erro ao enviar feedback:', error.message);
    },
  });

  const onSubmit = async ({ comment, screenshot }: FeedbackFormData) => {
    try {
      await sendFeedBack({ comment, screenshot });
      onFeedbackSent();
    } catch (error: any) {
      console.error('Erro ao processar o feedback:', error.message);
    }
  };

  return (
    <>
      <header className="mb-4 flex">
        <Button
          size="icon"
          type="button"
          variant="link"
          className="rounded-full"
          onClick={onFeedbackRestartRequested}
          title="Voltar"
        >
          <AiOutlineArrowLeft className="h-4 w-4" />
        </Button>
        <span className="flex items-center gap-2 text-xl leading-6">
          <Image
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="h-6 w-6"
          />
          {feedbackTypeInfo.title}
        </span>
      </header>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          placeholder="Conte com detalhes o que está acontecendo..."
          {...register('comment')}
          className={`border ${
            errors.comment ? 'border-red-500' : 'border-gray-300'
          } rounded-md p-2`}
        />
        {errors.comment && (
          <p className="mt-1 text-sm text-red-500">{errors.comment.message}</p>
        )}

        {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}

        <footer className="mt-2 flex gap-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTaken={setScreenshot}
          />
          <Button
            type="submit"
            disabled={isPendingSendFeedback}
            className={`flex flex-1 items-center justify-center rounded-md border-transparent p-2 text-sm transition-colors ${
              isPendingSendFeedback
                ? 'bg-brand-500'
                : 'hover:bg-brand-300 focus:ring-brand-500'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900`}
          >
            {isPendingSendFeedback ? <Loading /> : 'Enviar feedback'}
          </Button>
        </footer>
      </form>
    </>
  );
}
