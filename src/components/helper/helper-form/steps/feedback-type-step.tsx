import Image from 'next/image';

import { Button } from '@/components/ui/button';

import { FeedbackType, feedbackTypes } from '..';

interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export function FeedbackTypeStep({
  onFeedbackTypeChanged,
}: FeedbackTypeStepProps) {
  return (
    <>
      <header className="flex items-center justify-between">
        <span className="text-xl leading-6">Deixe seu feedback</span>
      </header>

      <div className="grid gap-4 py-8 sm:grid-cols-2 md:grid-cols-3">
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <Button
              className="hover:border-brand-500 focus:border-brand-500 flex w-full flex-col items-center gap-5 rounded-lg border py-5 focus:outline-none"
              type="button"
              variant="link"
              onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
              key={key}
            >
              <Image
                src={value.image.source}
                alt={value.image.alt}
                width={50}
                height={50}
              />
              <span className="text-sm font-medium">{value.title}</span>
            </Button>
          );
        })}
      </div>
    </>
  );
}
