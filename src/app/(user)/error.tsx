'use client';

import EmptyState from '@/components/common/empty-state';

interface ErrorStateProps {
  error: Error;
  reset: () => void;
}

const Error: React.FC<ErrorStateProps> = ({
  error,
  reset,
}: ErrorStateProps) => {
  return (
    <EmptyState
      title="Aconteceu um problema!"
      subtitle={error.message || 'Não sei ainda o que é, mas vou descobrir!.'}
      showReset
      label="Tentar novamente"
      reset={reset}
    />
  );
};

export default Error;
