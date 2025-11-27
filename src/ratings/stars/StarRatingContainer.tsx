/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import { StarRating } from './StarRating';
import { UserAvatar } from '../../components/UserAvatar';

interface RatingComponentProps {
  noteId: string;
  initialRating: number;
  averageRating: number;
  voteCount: number;
  allRatings: Record<string, number>;
  currentUserId: string;
  onRatingChange: (rating: number) => Promise<void>;
  label?: string;
}

export function StarRatingContainer({ noteId, initialRating, averageRating, voteCount, allRatings, currentUserId, onRatingChange, label }: RatingComponentProps): JSXInternal.Element {
  const [rating, setRating] = useState(initialRating);
  const [avgRating, setAvgRating] = useState(averageRating);
  const [votes, setVotes] = useState(voteCount);
  const [localAllRatings, setLocalAllRatings] = useState(allRatings);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const i18n = window.Blinko.i18n;

  const otherUsersVotes = Object.entries(localAllRatings).filter(([userId]) => userId !== currentUserId);
  const isMultiUserMode = otherUsersVotes.length > 0;

  const handleStarClick = async (newRating: number) => {
    if (isSaving) return;

    setIsSaving(true);
    const oldRating = rating;
    const oldVotes = votes;
    const oldAvg = avgRating;
    const oldAllRatings = localAllRatings;

    setRating(newRating);
    const updatedAllRatings = { ...localAllRatings, [currentUserId]: newRating };
    setLocalAllRatings(updatedAllRatings);

    try {
      await onRatingChange(newRating);

      let newVotes = oldVotes;
      let newAvg = oldAvg;

      if (oldRating === 0 && newRating > 0) {
        newVotes = oldVotes + 1;
        newAvg = ((oldAvg * oldVotes) + newRating) / newVotes;
      } else if (oldRating > 0 && newRating > 0) {
        newAvg = ((oldAvg * oldVotes) - oldRating + newRating) / oldVotes;
      }

      setVotes(newVotes);
      setAvgRating(newAvg);

      window.Blinko.toast.success(i18n.t('rating.ratedStars', { count: newRating }));
    } catch (error) {
      setRating(oldRating);
      setVotes(oldVotes);
      setAvgRating(oldAvg);
      setLocalAllRatings(oldAllRatings);
      window.Blinko.toast.error(i18n.t('rating.failedToSave'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearRating = async () => {
    if (isSaving) return;

    setIsSaving(true);
    const oldRating = rating;
    const oldVotes = votes;
    const oldAvg = avgRating;
    const oldAllRatings = localAllRatings;

    setRating(0);
    const updatedAllRatings = { ...localAllRatings };
    delete updatedAllRatings[currentUserId];
    setLocalAllRatings(updatedAllRatings);

    try {
      await onRatingChange(0);

      const newVotes = Math.max(0, oldVotes - 1);
      let newAvg = 0;

      if (newVotes > 0) {
        newAvg = ((oldAvg * oldVotes) - oldRating) / newVotes;
      }

      setVotes(newVotes);
      setAvgRating(newAvg);

      window.Blinko.toast.success(i18n.t('rating.ratingCleared'));
    } catch (error) {
      setRating(oldRating);
      setVotes(oldVotes);
      setAvgRating(oldAvg);
      setLocalAllRatings(oldAllRatings);
      window.Blinko.toast.error(i18n.t('rating.failedToClear'));
    } finally {
      setIsSaving(false);
    }
  };

  if (isMultiUserMode) {
    if (!isExpanded) {
      return (
        <div
          className="blinko-rating-plugin"
          style={{
            padding: '12px 8px 8px 8px',
            marginTop: '12px',
            borderTop: '1px solid rgba(128, 128, 128, 0.2)',
            userSelect: 'none',
            width: '100%',
            boxSizing: 'border-box',
            flexShrink: 0,
            opacity: isSaving ? 0.6 : 1,
            transition: 'opacity 0.2s'
          }}
          data-note-id={noteId}
        >
          {label && (
            <div style={{
              fontSize: '11px',
              fontWeight: '500',
              color: 'rgba(128, 128, 128, 0.7)',
              marginBottom: '8px'
            }}>
              {label}
            </div>
          )}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px',
            fontSize: '12px',
            color: 'rgba(128, 128, 128, 0.8)'
          }}>
            <span style={{ fontWeight: '500', minWidth: '60px' }}>{i18n.t('rating.average')}</span>
            <StarRating rating={avgRating} isInteractive={false} />
            <span style={{ color: 'rgba(128, 128, 128, 0.6)' }}>
              {avgRating.toFixed(1)}/5 ({votes} {i18n.t('rating.vote', { count: votes })})
            </span>
          </div>

          <div
            onClick={() => setIsExpanded(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px',
              background: 'rgba(128, 128, 128, 0.05)',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(128, 128, 128, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(128, 128, 128, 0.05)';
            }}
          >
            <UserAvatar userId={currentUserId} size={24} isCurrentUser={true} />
            <div style={{ fontSize: '11px', color: 'rgba(128, 128, 128, 0.7)', minWidth: '60px' }}>
              {i18n.t('rating.you')}
            </div>
            {rating > 0 ? (
              <>
                <StarRating rating={rating} isInteractive={false} />
                <div style={{ fontSize: '11px', color: 'rgba(128, 128, 128, 0.6)', marginLeft: '4px' }}>
                  ({rating}/5)
                </div>
              </>
            ) : (
              <div style={{ fontSize: '11px', color: 'rgba(128, 128, 128, 0.6)' }}>
                {i18n.t('rating.notRated')}
              </div>
            )}
            <div style={{ marginLeft: 'auto', fontSize: '11px', color: 'rgba(128, 128, 128, 0.7)', fontWeight: '500' }}>
              {i18n.t('rating.voteButton')}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className="blinko-rating-plugin"
        style={{
          padding: '12px 8px 8px 8px',
          marginTop: '12px',
          borderTop: '1px solid rgba(128, 128, 128, 0.2)',
          userSelect: 'none',
          width: '100%',
          boxSizing: 'border-box',
          flexShrink: 0,
          opacity: isSaving ? 0.6 : 1,
          transition: 'opacity 0.2s'
        }}
        data-note-id={noteId}
      >
        {label && (
          <div style={{
            fontSize: '11px',
            fontWeight: '500',
            color: 'rgba(128, 128, 128, 0.7)',
            marginBottom: '8px'
          }}>
            {label}
          </div>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
          fontSize: '13px',
          color: 'rgba(128, 128, 128, 0.9)',
          fontWeight: '500'
        }}>
          <span>{i18n.t('rating.average')} {avgRating.toFixed(1)}/5</span>
          <span>({votes} {i18n.t('rating.vote', { count: votes })})</span>
          <button
            onClick={() => setIsExpanded(false)}
            style={{
              padding: '2px 8px',
              fontSize: '11px',
              cursor: 'pointer',
              border: '1px solid rgba(128, 128, 128, 0.3)',
              borderRadius: '4px',
              background: 'transparent',
              color: 'rgba(128, 128, 128, 0.8)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(128, 128, 128, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {i18n.t('rating.collapse')}
          </button>
        </div>

        <div style={{
          marginBottom: '12px',
          paddingBottom: '12px',
          borderBottom: '1px solid rgba(128, 128, 128, 0.1)'
        }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px',
              background: 'rgba(128, 128, 128, 0.05)',
              borderRadius: '6px'
            }}
          >
            <UserAvatar userId={currentUserId} size={24} isCurrentUser={true} />
            <div style={{ fontSize: '11px', color: 'rgba(128, 128, 128, 0.7)', minWidth: '60px' }}>
              {i18n.t('rating.you')}
            </div>
            <StarRating
              rating={rating}
              hoverRating={hoverRating}
              isInteractive={true}
              onStarClick={handleStarClick}
              onStarHover={setHoverRating}
              onStarLeave={() => setHoverRating(0)}
              disabled={isSaving}
            />
            {rating > 0 && (
              <>
                <div style={{ fontSize: '11px', color: 'rgba(128, 128, 128, 0.6)', marginLeft: '4px' }}>
                  ({rating}/5)
                </div>
                <button
                  onClick={handleClearRating}
                  disabled={isSaving}
                  style={{
                    padding: '2px 8px',
                    fontSize: '11px',
                    cursor: isSaving ? 'wait' : 'pointer',
                    border: '1px solid rgba(128, 128, 128, 0.3)',
                    borderRadius: '4px',
                    background: 'transparent',
                    color: 'rgba(128, 128, 128, 0.8)',
                    transition: 'all 0.2s',
                    opacity: isSaving ? 0.5 : 1,
                    marginLeft: 'auto'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSaving) {
                      e.currentTarget.style.background = 'rgba(255, 0, 0, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.5)';
                      e.currentTarget.style.color = 'rgba(255, 0, 0, 0.8)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(128, 128, 128, 0.3)';
                    e.currentTarget.style.color = 'rgba(128, 128, 128, 0.8)';
                  }}
                >
                  {i18n.t('rating.clear')}
                </button>
              </>
            )}
          </div>
        </div>

        <div style={{ fontSize: '12px', color: 'rgba(128, 128, 128, 0.8)', marginBottom: '6px', fontWeight: '500' }}>
          {i18n.t('rating.otherVotes')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {otherUsersVotes.map(([userId, userRating]) => (
            <div
              key={userId}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px',
                background: 'rgba(128, 128, 128, 0.05)',
                borderRadius: '6px'
              }}
            >
              <UserAvatar userId={userId} size={24} isCurrentUser={false} />
              <div style={{ fontSize: '11px', color: 'rgba(128, 128, 128, 0.7)', minWidth: '60px' }}>
                {i18n.t('rating.user', { id: userId.substring(0, 6) })}
              </div>
              <StarRating rating={userRating} isInteractive={false} />
              <div style={{ fontSize: '11px', color: 'rgba(128, 128, 128, 0.6)', marginLeft: '4px' }}>
                ({userRating}/5)
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="blinko-rating-plugin"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '12px 8px 8px 8px',
        marginTop: '12px',
        borderTop: '1px solid rgba(128, 128, 128, 0.2)',
        fontSize: '18px',
        userSelect: 'none',
        width: '100%',
        boxSizing: 'border-box',
        flexShrink: 0,
        opacity: isSaving ? 0.6 : 1,
        transition: 'opacity 0.2s'
      }}
      data-note-id={noteId}
    >
      {label && (
        <div style={{
          fontSize: '11px',
          fontWeight: '500',
          color: 'rgba(128, 128, 128, 0.7)',
          marginRight: '8px'
        }}>
          {label}
        </div>
      )}

      <StarRating
        rating={rating}
        hoverRating={hoverRating}
        isInteractive={true}
        onStarClick={handleStarClick}
        onStarHover={setHoverRating}
        onStarLeave={() => setHoverRating(0)}
        disabled={isSaving}
      />
      <span
        style={{
          fontSize: '12px',
          color: 'rgba(128, 128, 128, 0.8)',
          marginLeft: '8px'
        }}
      >
        {rating > 0 ? `${rating}/5` : i18n.t('rating.notRatedShort')}
      </span>
      {rating > 0 && (
        <button
          onClick={handleClearRating}
          disabled={isSaving}
          style={{
            marginLeft: '8px',
            padding: '2px 8px',
            fontSize: '11px',
            cursor: isSaving ? 'wait' : 'pointer',
            border: '1px solid rgba(128, 128, 128, 0.3)',
            borderRadius: '4px',
            background: 'transparent',
            color: 'rgba(128, 128, 128, 0.8)',
            transition: 'all 0.2s',
            opacity: isSaving ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (!isSaving) {
              e.currentTarget.style.background = 'rgba(255, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.5)';
              e.currentTarget.style.color = 'rgba(255, 0, 0, 0.8)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(128, 128, 128, 0.3)';
            e.currentTarget.style.color = 'rgba(128, 128, 128, 0.8)';
          }}
        >
          {i18n.t('rating.clear')}
        </button>
      )}
    </div>
  );
}
