import Container from '@/components/common/container';
import Section from '@/components/common/section';

import styles from './hero.module.css';

interface heroProps {}

const Hero: React.FC<heroProps> = () => {
  return (
    <Section>
      <Container className={styles.container}>hero</Container>
    </Section>
  );
};

export default Hero;
