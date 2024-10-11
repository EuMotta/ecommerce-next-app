import { Button } from '@/components/ui/button';

import styles from './Hero1.module.css';

const Hero = () => {
  return (
    <section>
      <div className={styles.hero}>
        <div className={styles.hero_container}>
          <div className={styles.hero_content}>
            <div className={styles.hero_text}>
              <h1>
                Produtos <span>INCRÍVEIS</span> de todos os tipos com os{' '}
                <span>MELHORES</span> preços
              </h1>
              <Button variant={'outline'}>Conferir produtos</Button>
            </div>
          </div>
        </div>
        <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
