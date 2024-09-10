import { Skeleton } from '../ui/skeleton';

interface SkeletonCards extends React.HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
  quantity: number;
}
const SkeletonCards = ({
  width,
  height,
  quantity = 1,
  ...props
}: SkeletonCards) => {
  return (
    <div {...props}>
      {Array.from({ length: quantity }).map((_, index) => (
        <Skeleton
          key={index}
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      ))}
    </div>
  );
};

export default SkeletonCards;
