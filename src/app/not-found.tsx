'use client';

import EmptyState from '@/components/common/empty-state';

export default function Error() {
  return (
    <EmptyState
      title="Página não encontrada"
      subtitle="Você acessou uma pagina que não existe"
    />
  );
}
