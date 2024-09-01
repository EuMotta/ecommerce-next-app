'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center,
}: HeadingProps) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <h3>{title}</h3>
      <p className="text-red-500">{subtitle}</p>
    </div>
  );
};

export default Heading;
