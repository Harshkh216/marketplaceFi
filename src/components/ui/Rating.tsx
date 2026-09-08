import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
}

export function Rating({ rating, reviewCount, size = 'sm' }: RatingProps) {
  const starSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        <Star className={`${starSize} fill-lime-400 text-lime-400`} />
        <span className={`font-semibold text-navy-800 ${size === 'sm' ? 'text-sm' : 'text-base'}`}>
          {rating.toFixed(1)}
        </span>
      </div>
      {reviewCount !== undefined && (
        <span className={`text-navy-400 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          ({reviewCount.toLocaleString('en-IN')})
        </span>
      )}
    </div>
  );
}
