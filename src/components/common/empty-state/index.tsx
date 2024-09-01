'use client';

import { useRouter } from 'next/navigation';

import Heading from '../header';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  label?: string;
  reset?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Aconteceu um problema!',
  subtitle = 'Não sei ainda o que é, mas vou descobrir!',
  label = 'Tente novamente',
  showReset,
  reset,
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div className={styles.emptyState_content}>
      <Heading center title={title} subtitle={subtitle} />
      <div className={styles.emptyState_buttons}>
        {showReset && <button onClick={() => reset && reset()}>{label}</button>}
        <button onClick={() => router.push('/')}>Voltar</button>
      </div>
    </div>
  );
};

export default EmptyState;
