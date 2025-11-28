import { useMemo, useState, useCallback } from 'preact/hooks';

export interface RatingsStats {
  userRating: number;
  averageRating: number;
  voteCount: number;
  totalPoints: number;
  allRatings: Record<string, number>;
  ratingValues: number[];
  otherUsersVotes: [string, number][];
  isMultiUserMode: boolean;
  updateVote: (newVote: number) => void;
  resetVote: () => void;
}

/**
 * Custom hook for calculating rating statistics with memoization and local vote management
 */
export function useRatingsStats(
  ratings: Record<string, number>,
  currentUserId: string
): RatingsStats {
  const [localVote, setLocalVote] = useState<number | null>(null);

  // Compute effective ratings by applying local vote override
  const effectiveRatings = useMemo(() => {
    const result = { ...(ratings || {}) };

    if (localVote !== null) {
      if (localVote === 0) {
        delete result[currentUserId];
      } else {
        result[currentUserId] = localVote;
      }
    }

    return result;
  }, [ratings, currentUserId, localVote]);

  // Compute statistics based on effective ratings
  const stats = useMemo(() => {
    const ratingValues = Object.values(effectiveRatings);
    const voteCount = ratingValues.length;
    const averageRating = voteCount > 0
      ? ratingValues.reduce((a, b) => a + b, 0) / voteCount
      : 0;
    const totalPoints = ratingValues.reduce((sum, value) => sum + value, 0);
    const userRating = effectiveRatings[currentUserId] || 0;
    const otherUsersVotes = Object.entries(effectiveRatings).filter(([userId]) => userId !== currentUserId);
    const isMultiUserMode = otherUsersVotes.length > 0;

    return {
      userRating,
      averageRating,
      voteCount,
      totalPoints,
      allRatings: effectiveRatings,
      ratingValues,
      otherUsersVotes,
      isMultiUserMode
    };
  }, [effectiveRatings, currentUserId]);

  // Update the local vote optimistically
  const updateVote = useCallback((newVote: number) => {
    setLocalVote(newVote);
  }, []);

  // Reset local vote to original state
  const resetVote = useCallback(() => {
    setLocalVote(null);
  }, []);

  return {
    ...stats,
    updateVote,
    resetVote
  };
}
