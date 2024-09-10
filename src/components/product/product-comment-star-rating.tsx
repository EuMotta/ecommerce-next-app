import React, { useState } from 'react';

import { Star as StarIcon } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onChange: (rating: number) => void;
}

const ProductCommentStarRating = ({ rating, onChange }: StarRatingProps) => {
  const [hover, setHover] = useState<number | null>(null);

  const stars = [...Array(5)].map((_, i) => {
    const starRating = i + 1;
    const isFilled = starRating <= (hover ?? rating);
    const isHalf =
      (hover ?? rating) % 1 > 0 && starRating === Math.ceil(hover ?? rating);
    return { starRating, isFilled, isHalf };
  });

  return (
    <div className="flex items-center space-x-1">
      {stars.map(({ starRating, isFilled, isHalf }) => (
        <StarIcon
          key={starRating}
          size={24}
          className={`cursor-pointer ${
            isFilled ? 'text-yellow-500' : 'text-gray-300'
          }`}
          style={isHalf ? { clipPath: 'inset(0 50% 0 0)' } : {}}
          onMouseEnter={() => setHover(starRating)}
          onMouseLeave={() => setHover(null)}
          onClick={() => onChange(starRating)}
        />
      ))}
    </div>
  );
};

export default ProductCommentStarRating;
