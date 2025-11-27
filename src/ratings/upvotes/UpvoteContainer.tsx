/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import { UserAvatar } from '../../components/UserAvatar';

interface UpvoteComponentProps {
  noteId: string;
  initialRating: number;
  averageRating: number;
  voteCount: number;
  allRatings: Record<string, number>;
  currentUserId: string;
  onRatingChange: (rating: number) => Promise<void>;
  label?: string;
}

export function UpvoteContainer({ noteId, initialRating, averageRating, voteCount, allRatings, currentUserId, onRatingChange, label }: UpvoteComponentProps): JSXInternal.Element {
  const [vote, setVote] = useState(initialRating);
  const [totalPoints, setTotalPoints] = useState(Object.values(allRatings).reduce((sum, v) => sum + v, 0));
  const [votes, setVotes] = useState(voteCount);
  const [localAllRatings, setLocalAllRatings] = useState(allRatings);
  const [isSaving, setIsSaving] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const i18n = window.Blinko.i18n;

  const otherUsersVotes = Object.entries(localAllRatings).filter(([userId]) => userId !== currentUserId);
  const isMultiUserMode = otherUsersVotes.length > 0;

  const handleVote = async (newVote: number) => {
    if (isSaving) return;

    const actualVote = vote === newVote ? 0 : newVote;

    setIsSaving(true);
    const oldVote = vote;
    const oldPoints = totalPoints;
    const oldVotes = votes;
    const oldAllRatings = localAllRatings;

    setVote(actualVote);
    const updatedAllRatings = actualVote === 0
      ? { ...localAllRatings }
      : { ...localAllRatings, [currentUserId]: actualVote };

    if (actualVote === 0) {
      delete updatedAllRatings[currentUserId];
    }

    setLocalAllRatings(updatedAllRatings);

    try {
      await onRatingChange(actualVote);

      let newVotes = oldVotes;
      let newPoints = oldPoints;

      if (oldVote === 0 && actualVote !== 0) {
        newVotes = oldVotes + 1;
        newPoints = oldPoints + actualVote;
      } else if (oldVote !== 0 && actualVote === 0) {
        newVotes = Math.max(0, oldVotes - 1);
        newPoints = oldPoints - oldVote;
      } else if (oldVote !== 0 && actualVote !== 0) {
        newPoints = oldPoints - oldVote + actualVote;
      }

      setVotes(newVotes);
      setTotalPoints(newPoints);

      if (actualVote === 0) {
        window.Blinko.toast.success(i18n.t('rating.voteCleared'));
      } else {
        window.Blinko.toast.success(
          actualVote === 1
            ? i18n.t('rating.upvoted')
            : i18n.t('rating.downvoted')
        );
      }
    } catch (error) {
      setVote(oldVote);
      setVotes(oldVotes);
      setTotalPoints(oldPoints);
      setLocalAllRatings(oldAllRatings);
      window.Blinko.toast.error(i18n.t('rating.failedToSave'));
    } finally {
      setIsSaving(false);
    }
  };

  const VoteButtons = ({ currentVote, onVote, disabled }: { currentVote: number, onVote: (vote: number) => void, disabled: boolean }) => (
    <div style={{ display: 'flex', gap: '4px' }}>
      <button
        onClick={() => onVote(1)}
        disabled={disabled}
        style={{
          padding: '4px 10px',
          fontSize: '14px',
          cursor: disabled ? 'wait' : 'pointer',
          border: '1px solid rgba(128, 128, 128, 0.3)',
          borderRadius: '4px',
          background: currentVote === 1 ? 'rgba(0, 255, 0, 0.1)' : 'transparent',
          color: currentVote === 1 ? 'rgba(0, 200, 0, 0.9)' : 'rgba(128, 128, 128, 0.8)',
          borderColor: currentVote === 1 ? 'rgba(0, 200, 0, 0.5)' : 'rgba(128, 128, 128, 0.3)',
          transition: 'all 0.2s',
          opacity: disabled ? 0.5 : 1,
          fontWeight: currentVote === 1 ? '600' : '400'
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.background = 'rgba(0, 255, 0, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(0, 200, 0, 0.5)';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.background = currentVote === 1 ? 'rgba(0, 255, 0, 0.1)' : 'transparent';
            e.currentTarget.style.borderColor = currentVote === 1 ? 'rgba(0, 200, 0, 0.5)' : 'rgba(128, 128, 128, 0.3)';
          }
        }}
      >
        +1
      </button>
      <button
        onClick={() => onVote(-1)}
        disabled={disabled}
        style={{
          padding: '4px 10px',
          fontSize: '14px',
          cursor: disabled ? 'wait' : 'pointer',
          border: '1px solid rgba(128, 128, 128, 0.3)',
          borderRadius: '4px',
          background: currentVote === -1 ? 'rgba(255, 0, 0, 0.1)' : 'transparent',
          color: currentVote === -1 ? 'rgba(255, 0, 0, 0.9)' : 'rgba(128, 128, 128, 0.8)',
          borderColor: currentVote === -1 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(128, 128, 128, 0.3)',
          transition: 'all 0.2s',
          opacity: disabled ? 0.5 : 1,
          fontWeight: currentVote === -1 ? '600' : '400'
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.background = 'rgba(255, 0, 0, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.5)';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.background = currentVote === -1 ? 'rgba(255, 0, 0, 0.1)' : 'transparent';
            e.currentTarget.style.borderColor = currentVote === -1 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(128, 128, 128, 0.3)';
          }
        }}
      >
        -1
      </button>
    </div>
  );

  if (isMultiUserMode) {
    if (!isExpanded) {
      return (
        <div
          className="blinko-upvote-plugin"
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
            <span style={{ fontWeight: '500', minWidth: '80px' }}>{i18n.t('rating.totalPoints')}</span>
            <span style={{
              fontWeight: '600',
              fontSize: '14px',
              color: totalPoints > 0 ? 'rgba(0, 200, 0, 0.9)' : totalPoints < 0 ? 'rgba(255, 0, 0, 0.9)' : 'rgba(128, 128, 128, 0.8)'
            }}>
              {totalPoints > 0 ? '+' : ''}{totalPoints}
            </span>
            <span style={{ color: 'rgba(128, 128, 128, 0.6)' }}>
              ({votes} {i18n.t('rating.vote', { count: votes })})
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
            {vote !== 0 ? (
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: vote === 1 ? 'rgba(0, 200, 0, 0.9)' : 'rgba(255, 0, 0, 0.9)'
              }}>
                {vote === 1 ? '+1' : '-1'}
              </div>
            ) : (
              <div style={{ fontSize: '11px', color: 'rgba(128, 128, 128, 0.6)' }}>
                {i18n.t('rating.notVoted')}
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
        className="blinko-upvote-plugin"
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
          <span>{i18n.t('rating.totalPoints')}
            <span style={{
              fontWeight: '600',
              marginLeft: '8px',
              color: totalPoints > 0 ? 'rgba(0, 200, 0, 0.9)' : totalPoints < 0 ? 'rgba(255, 0, 0, 0.9)' : 'rgba(128, 128, 128, 0.8)'
            }}>
              {totalPoints > 0 ? '+' : ''}{totalPoints}
            </span>
          </span>
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
            <VoteButtons currentVote={vote} onVote={handleVote} disabled={isSaving} />
            {vote !== 0 && (
              <div style={{
                fontSize: '11px',
                color: 'rgba(128, 128, 128, 0.6)',
                marginLeft: '4px'
              }}>
                ({vote === 1 ? '+1' : '-1'})
              </div>
            )}
          </div>
        </div>

        <div style={{ fontSize: '12px', color: 'rgba(128, 128, 128, 0.8)', marginBottom: '6px', fontWeight: '500' }}>
          {i18n.t('rating.otherVotes')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {otherUsersVotes.map(([userId, userVote]) => (
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
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: userVote === 1 ? 'rgba(0, 200, 0, 0.9)' : 'rgba(255, 0, 0, 0.9)'
              }}>
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
      className="blinko-upvote-plugin"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 8px 8px 8px',
        marginTop: '12px',
        borderTop: '1px solid rgba(128, 128, 128, 0.2)',
        fontSize: '14px',
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

      <VoteButtons currentVote={vote} onVote={handleVote} disabled={isSaving} />
      <span
        style={{
          fontSize: '12px',
          color: 'rgba(128, 128, 128, 0.8)',
          marginLeft: '4px'
        }}
      >
        {vote !== 0 ? (vote === 1 ? '+1' : '-1') : i18n.t('rating.notVoted')}
      </span>
    </div>
  );
}
