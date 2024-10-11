import { OfferCard } from '@/components/card/offer-card';

import { offer } from '@/constants/home';

import styles from './Offer.module.css';
const Offer = () => {
  return (
    <section>
      <div className={styles.offer_content}>
        {offer.map((product, index) => (
          <OfferCard
            key={index}
            src={product.src}
            alt={product.alt}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Offer;
