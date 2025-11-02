import React, { useState } from 'react';
import { StarIcon } from './Icons';

interface StarRatingProps {
  count?: number;
  value: number;
  onChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ count = 5, value, onChange }) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

  return (
    <div className="flex items-center space-x-1">
      {[...Array(count)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              className="sr-only"
              value={ratingValue}
              onClick={() => onChange(ratingValue)}
            />
            <StarIcon
              className={`w-8 h-8 cursor-pointer transition-colors ${
                (hoverValue || value) >= ratingValue ? 'text-yellow-400' : 'text-gray-600'
              }`}
              onMouseEnter={() => setHoverValue(ratingValue)}
              onMouseLeave={() => setHoverValue(undefined)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;