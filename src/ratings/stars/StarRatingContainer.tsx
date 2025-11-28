/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import { StarRating } from './StarRating';
import { UserAvatar } from '../../components/UserAvatar';
import { useRatingsStats } from '../../hooks/useRatingsStats';
import { useUserData } from '../../hooks/useUserData';

interface RatingComponentProps {
  noteId: string;
  ratings: Record<string, number>;
  currentUserId: string;
  onRatingChange: (rating: number) => Promise<void>;
  label?: string;
}

function UserRatingRow({ userId, rating }: { userId: string; rating: number }): JSXInternal.Element {
  const userData = useUserData(userId);
  const i18n = window.Blinko.i18n;

  return (
    <div className="flex items-center gap-2 p-1.5 bg-gray-500/5 rounded-md">
      <UserAvatar userId={userId} size={24} isCurrentUser={false} />
      <div className="text-[11px] text-gray-500/70 min-w-[60px]">
        {userData.nickname || i18n.t('ratings_rating.user', { id: userId.substring(0, 6) })}
      </div>
      <StarRating rating={rating} isInteractive={false} />
      <div className="text-[11px] text-gray-500/60 ml-1">
        ({rating}/5)
      </div>
    </div>
  );
}

export function StarRatingContainer({ noteId, ratings, currentUserId, onRatingChange, label }: RatingComponentProps): JSXInternal.Element {
  const { userRating, averageRating, voteCount, allRatings, otherUsersVotes, isMultiUserMode, updateVote, resetVote } = useRatingsStats(ratings, currentUserId);

  const [hoverRating, setHoverRating] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const i18n = window.Blinko.i18n;

  const handleStarClick = async (newRating: number) => {
    if (isSaving) return;

    setIsSaving(true);
    updateVote(newRating);

    try {
      await onRatingChange(newRating);
      window.Blinko.toast.success(i18n.t('ratings_rating.ratedStars', { count: newRating }));
    } catch (error) {
      resetVote();
      window.Blinko.toast.error(i18n.t('ratings_rating.failedToSave'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearRating = async () => {
    if (isSaving) return;

    setIsSaving(true);
    updateVote(0);

    try {
      await onRatingChange(0);
      window.Blinko.toast.success(i18n.t('ratings_rating.ratingCleared'));
    } catch (error) {
      resetVote();
      window.Blinko.toast.error(i18n.t('ratings_rating.failedToClear'));
    } finally {
      setIsSaving(false);
    }
  };

  if (isMultiUserMode) {
    if (!isExpanded) {
      return (
        <div
          className={`blinko-rating-plugin p-3 pt-3 pb-2 mt-3 border-t border-gray-500/20 select-none w-full box-border shrink-0 transition-opacity ${isSaving ? 'opacity-60' : 'opacity-100'}`}
          data-note-id={noteId}
        >
          {label && (
            <div className="text-[11px] font-medium text-gray-500/70 mb-2">
              {label}
            </div>
          )}

          <div className="flex items-center gap-2 mb-2 text-xs text-gray-500/80">
            <span className="font-medium min-w-[60px]">{i18n.t('ratings_rating.average')}</span>
            <StarRating rating={averageRating} isInteractive={false} />
            <span className="text-gray-500/60">
              {averageRating.toFixed(1)}/5 ({voteCount} {i18n.t('ratings_rating.vote', { count: voteCount })})
            </span>
          </div>

          <div
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 p-1.5 bg-gray-500/5 rounded-md cursor-pointer transition-colors hover:bg-gray-500/10"
          >
            <UserAvatar userId={currentUserId} size={24} isCurrentUser={true} />
            <div className="text-[11px] text-gray-500/70 min-w-[60px]">
              {i18n.t('ratings_rating.you')}
            </div>
            {userRating > 0 ? (
              <>
                <StarRating rating={userRating} isInteractive={false} />
                <div className="text-[11px] text-gray-500/60 ml-1">
                  ({userRating}/5)
                </div>
              </>
            ) : (
              <div className="text-[11px] text-gray-500/60">
                {i18n.t('ratings_rating.notRated')}
              </div>
            )}
            <div className="ml-auto text-[11px] text-gray-500/70 font-medium">
              {i18n.t('ratings_rating.voteButton')}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`blinko-rating-plugin p-3 pt-3 pb-2 mt-3 border-t border-gray-500/20 select-none w-full box-border shrink-0 transition-opacity ${isSaving ? 'opacity-60' : 'opacity-100'}`}
        data-note-id={noteId}
      >
        {label && (
          <div className="text-[11px] font-medium text-gray-500/70 mb-2">
            {label}
          </div>
        )}

        <div className="flex items-center justify-between mb-3 text-[13px] text-gray-500/90 font-medium">
          <span>{i18n.t('ratings_rating.average')} {averageRating.toFixed(1)}/5</span>
          <span>({voteCount} {i18n.t('ratings_rating.vote', { count: voteCount })})</span>
          <button
            onClick={() => setIsExpanded(false)}
            className="px-2 py-0.5 text-[11px] cursor-pointer border border-gray-500/30 rounded bg-transparent text-gray-500/80 transition-all hover:bg-gray-500/10"
          >
            {i18n.t('ratings_rating.collapse')}
          </button>
        </div>

        <div className="mb-3 pb-3 border-b border-gray-500/10">
          <div className="flex items-center gap-2 p-1.5 bg-gray-500/5 rounded-md">
            <UserAvatar userId={currentUserId} size={24} isCurrentUser={true} />
            <div className="text-[11px] text-gray-500/70 min-w-[60px]">
              {i18n.t('ratings_rating.you')}
            </div>
            <StarRating
              rating={userRating}
              hoverRating={hoverRating}
              isInteractive={true}
              onStarClick={handleStarClick}
              onStarHover={setHoverRating}
              onStarLeave={() => setHoverRating(0)}
              disabled={isSaving}
            />
            {userRating > 0 && (
              <>
                <div className="text-[11px] text-gray-500/60 ml-1">
                  ({userRating}/5)
                </div>
                <button
                  onClick={handleClearRating}
                  disabled={isSaving}
                  className={`ml-auto px-2 py-0.5 text-[11px] border border-gray-500/30 rounded bg-transparent text-gray-500/80 transition-all hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500/80 ${isSaving ? 'cursor-wait opacity-50' : 'cursor-pointer'}`}
                >
                  {i18n.t('ratings_rating.clear')}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-500/80 mb-1.5 font-medium">
          {i18n.t('ratings_rating.otherVotes')}
        </div>
        <div className="flex flex-col gap-2">
          {otherUsersVotes.map(([userId, userRating]) => (
            <UserRatingRow key={userId} userId={userId} rating={userRating} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`blinko-rating-plugin flex items-center gap-1 p-3 pt-3 pb-2 mt-3 border-t border-gray-500/20 text-lg select-none w-full box-border shrink-0 transition-opacity ${isSaving ? 'opacity-60' : 'opacity-100'}`}
      data-note-id={noteId}
    >
      {label && (
        <div className="text-[11px] font-medium text-gray-500/70 mr-2">
          {label}
        </div>
      )}

      <StarRating
        rating={userRating}
        hoverRating={hoverRating}
        isInteractive={true}
        onStarClick={handleStarClick}
        onStarHover={setHoverRating}
        onStarLeave={() => setHoverRating(0)}
        disabled={isSaving}
      />
      <span className="text-xs text-gray-500/80 ml-2">
        {userRating > 0 ? `${userRating}/5` : i18n.t('ratings_rating.notRatedShort')}
      </span>
      {userRating > 0 && (
        <button
          onClick={handleClearRating}
          disabled={isSaving}
          className={`ml-2 px-2 py-0.5 text-[11px] border border-gray-500/30 rounded bg-transparent text-gray-500/80 transition-all hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500/80 ${isSaving ? 'cursor-wait opacity-50' : 'cursor-pointer'}`}
        >
          {i18n.t('ratings_rating.clear')}
        </button>
      )}
    </div>
  );
}
