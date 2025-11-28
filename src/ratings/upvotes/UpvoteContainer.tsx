/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import { UserAvatar } from '../../components/UserAvatar';
import { useRatingsStats } from '../../helpers/useRatingsStats';

interface UpvoteComponentProps {
  noteId: string;
  ratings: Record<string, number>;
  currentUserId: string;
  onRatingChange: (rating: number) => Promise<void>;
  label?: string;
}

export function UpvoteContainer({ noteId, ratings, currentUserId, onRatingChange, label }: UpvoteComponentProps): JSXInternal.Element {
  const { userRating, totalPoints, voteCount, allRatings, otherUsersVotes, isMultiUserMode, updateVote, resetVote } = useRatingsStats(ratings, currentUserId);

  const [isSaving, setIsSaving] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const i18n = window.Blinko.i18n;

  const handleVote = async (newVote: number) => {
    if (isSaving) return;

    const actualVote = userRating === newVote ? 0 : newVote;

    setIsSaving(true);
    updateVote(actualVote);

    try {
      await onRatingChange(actualVote);

      if (actualVote === 0) {
        window.Blinko.toast.success(i18n.t('ratings_rating.voteCleared'));
      } else {
        window.Blinko.toast.success(
          actualVote === 1
            ? i18n.t('ratings_rating.upvoted')
            : i18n.t('ratings_rating.downvoted')
        );
      }
    } catch (error) {
      resetVote();
      window.Blinko.toast.error(i18n.t('ratings_rating.failedToSave'));
    } finally {
      setIsSaving(false);
    }
  };

  const VoteButtons = ({ currentVote, onVote, disabled }: { currentVote: number, onVote: (vote: number) => void, disabled: boolean }) => (
    <div className="flex gap-1">
      <button
        onClick={() => onVote(1)}
        disabled={disabled}
        className={`px-2.5 py-1 text-sm border rounded transition-all ${
          disabled ? 'cursor-wait opacity-50' : 'cursor-pointer'
        } ${
          currentVote === 1
            ? 'bg-green-500/10 text-green-600 border-green-600/50 font-semibold'
            : 'bg-transparent text-gray-500/80 border-gray-500/30 hover:bg-green-500/15 hover:border-green-600/50'
        }`}
      >
        +1
      </button>
      <button
        onClick={() => onVote(-1)}
        disabled={disabled}
        className={`px-2.5 py-1 text-sm border rounded transition-all ${
          disabled ? 'cursor-wait opacity-50' : 'cursor-pointer'
        } ${
          currentVote === -1
            ? 'bg-red-500/10 text-red-600 border-red-600/50 font-semibold'
            : 'bg-transparent text-gray-500/80 border-gray-500/30 hover:bg-red-500/15 hover:border-red-600/50'
        }`}
      >
        -1
      </button>
    </div>
  );

  if (isMultiUserMode) {
    if (!isExpanded) {
      return (
        <div
          className={`blinko-upvote-plugin p-3 pt-3 pb-2 mt-3 border-t border-gray-500/20 select-none w-full box-border shrink-0 transition-opacity ${isSaving ? 'opacity-60' : 'opacity-100'}`}
          data-note-id={noteId}
        >
          {label && (
            <div className="text-[11px] font-medium text-gray-500/70 mb-2">
              {label}
            </div>
          )}

          <div className="flex items-center gap-2 mb-2 text-xs text-gray-500/80">
            <span className="font-medium min-w-[80px]">{i18n.t('ratings_rating.totalPoints')}</span>
            <span className={`text-sm font-semibold ${
              totalPoints > 0 ? 'text-green-600' : totalPoints < 0 ? 'text-red-600' : 'text-gray-500/80'
            }`}>
              {totalPoints > 0 ? '+' : ''}{totalPoints}
            </span>
            <span className="text-gray-500/60">
              ({voteCount} {i18n.t('ratings_rating.vote', { count: voteCount })})
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
            {userRating !== 0 ? (
              <div className={`text-xs font-semibold ${
                userRating === 1 ? 'text-green-600' : 'text-red-600'
              }`}>
                {userRating === 1 ? '+1' : '-1'}
              </div>
            ) : (
              <div className="text-[11px] text-gray-500/60">
                {i18n.t('ratings_rating.notVoted')}
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
        className={`blinko-upvote-plugin p-3 pt-3 pb-2 mt-3 border-t border-gray-500/20 select-none w-full box-border shrink-0 transition-opacity ${isSaving ? 'opacity-60' : 'opacity-100'}`}
        data-note-id={noteId}
      >
        {label && (
          <div className="text-[11px] font-medium text-gray-500/70 mb-2">
            {label}
          </div>
        )}

        <div className="flex items-center justify-between mb-3 text-[13px] text-gray-500/90 font-medium">
          <span>{i18n.t('ratings_rating.totalPoints')}
            <span className={`ml-2 font-semibold ${
              totalPoints > 0 ? 'text-green-600' : totalPoints < 0 ? 'text-red-600' : 'text-gray-500/80'
            }`}>
              {totalPoints > 0 ? '+' : ''}{totalPoints}
            </span>
          </span>
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
            <VoteButtons currentVote={userRating} onVote={handleVote} disabled={isSaving} />
            {userRating !== 0 && (
              <div className="text-[11px] text-gray-500/60 ml-1">
                ({userRating === 1 ? '+1' : '-1'})
              </div>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-500/80 mb-1.5 font-medium">
          {i18n.t('ratings_rating.otherVotes')}
        </div>
        <div className="flex flex-col gap-2">
          {otherUsersVotes.map(([userId, userVote]) => (
            <div
              key={userId}
              className="flex items-center gap-2 p-1.5 bg-gray-500/5 rounded-md"
            >
              <UserAvatar userId={userId} size={24} isCurrentUser={false} />
              <div className="text-[11px] text-gray-500/70 min-w-[60px]">
                {i18n.t('ratings_rating.user', { id: userId.substring(0, 6) })}
              </div>
              <div className={`text-xs font-semibold ${
                userVote === 1 ? 'text-green-600' : 'text-red-600'
              }`}>
                {userVote === 1 ? '+1' : '-1'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`blinko-upvote-plugin flex items-center gap-2 p-3 pt-3 pb-2 mt-3 border-t border-gray-500/20 text-sm select-none w-full box-border shrink-0 transition-opacity ${isSaving ? 'opacity-60' : 'opacity-100'}`}
      data-note-id={noteId}
    >
      {label && (
        <div className="text-[11px] font-medium text-gray-500/70 mr-2">
          {label}
        </div>
      )}

      <VoteButtons currentVote={userRating} onVote={handleVote} disabled={isSaving} />
      <span className="text-xs text-gray-500/80 ml-1">
        {userRating !== 0 ? (userRating === 1 ? '+1' : '-1') : i18n.t('ratings_rating.notVoted')}
      </span>
    </div>
  );
}
