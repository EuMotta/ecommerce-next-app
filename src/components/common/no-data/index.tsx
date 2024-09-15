import Image from 'next/image';

import Heading from '../header';
import styles from './NoData.module.css';

export interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  image: string;
}

const NoData: React.FC<EmptyStateProps> = ({
  title = 'Nada foi encontrado =(',
  subtitle = 'Pedimos desculpas pelo transtorno!',
  image = '',
}: EmptyStateProps) => {
  return (
    <div className={styles.emptyState_content}>
      <Image src={image} width={150} height={150} alt={title} />
      <Heading center title={title} subtitle={subtitle} />
    </div>
  );
};

export default NoData;
