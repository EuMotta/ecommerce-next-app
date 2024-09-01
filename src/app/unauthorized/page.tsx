import EmptyState from '@/components/common/empty-state';

const UnauthorizeState = () => {
  return (
    <EmptyState
      title="Calma ai!"
      subtitle="Você não tem permissão para acessar esta página"
      showReset
      label="Voltar para o inicio"
    />
  );
};

export default UnauthorizeState;
