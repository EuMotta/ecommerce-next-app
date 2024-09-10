import { Star as StarIcon } from 'lucide-react';

interface StarRating {
  rating: number;
}
const StarRating = ({ rating }: StarRating) => {
  const maxRating = 5;
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = maxRating - filledStars - (halfStar ? 1 : 0);
  return (
    <div className="flex items-center space-x-1">
      {[...Array(filledStars)].map((_, i) => (
        <StarIcon key={`filled-${i}`} size={15} className="text-yellow-500" />
      ))}
      {halfStar && (
        <StarIcon
          className="text-yellow-500"
          style={{ clipPath: 'inset(0 50% 0 0)' }}
          size={15}
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={`empty-${i}`} size={15} className="text-gray-300" />
      ))}
    </div>
  );
};

export default StarRating;
