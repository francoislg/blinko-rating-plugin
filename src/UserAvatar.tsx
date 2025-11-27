/** @jsxImportSource preact */
import { useState } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import { getUserData } from './user-helper';

interface UserAvatarProps {
  userId: string;
  size?: number;
  isCurrentUser?: boolean;
}

export function UserAvatar({ userId, size = 24, isCurrentUser = false }: UserAvatarProps): JSXInternal.Element {
  const userData = getUserData(userId);
  const [imageError, setImageError] = useState(false);

  const initials = userId.substring(0, 2).toUpperCase();

  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: `${size * 0.4}px`,
    fontWeight: 'bold'
  } as const;

  if (userData.avatarUrl && !imageError) {
    return (
      <div style={containerStyle}>
        <img
          src={userData.avatarUrl}
          alt={userData.nickname || `User ${userId}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {initials}
    </div>
  );
}
