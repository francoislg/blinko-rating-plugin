/** @jsxImportSource preact */
import type { JSXInternal } from 'preact/src/jsx';

interface StarRatingProps {
  rating: number;
  hoverRating?: number;
  isInteractive?: boolean;
  onStarClick?: (rating: number) => void;
  onStarHover?: (rating: number) => void;
  onStarLeave?: () => void;
  disabled?: boolean;
}

export function StarRating({
  rating,
  hoverRating = 0,
  isInteractive = false,
  onStarClick,
  onStarHover,
  onStarLeave,
  disabled = false
}: StarRatingProps): JSXInternal.Element {
  const displayRating = hoverRating || rating;

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <span
          key={starValue}
          onClick={isInteractive && !disabled && onStarClick ? () => onStarClick(starValue) : undefined}
          onMouseEnter={isInteractive && !disabled && onStarHover ? () => onStarHover(starValue) : undefined}
          onMouseLeave={isInteractive && !disabled && onStarLeave ? onStarLeave : undefined}
          className={`inline-block transition-transform duration-200 origin-center text-lg ${
            isInteractive && !disabled ? 'cursor-pointer' : 'cursor-default'
          } ${isInteractive && hoverRating === starValue ? 'scale-140' : 'scale-120'}`}
          data-rating={starValue}
        >
          {starValue <= displayRating ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  );
}
