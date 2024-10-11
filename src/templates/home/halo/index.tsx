import Image from 'next/image';

import Container from '@/components/common/container';
import { Button } from '@/components/ui/button';

import styles from './Halo.module.css';

const Halo = () => {
  return (
    <Container>
      <div className={styles.halo}>
        <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
          <Image
            height={500}
            width={500}
            src="/home/computer.jpg"
            alt="computer"
          />
        </div>
        <div className={styles.halo_container}>
          <div className={styles.halo_content}>
            <div className={styles.halo_text}>
              <h1>
                Computadores e periféricos de <span>ULTIMA GERAÇÃO</span> com o{' '}
                <span>MELHOR</span> preço do mercado preços
              </h1>
              <Button variant={'outline'}>Conferir produtos</Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Halo;
