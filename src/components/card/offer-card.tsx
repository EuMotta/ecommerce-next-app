import Image from 'next/image';

interface OfferCard {
  src: string;
  alt: string;
  title: string;
  description: string;
}
export const OfferCard = ({ src, alt, title, description }: OfferCard) => {
  return (
    <div className="grid h-52 grid-cols-2 items-center bg-card shadow-md">
      <Image
        src={src}
        width={500}
        height={500}
        alt={alt}
        className="h-full overflow-hidden rounded-md object-cover"
        loading="lazy"
      />
      <div className="w-3/4 pl-4 text-left">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
