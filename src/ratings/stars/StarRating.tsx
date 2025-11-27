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
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((starValue) => (
        <span
          key={starValue}
          onClick={isInteractive && !disabled && onStarClick ? () => onStarClick(starValue) : undefined}
          onMouseEnter={isInteractive && !disabled && onStarHover ? () => onStarHover(starValue) : undefined}
          onMouseLeave={isInteractive && !disabled && onStarLeave ? onStarLeave : undefined}
          style={{
            cursor: isInteractive && !disabled ? 'pointer' : 'default',
            transition: 'transform 0.2s ease',
            display: 'inline-block',
            transform: (isInteractive && hoverRating === starValue) ? 'scale(1.4)' : 'scale(1.2)',
            transformOrigin: 'center',
            fontSize: '18px'
          }}
          data-rating={starValue}
        >
          {starValue <= displayRating ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  );
}
